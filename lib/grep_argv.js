const fs   = require('fs')
const path = require('path')

const {stdinToBuffer} = require('./read_stdin')

let stdin_drained, stdin

const is_stdin_drained = () => !!stdin_drained

const get_stdin = (utf8) => {
  if (!stdin_drained) {
    stdin_drained = true
    stdin         = stdinToBuffer()
  }

  return !stdin
    ? null
    : !utf8
      ? stdin
      : stdin.toString('utf8')
}

const get_realpath = (val, err_msg) => {
  try {
    return fs.realpathSync(val, {encoding: 'utf8'})
  }
  catch(e) {
    if (e.code === 'ENOENT') {
      throw new Error(err_msg)
    }
    else {
      throw e
    }
  }
}

const read_realpath = (val, utf8, err_msg) => {
  if (val === '-')
    return get_stdin(utf8)

  // filepath: must exist
  val = get_realpath(val, err_msg)
  val = utf8
    ? fs.readFileSync(val, {encoding: 'utf8'})
    : fs.readFileSync(val)

  return val
}

// assumes that all arguments are passed with the convention: --key value
// where "--key" is a flag

const retrieve_flag_value = function(flag_opts, args, index, throw_error_if_value_not_acceptable, throw_error_if_value_matches_any_flag_key, flag_keys) {
  let val, val_verbatim

  if (index >= 0) {
    if (flag_opts && flag_opts["bool"]) {
      val = true
    }
    else if (index + 1 < args.length) {
      val_verbatim = args[index + 1]
      val          = val_verbatim

      if (throw_error_if_value_matches_any_flag_key && (flag_keys.indexOf(val) >= 0)) {
        throw new Error(`The command-line contains option "${val_verbatim}" at a position where a value for the previous option "${args[index]}" is expected.`)
      }

      if (flag_opts && flag_opts["num"]) {
        val = Number(val)

        if (isNaN(val)) {
          if (throw_error_if_value_not_acceptable) {
            throw new Error(`Option "${args[index]}" requires a numeric value. You entered: "${val_verbatim}"`)
          }
          val = ""
        }
        else if ( (typeof flag_opts["num"] === "string") && (flag_opts["num"].toLowerCase() === "int") ) {
          let int = Math.floor(val)

          if (val !== int) {
            if (throw_error_if_value_not_acceptable) {
              throw new Error(`Option "${args[index]}" requires an integer value. You entered: "${val_verbatim}"`)
            }
            val = int
          }
        }
      }

      if (flag_opts && Array.isArray(flag_opts["enum"])) {
        if (flag_opts["enum"].indexOf(val) === -1) {
          if (throw_error_if_value_not_acceptable) {
            throw new Error(`Option "${args[index]}" requires a value restricted to the following options:\n${JSON.stringify(flag_opts["enum"],null,2)}\nYou entered: "${val_verbatim}"`)
          }
          val = ""
        }
      }

      if (flag_opts && flag_opts["regex"]) {
        try {
          let flags = (typeof flag_opts["regex"] === 'string') ? flag_opts["regex"] : undefined
          val = new RegExp(val, flags)
        }
        catch(e) {
          if (throw_error_if_value_not_acceptable) {
            throw new Error(`Option "${args[index]}" requires a well-formed regular expression pattern.\nYou entered: "${val_verbatim}"\n\nError message from regex parser:\n${e.message}`)
          }
          val = ""
        }
      }

      if (flag_opts && flag_opts["file"]) {
        try {
          let file_opt = (typeof flag_opts["file"] === "string") ? flag_opts["file"].toLowerCase() : ""

          switch (file_opt) {
            case 'path':
            case 'path-dirname-exists':
              // filepath: resolve only, do not check whether it exists
              val = path.resolve(val)
              break
            case 'path-exists':
            case 'module':
              // filepath: must exist
              val = get_realpath(val, `Option "${args[index]}" requires a file path that already exists.\nYou entered: "${val_verbatim}"`)
              break
            case 'stream':
              val = (val === '-')
                ? process.stdin
                : fs.createReadStream(val)
              break
            case 'buffer':
              val = read_realpath(val, /* utf8= */ false, `Option "${args[index]}" requires a file path that already exists.\nYou entered: "${val_verbatim}"`)
              break
            case 'text':
            case 'json':
            case 'lines':
            default:
              val = read_realpath(val, /* utf8= */ true, `Option "${args[index]}" requires a file path that already exists.\nYou entered: "${val_verbatim}"`)
              break
          }

          if (file_opt === 'path-dirname-exists') {
            // filepath: validate that parent directory must exist

            let dirname = path.dirname(val)

            if (! fs.existsSync(dirname)) {
              throw new Error(`Option "${args[index]}" requires a file path that terminates within a directory that already exists.\nYou entered: "${val}"`)
            }
          }

          if (file_opt === 'module') {
            // import as CommonJS module
            val = require(val)
          }

          if (file_opt === 'json') {
            // parse JSON string to JS data structure
            try {
              val = JSON.parse(val)
            }
            catch(e) {
              throw new Error(`Option "${args[index]}" requires the path to a file that contains valid JSON data.\nYou entered: "${val_verbatim}"`)
            }
          }

          if (file_opt === 'lines') {
            // parse to Array of Strings, each a line of text
            let nonwhitespace = /[^\s]/
            val = val.split(/(?:\r?\n)+/).filter(line => nonwhitespace.test(line))
          }
        }
        catch(e){
          if (throw_error_if_value_not_acceptable) {
            throw e
          }
          val = ""
        }
      }
    }
  }

  if (val === "") val = undefined

  return val
}

const grep_argv = function(flags = {}, throw_error_if_value_not_acceptable = true, throw_error_if_value_matches_any_flag_key = true, remove_stdin_cache = true) {
  const args      = process.argv.slice(2)
  const flag_keys = Object.keys(flags)
  const vals = {}

  if (args.length > 0) {
    flag_keys.forEach((flag) => {
      let flag_opts = flags[flag]
      let is_array  = flag_opts && flag_opts["many"]
      let index     = args.indexOf(flag)
      let val

      if (!is_array) {
        val = retrieve_flag_value(flag_opts, args, index, throw_error_if_value_not_acceptable, throw_error_if_value_matches_any_flag_key, flag_keys)

        if (val !== undefined) {
          vals[flag] = val
        }
      }
      else {
        vals[flag] = []

        while (index >=0) {
          val = retrieve_flag_value(flag_opts, args, index, throw_error_if_value_not_acceptable, throw_error_if_value_matches_any_flag_key, flag_keys)

          if (val !== undefined) {
            vals[flag].push(val)
          }

          index = args.indexOf(flag, (index + 1))
        }
      }
    })
  }

  // WARNING: stdin can only be read once.
  // The only reason to override the default cleanup operation is to evaluate "grep_argv" more than once, which is an edge-case.
  // In that situation, the cache should not be removed until the last call to "grep_argv" (if at all).
  if (remove_stdin_cache) {
    stdin = null
  }

  return vals
}

module.exports = {grep_argv, is_stdin_drained}

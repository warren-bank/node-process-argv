const {grep_argv} = require('./grep_argv')

const get_merged_argv_flags = function(argv_flags, argv_flag_aliases){
  // return a clone of "argv_flags" Object that also contains properly configured alias keys

  let argv_flags_merged = {...argv_flags}
  let key, flag_opts, aliases, alias

  for (key in argv_flag_aliases){
    flag_opts = argv_flags[key]
    aliases   = argv_flag_aliases[key]

    if ((flag_opts instanceof Object) && (Array.isArray(aliases))){
      for (alias of aliases){
        argv_flags_merged[alias] = flag_opts
      }
    }
  }

  return argv_flags_merged
}

const normalize_argv_vals = function(argv_vals, argv_flags, argv_flag_aliases){
  if (!(argv_vals instanceof Object)) return

  let key, flag_opts, is_many, argv_val, aliases, alias

  const is_value = (is_many, argv_val) => is_many ? argv_val.length : !!argv_val

  // cleanup "argv_vals"
  for (key in argv_flag_aliases){
    flag_opts = argv_flags[key]
    is_many   = ((flag_opts instanceof Object) && flag_opts.many)
    argv_val  = argv_vals[key]
    aliases   = argv_flag_aliases[key]

    if (Array.isArray(aliases) && aliases.length) {
      // 1st pass: retrieve value assigned to an alias key
      if (!is_value(is_many, argv_val)){
        for (alias of aliases){
          argv_val = argv_vals[alias]
          if (is_value(is_many, argv_val)) {
            argv_vals[key] = argv_val
            break
          }
        }
      }

      // 2nd pass: remove alias keys
      for (alias of aliases){
        delete argv_vals[alias]
      }
    }
  }
}

const default_options = {
  throw_error_if_value_not_acceptable:       true,
  throw_error_if_value_matches_any_flag_key: true
}

const process_argv = function(argv_flags = {}, argv_flag_aliases = {}, user_options = {}) {
  const options = Object.assign({}, default_options, user_options)
  const {throw_error_if_value_not_acceptable, throw_error_if_value_matches_any_flag_key} = options

  const flags = get_merged_argv_flags(argv_flags, argv_flag_aliases)
  const argv_vals = grep_argv(flags, throw_error_if_value_not_acceptable, throw_error_if_value_matches_any_flag_key)
  normalize_argv_vals(argv_vals, argv_flags, argv_flag_aliases)

  return argv_vals
}

module.exports = process_argv

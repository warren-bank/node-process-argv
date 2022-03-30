const process_argv = require('../../../lib')

const argv_flags = {
  "--help":                             {bool:  true},
  "--version":                          {bool:  true},
  "--bool":                             {bool:  true},
  "--string":                           {},
  "--num":                              {num:   true},
  "--int":                              {num:   "int"},
  "--enum":                             {enum:  ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},
  "--regex":                            {regex: true},
  "--regex-case-insensitive":           {regex: "i"},
  "--file-path":                        {file:  "path"},                                          // resolved path, may or may not already exist
  "--file-path-dirname-exists":         {file:  "path-dirname-exists"},                           // resolved path, may or may not already exist, parent directory must exist
  "--file-path-exists":                 {file:  "path-exists"},                                   // resolved path, must exist
  "--file-stream":                      {file:  "stream"},                                        // stream.Readable
  "--file-buffer":                      {file:  "buffer"},                                        // read contents as Buffer
  "--file-text":                        {file:  "text"},                                          // read contents as String (with utf8 encoding)
  "--file":                             {file:  true},                                            // read contents as String
  "--file-lines":                       {file:  "lines"},                                         // read contents as String, parse to Array of all non-empty lines
  "--file-json":                        {file:  "json"},                                          // read contents as String, parse as JSON
  "--file-module":                      {file:  "module"},                                        // import as CommonJS module
}

for (let key in argv_flags) {
  let new_key = key + '-many'
  let new_val = Object.assign({}, argv_flags[key], {many: true})

  argv_flags[new_key] = new_val
}
delete argv_flags["--help-many"]
delete argv_flags["--version-many"]

const argv_flag_aliases = {
  "--help":                             ["-h"],
  "--version":                          ["-v"],

  "--bool":                             ["-b"],
  "--string":                           ["-s"],
  "--num":                              ["-n"],
  "--int":                              ["-i"],
  "--enum":                             ["-e"],
  "--regex":                            ["-r"],
  "--regex-case-insensitive":           ["-ri"],
  "--file-path":                        ["-fp"],
  "--file-path-dirname-exists":         ["-fpde"],
  "--file-path-exists":                 ["-fpe"],
  "--file-stream":                      ["-fs"],
  "--file-buffer":                      ["-fb"],
  "--file-text":                        ["-ft"],
  "--file":                             ["-f"],
  "--file-lines":                       ["-fl"],
  "--file-json":                        ["-fj"],
  "--file-module":                      ["-fm"],

  "--bool-many":                        ["-mb"],
  "--string-many":                      ["-ms"],
  "--num-many":                         ["-mn"],
  "--int-many":                         ["-mi"],
  "--enum-many":                        ["-me"],
  "--regex-many":                       ["-mr"],
  "--regex-case-insensitive-many":      ["-mri"],
  "--file-path-many":                   ["-mfp"],
  "--file-path-dirname-exists-many":    ["-mfpde"],
  "--file-path-exists-many":            ["-mfpe"],
  "--file-stream-many":                 ["-mfs"],
  "--file-buffer-many":                 ["-mfb"],
  "--file-text-many":                   ["-mft"],
  "--file-many":                        ["-mf"],
  "--file-lines-many":                  ["-mfl"],
  "--file-json-many":                   ["-mfj"],
  "--file-module-many":                 ["-mfm"],
}

const options = {
  throw_error_if_value_not_acceptable:       true,
  throw_error_if_value_matches_any_flag_key: true
}

const argv_vals = process_argv(argv_flags, argv_flag_aliases, options)

if (argv_vals["--help"]) {
  const help = require('./help')
  console.log(help)
  process.exit(0)
}

if (argv_vals["--version"]) {
  const data = require('../../../package.json')
  console.log(data.version)
  process.exit(0)
}

module.exports = argv_vals

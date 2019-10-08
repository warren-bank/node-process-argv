const help = `
usage:
======

node app.js <options>

options:
========

"-h"
"--help"
  * Print a help message describing all command-line options.

"-v"
"--version"
  * Display the version.

"-b"
"--bool"
  * Pass value of type: boolean

"-s"
"--string"
  * Pass value of type: string

"-n"
"--num"
  * Pass value of type: number

"-i"
"--int"
  * Pass value of type: integer

"-e"
"--enum"
  * Pass value of type: string
    Value is constrained by a pre-defined list of acceptable options.

"-fp"
"--file-path"
  * Pass value of type: string
    Value is resolved to a file path.
    File path need not exist.

"-fpde"
"--file-path-dirname-exists"
  * Pass value of type: string
    Value is resolved to a file path.
    File path need not exist.
    Parent directory must exist.

"-fpe"
"--file-path-exists"
  * Pass value of type: string
    Value is resolved to a file path.
    File path must exist.

"-f"
"--file"
  * Pass value of type: string
    Value is resolved to a file path.
    File path must exist.
    File content is read as string.

"-ft"
"--file-text"
  * Pass value of type: string
    Value is resolved to a file path.
    File path must exist.
    File content is read as string.

"-fl"
"--file-lines"
  * Pass value of type: array of strings
    Value is resolved to a file path.
    File path must exist.
    File content is read as string.
    File content is parsed to array of all non-empty lines.

"-fj"
"--file-json"
  * Pass value of type: javascript object
    Value is resolved to a file path.
    File path must exist.
    File content is read as string.
    File content is parsed as JSON.

"-fm"
"--file-module"
  * Pass value of type: javascript object
    Value is resolved to a file path.
    File path must exist.
    File content is import as a CommonJS module.

"-mb"
"--bool-many"
  * Pass value of type: boolean
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-ms"
"--string-many"
  * Pass value of type: string
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-mn"
"--num-many"
  * Pass value of type: number
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-mi"
"--int-many"
  * Pass value of type: integer
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-me"
"--enum-many"
  * Pass value of type: string
    Value is constrained by a pre-defined list of acceptable options.
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-mfp"
"--file-path-many"
  * Pass value of type: string
    Value is resolved to a file path.
    File path need not exist.
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-mfpde"
"--file-path-dirname-exists-many"
  * Pass value of type: string
    Value is resolved to a file path.
    File path need not exist.
    Parent directory must exist.
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-mfpe"
"--file-path-exists-many"
  * Pass value of type: string
    Value is resolved to a file path.
    File path must exist.
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-mf"
"--file-many"
  * Pass value of type: string
    Value is resolved to a file path.
    File path must exist.
    File content is read as string.
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-mft"
"--file-text-many"
  * Pass value of type: string
    Value is resolved to a file path.
    File path must exist.
    File content is read as string.
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-mfl"
"--file-lines-many"
  * Pass value of type: array of strings
    Value is resolved to a file path.
    File path must exist.
    File content is read as string.
    File content is parsed to array of all non-empty lines.
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-mfj"
"--file-json-many"
  * Pass value of type: javascript object
    Value is resolved to a file path.
    File path must exist.
    File content is read as string.
    File content is parsed as JSON.
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-mfm"
"--file-module-many"
  * Pass value of type: javascript object
    Value is resolved to a file path.
    File path must exist.
    File content is import as a CommonJS module.
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.
`

module.exports = help

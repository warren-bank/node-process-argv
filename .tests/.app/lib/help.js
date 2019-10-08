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

"-s" <string>
"--string" <string>
  * Pass value of type: string

"-n" <number>
"--num" <number>
  * Pass value of type: number

"-i" <integer>
"--int" <integer>
  * Pass value of type: integer

"-e" <element in enumeration>
"--enum" <element in enumeration>
  * Pass value of type: string
    Value is constrained by a pre-defined list of acceptable options.

"-r" <regex>
"--regex" <regex>
  * Pass value of type: RegExp (case sensitive)

"-ri" <regex>
"--regex-case-insensitive" <regex>
  * Pass value of type: RegExp (case insensitive)

"-fp" </path/to/directory-or-file>
"--file-path" </path/to/directory-or-file>
  * Pass value of type: string
    Value is resolved to a file path.
    File path need not exist.

"-fpde" </path/to/directory-must-exist/file.txt>
"--file-path-dirname-exists" </path/to/directory-must-exist/file.txt>
  * Pass value of type: string
    Value is resolved to a file path.
    File path need not exist.
    Parent directory must exist.

"-fpe" </path/to/directory/file-must-exist.txt>
"--file-path-exists" </path/to/directory/file-must-exist.txt>
  * Pass value of type: string
    Value is resolved to a file path.
    File path must exist.

"-f" </path/to/directory/file-must-exist.txt>
"--file" </path/to/directory/file-must-exist.txt>
  * Pass value of type: string
    Value is resolved to a file path.
    File path must exist.
    File content is read as string.

"-ft" </path/to/directory/file-must-exist.txt>
"--file-text" </path/to/directory/file-must-exist.txt>
  * Pass value of type: string
    Value is resolved to a file path.
    File path must exist.
    File content is read as string.

"-fl" </path/to/directory/file-must-exist.txt>
"--file-lines" </path/to/directory/file-must-exist.txt>
  * Pass value of type: array of strings
    Value is resolved to a file path.
    File path must exist.
    File content is read as string.
    File content is parsed to array of all non-empty lines.

"-fj" </path/to/directory/file-must-exist.json>
"--file-json" </path/to/directory/file-must-exist.json>
  * Pass value of type: javascript object
    Value is resolved to a file path.
    File path must exist.
    File content is read as string.
    File content is parsed as JSON.

"-fm" </path/to/directory/file-must-exist.js>
"--file-module" </path/to/directory/file-must-exist.js>
  * Pass value of type: javascript object
    Value is resolved to a file path.
    File path must exist.
    File content is import as a CommonJS module.

"-mb"
"--bool-many"
  * Pass value of type: boolean
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-ms" <string>
"--string-many" <string>
  * Pass value of type: string
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-mn" <number>
"--num-many" <number>
  * Pass value of type: number
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-mi" <integer>
"--int-many" <integer>
  * Pass value of type: integer
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-me" <element in enumeration>
"--enum-many" <element in enumeration>
  * Pass value of type: string
    Value is constrained by a pre-defined list of acceptable options.
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-mr" <regex>
"--regex-many" <regex>
  * Pass value of type: RegExp (case sensitive)
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-mri" <regex>
"--regex-case-insensitive-many" <regex>
  * Pass value of type: RegExp (case insensitive)
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-mfp" </path/to/directory-or-file>
"--file-path-many" </path/to/directory-or-file>
  * Pass value of type: string
    Value is resolved to a file path.
    File path need not exist.
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-mfpde" </path/to/directory-must-exist/file.txt>
"--file-path-dirname-exists-many" </path/to/directory-must-exist/file.txt>
  * Pass value of type: string
    Value is resolved to a file path.
    File path need not exist.
    Parent directory must exist.
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-mfpe" </path/to/directory/file-must-exist.txt>
"--file-path-exists-many" </path/to/directory/file-must-exist.txt>
  * Pass value of type: string
    Value is resolved to a file path.
    File path must exist.
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-mf" </path/to/directory/file-must-exist.txt>
"--file-many" </path/to/directory/file-must-exist.txt>
  * Pass value of type: string
    Value is resolved to a file path.
    File path must exist.
    File content is read as string.
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-mft" </path/to/directory/file-must-exist.txt>
"--file-text-many" </path/to/directory/file-must-exist.txt>
  * Pass value of type: string
    Value is resolved to a file path.
    File path must exist.
    File content is read as string.
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-mfl" </path/to/directory/file-must-exist.txt>
"--file-lines-many" </path/to/directory/file-must-exist.txt>
  * Pass value of type: array of strings
    Value is resolved to a file path.
    File path must exist.
    File content is read as string.
    File content is parsed to array of all non-empty lines.
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-mfj" </path/to/directory/file-must-exist.json>
"--file-json-many" </path/to/directory/file-must-exist.json>
  * Pass value of type: javascript object
    Value is resolved to a file path.
    File path must exist.
    File content is read as string.
    File content is parsed as JSON.
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.

"-mfm" </path/to/directory/file-must-exist.js>
"--file-module-many" </path/to/directory/file-must-exist.js>
  * Pass value of type: javascript object
    Value is resolved to a file path.
    File path must exist.
    File content is import as a CommonJS module.
  * Flag can be invoked more than once to pass multiple values.
    Result is an ordered array of all values.
`

module.exports = help

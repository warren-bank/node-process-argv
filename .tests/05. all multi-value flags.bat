@echo off

set log_filename=%~n0.txt

set PATH=%~dp0.\.bin;%PATH%

set _argv=
set _argv=%_argv% "--bool-many"
set _argv=%_argv% "--string-many"                    "value"
set _argv=%_argv% "--num-many"                       "123.45"
set _argv=%_argv% "--int-many"                       "123"
set _argv=%_argv% "--enum-many"                      "Fri"
set _argv=%_argv% "--regex-many"                     "^.*$"
set _argv=%_argv% "--regex-case-insensitive-many"    "^[a-z]+$"
set _argv=%_argv% "--file-path-many"                 "C:\Windows\System32\does-not-exist.exe"
set _argv=%_argv% "--file-path-dirname-exists-many"  "C:\Windows\System32\does-not-exist.exe"
set _argv=%_argv% "--file-path-exists-many"          "C:\Windows\System32\cmd.exe"
set _argv=%_argv% "--file-many"                      "%~dp0.\.logs\01. version.txt"
set _argv=%_argv% "--file-text-many"                 "%~dp0.\.logs\01. version.txt"
set _argv=%_argv% "--file-lines-many"                "%~dp0.\.logs\02. help.txt"
set _argv=%_argv% "--file-json-many"                 "%~dp0..\package.json"
set _argv=%_argv% "--file-module-many"               "%~dp0..\package.json"

set _argv=%_argv% "--bool-many"
set _argv=%_argv% "--string-many"                    "value #2"
set _argv=%_argv% "--num-many"                       "456.78"
set _argv=%_argv% "--int-many"                       "456"
set _argv=%_argv% "--enum-many"                      "Sat"
set _argv=%_argv% "--regex-many"                     "^[\w\s]*$"
set _argv=%_argv% "--regex-case-insensitive-many"    "^[A-Z]+$"
set _argv=%_argv% "--file-path-many"                 "C:\Windows\System32\does-not-exist.exe"
set _argv=%_argv% "--file-path-dirname-exists-many"  "C:\Windows\System32\does-not-exist.exe"
set _argv=%_argv% "--file-path-exists-many"          "C:\Windows\System32\cmd.exe"
set _argv=%_argv% "--file-many"                      "%~dp0.\.logs\01. version.txt"
set _argv=%_argv% "--file-text-many"                 "%~dp0.\.logs\01. version.txt"
set _argv=%_argv% "--file-lines-many"                "%~dp0.\.logs\02. help.txt"
set _argv=%_argv% "--file-json-many"                 "%~dp0..\package.json"
set _argv=%_argv% "--file-module-many"               "%~dp0..\package.json"

run_app %_argv%

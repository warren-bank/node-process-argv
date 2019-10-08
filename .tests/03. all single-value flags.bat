@echo off

set log_filename=%~n0.txt

set PATH=%~dp0.\.bin;%PATH%

set _argv=
set _argv=%_argv% "--bool"
set _argv=%_argv% "--string"                    "value"
set _argv=%_argv% "--num"                       "123.45"
set _argv=%_argv% "--int"                       "123"
set _argv=%_argv% "--enum"                      "Fri"
set _argv=%_argv% "--file-path"                 "C:\Windows\System32\does-not-exist.exe"
set _argv=%_argv% "--file-path-dirname-exists"  "C:\Windows\System32\does-not-exist.exe"
set _argv=%_argv% "--file-path-exists"          "C:\Windows\System32\cmd.exe"
set _argv=%_argv% "--file"                      "%~dp0.\.logs\01. version.txt"
set _argv=%_argv% "--file-text"                 "%~dp0.\.logs\01. version.txt"
set _argv=%_argv% "--file-lines"                "%~dp0.\.logs\02. help.txt"
set _argv=%_argv% "--file-json"                 "%~dp0..\package.json"
set _argv=%_argv% "--file-module"               "%~dp0..\package.json"

run_app %_argv%

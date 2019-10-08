@echo off

set log_filename=%~n0.txt

set PATH=%~dp0.\.bin;%PATH%

set _argv=
set _argv=%_argv% "-b"
set _argv=%_argv% "-s"     "value"
set _argv=%_argv% "-n"     "123.45"
set _argv=%_argv% "-i"     "123"
set _argv=%_argv% "-e"     "Fri"
set _argv=%_argv% "-fp"    "C:\Windows\System32\does-not-exist.exe"
set _argv=%_argv% "-fpde"  "C:\Windows\System32\does-not-exist.exe"
set _argv=%_argv% "-fpe"   "C:\Windows\System32\cmd.exe"
set _argv=%_argv% "-f"     "%~dp0.\.logs\01. version.txt"
set _argv=%_argv% "-ft"    "%~dp0.\.logs\01. version.txt"
set _argv=%_argv% "-fl"    "%~dp0.\.logs\02. help.txt"
set _argv=%_argv% "-fj"    "%~dp0..\package.json"
set _argv=%_argv% "-fm"    "%~dp0..\package.json"

run_app %_argv%

@echo off

set log_filename=%~n0.txt

set PATH=%~dp0.\.bin;%PATH%

set _argv=
set _argv=%_argv% "-mb"
set _argv=%_argv% "-ms"     "value"
set _argv=%_argv% "-mn"     "123.45"
set _argv=%_argv% "-mi"     "123"
set _argv=%_argv% "-me"     "Fri"
set _argv=%_argv% "-mfp"    "C:\Windows\System32\does-not-exist.exe"
set _argv=%_argv% "-mfpde"  "C:\Windows\System32\does-not-exist.exe"
set _argv=%_argv% "-mfpe"   "C:\Windows\System32\cmd.exe"
set _argv=%_argv% "-mf"     "%~dp0.\.logs\01. version.txt"
set _argv=%_argv% "-mft"    "%~dp0.\.logs\01. version.txt"
set _argv=%_argv% "-mfl"    "%~dp0.\.logs\02. help.txt"
set _argv=%_argv% "-mfj"    "%~dp0..\package.json"
set _argv=%_argv% "-mfm"    "%~dp0..\package.json"

set _argv=%_argv% "-mb"
set _argv=%_argv% "-ms"     "value #2"
set _argv=%_argv% "-mn"     "456.78"
set _argv=%_argv% "-mi"     "456"
set _argv=%_argv% "-me"     "Sat"
set _argv=%_argv% "-mfp"    "C:\Windows\System32\does-not-exist.exe"
set _argv=%_argv% "-mfpde"  "C:\Windows\System32\does-not-exist.exe"
set _argv=%_argv% "-mfpe"   "C:\Windows\System32\cmd.exe"
set _argv=%_argv% "-mf"     "%~dp0.\.logs\01. version.txt"
set _argv=%_argv% "-mft"    "%~dp0.\.logs\01. version.txt"
set _argv=%_argv% "-mfl"    "%~dp0.\.logs\02. help.txt"
set _argv=%_argv% "-mfj"    "%~dp0..\package.json"
set _argv=%_argv% "-mfm"    "%~dp0..\package.json"

run_app %_argv%

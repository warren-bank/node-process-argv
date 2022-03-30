@echo off

set PATH=%~dp0.\.bin;%PATH%

set stdin_filepath="%~dp0..\package.json"

rem :: ---------------------------------------------------------------
rem :: notes:
rem :: ======
rem :: When the contents from stdin is read by one or more of the following: "--file", "--file-text", "--file-lines", "--file-json", "--file-buffer"
rem :: the readable stream for stdin will be completely drained.
rem ::
rem :: In this example, this will be true of the following: "--file-stream", "--file-stream-many"[0]

set log_filename=%~n0.1.txt

set _argv=
set _argv=%_argv% "--file"             "-"
set _argv=%_argv% "--file-text"        "-"
set _argv=%_argv% "--file-lines"       "-"
set _argv=%_argv% "--file-json"        "-"
set _argv=%_argv% "--file-buffer"      "-"
set _argv=%_argv% "--file-stream"      "-"
set _argv=%_argv% "--file-stream-many" "-"
set _argv=%_argv% "--file-stream-many" "%~dp0..\package.json"
set _argv=%_argv% "--file-stream-many" "%~dp0.\.logs\01. version.txt"
set _argv=%_argv% "--file-stream-many" "%~dp0.\.logs\02. help.txt"

call run_app2 %_argv%

rem :: ---------------------------------------------------------------
rem :: notes:
rem :: ======
rem :: In this example, stdin is not read; the stream for stdin is not drained.

set log_filename=%~n0.2.txt

set _argv=
set _argv=%_argv% "--file-stream"      "-"
set _argv=%_argv% "--file-stream-many" "-"
set _argv=%_argv% "--file-stream-many" "%~dp0..\package.json"
set _argv=%_argv% "--file-stream-many" "%~dp0.\.logs\01. version.txt"
set _argv=%_argv% "--file-stream-many" "%~dp0.\.logs\02. help.txt"

call run_app2 %_argv%

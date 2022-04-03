@echo off

set PATH=%~dp0.\.bin;%PATH%

rem :: ---------------------------------------------------------------
rem :: test #15-1:
rem :: ===========
rem :: When the contents from stdin is read by one or more of the following: "--file", "--file-text", "--file-lines", "--file-json", "--file-buffer"
rem :: the readable stream for stdin will be completely drained.
rem ::
rem :: In this example, this will be true of the following: "--file-stream", "--file-stream-many"[0]

set _argv1=
set _argv1=%_argv1% "--file"             "-"
set _argv1=%_argv1% "--file-text"        "-"
set _argv1=%_argv1% "--file-lines"       "-"
set _argv1=%_argv1% "--file-json"        "-"
set _argv1=%_argv1% "--file-buffer"      "-"
set _argv1=%_argv1% "--file-stream"      "-"
set _argv1=%_argv1% "--file-stream-many" "-"
set _argv1=%_argv1% "--file-stream-many" "%~dp0..\package.json"
set _argv1=%_argv1% "--file-stream-many" "%~dp0.\.logs\01. version.txt"
set _argv1=%_argv1% "--file-stream-many" "%~dp0.\.logs\02. help.txt"

rem :: ---------------------------------------------------------------
rem :: test #15-2:
rem :: ===========
rem :: In this example, stdin is not read; the stream for stdin is not drained.

set _argv2=
set _argv2=%_argv2% "--file-stream"      "-"
set _argv2=%_argv2% "--file-stream-many" "-"
set _argv2=%_argv2% "--file-stream-many" "%~dp0..\package.json"
set _argv2=%_argv2% "--file-stream-many" "%~dp0.\.logs\01. version.txt"
set _argv2=%_argv2% "--file-stream-many" "%~dp0.\.logs\02. help.txt"

rem :: ---------------------------------------------------------------
rem :: test #15-3:
rem :: ===========
rem :: In this example, stdin is read; the stream for stdin is completely drained.
rem :: No streams (including stdin) are included in argv_vals;
rem :: the test app won't wait for any 'readable' events.

set _argv3=
set _argv3=%_argv3% "--file"             "-"
set _argv3=%_argv3% "--file-text"        "-"
set _argv3=%_argv3% "--file-lines"       "-"
set _argv3=%_argv3% "--file-json"        "-"
set _argv3=%_argv3% "--file-buffer"      "-"

rem :: ---------------------------------------------------------------
rem :: the stream for stdin is piped from a local file:
rem :: ================================================

set stdin="%~dp0..\package.json"

rem :: ===============
rem :: run test #15-1:
rem :: ===============

set log_filename=%~n0.1-stdin-file.txt
call run_app %_argv1%

rem :: ===============
rem :: run test #15-2:
rem :: ===============

set log_filename=%~n0.2-stdin-file.txt
call run_app %_argv2%

rem :: ===============
rem :: run test #15-3:
rem :: ===============

set log_filename=%~n0.3-stdin-file.txt
call run_app %_argv3%

rem :: ---------------------------------------------------------------
rem :: the stream for stdin is piped from a network url:
rem :: ================================================

set stdin="https://github.com/warren-bank/node-process-argv/raw/master/package.json"

rem :: ===============
rem :: run test #15-1:
rem :: ===============

set log_filename=%~n0.1-stdin-url.txt
call run_app %_argv1%

rem :: ===============
rem :: run test #15-2:
rem :: ===============

set log_filename=%~n0.2-stdin-url.txt
call run_app %_argv2%

rem :: ===============
rem :: run test #15-3:
rem :: ===============

set log_filename=%~n0.3-stdin-url.txt
call run_app %_argv3%

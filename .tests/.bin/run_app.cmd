@echo off

if not defined log_filename (
  cls
  echo name of log file was not stored in environment variable: "log_filename"
  echo.
  pause
  exit /b 0
)

set argv=%*

set logs_dir=%~dp0..\.logs
set logs_file="%logs_dir%\%log_filename%"

if not exist "%logs_dir%" mkdir "%logs_dir%"

set app_file="%~dp0..\.app\app.js"

if not defined stdin goto :no_stdin

rem :: strip enclosing double quotes.. if any
set stdin=%stdin:"=%
rem :: take substring of first 4 chars
set prefix4=%stdin:~0,4%
rem :: wrap in double quotes
set stdin="%stdin%"

if "%prefix4%"=="http" goto :pipe_stdin_url

goto :pipe_stdin_file

:no_stdin
  node %app_file% %argv% >%logs_file% 2>&1
  goto :done

:pipe_stdin_url
  curl --insecure --compressed -L -s %stdin% | node %app_file% %argv% >%logs_file% 2>&1
  goto :done

:pipe_stdin_file
  node %app_file% %argv% <%stdin% >%logs_file% 2>&1
  goto :done

:done

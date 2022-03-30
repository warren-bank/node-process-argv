@echo off

if not defined stdin_filepath (
  cls
  echo filepath for pipe to stdin was not stored in environment variable: "stdin_filepath"
  echo.
  pause
  exit /b 0
)

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

set app_file="%~dp0..\.app\app2.js"

node %app_file% %argv% <%stdin_filepath% >%logs_file% 2>&1

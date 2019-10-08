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

node %app_file% %argv% >%logs_file% 2>&1

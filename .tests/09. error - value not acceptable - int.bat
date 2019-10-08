@echo off

set log_filename=%~n0.txt

set PATH=%~dp0.\.bin;%PATH%

run_app --int "123.45"

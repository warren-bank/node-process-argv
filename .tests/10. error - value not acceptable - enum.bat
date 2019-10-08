@echo off

set log_filename=%~n0.txt

set PATH=%~dp0.\.bin;%PATH%

run_app --enum "Friday I'm in Love"

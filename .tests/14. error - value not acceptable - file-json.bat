@echo off

set log_filename=%~n0.txt

set PATH=%~dp0.\.bin;%PATH%

run_app --file-json "C:\Windows\win.ini"

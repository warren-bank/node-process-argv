@echo off

set log_filename=%~n0.txt

set PATH=%~dp0.\.bin;%PATH%

run_app --file-path-exists "C:\does-not-exist\file.txt"

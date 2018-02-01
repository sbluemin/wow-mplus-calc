@echo off

rem 프로젝트 폴더에 venv 폴더를 만들기 위함
set PIPENV_VENV_IN_PROJECT=1

pipenv install
pipenv shell
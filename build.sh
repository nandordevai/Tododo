#!/bin/bash -ex

source .ve/bin/activate
.ve/bin/pip3 -q install -r requirements.txt

# PEP8
flake8 --exclude=.ve . > tests/reports/pep8-report.txt

# jshint
jshint . --reporter=jslint > tests/reports/jshint-report.txt || true

# unit tests
cd tests/unit
py.test --junitxml=../reports/pytests.xml

# E2E tests
cd ../system
protractor build.js | sed "1,6 d" | sed -e :a -e '$d;N;1ba' -e 'P;D' > ../reports/report.json; echo "]" >> ../reports/report.json
python3 json2junit.py

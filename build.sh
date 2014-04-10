#!/bin/bash -ex

source .ve/bin/activate
.ve/bin/pip3 -q install -r requirements.txt --upgrade

if [ ! -d "tests/reports" ]
then
    mkdir tests/reports
fi

# PEP8
flake8 --exclude=.ve . > tests/reports/pep8-report.txt || true

# jshint
jshint js --reporter=jslint > tests/reports/jshint-report.txt || true

# unit tests
py.test --cov tododo.py --cov-report xml --junitxml=tests/reports/pytests.xml
mv coverage.xml tests/reports

# E2E tests
python3 tododo.py &
cd tests/system
protractor build.js | sed "1,6 d" | sed -e :a -e '$d;N;1ba' -e 'P;D' > ../reports/report.json; echo "]" >> ../reports/report.json
kill %python3
python3 json2junit.py

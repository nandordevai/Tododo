import codecs
import json
from string import Template
import os


def failures_in_feature(feature):
    return len([scenario for scenario in feature['elements'] if scenario_failed(scenario)])


def scenario_failed(scenario):
    try:
        return len([step for step in scenario['steps'] if ('result' in step.keys() and step['result']['status'] != 'passed')]) > 0
    except KeyError:
        return False


def scenario_status(scenario):
    if scenario_failed(scenario):
        return 'failed'
    elif scenario_skipped(scenario):
        return 'skipped'
    else:
        return 'passed'


def scenario_time(scenario):
    try:
        return sum([step['result']['duration'] for step in scenario['steps'] if 'result' in step.keys()]) / 10 ** 9  # nanosecs
    except KeyError:
        return 0


def skipped_scenarios(feature):
    return len([scenario for scenario in feature['elements'] if scenario_skipped(scenario)])


def scenario_skipped(scenario):
    try:
        return len([step for step in scenario['steps'] if 'result' not in step.keys()]) == len(scenario['steps'])
    except KeyError:
        return True


def convert_scenario(scenario):
    # <testcase classname="proscreening.Proscreening" name="Log in to proscreening site" status="passed" time="3.762109">
    return Template('<testcase classname="{classname}" name="${name}" status="${status}" time="${time}"></testcase>').substitute(name=scenario['name'], status=scenario_status(scenario), time=scenario_time(scenario))


def write_report(feature):
    # <testsuite errors="0" failures="0" name="dashboard_projects.Dashboard project widget" skipped="0" tests="3" time="19.551705">
    try:
        scenarios = feature['elements']
    except KeyError:
        return
    failures = failures_in_feature(feature)
    time = sum([scenario_time(scenario) for scenario in scenarios])
    skipped = skipped_scenarios(feature)
    report = codecs.open('../reports/TEST-{name}.xml'.format(name=feature['name']), 'w', 'utf-8')
    report.write('<?xml version="1.0" encoding="UTF-8"?>')
    report.write('<testsuite errors="{errors}" failures="{failures}" name="{name}" skipped="{skipped}" tests="{tests}" time="{time}">'.format(errors=0, failures=failures, name=feature['name'], skipped=skipped, tests=len(scenarios), time=time))
    for scenario in scenarios:
        report.write(convert_scenario(scenario).format(classname=feature['name']))
    report.write('</testsuite>')
    report.close()


report = codecs.open('../reports/report.json', 'r', 'utf-8').read()
try:
    results = json.loads(report)
except:
    print('Error parsing JSON report')
    os._exit(1)
for feature in results:
    write_report(feature)

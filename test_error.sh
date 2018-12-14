#!/bin/bash
if  grep "Failed: [^0]" ./reports/cucumber_report.html; then
    exit 1
fi
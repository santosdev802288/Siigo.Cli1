#!/bin/bash

set -e
run_cmd="dotnet watch run --project Siigo.<%= config.nameCapitalize %>.Api"

exec $run_cmd
#!/bin/bash

benchmarkFile="output/benchmark.report.json"

# Create the new folder if it doesn't exist
specdir="output/specReports"
mkdir -p "$specdir"

# Get the current iteration count
iteration=$(ls -1 "${specdir}" | wc -l)
iteration=$((iteration + 1))

# Check if the file exists
if [ ! -f "$benchmarkFile" ]; then
    # Print an error message and exit the script
	echo "Error: File $benchmarkFile does not exist. Consider running the tests first."
	exit 1
fi

# Move the benchmark.report.json file to the new folder with the next iteration count
mv "$benchmarkFile" "$specdir/benchmark.report.$iteration.json"
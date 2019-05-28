#! /bin/bash

# Get date string
date=$(date "+%m.%d.%y")

# Get the next numeric suffix for todays recent logs
i=0
while [ -e Logs/$date-$i.txt ]
do
	i=$(( $i + 1 ))
done

# Start log file
script ./Logs/$date-$i.txt
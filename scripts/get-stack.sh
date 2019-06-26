#!/bin/bash

if grep --quiet "nodejs-express" $1; then
	echo nodejs-express
elif grep --quiet "java-microprofile" $1; then
    echo java-microprofile
fi

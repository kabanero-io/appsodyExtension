#!/bin/bash

if grep --quiet "template: codewind" $1; then
    rm -rf *
    rm -rf .* 2> /dev/null
    /codewind-workspace/.extensions/appsodyExtension/appsody init $2
fi

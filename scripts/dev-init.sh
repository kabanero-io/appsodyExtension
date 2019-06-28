#!/bin/bash

if grep --quiet "template: codewind" $1; then
    rm -rf *
    rm -rf .git .appsody-config.yaml
    /codewind-workspace/.extensions/appsodyExtension/appsody init $2
fi

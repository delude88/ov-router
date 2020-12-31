#!/bin/sh
VERSION=$(grep -m 1 VERSION libov/Makefile|sed 's/^.*=//g')
MINORVERSION=$(git rev-list --count HEAD)
COMMIT=$(git rev-parse --short HEAD)
COMMITMOD=$(test -z "`git status --porcelain -uno`" || echo "-modified")
FULLVERSION=$VERSION.$MINORVERSION-$COMMIT$COMMITMOD

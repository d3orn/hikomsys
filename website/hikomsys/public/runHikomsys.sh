#/bin/bash

export PATH=$PATH:/usr/bin/pharo-vm-nox

name=$1

cog="pharo-vm-nox"
headless=""	

moose="../../../datagatherer/Hikomsys.image"

smalltalk="runDataGatherer --projectName="$name

$cog #$headless $moose $smalltalk

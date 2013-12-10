export PATH=$PATH:/usr/bin/pharo-vm-nox

data=${1:6}
pwd=`pwd`
platform='unknown'
name=$1

if [[ "$OSTYPE" == 'darvin11' ]]; then
   cog="./../Pharo.app/Contents/MacOS/Pharo"
   headless="-headless"
elif [[ "$OSTYPE" == 'linux-gnu' ]]; then
   cog="pharo-vm-nox"
   headless=""	
fi
moose="Hikomsys.image"

smalltalk="runDataGatherer --projectName="$name

$cog $headless $moose $smalltalk  

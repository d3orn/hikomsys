#/bin/bash

export PATH=$PATH:/usr/bin/pharo-vm-nox

#think about bash injection

TTotal="$(date +%s)"

repository=$1
name=$2

#inFamixFolder="$homeFolder/inFamix"
#inFamixFolder="$homeFolder/inFamix/inFamix.app/Contents/MacOS" 

gitRepo="gitRepos/$name"
echo $gitRepo
echo $repository
#projectFolder="$gitRepos/$name/project"

#Cloning with GIT
tCloning="$(date +%s)"

git clone "$repository" "$gitRepo"
echo "$gitRepos/$name created"

tCloning="$(($(date +%s)-tCloning))"

#Create .mse file with verveineJ
#maybe check if it already exists
tVerveineJ="$(date +%s)"

#maybe the src is not there
./../../../verveinej/verveinej.sh -Xmx3000m $gitRepo
mv output.mse gitRepos/$name/$name.mse

#inFamix -lang java -path $homeFolder/$name-project -mse $homeFolder/$name-project/$name.mse
#cp $homeFolder/$name-project/$name.mse $homeFolder/gitRepos/$name/
echo "MSE File $name.mse created"

tVerveineJ="$(($(date +%s)-tVerveineJ))"

#echo "mongodb entries created"

tPharo="$(($(date +%s)-tPharo))"

TTotal="$(($(date +%s)-TTotal))"
printf "Pretty format time cloning: %02d:%02d:%02d:%02d\n" "$((tCloning/86400))" "$((tCloning/3600%24))" "$((tCloning/60%60))" "$((tCloning%60))"
printf "Pretty format time VerveineJ: %02d:%02d:%02d:%02d\n" "$((tVerveineJ/86400))" "$((tVerveineJ/3600%24))" "$((tVerveineJ/60%60))" "$((tVerveineJ%60))"
printf "Pretty format time pharo: %02d:%02d:%02d:%02d\n" "$((tPharo/86400))" "$((tPharo/3600%24))" "$((tPharo/60%60))" "$((tPharo%60))"
printf "Pretty format time total: %02d:%02d:%02d:%02d\n" "$((TTotal/86400))" "$((TTotal/3600%24))" "$((TTotal/60%60))" "$((TTotal%60))"
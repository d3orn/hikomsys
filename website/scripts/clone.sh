#/bin/bash

#think about bash injection

TTotal="$(date +%s)"

repository=$1
name=$2

homeFolder="$HOME/website"
#homeFolder="$HOME/students-dominique-Hikomsys/Hikomsys"

#inFamixFolder="$homeFolder/inFamix"
#inFamixFolder="$homeFolder/inFamix/inFamix.app/Contents/MacOS" 

gitRepos="gitRepos"
#projectFolder="$gitRepos/$name/project"

#Cloning with GIT
tCloning="$(date +%s)"

cd $homeFolder
git clone "$repository" "$gitRepos/$name"
echo "$gitRepos/$name created"

tCloning="$(($(date +%s)-tCloning))"

#Create .mse file with inFamix
#maybe check if it already exists
tVerveineJ="$(date +%s)"

#maybe the src is not there
./verveinej/verveine.extractor.java/verveinej.sh -Xmx3000m gitRepos/$name
mv output.mse gitRepos/$name/$name.mse

#inFamix -lang java -path $homeFolder/$name-project -mse $homeFolder/$name-project/$name.mse
#cp $homeFolder/$name-project/$name.mse $homeFolder/gitRepos/$name/
echo "MSE File $name.mse created"

tVerveineJ="$(($(date +%s)-tVerveineJ))"

#Run hikomsys.image and create DB entries for the project
tPharo="$(date +%s)"

echo "i am here! $PWD"
./scripts/runHikomsys.sh $name
echo "mongodb entries created"

tPharo="$(($(date +%s)-tPharo))"

TTotal="$(($(date +%s)-TTotal))"
printf "Pretty format time cloning: %02d:%02d:%02d:%02d\n" "$((tCloning/86400))" "$((tCloning/3600%24))" "$((tCloning/60%60))" "$((tCloning%60))"
printf "Pretty format time VerveineJ: %02d:%02d:%02d:%02d\n" "$((tVerveineJ/86400))" "$((tVerveineJ/3600%24))" "$((tVerveineJ/60%60))" "$((tVerveineJ%60))"
printf "Pretty format time pharo: %02d:%02d:%02d:%02d\n" "$((tPharo/86400))" "$((tPharo/3600%24))" "$((tPharo/60%60))" "$((tPharo%60))"
printf "Pretty format time total: %02d:%02d:%02d:%02d\n" "$((TTotal/86400))" "$((TTotal/3600%24))" "$((TTotal/60%60))" "$((TTotal%60))"



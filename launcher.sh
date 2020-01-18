#!/usr/bin/env bash

# Repertoire ou se situe le script (dans le dossier global)
repertory=$(dirname $(realpath -s $0))

echo -e "\033[1;31mInstallation/vérification des modules\033[0m"


# Parcourt des silos et vérifications des modules
for silo in $(ls $repertory)
do
    # Declaration des chemins
    chemin_playlist=${repertory}/${silo}/api_video
    chemin=${repertory}/${silo}
    
    if [ -d ${silo} ] && [[ ${silo} =~ "silo_" ]]
    then
        echo -e "\e[32mDans le silo ${silo}\e[0m"
        if [[ ${silo} == "silo_playlist" ]]
        then
            cd $chemin_playlist
            npm install 
        else
            cd $chemin
            npm install 
        fi
        cd ${repertory}
    fi
done


echo -e "\033[1;31mLANCEMENT DES APPS\033[0m"

# Parcourt des silos et lancement des apps
for silo in $(ls $repertory)
do
    # Declaration des chemins
    chemin_playlist=${repertory}/${silo}/api_video
    chemin=${repertory}/${silo}
    
    if [ -d ${silo} ] && [[ ${silo} =~ "silo_" ]]
    then
        
        if [[ ${silo} == "silo_playlist" ]]
        then
            cd $chemin_playlist
            nodemon start & 
        else
            cd $chemin
            nodemon start & 
        fi
        cd ${repertory}
    fi
done
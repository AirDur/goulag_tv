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
            npm install --save
        else
            cd $chemin
            npm install --save
        fi
        cd ${repertory}
    fi
done

cd ${repertory}/pilote
npm install --save


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
            WID=`xdotool search --title "Mozilla Firefox" | head -1`
            xdotool windowfocus $WID
            xdotool key ctrl+T
            cd $chemin_playlist
            nodemon start & 
        elif [ ${silo} == "silo_utilisateur" ]
        then 
            WID=`xdotool search --title "Mozilla Firefox" | head -1`
            xdotool windowfocus $WID
            xdotool key ctrl+T
            cd $chemin
            cd keys
            openssl ecparam -genkey -name prime256v1 -noout -out jwt_priv.pem
            openssl ec -in jwt_priv.pem -pubout -out jwt_pub.pem
            npm run start & 
        else
            WID=`xdotool search --title "Mozilla Firefox" | head -1`
            xdotool windowfocus $WID
            xdotool key ctrl+T

            cd $chemin
            nodemon start & 
        fi
        cd ${repertory}
    fi

done
WID=`xdotool search --title "Mozilla Firefox" | head -1`
xdotool windowfocus $WID
#Lancement Frontend et pilote 
xdotool key ctrl+T
# get focus on active terminal tab

cd ${repertory}/front_end
npm start &
const express = require('express');
var fs = require('fs');
const router = express.Router();

var azure = require('azure-storage');
const youtubedl = require('youtube-dl');
const CONNECT_STR = process.env.CONNECT_STR;
const CONTAINER_NAME = "ourcontainerb0cde5e0-20b3-11ea-88c6-854bdc9fed6d";
const blobService = azure.createBlobService(CONNECT_STR);
const link_storage = "https://ourvideosstorage.blob.core.windows.net/ourcontainerb0cde5e0-20b3-11ea-88c6-854bdc9fed6d/"

/* function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function check_if_exist(){
    console.log("checking if exist...")

    service=azure.createBlobService(CONNECT_STR);
    for(i=0;i<15;i++){
        service.doesBlobExist(CONTAINER_NAME,"tema.mp4",(error, response, errorOrResult)=>{
            console.log("Bah jreflechis...")
            if(!error){
                if(response.exists == true){
                    console.log(response.name+" : exist");
                }
                else{
                    console.log(response.name+" : no exist");
                }
            }
        });
        await sleep(10000);   
    }
} */

function main(link,name) {
    console.log('Uploading a video');
    // Quick start code goes here
    
    const video = youtubedl(link,
        ['--format=18'],
        { cwd: __dirname });

    // Will be called when the download starts.
    video.on('info', function(info) {
        console.log('Download started')
        console.log('filename: ' + info._filename)
        console.log('size: ' + info.size)
        });

        

    var write_stream = blobService.createWriteStreamToBlockBlob(CONTAINER_NAME,
        name,
        { blockIdPrefix: 'block', },
        (error, result, response) => {
            if (!error) {
              // file uploaded
              console.log("video uploaded !");
            }
            if(error){
                console.log("Write stream error");
            }
        });

    video.on('error', function error(err) {
        console.log('Erreur upload video retrying...')
        write_stream.end()
        main()
    });

    write_stream.on('error', function error(err) {
        //console.log('error write stream')
    });
    
    video.pipe(write_stream);
}

router.post('/upload', (req, res, next) =>{

    const link = req.body.lien;
    const name = req.body.nom+".mp4";
    main(link,name);

    /* check_if_exist(); */

    res.status(200).json({
        message : "upload fetched"
    });
});

router.post('/checkexist', (req, res, next) =>{

    const name = req.body.id_v+".mp4";
    var res_link = "";
    var res_message = "";

    blobService.doesBlobExist(CONTAINER_NAME, name, (error, response, errorOrResult)=>{
        if(!error){
            if(response.exists == true){
                console.log(response.name+" : exist");
                res_message = "Video found";
                res_link=link_storage+name;
            }
            else{
                console.log(response.name+" : no exist");
                res_message = "Video not found";
                res_link="Null";
            }
            res.status(200).json({
                message : res_message,
                link : res_link
            });
        }
    });

    /* check_if_exist(); */
});

module.exports = router;

/*

CONTAINER NAME
ourcontainerb0cde5e0-20b3-11ea-88c6-854bdc9fed6d

*/
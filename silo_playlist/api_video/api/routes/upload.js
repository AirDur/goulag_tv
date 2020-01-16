const express = require('express');
var fs = require('fs');
const router = express.Router();

var azure = require('azure-storage');
const youtubedl = require('youtube-dl');
const CONNECT_STR = process.env.CONNECT_STR;
const CONTAINER_NAME = "ourcontainerb0cde5e0-20b3-11ea-88c6-854bdc9fed6d";

function sleep(ms) {
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
}

function main() {
    console.log('Uploading a video');
    // Quick start code goes here
    
    var blobService = azure.createBlobService(CONNECT_STR);
    const video = youtubedl('https://www.youtube.com/watch?v=ZvRnLhmiv0U',
        ['--format=18'],
        { cwd: __dirname });

    // Will be called when the download starts.
    video.on('info', function(info) {
        console.log('Download started')
        console.log('filename: ' + info._filename)
        console.log('size: ' + info.size)
        });

        

    var write_stream = blobService.createWriteStreamToBlockBlob(CONTAINER_NAME,
        "tema.mp4",
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

router.get('/', (req, res, next) =>{

    main()

    check_if_exist();

    res.status(200).json({
        message : "upload fetched"
    });
});

module.exports = router;

/*

CONTAINER NAME
ourcontainerb0cde5e0-20b3-11ea-88c6-854bdc9fed6d

*/
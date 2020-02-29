const express = require('express');
var fs = require('fs');
const router = express.Router();

var azure = require('azure-storage');
const youtubedl = require('youtube-dl');
const CONNECT_STR = process.env.CONNECT_STR;
const CONTAINER_NAME = "ourcontainerb0cde5e0-20b3-11ea-88c6-854bdc9fed6d";
const blobService = azure.createBlobService(CONNECT_STR);
const link_storage = "https://ourvideosstorage.blob.core.windows.net/ourcontainerb0cde5e0-20b3-11ea-88c6-854bdc9fed6d/"


function uploadVideo(link,name) {
    console.log('Uploading a video');
    console.log("link : "+link+"\nname : "+name);

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
        console.log('Erreur during download : '+err);
        write_stream.end()
        uploadVideo(link,name)
    });

    write_stream.on('error', function error(err) {
        //console.log('error write stream')
    });
    
    video.pipe(write_stream);
}

router.post('/upload', (req, res, next) =>{

    console.log("body : "+ JSON.stringify(req.body));
    const link = req.body.lien;
    const name = req.body.nom+".mp4";

    blobService.doesBlobExist(CONTAINER_NAME, name, (error, response, errorOrResult)=>{
        if(!error){
            if(response.exists == true){
                console.log(response.name+" : Already exist");
                res_message = response.name+" : Already exist";
            }
            else{
                console.log(response.name+" : Doesnt exist Uploading ...");
                res_message = response.name+" : Doesnt exist Uploading ...";
                uploadVideo(link,name);
            }
            res.status(200).json({
                message : res_message
            });
        }
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

});

module.exports = router;

/*

CONTAINER NAME
ourcontainerb0cde5e0-20b3-11ea-88c6-854bdc9fed6d

*/
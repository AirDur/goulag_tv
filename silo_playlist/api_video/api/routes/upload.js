const express = require('express');
var fs = require('fs');
const router = express.Router();

var azure = require('azure-storage');
const youtubedl = require('youtube-dl');
const CONNECT_STR = process.env.CONNECT_STR;
const CONTAINER_NAME = "ourcontainerb0cde5e0-20b3-11ea-88c6-854bdc9fed6d";


async function main() {
    console.log('Azure Blob storage v2 - JavaScript quickstart sample');
    // Quick start code goes here

    var blobService = azure.createBlobService(CONNECT_STR);

    const video = youtubedl('http://www.youtube.com/watch?v=90AiXO1pAiA',
        ['--format=18'],
        { cwd: __dirname });

    // Will be called when the download starts.
    video.on('info', function(info) {
        console.log('Download started')
        console.log('filename: ' + info._filename)
        console.log('size: ' + info.size)
        });

        
    var write_stream = blobService.createWriteStreamToBlockBlob(CONTAINER_NAME,
        "essai_video_4.mp4",
        { blockIdPrefix: 'block' },
        (error, result, response) => {
            if (!error) {
              // file uploaded
              console.log("video uploaded !");
            }
        });

    video.pipe(write_stream);
}

router.get('/', (req, res, next) =>{

    main().then(() => console.log('Done')).catch((ex) => console.log(ex.message));

    res.status(200).json({
        message : "upload fetched"
    });
});

module.exports = router;

/*

CONTAINER NAME
ourcontainerb0cde5e0-20b3-11ea-88c6-854bdc9fed6d

*/
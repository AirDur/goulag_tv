const express = require('express');
var fs = require('fs');
const router = express.Router();

const { BlobServiceClient } = require('@azure/storage-blob');
const uuidv1 = require('uuid/v1');
const CONNECT_STR = process.env.CONNECT_STR;


async function main() {
    console.log('Azure Blob storage v12 - JavaScript quickstart sample');
    // Quick start code goes here

    // Create the BlobServiceClient object which will be used to create a container client
    const blobServiceClient = await BlobServiceClient.fromConnectionString(CONNECT_STR);

    // Create a unique name for the container
    const containerName = "ourcontainerb0cde5e0-20b3-11ea-88c6-854bdc9fed6d";

    // Get a reference to a container
    const containerClient = await blobServiceClient.getContainerClient(containerName);
    console.log("Got the container");
    // Create the container
    //const createContainerResponse = await containerClient.create();
    //console.log("Container was created successfully. requestId: ", createContainerResponse.requestId);

    // Create a unique name for the blob
    const blobName = 'video' + uuidv1() + '.mp4';

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    
    console.log('\nUploading to Azure storage as blob:\n\t', blobName);

    // Upload data to the blob
    //const data = 'Hello, World!';
    //const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
    const uploadBlobResponse = await blockBlobClient.uploadFile("/home/bertrandcanta/Documents/5A/gouvernance/goulag_tv/silo_playlist/api_video/videos/myvideo.mp4");
    console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);
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
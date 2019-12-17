const express = require('express');
const router = express.Router();
const fs = require('fs')
const youtubedl = require('youtube-dl')

router.get('/', (req, res, next) =>{
    const video = youtubedl('http://www.youtube.com/watch?v=90AiXO1pAiA',
      // Optional arguments passed to youtube-dl.
      ['--format=18'],
      // Additional options can be given for calling `child_process.execFile()`.
      { cwd: __dirname });
     
    console.log("direname = "+__dirname);

    // Will be called when the download starts.
    video.on('info', function(info) {
      console.log('Download started')
      console.log('filename: ' + info._filename)
      console.log('size: ' + info.size)
    })

    console.log("video cwd = "+video.arg);
    video.pipe(fs.createWriteStream(__dirname+'/../../videos/myvideo.mp4'))


    res.status(200).json({
        message : "download fetched"
    });
});

/*router.get('/arxiv/:entree', function (req, res) {
    console.log("je cherche " + req.params.entree);
});*/

module.exports = router;
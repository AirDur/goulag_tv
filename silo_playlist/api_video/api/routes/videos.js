const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Video = require("../models/video").VideoModel;
const Playlist = require("../models/video").PlaylistModel;

// router.get("/download", (req, res, next) => {
//   // const video = new Video({
//   //   _id: new mongoose.Types.ObjectId(),
//   //   title: req.body.title,
//   //   link: req.body.link
//   // });

//   const fs = require('fs')
//   const youtubedl = require('youtube-dl')
//   //const video = youtubedl(link)
//   const video = youtubedl('http://www.youtube.com/watch?v=90AiXO1pAiA',
//     // Optional arguments passed to youtube-dl.
//     ['--format=18'],
//     // Additional options can be given for calling `child_process.execFile()`.
//     { cwd: __dirname })
//     console.log(__dirname)
//   // Will be called when the download starts.
//   video.on('info', function(info) {
//     console.log('Download started')
//     console.log('filename: ' + info._filename)
//     console.log('size: ' + info.size)
//   })
 
//   video.pipe(fs.createWriteStream(__dirname+'/../../historiqueVideo/myvideo.mp4'))
// });




router.get("/", (req, res, next) => {
  Video.find()
    .exec()
    .then(docs => {
      console.log(docs);
         if (docs.length >= 0) {
            res.status(200).json(docs);
         } else {
             res.status(404).json({
                 message: 'No entries found'
             });
         }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  console.log("Je suis bien dans le post hihi");
  const video = new Video({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    link: req.body.link,
    date: req.body.date
  });
  console.log(req.body.title);
  console.log(req.body.link);
  video
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /videos",
        createdVideo: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  console.log("pas post");
});

router.get("/:videoId", (req, res, next) => {
  const id = req.params.videoId;
  Video.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:videoId", (req, res, next) => {
  const id = req.params.videoId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Video.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:videoId", (req, res, next) => {
  const id = req.params.videoId;
  Video.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});



module.exports = router;

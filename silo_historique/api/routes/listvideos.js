const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const ListVideo = require("../models/video").ListVideoModel;
const Video = require("../models/video").VideoModel;

router.get("/", (req, res, next) => {
    ListVideo.find()
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
    const historique = new ListVideo({
      _id: new mongoose.Types.ObjectId(),
      user_id: req.body.user_id,
      historique: []
    });
    historique
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
  
  router.get("/:listVideoId", (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.params.listVideoId);
    ListVideo.findById(id)
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
  
  router.patch("/:listVideoId", (req, res, next) => {
    const id = req.params.listVideoId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    ListVideo.update({ _id: id }, { $set: updateOps })
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
  
  router.delete("/:listVideoId", (req, res, next) => {
    const id = req.params.listVideoId;
    ListVideo.remove({ _id: id })
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
  
  
  router.post("/:listVideoId", (req, res, next) => {
    var video = new Video({"_id": req.body.id_video, "title": req.body.title, "link":req.body.link, "date":req.body.date});
    ListVideo.findByIdAndUpdate(req.params.listVideoId, {$push: {listVideo: video}})
    .then(result => {
      res.status(200).json(result)
    })
    .catch(function(error){
      console.log(error)
    });
  }); 
  

  

  module.exports = router;
  
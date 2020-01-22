const mongoose = require('mongoose');

const Video = require("../models/video").VideoModel;

const playlistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId,
    playlist: [Video]
});

module.exports.PlaylistModel = mongoose.model('Playlist', playlistSchema);

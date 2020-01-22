const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    link: String,
    date: Date,
});

const playlistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId,
    name: String,
    playlist: [videoSchema]
});

module.exports.PlaylistModel = mongoose.model('Playlist', playlistSchema);

module.exports.VideoModel = mongoose.model('Video', videoSchema);

// historique = new this.PlaylistModel({
//     user_id: blabla,
//     listVideo: []
// })

// historique.listVideo.push(new this.VideoModel())

// historique.save()
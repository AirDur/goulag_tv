const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    link: String,
    date: Date,
});


module.exports.VideoModel = mongoose.model('Video', videoSchema);

// historique = new this.PlaylistModel({
//     user_id: blabla,
//     listVideo: []
// })

// historique.listVideo.push(new this.VideoModel())

// historique.save()
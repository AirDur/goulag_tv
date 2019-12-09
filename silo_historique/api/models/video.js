const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    link: String,
    date: Date
});

const listVideoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId,
    listVideo: [videoSchema]
});

module.exports.VideoModel = mongoose.model('Video', videoSchema);
module.exports.ListVideoModel = mongoose.model('ListVideo', listVideoSchema);

// historique = new this.ListVideoModel({
//     user_id: blabla,
//     listVideo: []
// })

// historique.listVideo.push(new this.VideoModel())

// historique.save()
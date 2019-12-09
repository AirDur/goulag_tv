const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String
});

module.exports = mongoose.model('Video', videoSchema);
const mongoose = require('mongoose').set('debug', true);

const streamsDataSchema  = new mongoose.Schema({
    title: String,
    description: String,
    image: { url: String, width: Number, height: Number },
    username: String,
    streamerPic: String,
    userId: String
},  { collection: 'Streams'});
module.exports = mongoose.model('Streams', streamsDataSchema); 



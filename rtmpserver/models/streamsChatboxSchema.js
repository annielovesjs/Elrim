const mongoose = require('mongoose').set('debug', true);

const streamsChatboxSchema = new mongoose.Schema({
    streamID: String,
    messages: [{
        username: String,
        streamerPic: String,
        timestamp: String, 
        message: String
    }]
}, {collections: 'Chatboxes'});

const chatboxes = mongoose.model('Chatboxes', streamsChatboxSchema);

export default chatboxes;


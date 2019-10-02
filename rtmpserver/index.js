const NodeMediaServer = require('node-media-server');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const http = require('http').Server(app);

const server = http.listen(3001, () => {
  console.log('server is running on port', server.address().port);
 });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     next();
});


const dbUrl = 'mongodb://annieisshort:sanniebb5@ds229088.mlab.com:29088/elrim'

const streamsDataSchema  = new mongoose.Schema({
  title: String,
  description: String,
  image: { url: String, width: Number, height: Number },
  username: String,
  streamerPic: String,
  userId: String,
  id: Number
},  { collection: 'Streams'})
const streams = mongoose.model('Streams', streamsDataSchema); 

mongoose.connect(dbUrl, {useUnifiedTopology: true, useNewUrlParser: true} , (err) => {
  console.log('cannot connect', err);
})


app.get('/streams', (req, res) => {
  console.log('this piece ran')
  streams.find({}, (err, stream)  => {
    console.log(stream);
    res.send(stream);
  })
})

app.get('/streams/:id', (req, res) => {
  console.log('fetch stream first');
  const {id} = req.params;
  streams.find({id: id}, (err, stream)  => {
    console.log(stream);
    res.send(stream);
  })
})

app.post('/streams/new', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const stream = new streams(req.body);
  console.log(stream);
  stream.save((err) => {
    if(err) {
      sendStatus(500);
    }
    res.sendStatus(200);
  })
})

app.put('/streams/edit/:id', (req, res) => {
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  streams.findOneAndUpdate({id: req.params.id}, req.body, {returnNewDocument: true, useFindAndModify: false}, (error, result) => {
    console.log(result);
    res.send(result)
  });
})

const config = {
    rtmp: {
      port: 1935,
      chunk_size: 60000,
      gop_cache: true,
      ping: 30,
      ping_timeout: 60
    },
    http: {
      port: 8000,
      allow_origin: '*'
    }
  };
  
  const nms = new NodeMediaServer(config)
  nms.run();
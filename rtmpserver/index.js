//todo -> convert require to imports 
const NodeMediaServer = require('node-media-server');
const express = require('express');
const mongoose = require('mongoose').set('debug', true);
const path = require('path')
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;

const app = express();
const http = require('http').Server(app);

const server = http.listen(3001, () => {
  console.log('server is running on port', server.address().port);
 });

import streams from './models/streamsDataSchema';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     next();
});


const dbUrl = 'mongodb://annieisshort:sanniebb5@ds229088.mlab.com:29088/elrim';

mongoose.connect(dbUrl, {useUnifiedTopology: true, useNewUrlParser: true} , (err) => {
  console.log('cannot connect', err);
})

app.get('/streams', (req, res) => {
  streams.find({}, (err, stream)  => {
    res.send(stream);
  })
})

app.get('/streams/show/:id', (req, res) => {
  const { id } = req.params;
  streams.find({"_id": new ObjectID(id)}, (stream, err)  => {
    res.send(err);
  })
})

app.post('/streams/new', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const stream = new streams(req.body);
  stream.save((err) => {
    if(err) {
      sendStatus(500);
    }
    res.send(req.body);
  })
})

app.put('/streams/edit/:id', (req, res) => {
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  streams.findOneAndUpdate({id: req.params._id}, req.body, {returnNewDocument: true, useFindAndModify: false}, (error, result) => {
    res.send(result)
  });
})

app.delete('/streams/delete/:id', (req, res) => {
  const { id } = req.params;
  streams.deleteOne({"_id": new ObjectID(id)}, (err, result) => {
    if(err) {
      console.log(err);
    }
    res.send(result);
    // res.redirect('/')
  })
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
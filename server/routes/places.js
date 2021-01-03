var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authenticate = require('../authenticate');
var cors =  require('./cors');
var multer = require('multer');
var Places = require('../models/places');
var fs = require('fs');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },

  filename:(req, file, cb) =>{
    cb(null, file.originalname)
  }
});

var imageFileFilter = (req, file, cb) => {
  if(!file.originalname.match(/\.(jpg||jpeg||png||gif)$/)){
    return  cb(new Error('You can upload only images files!'),  false);

  }
  cb(null, true);
};

var  upload= multer({storage: storage, fileFilter: imageFileFilter});

var placesRouter = express.Router();

placesRouter.use(bodyParser.json());

placesRouter.route('/')
.options( cors.cors,  (req, res) => {res.sendStatus(200);})
.get(cors.cors, (req, res, next) =>{
  Places.find({})
  .populate('author')
  .then((places) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(places);

  }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) =>{
  Places.findById(req.body._id)
  .then((place) => {
    console.log(place.likeCount);
    if(req.body.action  === "like")
        place.likeCount += 1;
    else if(req.body.action ===  "dislike")
          place.likeCount -= 1;
    place.save()
    .then((place)  =>{
      Places.findById(place._id)
      .populate('author')
      .then((place)=>  {
        res.statusCode = 200;
        res.setHeader('Content-Type',  'application/json');
        res.json(place);
      })
    })

  },(err) =>  next(err))
  .catch((err) => next(err));

  })


.post(cors.corsWithOptions, authenticate.verifyUser, upload.single('image'), (req, res, next) => {
  let place = new Places({name: req.body.name, description: req.body.description, image: '/images/' + req.file.filename, author: req.user._id});
  Places.create(place)

  .then((place) =>{
    Places.findById(place._id)
    .populate('author')
    .then((place) =>  {
    res.statusCode  = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(place);
  })

}, (err) => next(err))
  .catch((err)  =>  next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Places.remove({})
    .then((resp) => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(resp);
   }, (err) => next(err))
   .catch((err) => next(err));

});



module.exports  = placesRouter;

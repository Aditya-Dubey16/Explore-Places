const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');
const Likes = require('../models/like');

const likeRouter = express.Router();

likeRouter.use(bodyParser.json());

likeRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Likes.find({})
        .populate('user')
        .populate('places')
        .then((likes) => {

            if (likes) {
                user_likes = likes.filter(like=> like.user._id.toString() === req.user.id.toString())[0];
                if(!user_likes) {
                    var err = new Error('You have no like Posts!');
                    err.status = 404;
                    return next(err);
                }
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(user_likes);
            } else {
                var err = new Error('There are no Posts');
                err.status = 404;
                return next(err);
            }

        }, (err) => next(err))
        .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser,
    (req, res, next) => {
      Likes.findOne({ user: req.user._id }, (err, like) => {
      if (err) return next(err);

      if (!like) {
          Likes.create({ user: req.user._id })
          .then((like) => {
              like.places.push({ "_id": req.body._id });
              like.save()
              .then((like) => {
                  console.log('Likes created!');
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(like.places);
              })
              .catch((err) => {
                  return next(err);
              });
          })
          .catch((err) => {
              return next(err);
          })
      }
      else {
          if (like.places.indexOf(req.body._id) < 0) {
              like.places.push({ "_id": req.body._id });
              like.save()
              .then((like) => {
                  console.log('Likes Added!');
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(like.places);
              })
              .catch((err) => {
                  return next(err);
              })
          }
          else {
              res.statusCode = 403;
              res.setHeader('Content-Type', 'text/plain');
              res.end('Likes ' + req.body._id + ' already in list of Likes!');
          }
      }
  });
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation is not supported on Likes');
})
.delete(cors.cors, authenticate.verifyUser, (req, res, next) => {



  Likes.findOne({ user: req.user._id }, (err, like) => {
          if (err) return next(err);

          console.log(like);
          var index = like.places.indexOf(req.body._id);
          console.log(req.body);
          if ( index >= 0) {
              like.places.splice(index,1);
              like.save()
              .then((like) => {
                  console.log('Places Deleted!', like);
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(like.places);
              })
              .catch((err) => {
                  return next(err);
              })
          }
          else {
              res.statusCode = 404;
              res.setHeader('Content-Type', 'text/plain');
              res.end('Places ' + req.body._id + ' not in your likes!');
          }
      });

});




module.exports = likeRouter;

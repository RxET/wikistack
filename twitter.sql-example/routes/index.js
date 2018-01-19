'use strict';
var express = require('express');
var router = express.Router();
const client = require('../db');
const User = require('../db').model('user');
const Tweet = require('../db').model('tweet');

module.exports = function makeRouterWithSockets (io) {

  //const baseQuery = 'SELECT * FROM users INNER JOIN tweets ON users.id = tweets.user_id';

  // a reusable function
  function respondWithAllTweets (req, res, next){

    function takeErrAndCallWithNext(err) {
      next(err)
    }

    Tweet.findAll({
      include: [User]
    })
    .then(function(tweets) {
      console.log(tweets[0].user)
      res.render('index', {
        title: 'Twitter.js',
        tweets: tweets,
        showForm: true
      });
    })
    .catch(next)

  }

  // here we basically treet the root view and tweets view as identical
  router.get('/', respondWithAllTweets);
  router.get('/tweets', respondWithAllTweets);

  // single-user page
  router.get('/users/:username', function(req, res, next){
    Tweet.findAll({
      include: [{
        model: User,
        where: {
          name: req.params.username
        }
      }]
    })
    .then(function(tweets) {
      res.render('index', {
        title: 'Twitter.js',
        tweets: tweets,
        showForm: true,
        username: req.params.username
      });

    })
    .catch(next)

  });

  // single-tweet page
  router.get('/tweets/:id', function(req, res, next){
    Tweet.findById(req.params.id)
    .then(function(tweet) {
      res.render('index', {
        title: 'Twitter.js',
        tweets: [tweet],
        showForm: true,
        username: req.params.username
      });
    })
  });

  // create a new tweet
  router.post('/tweets', function(req, res, next){
    User.findOrCreate({
      where: {
        name: req.body.name
      }
    })
    .then(function([user]) {
       Tweet.create({
         userId: user.id,
         content: req.body.content
       })
    })
    .then(function(tweet) {
      io.sockets.emit('new_tweet', tweet);
      res.redirect('/');
    })
    .catch(next);
  });


  return router;
}

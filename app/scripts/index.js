var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
<<<<<<< HEAD
Parse.initialize("finalproject");
Parse.serverURL = 'http://wandernomore-server.herokuapp.com/';
=======
>>>>>>> gh-pages

//router stuff
var router = require('./router');


$(function(){
  Backbone.history.start();
});

<<<<<<< HEAD
//
// var Test = Parse.Object.extend('Test');
// var test = new Test();
//
// test.set('name', "Gabe");
// test.set('age', 18);
// test.set('cool', false);
//
//
// test.save(null, {
//   success: function(test){
//     console.log("this test succeded!", test);
//   },
//   error: function(test, error){
//     console.error(error);
//   }
// });
=======

>>>>>>> gh-pages
























// var yelp = new Yelp({
//   consumer_key: 'dl6yJ0IjtSbF2i4VcQAyJg',
//   consumer_secret: 'LyKDEwmpIzq7aCbqChMtvDsh3TE',
//   token: 'PwtCgTe9HjOvXnmtnso-pRr8impN_Qxu',
//   token_secret: 'tXy1U-oNYvwUcfS--JyLNfo_Rg8',
// });

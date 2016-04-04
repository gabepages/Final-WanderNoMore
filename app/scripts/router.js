var $ = require('jquery');
var Backbone = require('bakcbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
Parse.initialize("finalproject");
Parse.serverURL = 'http://wandernomore-server.herokuapp.com/';


var Application = require('./components/Application.jsx');













var Router = Backbone.Router.extend({
  routes:{
    "": "index"
  },
  index: function(){
    this.current = "";
  }
});


module.exports = Router;

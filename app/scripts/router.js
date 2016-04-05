var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
Parse.initialize("finalproject");
Parse.serverURL = 'http://wandernomore-server.herokuapp.com/';

//components
var Index = require('./components/Index.jsx');
var Login = require('./components/login.jsx');
var Signup = require('./components/signup.jsx');



var Router = Backbone.Router.extend({
  routes:{
    "": "index",
    "login": "login",
    "signup": "signup"
  },
  index: function(){
    ReactDOM.render(
      <Index router={this} />,
      $('.container-fluid')[0]
    );
  },
  signup: function(){
    ReactDOM.render(
      <Signup router={this}  parse={Parse}/>,
      $('.container-fluid')[0]
    );
  },
  login: function(){
    ReactDOM.render(
      <Login router={this} parse={Parse} />,
      $('.container-fluid')[0]
    );
  }
});
var router = new Router();

module.exports = router;

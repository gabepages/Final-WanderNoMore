var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');


//components
var Index = require('./components/Index.jsx');
var Login = require('./components/login.jsx');
var Signup = require('./components/signup.jsx');
var App = require('./components/app.jsx');

//models and collection
var FoodCollection = require('./models/foods');


//Router
var Router = Backbone.Router.extend({
  routes:{
    "": "index",
    "login": "login",
    "signup": "signup",
    "app": "app",
    "app/result": "appResult"
  },
  initialize: function(){
    this.appContainer = $('.container-fluid')[0];

    Parse.initialize("finalproject");
    Parse.serverURL = 'http://wandernomore-server.herokuapp.com/';
    this.Parse = Parse;
  },
  index: function(){
    var self = this;
    ReactDOM.unmountComponentAtNode(this.appContainer);
    ReactDOM.render(
      React.createElement(Index, {router: self}),
      this.appContainer
    );
  },
  signup: function(){
    ReactDOM.render(
      React.createElement(Signup, {router:this, parse:this.Parse}),
      this.appContainer
    );
  },
  login: function(){
    ReactDOM.render(
      React.createElement(Login, {router:this, parse:this.Parse}),
      this.appContainer
    );
  },
  app: function(){
    var currentUser = this.Parse.User.current();
    if (currentUser) {
      ReactDOM.render(
        React.createElement(App, {router:this, parse:this.Parse, foodCollection:FoodCollection}),
        this.appContainer
      );
    } else {
      alert("you are not logged in, please do so.");
      this.navigate("",{trigger: true});
        // show the signup or login page
    }

  },
  appResult: function(){
    
  }
});
var router = new Router();

module.exports = router;

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

//components
var Index = require('./components/Index.jsx');
var Login = require('./components/login.jsx');
var Signup = require('./components/signup.jsx');
<<<<<<< HEAD



=======
var CreateProfile = require('./components/create-profile.jsx');
var App = require('./components/app.jsx');

//models and collection
var FoodCollection = require('./models/foods');


//Router
>>>>>>> gh-pages
var Router = Backbone.Router.extend({
  routes:{
    "": "index",
    "login": "login",
<<<<<<< HEAD
    "signup": "signup"
  },
  index: function(){
    ReactDOM.render(
      <Index router={this} />,
      $('.container-fluid')[0]
=======
    "signup": "signup",
    "app": "app"
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
>>>>>>> gh-pages
    );
  },
  signup: function(){
    ReactDOM.render(
<<<<<<< HEAD
      <Signup router={this}  parse={Parse}/>,
      $('.container-fluid')[0]
=======
      React.createElement(Signup, {router:this, parse:this.Parse}),
      this.appContainer
>>>>>>> gh-pages
    );
  },
  login: function(){
    ReactDOM.render(
<<<<<<< HEAD
      <Login router={this} parse={Parse} />,
      $('.container-fluid')[0]
=======
      React.createElement(Login, {router:this, parse:this.Parse}),
      this.appContainer
    );
  },
  app: function(){
    ReactDOM.render(
      React.createElement(App, {router:this, parse:this.Parse, foodCollection:FoodCollection}),
      this.appContainer
>>>>>>> gh-pages
    );
  }
});
var router = new Router();

module.exports = router;

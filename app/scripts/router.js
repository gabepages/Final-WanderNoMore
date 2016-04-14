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
var Result = require('./components/result.jsx');
var Settings = require('./components/settings.jsx');
var WanderedTo = require('./components/wandered-to.jsx');

//models and collection
var FoodCollection = require('./models/food');
var ClubCollection = require('./models/clubs');
var BarCollection = require('./models/bars');
var OutdoorsCollection = require('./models/outdoors');

//Router
var Router = Backbone.Router.extend({
  routes:{
    "": "index",
    "login": "login",
    "signup": "signup",
    "app": "app",
    "app/result": "appResult",
    "app/settings": "settings",
    "app/wanderedTo": "wanderedTo"
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
        React.createElement(App, {
                                  router:this,
                                  parse:this.Parse,
                                  foodCollection: FoodCollection,
                                  outdoorsCollection: OutdoorsCollection,
                                  barCollection:BarCollection,
                                  clubColletion: ClubCollection
                                }),
        this.appContainer
      );
    } else {
      alert("you are not logged in, please do so.");
      this.navigate("",{trigger: true});
        // show the signup or login page
    }

  },
  appResult: function(){
    ReactDOM.render(
      React.createElement(Result, {router:this, parse:this.Parse}),
      this.appContainer
    );
  },
  settings: function(){
    ReactDOM.render(
      React.createElement(Settings, {router:this, parse:this.Parse}),
      this.appContainer
    );
  },
  wanderedTo: function(){
    ReactDOM.render(
      React.createElement(WanderedTo, {router:this, parse:this.Parse}),
      this.appContainer
    );
  }

});
var router = new Router();

module.exports = router;

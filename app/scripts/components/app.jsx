var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');


var App = React.createClass({
  getInitialState: function(){
    return{
      "screen": "home",
      "radius": null,
    }
  },
  toggleNav: function(e){
    e.preventDefault();
    $('.nav').slideToggle(500);
  },
  sendHome: function(){
    this.handleScreenChange("home");
  },
  handleScreenChange: function(screen){
    this.setState({"screen": screen});
  },
  setRadius: function (radius){
    this.setState({"radius": radius});
  },
  signOut: function(e){
    e.preventDefault();
    console.log(this.props.parse);
    this.props.parse.User.logOut().then(function(){
      Backbone.history.navigate('', {trigger: true});
    });
  },
  render: function(){
    var screenState;
    if(this.state.screen == "home"){
      screenState = <AppHome changeScreen={this.handleScreenChange}/>;
    }else if (this.state.screen == "radius") {
      screenState = <AppRadiusSelect changeScreen={this.handleScreenChange} setRadius={this.setRadius}/>;
    }else if(this.state.screen == "activitySelect"){
      screenState = <AppActivitySelect
                        changeScreen={this.handleScreenChange}
                        radius={this.state.radius}
                        collection={this.props.collection}
                      />;
    }else if (this.state.screen == "foodSelect"){
      screenState = <AppFoodSelect
                      changeScreen={this.handleScreenChange}
                      radius={this.state.radius}
                      collection={this.props.collection}
                    />;
    }else if(this.state.screen == "bars/clubs"){
      screenState = <AppNighlifeSelect
                      changeScreen={this.handleScreenChange}
                      radius={this.state.radius}
                      barCollection={this.props.barCollection}
                      clubCollection = {this.props.clubColletion}
                    />;
    }

    return(
      <div className="app">
        <div className="app-header">
          <div className="col-md-3">
            <img src="images/whitedots.svg" alt="" onClick={this.sendHome}/>
          </div>
          <div className="col-md-6 title">
            <h2>Wander No More</h2>
          </div>
          <div className="profile col-md-3" onClick={this.toggleNav}>
            <div className='icon'>
              <i className="fa fa-user fa-2x"></i>
              <i className="fa fa-caret-down"></i>
            </div>
          </div>
          <ul className="nav" style={{"display":"none"}}>
            <li>Home</li>
            <li>Wandered&middot;To</li>
            <li>Favorites</li>
            <li>Settings</li>
            <li id="last-nav" onClick={this.signOut}>Sign Out</li>
          </ul>
        </div>
        <div className="app-content">
          {screenState}
        </div>
      </div>
    )
  }
});


var AppHome = React.createClass({
  handleScreen: function(e){
    e.preventDefault();
    this.props.changeScreen("radius");
  },
  render: function(){
    return(
      <div className="col-md-12 start">
        <a href="#" onClick={this.handleScreen}>
          <h3>Stop Wandering...</h3>
        </a>
      </div>
    )
  }
});


var AppRadiusSelect = React.createClass({
  sendToActivitySelect: function(radius, e){
    e.preventDefault();
    console.log(radius);
    this.props.setRadius(radius);
    this.props.changeScreen("activitySelect");
  },
  toggleRadius: function(e){
    e.preventDefault();
    $('.radius-list').slideToggle(500);
  },
  render: function(){
    return(
      <div className="col-md-12 radius">
        <h3>How Far would you like to travel?</h3>
        <a href="#" onClick={this.toggleRadius}>
          <h3>Radius</h3>
          <i className="fa fa-caret-down"></i>
        </a>
        <ul className="radius-list" style={{"display":"none"}}>
          <li onClick={this.sendToActivitySelect.bind(this, 8046)}>- 5 miles -</li>
          <li onClick={this.sendToActivitySelect.bind(this, 16093)}>- 10 miles -</li>
          <li onClick={this.sendToActivitySelect.bind(this, 24140)}>- 15 miles -</li>
          <li onClick={this.sendToActivitySelect.bind(this, 40233)}>- 25 miles -</li>
        </ul>
      </div>
    )
  }
});


var AppActivitySelect = React.createClass({
  getInitialState: function(){
    var currentUser = localStorage.getItem('Parse/finalproject/currentUser');
    currentUser = JSON.parse(currentUser);
    console.log(currentUser);
    return{
      radius: this.props.radius,
      zipcode: currentUser.zipcode
    }
  },
  food: function(){
    this.props.changeScreen("foodSelect");
  },
  outdoors: function(e){
    e.preventDefault();
    var number = _.random(20);
    var ResultCollection = this.props.collection;
    var result = new ResultCollection();
    result.term = "Parks";
    result.zipcode = this.state.zipcode;
    result.radius = this.state.radius;

    result.fetch().then(function(data){
      var data = data[number];
      data = JSON.stringify(data);
      localStorage.setItem('data', data);
      Backbone.history.navigate('app/result', {trigger: true});
  },
    function(error){
      console.log(error);
      alert("Were sorry, Your search failed, please try again");
      this.props.changeScreen("home");
    }.bind(this));
  },
  bars:function(){
    this.props.changeScreen("bars/clubs");
  },
  render: function(){
    return(
      <div className="row activity-select">
        <div className="col-md-4 food" onClick={this.food}>
          <div className="section-image" id='food'>
            <i className="fa fa-cutlery fa-5x"></i>
          </div>
          <div className="info-content">
            <h2>Food</h2>
          </div>
        </div>
        <div className="col-md-4 outdoors" onClick={this.outdoors}>
          <div className="section-image" id='outdoors'>
            <i className="fa fa-tree fa-5x"></i>
          </div>
          <div className="info-content">
            <h2>Outdoors</h2>
          </div>
        </div>
        <div className="col-md-4 bars" onClick={this.bars}>
          <div className="section-image" id='bars'>
            <i className="fa fa-glass fa-5x"></i>
          </div>
          <div className="info-content">
            <h2>Bars/Clubs</h2>
          </div>
        </div>
      </div>
    )
  }
});


var AppFoodSelect = React.createClass({
  getInitialState: function(){
    var currentUser = localStorage.getItem('Parse/finalproject/currentUser');
    currentUser = JSON.parse(currentUser);
    return{
      radius: this.props.radius,
      zipcode: currentUser.zipcode
    }
  },
  bFast: function(e){
    e.preventDefault();
    var ResultCollection = this.props.collection;
    var result = new ResultCollection();
    result.term = "Breakfast";
    result.zipcode = this.state.zipcode;
    result.radius = this.state.radius;

    result.fetch().then(function(data){
      var data = data;
      data = JSON.stringify(data);
      localStorage.setItem('data', data);
      Backbone.history.navigate('app/result', {trigger: true});
    },
    function(error){
      console.log(error);
      alert("Were sorry, Your search failed, please try again");
      this.props.changeScreen("home");
    }.bind(this));
  },
  lunch: function(e){
    e.preventDefault();
    var ResultCollection = this.props.collection;
    var result = new ResultCollection();
    result.term = "Lunch";
    result.zipcode = this.state.zipcode;
    result.radius = this.state.radius;

    result.fetch().then(function(data){
      var data = data;
      data = JSON.stringify(data);
      localStorage.setItem('data', data);
      Backbone.history.navigate('app/result', {trigger: true});
    },
    function(error){
      console.log(error);
      alert("Were sorry, Your search failed, please try again");
      this.props.changeScreen("home");
    }.bind(this));
  },
  dinner: function(e){
    e.preventDefault();
    var ResultCollection = this.props.collection;
    var result = new ResultCollection();
    result.term = "Dinner";
    result.zipcode = this.state.zipcode;
    result.radius = this.state.radius;
    result.fetch().then(function(data){
      var data = data;
      data = JSON.stringify(data);
      localStorage.setItem('data', data);
      Backbone.history.navigate('app/result', {trigger: true});
    },
    function(error){
      console.log(error);
      alert("Were sorry, Your search failed, please try again");
      this.props.changeScreen("home");
    }.bind(this));
  },
  dessert: function(e){
    e.preventDefault();
    var ResultCollection = this.props.collection;
    var result = new ResultCollection();
    result.term = "Dessert";
    result.zipcode = this.state.zipcode;
    result.radius = this.state.radius;

    result.fetch().then(function(data){
      var data = data;
      data = JSON.stringify(data);
      localStorage.setItem('data', data);
      Backbone.history.navigate('app/result', {trigger: true});
    },
    function(error){
      console.log(error);
      alert("Were sorry, Your search failed, please try again");
      this.props.changeScreen("home");
    }.bind(this));
  },
  render: function(){
    return(
      <div className="row food-select">
        <div className="col-md-3 b-fast" onClick={this.bFast}>
          <div className="section-image">
            <img src="images/b-fast.svg"/>
          </div>
          <div className="info-content">
            <h2>Breakfast</h2>
          </div>
        </div>
        <div className="col-md-3 lunch" onClick={this.lunch}>
          <div className="section-image">
            <img src="images/lunch.svg"/>
          </div>
          <div className="info-content">
            <h2>Lunch</h2>
          </div>
        </div>
        <div className="col-md-3 dinner" onClick={this.dinner}>
          <div className="section-image">
            <img src="images/dinner.svg"/>
          </div>
          <div className="info-content">
            <h2>Dinner</h2>
          </div>
        </div>
        <div className="col-md-3 dessert" onClick={this.dessert}>
          <div className="section-image">
            <img src="images/dessert.svg"/>
          </div>
          <div className="info-content">
            <h2>Dessert</h2>
          </div>
        </div>
      </div>
    )
  }
});


var AppNighlifeSelect = React.createClass({
  getInitialState: function(){
    var currentUser = localStorage.getItem('Parse/finalproject/currentUser');
    currentUser = JSON.parse(currentUser);
    return{
      radius: this.props.radius,
      zipcode: currentUser.zipcode
    }
  },
  bars: function(e){
    e.preventDefault();
    var BarCollection  = this.props.barCollection;
    var bar = new BarCollection();
    bar.term = "Bars"
    bar.zipcode = this.state.zipcode;
    bar.radius = this.state.radius;

    bar.fetch().then(function(data){
      var data = data;
      data = JSON.stringify(data);
      localStorage.setItem('data', data);
      Backbone.history.navigate('app/result', {trigger: true});
    },
    function(error){
      console.log(error);
      alert("Were sorry, Your search failed, please try again");
      this.props.changeScreen("home");
    }.bind(this));
  },
  clubs: function(e){
    e.preventDefault();
    var ClubCollection  = this.props.clubCollection;
    var club = new ClubCollection();
    club.term = "Dance+Clubs"
    club.zipcode = this.state.zipcode;
    club.radius = this.state.radius;
    
    club.fetch().then(function(data){
      var data = data;
      data = JSON.stringify(data);
      localStorage.setItem('data', data);
      Backbone.history.navigate('app/result', {trigger: true});
    },
    function(error){
      console.log(error);
      alert("Were sorry, Your search failed, please try again");
      this.props.changeScreen("home");
    }.bind(this));
  },
  render: function(){
    return(
      <div className="row adult-select">
        <div className="col-md-3 col-md-offset-3 bar" onClick={this.bars}>
          <div className="section-image">
            <img src="images/b-fast.svg"/>
          </div>
          <div className="info-content">
            <h2>Bars</h2>
          </div>
        </div>
        <div className="col-md-3 club" onClick={this.clubs}>
          <div className="section-image">
            <img src="images/lunch.svg"/>
          </div>
          <div className="info-content">
            <h2>Clubs</h2>
          </div>
        </div>
      </div>
    )
  }
});








module.exports= App;

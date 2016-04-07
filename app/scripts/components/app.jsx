var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');


var App = React.createClass({
  getInitialState: function(){
    return{
      screen: "home",
      radius: null,
    }
  },
  componentWillMount: function(){
    var Parse = this.props.parse;
    var currentUser = localStorage.getItem('Parse/finalproject/currentUser');
    currentUser = JSON.parse(currentUser);

    var User = Parse.Object.extend("User");
    var user = new User(currentUser);

    var query = new Parse.Query(Parse.Object.extend("UserInfo"));
    query.equalTo("User", user);
    query.find().then(function(info){
      var zipcode = info[0].attributes.zipcode;
      localStorage.setItem('zipcode', zipcode);
    },
      function(error){
        console.error(error);
    });
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
  render: function(){
    var screenState;
    if(this.state.screen == "home"){
      screenState = <AppHome changeScreen={this.handleScreenChange}/>;
    }else if (this.state.screen == "radius") {
      screenState = <AppRadiusSelect changeScreen={this.handleScreenChange} setRadius={this.setRadius}/>;
    }else if(this.state.screen == "activitySelect"){
      screenState = <AppActivitySelect changeScreen={this.handleScreenChange}/>;
    }else if (this.state.screen == "foodSelect"){
      screenState = <AppFoodSelect
                      changeScreen={this.handleScreenChange}
                      radius={this.state.radius}
                      zipcode={localStorage.getItem('zipcode')}
                      collection={this.props.foodCollection}
                    />;
    }

    return(
      <div className="app">
        <div className="app-header">
          <img src="images/whitedots.svg" alt="" onClick={this.sendHome}/>
          <h2>Wander No More</h2>
          <div className="profile" onClick={this.toggleNav}>
            <i className="fa fa-user fa-2x"></i>
            <i className="fa fa-caret-down"></i>
          </div>
          <ul className="nav" style={{"display":"none"}}>
            <li>Home</li>
            <li>Wandered&middot;To</li>
            <li>Favorites</li>
            <li>Settings</li>
            <li id="last-nav">Sign Out</li>
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
  food: function(){
    this.props.changeScreen("foodSelect");
  },
  outdoors: function(){
    this.props.changeScreen("outdoors");
  },
  bars:function(){
    this.props.changeScreen("bars");
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
  bFast: function(e){
    //Zipcode is comming in as null, not getting set in commoponetWillMount in time************
    e.preventDefault();
    console.log(this.props.zipcode);
    var radius = this.props.radius;
    var zipcode = this.props.zipcode;
    var FoodCollection = this.props.collection;
    var foods = new FoodCollection();
    foods.term = "Breakfast";
    foods.zipcode = zipcode;
    foods.radius = radius;
    foods.fetch().then(function(data){
      console.log(data);
    },
    function(error){
      console.log(error);
    });
  },
  lunch: function(e){
    e.preventDefault();
  },
  dinner: function(e){
    e.preventDefault();
  },
  dessert: function(e){
    e.preventDefault();
  },
  render: function(){
    return(
      <div className="row food-select">
        <div className="col-md-3 b-fast" onClick={this.bFast}>
          <div className="section-image">
            <i className="fa fa-coffee fa-5x"></i>
          </div>
          <div className="info-content">
            <h2>Breakfast</h2>
          </div>
        </div>
        <div className="col-md-3 lunch" onClick={this.lunch}>
          <div className="section-image">
            <i className="fa fa-tree fa-5x"></i>
          </div>
          <div className="info-content">
            <h2>Lunch</h2>
          </div>
        </div>
        <div className="col-md-3 dinner" onClick={this.dinner}>
          <div className="section-image">
            <i className="fa fa-glass fa-5x"></i>
          </div>
          <div className="info-content">
            <h2>Dinner</h2>
          </div>
        </div>
        <div className="col-md-3 dessert" onClick={this.dessert}>
          <div className="section-image">
            <i className="fa fa-glass fa-5x"></i>
          </div>
          <div className="info-content">
            <h2>Dessert</h2>
          </div>
        </div>
      </div>
    )
  }
});




var FoodResult = React.createClass({
  render: function(){
    return(
      <h3>Working</h3>
    )
  }
});





module.exports= App;

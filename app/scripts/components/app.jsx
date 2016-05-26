var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var Loading = require('react-loading');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var App = React.createClass({
  getInitialState: function(){
    var currentUser = localStorage.getItem('Parse/finalproject/currentUser');
    currentUser = JSON.parse(currentUser);
    return{
      "screen": "home",
      'zipcode': currentUser.zipcode,
      'radius':'',
      'profilePic': currentUser.photo.url
    }
  },
  toggleNav: function(e){
    e.preventDefault();
    $('.nav').slideToggle(500);
  },
  sendHome: function(){
    this.handleScreenChange("home");
  },
  sendToWanderedTo: function(){
    Backbone.history.navigate('app/wanderedTo', {trigger: true});
  },
  sendToSettings: function(){
    Backbone.history.navigate('app/settings', {trigger: true});
  },
  sendToFavorites: function(){
    Backbone.history.navigate('app/favorites', {trigger: true});
  },
  handleScreenChange: function(screen){
    this.setState({"screen": screen});
  },
  setRadius: function (radius){
    this.setState({"radius": radius});
  },
  signOut: function(e){
    e.preventDefault();
    this.props.parse.User.logOut().then(function(){
      console.log(this.props.parse.User.current());
    });
    Backbone.history.navigate('', {trigger: true});
  },
  doFetch: function(term, categoryFilter){
    this.setState({"screen": 'loading'});
    var ResultCollection = this.props.collection;
    var result = new ResultCollection();
    result.term = term;
    result.categoryFilter = categoryFilter;
    result.zipcode = this.state.zipcode;
    result.radius = this.state.radius;
    result.fetch().then(function(data){
      var data = data.businesses[0];
      data = JSON.stringify(data);
      localStorage.setItem('data', data);
      Backbone.history.navigate('app/result', {trigger: true});
    },
    function(error){
      console.log(error);
      alert("Were sorry, Your search failed, please try again");
      this.changeScreen("home");
    }.bind(this));
  },
  render: function(){
    var screenState;
    if(this.state.screen == "home"){
      screenState = <AppHome changeScreen={this.handleScreenChange}/>;
    }else if(this.state.screen == "loading"){
      screenState = (
        <div id="loader">
          <Loading type='cylon' color='#ffffff' width='175px' />
          <h3>loading...</h3>
        </div>
      )
    }else if (this.state.screen == "radius") {
      screenState = <AppRadiusSelect changeScreen={this.handleScreenChange} setRadius={this.setRadius}/>;
    }else if(this.state.screen == "activitySelect"){
      screenState = <AppActivitySelect doFetch={this.doFetch} changeScreen={this.handleScreenChange}/>;
    }else if (this.state.screen == "foodSelect"){
      screenState = <AppFoodSelect doFetch={this.doFetch} changeScreen={this.handleScreenChange}/>;
    }else if(this.state.screen == "bars/clubs"){
      screenState = <AppNighlifeSelect doFetch={this.doFetch} changeScreen={this.handleScreenChange}/>;
    }

    return(
      <div className="app">
        <div className="app-header animated fadeIn">
          <div className="col-md-3 col-xs-4 header-logo">
            <img src="images/whitedots.svg" alt="" onClick={this.sendHome}/>
          </div>
          <div className="col-md-6 col-xs-9 title">
            <h2>Wander No More</h2>
          </div>
          <div className="profile col-md-3 col-xs-3" onClick={this.toggleNav}>
            <div className='icon'>
              <img src={this.state.profilePic} alt="" />
              <i className="fa fa-caret-down"></i>
            </div>
          </div>
          <ul className="nav" style={{"display":"none"}}>
            <li onClick={this.sendHome}>Home</li>
            <li onClick={this.sendToWanderedTo}>Wandered</li>
            <li onClick={this.sendToFavorites}>Favorites</li>
            <li onClick={this.sendToSettings}>Settings</li>
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
      <div className="col-md-12 start animated fadeIn">
        <a href="#" onClick={this.handleScreen}>

          <h3>Start Adventure Here</h3>
        </a>
      </div>
    )
  }
});


var AppRadiusSelect = React.createClass({
  sendToActivitySelect: function(radius, e){
    e.preventDefault();
    this.props.setRadius(radius);
    this.props.changeScreen("activitySelect");
  },
  toggleRadius: function(e){
    e.preventDefault();
    $('.radius-list').slideToggle(500);
  },
  render: function(){
    return(
      <div className="col-md-12 radius animated fadeIn">
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
  outdoors: function(e){
    e.preventDefault();
    this.props.doFetch('Parks', "active,parks,beaches,hiking")
  },
  bars:function(){
    this.props.changeScreen("bars/clubs");
  },
  render: function(){
    return(
      <div className="row activity-select animated fadeIn">
        <div className="col-md-4 food circle" onClick={this.food}>
          <div className="section-image" id='food'>
            <i className="fa fa-cutlery fa-5x"></i>
          </div>
          <div className="info-content">
            <h2>Food</h2>
          </div>
        </div>
        <div className="col-md-4 outdoors circle" onClick={this.outdoors}>
          <div className="section-image" id='outdoors'>
            <i className="fa fa-tree fa-5x"></i>
          </div>
          <div className="info-content">
            <h2>Outdoors</h2>
          </div>
        </div>
        <div className="col-md-4 bars circle" onClick={this.bars}>
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
    e.preventDefault();
    this.props.doFetch("Breakfast", "breakfast_brunch");
  },

  lunch: function(e){
    e.preventDefault();
    this.props.doFetch("Lunch", "");
  },
  dinner: function(e){
    e.preventDefault();
    this.props.doFetch("Dinner", "");
  },
  dessert: function(e){
    e.preventDefault();
    this.props.doFetch("Dessert", "desserts");

  },
  render: function(){
    return(
      <div className="row food-select animated fadeIn">
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
  bars: function(e){
    e.preventDefault();
    this.props.doFetch("Bars", "");

  },
  clubs: function(e){
    e.preventDefault();
    this.props.doFetch("Dance+Clubs", "comedyclubs,danceclubs,countrydancehalls,karaoke");
  },
  render: function(){
    return(
      <div className="row adult-select animated fadeIn">
        <div className="col-md-3 col-md-offset-3 bar" onClick={this.bars}>
          <div className="section-image">
            <i className="fa fa-glass fa-5x"></i>
          </div>
          <div className="info-content">
            <h2>Bars</h2>
          </div>
        </div>
        <div className="col-md-3 club" onClick={this.clubs}>
          <div className="section-image">
            <img src="images/club1.svg"/>
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

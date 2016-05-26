var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var Rater = require('react-rater').default;
var Loading = require('react-loading');


var Result = React.createClass({
  getInitialState: function(){
    var user = localStorage.getItem('Parse/finalproject/currentUser');
    user = JSON.parse(user);
    return{
      'saved':false,
      'profilePic': user.photo.url,
      'placeHours': undefined
    }
  },
  componentWillMount: function(){
    var service;
    var map;
    var infowindow;
    var place;
    var self = this;
    var data = localStorage.getItem('data');
    data = JSON.parse(data);
    var location = new google.maps.LatLng(data.location.coordinate.latitude, data.location.coordinate.longitude);
    var request = {
      location: location,
      query: data.name,
      radius: '200',
    };
    service = new google.maps.places.PlacesService(document.getElementById('map'));
    service.textSearch(request, callback);

    var callbackNumberTwo = function (place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {

            self.setState({'placeHours': place});
      }
    }
    function callback (results, status){

      if (status == google.maps.places.PlacesServiceStatus.OK) {
          var place = results[0].place_id;
          place = place.toString();
          var request = {
            placeId: place
          };

          service = new google.maps.places.PlacesService(document.getElementById('map'));
          service.getDetails(request, callbackNumberTwo);
      }
    }

  },
  saveToWanderedTo: function(){
    var self = this;
    self.setState({'saved': true});
    setTimeout(function(){
      var Parse = self.props.parse;
      var yelpData = localStorage.getItem('data');
      yelpData = JSON.parse(yelpData);
      var googleData = self.state.placeHours;
      var user = Parse.User.current();
      var WanderedTo = Parse.Object.extend('WanderedTo');
      var wandered = new WanderedTo();
      wandered.set({
        "yelpData": yelpData,
        "googleData": googleData,
        "user": user
      });
      wandered.save(null, {
          success: function(object) {
            Backbone.history.navigate('app', {trigger: true});
          },
          error: function(user, error) {
            alert('Failed to save location to Wandered-To: ' + error.message);
          }
        });
    },3000);
  },
  toggleNav: function(e){
    e.preventDefault();
    $('.nav').slideToggle(500);
  },
  sendHome: function(){
    Backbone.history.navigate('app', {trigger:true});
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
  signOut: function(e){
    e.preventDefault();
    console.log(this.props.parse);
    this.props.parse.User.logOut().then(function(){
      Backbone.history.navigate('', {trigger: true});
    });
  },
  render: function(){

    var content;
    var data = localStorage.getItem('data');
    data = JSON.parse(data);
    var image = data.image_url;
    if (image){
      image = image.replace("/ms.", '/o.');
    }else{
      image = "images/sorrynoimage.jpg";
    }
    if(this.state.placeHours){
      var place = this.state.placeHours;
      console.log("place inside of if:",place);
      var placeOpenBool;
      var placeHours;
      var color;

      if (place != undefined){
        if(place.opening_hours != undefined){
          if(place.opening_hours.weekday_text.length > 0){
            placeHours= place.opening_hours.weekday_text;
          }else{
            placeHours =['','','','','','',''];
          }
          if(typeof(place.opening_hours.open_now) === 'boolean'){
            placeOpenBool = place.opening_hours.open_now;
            //if there is place but no hours
            if(placeOpenBool){
              placeOpenBool = "TRUE";
              color = 'open-green';
            }else {
              placeOpenBool = "FALSE";
              color = 'open-red';
            }
          }else{
            placeOpenBool ="Unknown :(";
          }
        }else{
          placeOpenBool ="Unknown :(";
          placeHours =['','','','','','',''];
        }
      }else{
        placeOpenBool ="Unknown :(";
        placeHours =['','','','','','',''];
      }

      if(this.state.saved == true){
        var name = localStorage.getItem("Parse/finalproject/currentUser");
        name = JSON.parse(name);
        name = name.firstName;
        content = (
          <div className="app-content">
            <div className="say-saved">
              <h1>Have fun {name}!</h1>
            </div>
          </div>
        );
      }else{
        content = (
          <div className="app-content">
            <div className="row result animated fadeIn">
              <div className="col-md-5 col-md-offset-2 result-info">
                <h1>{data.name}</h1>
                <a href=""><h3>{data.location.address[0]}, {data.location.city}, {data.location.state_code} {data.location.postal_code}</h3></a>
                <a href=""><h3>{data.display_phone}</h3></a>
                <div className="rating">
                  <h4>{data.rating}</h4>
                  <Rater interactive={false} rating={data.rating} />
                  <a href={data.url}><img src="images/yelp.png" alt="" /></a>
                </div>
                <h3 id={color}>Open Now: {placeOpenBool}</h3>
                <ul className="hours">
                  <li>{placeHours[0]}</li>
                  <li>{placeHours[1]}</li>
                  <li>{placeHours[2]}</li>
                  <li>{placeHours[3]}</li>
                  <li>{placeHours[4]}</li>
                  <li>{placeHours[5]}</li>
                  <li>{placeHours[6]}</li>
                </ul>
              </div>
              <div className="col-md-3 result-image">
                <img src={image} alt=""/>

              </div>
            </div>
            <div className="row result-buttons animated fadeIn">
              <div className="col-md-3 col-md-offset-3 col-xs-6 button" id="red" onClick={this.sendHome}>
                <div className="section-image">
                  <i className="fa fa-times fa-5x"></i>
                </div>
                <div className="info-content">
                  <h2>Try Again</h2>
                </div>
              </div>
              <div className="col-md-3 col-xs-6 button" id="green" onClick={this.saveToWanderedTo}>
                <div className="section-image">
                  <i className="fa fa-check fa-5x"></i>
                </div>
                <div className="info-content">
                  <h2>Wander No More</h2>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="app">
        <div className="app-header">
          <div className="col-md-3 header-logo">
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
        {content}
        <div style={{"clear": "both"}}></div>
      </div>

    )
  }
});













module.exports = Result;

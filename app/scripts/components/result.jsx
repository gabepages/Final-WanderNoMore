var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var Rater = require('react-rater').default;
var Loading = require('react-loading');


var Result = React.createClass({
  getInitialState: function(){
    return{
      'saved':false
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

    function callback (results, status){

      if (status == google.maps.places.PlacesServiceStatus.OK) {
          var place = results[0].place_id;
          place = place.toString();
          var request = {
            placeId: place
          };

          service = new google.maps.places.PlacesService(document.getElementById('map'));
          service.getDetails(request, callback);

          function callback(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                  var place = JSON.stringify(place);
                  localStorage.setItem("place", place);
            }
          }
      }
    }
    // this.loaded = Date.now();
    // setInterval(this.forceUpdate,1000);
  },
  saveToWanderedTo: function(){
    var self = this;
    self.setState({'saved': true});
    setTimeout(function(){
      var Parse = self.props.parse;
      var yelpData = localStorage.getItem('data');
      yelpData = JSON.parse(yelpData);
      var googleData = localStorage.getItem('place');
      googleData = JSON.parse(googleData);
      if(googleData.opening_hours){
        if (googleData.opening_hours.open_now && googleData.opening_hours.weekday_text){
          googleData ={
            "openNow": googleData.opening_hours.open_now,
            "weekdayHours": googleData.opening_hours.weekday_text
          }
        }else if (googleData.opening_hours.open_now) {
          googleData ={
            "openNow": googleData.opening_hours.open_now,
            "weekdayHours": ['','','','','','','']
          }
        }else{
          googleData ={
            "openNow": "Unknow :(",
            "weekdayHours":googleData.opening_hours.weekday_text
          }
        }
      }else{
        googleData ={
          "openNow": "Unknow :(",
          "weekdayHours":['','','','','','','']
        }
      }
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

    },3500);

  },
  toggleNav: function(e){
    e.preventDefault();
    $('.nav').slideToggle(500);
  },
  sendHome: function(){
    Backbone.history.navigate('app', {trigger:true});
  },
  sendToApp: function(e){
    e.preventDefault();
    Backbone.history.navigate('app', {trigger:true});
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
    var place = localStorage.getItem('place');
    var placeOpenBool;
    var placeHours;
    var color;
    if (place != "undefined" || place != "null"){
      place = JSON.parse(place);
      console.log(place);
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
          <div className="row result">
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
          <div className="row result-buttons">
            <div className="col-md-3 col-md-offset-3 button" id="red" onClick={this.sendToApp}>
              <div className="section-image">
                <i className="fa fa-times fa-5x"></i>
              </div>
              <div className="info-content">
                <h2>Try Again</h2>
              </div>
            </div>
            <div className="col-md-3 button" id="green" onClick={this.saveToWanderedTo}>
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
    return (
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
            <li onClick={this.sendHome}>Home</li>
            <li>Wandered</li>
            <li>Favorites</li>
            <li>Settings</li>
            <li id="last-nav" onClick={this.signOut}>Sign Out</li>
          </ul>
        </div>
        {content}
      </div>

    )
  }
});













module.exports = Result;

var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');



var Result = React.createClass({
  componentWillMount: function(){
    var service;
    var map;
    var infowindow;

    console.log('result!');

    var data = localStorage.getItem('data');
    data = JSON.parse(data);
    var location = new google.maps.LatLng(data.location.coordinate.latitude, data.location.coordinate.longitude);
    console.log('data.name', data.name);
    var request = {
      location: location,
      query: data.name,
      radius: '200',
    };
    service = new google.maps.places.PlacesService(document.getElementById('map'));
    service.textSearch(request, callback);

    function callback (results, status){
      console.log('service: ', status, results);

      if (status == google.maps.places.PlacesServiceStatus.OK) {
          console.log('okay');
      }
    }

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
    var data = localStorage.getItem('data');
    data = JSON.parse(data);
    console.log(data);
    var image = data.image_url;
    if (image){
      image = image.replace("/ms.", '/o.');
    }else{
      image = "images/sorrynoimage.jpg";
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
            <li>Home</li>
            <li>Wandered&middot;To</li>
            <li>Favorites</li>
            <li>Settings</li>
            <li id="last-nav" onClick={this.signOut}>Sign Out</li>
          </ul>
        </div>
        <div className="app-content">
          <div className="row result">
            <div className="col-md-4 col-md-offset-2 result-info">
              <h1>{data.name}</h1>
              <a href=""><h3>{data.location.address[0]}, {data.location.city}, {data.location.state_code} {data.location.postal_code}</h3></a>
              <a href=""><h3>{data.display_phone}</h3></a>
              <span>{data.rating} </span><img src={data.rating_img_url} alt="" />
              <p>{data.snippet_text}</p>
            </div>
            <div className="col-md-4 result-image">
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
            <div className="col-md-3 button" id="green">
              <div className="section-image">
                <i className="fa fa-check fa-5x"></i>
              </div>
              <div className="info-content">
                <h2>Wander No More</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
});

module.exports = Result;

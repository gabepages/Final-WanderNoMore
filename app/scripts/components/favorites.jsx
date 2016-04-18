var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var Loading = require('react-loading');

var Favorites = React.createClass({
  getInitialState: function(){
    var currentUser = localStorage.getItem('Parse/finalproject/currentUser');
    currentUser = JSON.parse(currentUser);
    return {
      'results': undefined,
      'loading': true,
      'profilePic': currentUser.photo.url,
      "listVsMap": "list",

    }
  },
  componentWillMount: function(){
    var self = this;
    setTimeout(function(){
      var Parse = self.props.parse;
      var user = Parse.User.current();
      var relation = user.relation("favorites");
      var query = relation.query();
      query.equalTo('user', user);
      query.find({
        success: function(results){
          console.log(results);
          self.setState({'results': results});
          self.setState({'loading': false});
        },
        error: function(error){
          console.log("error: ", error);
        }
      });
    }, 3000);


  },
  toggleNav: function(e){
    e.preventDefault();
    $('.nav').slideToggle(500);
  },
  sendHome: function(){
    Backbone.history.navigate('app', {trigger: true});
  },
  sendToWanderedTo: function(){
    Backbone.history.navigate('app/wanderedTo', {trigger: true});
  },
  sendToSettings: function(){
    Backbone.history.navigate('app/settings', {trigger: true});
  },
  signOut: function(e){
    e.preventDefault();
    this.props.parse.User.logOut().then(function(){
      console.log(this.props.parse.User.current());
    });
    Backbone.history.navigate('', {trigger: true});
  },
  triggerMap: function(){
    this.setState({'listVsMap': "map"});
  },
  triggerList: function(){
    this.setState({'listVsMap': "list"});
  },
  render: function(){
    var self = this;
    var resultsList;
    var content;
    var list;
    var map;
    if (this.state.listVsMap == "list"){
      list = "underline";
      map = "";
    }else{
      list = "";
      map = "underline";
    }
    if(this.state.loading == true){
      content = (
          <div id="wandered-loader">
            <Loading type='cylon' color='#ffffff' width='175px' />
            <h3>Gathering Data...</h3>
          </div>
      );
    }
    if(this.state.listVsMap == 'map'){
      content = <MapView toList={this.triggerList} />
    }else{
      if(this.state.results){
        resultsList = this.state.results.map(function(result){
          var result = result.attributes;
          var placeOpenBool;
          var color;
          var phone;
          var image = result.yelpData.image_url;
          if (image){
            image = image.replace("/ms.", '/o.');
          }else{
            image = "images/sorrynoimage.jpg";
          }
          if(result.yelpData.display_phone == undefined){
            phone = "N/A";
          }else{
            phone = result.yelpData.display_phone;
          }
          if(typeof(result.googleData.openNow) === 'boolean'){
            placeOpenBool = result.googleData.openNow;
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
          return (
              <tr key={result.createdAt}>
                <td>{result.yelpData.name}</td>
                <td>{phone}</td>
                <td id={color}>{placeOpenBool}</td>
                <td><img src={image} alt="" /></td>
              </tr>
            );
        });
        content = (
          <table className="table table-hover" >
            <thead>
              <tr>
                <td>Name</td>
                <td>Phone-Number</td>
                <td>Open Now</td>
                <td>Picture</td>
              </tr>
            </thead>
            <tbody>
              {resultsList}
            </tbody>
          </table>
        );
      }
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
              <img src={this.state.profilePic} alt="" />
              <i className="fa fa-caret-down"></i>
            </div>
          </div>
          <ul className="nav" style={{"display":"none"}}>
            <li onClick={this.sendHome}>Home</li>
            <li onClick={this.sendToWanderedTo}>Wandered</li>
            <li>Favorites</li>
            <li onClick={this.sendToSettings}>Settings</li>
            <li id="last-nav" onClick={this.signOut}>Sign Out</li>
          </ul>
        </div>
        <div className="app-content">
          <div className="col-md-10 col-md-offset-1 wandered-to">
            <div className="row">
              <div className="col-md-4 col-md-offset-4">
                <h1>Your Favorites</h1>
              </div>
              <div className="col-md-4 list-map">
                <ul>
                  <li id={list} onClick={this.triggerList}>List</li>
                  <li id={map} onClick={this.triggerMap}>Map</li>
                </ul>
              </div>
            </div>
            {content}
          </div>
        </div>
        <div style={{"clear": "both"}}></div>
      </div>
    )
  }
});


var MapView = React.createClass({
  componentDidMount: function(){
    var map;
    var LatLng = {lat: 34.851838, lng:  -82.399542};
    map = new google.maps.Map(document.getElementById('realMap'), {
      center: LatLng,
      zoom: 14
    });
    var marker = new google.maps.Marker({
       position: LatLng,
       map: map,
       animation: google.maps.Animation.DROP,
       title: 'Greenville'
     });
     var contentString = "<h5>Greenville, SC</h5>"
     var infowindow = new google.maps.InfoWindow({
        content: contentString
     });
     marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
  },
  render: function(){
    return(
      <div id="realMap" className='col-md-8'></div>
    )
  }
});

module.exports= Favorites;

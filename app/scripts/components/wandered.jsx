var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var Loading = require('react-loading');

var WanderedTo = React.createClass({
  getInitialState: function(){
    var currentUser = localStorage.getItem('Parse/finalproject/currentUser');
    currentUser = JSON.parse(currentUser);
    return {
      'results': undefined,
      'loading': true,
      'profilePic': currentUser.photo.url,
      'favorites': undefined
    }
  },
  componentWillMount: function(){
    var self = this;
    setTimeout(function(){
      var Parse = self.props.parse;
      var places;
      var user = Parse.User.current();
      var Wandered = Parse.Object.extend("WanderedTo");
      var query =  new Parse.Query(Wandered);
      query.equalTo('user', user);
      query.find({
        success: function(results){
          self.setState({'results': results});
          this.setState({'loading': false});
        },
        error: function(error){
          console.log("error: ", error);
        }
      });
      var relation = user.relation("favorites");
      relation.query().find({
        success: function(list) {
          places = list.map(function(place){
            return place.id;
          });
          self.setState({'favorites': places});
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
  sendToFavorites: function(){
    Backbone.history.navigate('app/favorites', {trigger: true});
  },
  signOut: function(e){
    e.preventDefault();
    this.props.parse.User.logOut().then(function(){
      console.log(this.props.parse.User.current());
    });
    Backbone.history.navigate('', {trigger: true});
  },
  favorite: function(item, currentlyFavorited, e){
    var Parse = this.props.parse;
    var user = Parse.User.current();
    var relation = user.relation("favorites");
    var favorites = this.state.favorites;

    if(currentlyFavorited){
      favorites = _.reject(favorites, function(id){ return id === item.id });
      console.log(favorites);
      relation.remove(item);

    }else{
      favorites.push(item.id);
      relation.add(item);

    }

    this.setState({'favorites': favorites});

    user.save();
  },
  getRelation: function(){

  },
  render: function(){
    var self = this;
    var resultsList;
    var content;
    if(this.state.loading == true){
      content = (
          <div id="wandered-loader">
            <Loading type='cylon' color='#ffffff' width='175px' />
            <h3>Gathering Data...</h3>
          </div>
      );
    }
    if(this.state.favorites){

      resultsList = this.state.results.map(function(result){
        console.log(result.attributes);
        var currentlyFavorited = false;
        var className;
        if($.inArray(result.id, self.state.favorites) != -1){
          className = 'fa fa-star star gold-star';
          currentlyFavorited = true;
        }else{
          className = 'fa fa-star star';
        }
        var bindItem = self.favorite.bind(self, result, currentlyFavorited);
        var result = result.attributes;
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
        return (
            <tr key={result.createdAt}>
              <td>{result.yelpData.name}</td>
              <td>{phone}</td>
              <td><img src={image} alt="" /></td>
              <td><i onClick={bindItem} className={className} aria-hidden="true"></i></td>
            </tr>
          );
      });
      content = (
        <table className="table table-hover animated fadeIn" >
          <thead>
            <tr>
              <td>Name</td>
              <td>Phone-Number</td>
              <td>Picture</td>
              <td>Add to Favorites</td>
            </tr>
          </thead>
          <tbody>
            {resultsList}
          </tbody>
        </table>
      );
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
            <li onClick={this.sendToFavorites}>Favorites</li>
            <li onClick={this.sendToSettings}>Settings</li>
            <li id="last-nav" onClick={this.signOut}>Sign Out</li>
          </ul>
        </div>
        <div className="app-content animated fadeIn">
          <div className="col-md-10 col-md-offset-1 wandered-to">
            <h1>Places You&rsquo;ve Wandered&middot;To:</h1>
            {content}
          </div>
        </div>
        <div style={{"clear": "both"}}></div>
      </div>
    )
  }
});


module.exports = WanderedTo;

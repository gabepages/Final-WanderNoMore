var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');

var WanderedTo = React.createClass({
  getInitialState: function(){
    return {
      'results': []
    }
  },
  componentWillMount: function(){
    var self = this;
    var resultsList;
    var Parse = this.props.parse;
    var user = Parse.User.current();
    var Wandered = Parse.Object.extend("WanderedTo");
    var query =  new Parse.Query(Wandered);
    query.equalTo('user', user);
    query.find({
      success: function(results){
        self.setState({'results': results});
      },
      error: function(error){
        console.log("error: ", error);
      }
    });
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
  render: function(){
    var resultsList = this.state.results.map(function(result){
      var result = result.attributes;
      console.log(result);
      var image = result.yelpData.image_url;
      if (image){
        image = image.replace("/ms.", '/o.');
      }else{
        image = "images/sorrynoimage.jpg";
      }
        return (
          <tr key={result.createdAt}>
            <td>{result.yelpData.name}</td>
            <td>{result.yelpData.display_phone}</td>
            <td><img src={image} alt="" /></td>
            <td><i className="fa fa-star star" aria-hidden="true"></i></td>
          </tr>
        );
    });
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
            <li onClick={this.sendHome}>Home</li>
            <li onClick={this.sendToWanderedTo}>Wandered</li>
            <li>Favorites</li>
            <li onClick={this.sendToSettings}>Settings</li>
            <li id="last-nav" onClick={this.signOut}>Sign Out</li>
          </ul>
        </div>
        <div className="app-content">
          <div className="col-md-10 col-md-offset-1 wandered-to">
            <h1>Places Youve Wandered&middot;To:</h1>
            <table className="table table-hover" >
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
          </div>
        </div>
      </div>
    )
  }
});


module.exports = WanderedTo;

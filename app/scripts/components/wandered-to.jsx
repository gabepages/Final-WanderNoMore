var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');

var WanderedTo = React.createClass({
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
            <li onClick={this.sendToWanderedTo}>Wandered&middot;To</li>
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
                <tr>
                  <td>Joes Crab Shack</td>
                  <td>+1-813-601-8268</td>
                  <td><img src="images/restaurant.jpg" alt="" /></td>
                  <td><i className="fa fa-star star" aria-hidden="true"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
});


module.exports = WanderedTo;

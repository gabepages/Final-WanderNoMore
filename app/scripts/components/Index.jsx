var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');

var Index = React.createClass({
  render: function(){
    return(
      <div>
        <div className="row-fluid main-header">
          <div className="row  logo-header">
            <div className="col-md-3 small-header">
              <img src="images/blackdots.svg" alt="" />
              <h5>Wander No More</h5>
            </div>
            <div className="small-nav col-md-3">
              <a href="#signup">Sign Up</a>
              <a href="#login">Login</a>
            </div>
          </div>
          <div className='header'>
            <div className="logo">
              <img src="images/blackdots.svg" alt="" />
            </div>
            <h1>Wander No More</h1>
            <a href="#signup">
              <h3>Sign Up</h3>
            </a>
            <a href="#login">
              <h3>Login</h3>
            </a>
          </div>
        </div>

        <div className="row app-info">
          <div className="col-md-4 col-xs-12">
            <div className="section-image" id='heart'>
              <i className="fa fa-heart fa-5x"></i>
            </div>
            <div className="info-content">
              <h2>Couples</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
          <div className="col-md-4 middle col-xs-12">
            <div className="section-image" id='group'>
              <i className="fa fa-users fa-5x"></i>
            </div>
            <div className="info-content">
              <h2>Friends</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
          <div className="col-md-4 col-xs-12">
            <div className="section-image" id='single'>
              <i className="fa fa-user fa-5x"></i>
            </div>
            <div className="info-content">
              <h2>Or Just You</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
});




module.exports = Index;

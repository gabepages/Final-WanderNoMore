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
              <p>Wander No More is great for couples that can never decide what to do and spend hours saying "I don't care, you pick". If this sounds like you and your significant other, go ahead and save some time and use Wander No More. You can thank us later.</p>
            </div>
          </div>
          <div className="col-md-4 middle col-xs-12">
            <div className="section-image" id='group'>
              <i className="fa fa-users fa-5x"></i>
            </div>
            <div className="info-content">
              <h2>Friends</h2>
              <p>Do you and your friends spend to much time trying to decided what bar to hop to next or what club you are going to tonight? If so, <a id='click-here' href="#signup">click here</a> and sign up for Wander No More so you and your friends can spend more time having fun and less time deciding on where to have fun.</p>
            </div>
          </div>
          <div className="col-md-4 col-xs-12">
            <div className="section-image" id='single'>
              <i className="fa fa-user fa-5x"></i>
            </div>
            <div className="info-content">
              <h2>Or Just You</h2>
              <p>Is your dog sitting in-front of you, begging you to take him to the park? But let me guess, you're sick of that same old park you've been taking him to for the past 2 years. Well Wander No More has you covered. Just <a id='click-here' href="#signup">click here</a> and sign up to find great new parks near you.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
});




module.exports = Index;

var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');

var Signup = React.createClass({
  signUp: function(e){
    e.preventDefault();
    var email = $('#signup-e').val();
    var password = $('#signup-p').val();
    var Parse = this.props.parse;
    var user = new Parse.User();
    user.set({
      "username": email,
      "email": email,
      "password": password
    });
    user.signUp(null, {
      success: function(user) {
        console.log("User Created: ", user);
        Backbone.history.navigate('login', {trigger: true});
      },
      error: function(user, error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  },
  render: function(){
    return(
      <div className='signup'>
        <div className="row  logo-header">
          <div className="col-md-3 small-header">
            <img src="images/bestlogo.png" alt="" />
            <h5>Wander No More</h5>
          </div>
          <div className="small-nav col-md-3">
            <a href="#">Home</a>
          </div>
        </div>
        <div className="row">
          <div className="signup-content col-md-4 col-md-offset-4">
            <h3>Welcome. Please sign up.</h3>
            <form onSubmit={this.signUp}>
              <input type="email" className="form-control" id="signup-e" placeholder="Email" />
              <input type="password" className="form-control" id="signup-p" placeholder="Password" />
              <button type="submit" className="btn btn-default">sign up</button>
            </form>
            <p>Already have an account? <a href="#login">Login</a></p>
          </div>
        </div>
      </div>
    )
  }
});


module.exports = Signup;

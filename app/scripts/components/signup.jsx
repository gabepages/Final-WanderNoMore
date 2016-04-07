var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');




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
        ReactDOM.render(
          <CreateProfile router={this} parse={Parse} user={user} />,
          $('.container-fluid')[0]
        );
      },
      error: function(user, error) {
        alert("Sign Up Error: " + error.code + " " + error.message);
      }
    });
  },
  render: function(){
    return(
      <div className='signup'>
        <div className="row  logo-header">
          <div className="col-md-3 small-header">
            <img src="images/blackdots.svg" alt="" />
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



var CreateProfile = React.createClass({
  createProfile: function(e){
    e.preventDefault();
    var firstName = $('#cp-fname').val();
    var lastName = $('#cp-lname').val();
    var zipcode = $('#cp-zipcode').val();
    var user = this.props.user;
    var Parse = this.props.parse;
    var UserInfo = Parse.Object.extend('UserInfo');
    var userInfo = new UserInfo();
    userInfo.set({
      "firstName": firstName,
      "lastName": lastName,
      "zipcode": zipcode,
      "User": user
    });
    userInfo.save(null, {
      success: function(userInfo) {
        console.log('New object created with objectId: ' + userInfo.id);

      },
      error: function(gameScore, error) {
        console.log('Failed to create new object, with error code: ' + error.message);
      }
    });
  },
  render: function(){
    return(
      <div className='login'>
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
          <div className="login-content col-md-4 col-md-offset-4">
            <h3>Prepare to be extemporaneous.</h3>
            <form onSubmit={this.createProfile}>
              <input type="text" className="form-control" id="cp-fname" placeholder="First Name" />
              <input type="text" className="form-control" id="cp-lname" placeholder="Last Name" />
              <input type="text" className="form-control" id="cp-zipcode" placeholder="Zipcode" />
              <button type="submit" className="btn btn-default">Shall we begin?</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
});


>>>>>>> gh-pages
module.exports = Signup;

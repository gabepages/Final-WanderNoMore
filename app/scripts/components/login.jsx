var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');

var Login = React.createClass({
  login: function(e){
    e.preventDefault();
    var email = $('#login-e').val();
    var password = $('#login-p').val();
    var Parse = this.props.parse;
    Parse.User.logIn(email, password, {
      success: function(user) {
        console.log("Login Successful: ", user);
        Backbone.history.navigate('', {trigger: true});
        // Do stuff after successful login.
      },
      error: function(user, error) {
        console.error(error);
        // The login failed. Check error to see why.
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
            <h3>Welcome. Please Login.</h3>
            <form onSubmit={this.login}>
              <input type="email" className="form-control" id="login-e" placeholder="Email" />
              <input type="password" className="form-control" id="login-p" placeholder="Password" />
              <button type="submit" className="btn btn-default">login</button>
            </form>
            <p>New Here? <a href="#signup">Sign up</a></p>
          </div>
        </div>
      </div>
    )
  }
});


module.exports = Login;

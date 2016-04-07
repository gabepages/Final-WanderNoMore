var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');

var CreateProfile = React.createClass({
  createProfile: function(e){
    e.preventDefault();
    var firstName = $('#cp-fname').val();
    var lastName = $('#cp-lname').val();
    var zipcode = $('#cp-zipcode').val();
    var user = localStorage.getItem('Parse/finalproject/currentUser');
    user = JSON.parse(user);
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
            <img src="images/blackdots.svg" alt="" />
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


module.exports = CreateProfile;

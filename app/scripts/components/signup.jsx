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
          <CreateProfile router={this} parse={Parse} />,
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
  getInitialState: function(){
    return{
      'sayHello': false
    }
  },
  createProfile: function(e){
    e.preventDefault();
    var self = this;
    var firstName = $('#cp-fname').val();
    var lastName = $('#cp-lname').val();
    var zipcode = $('#cp-zipcode').val();
    localStorage.setItem('username', firstName);
    var Parse = this.props.parse;
    var fileUploadControl = $("#cp-image")[0];
    if (fileUploadControl.files.length > 0) {
      var file = fileUploadControl.files[0];
      var name = "photo.jpg";

      var parseFile = new Parse.File(name, file);
    }
    var user = Parse.User.current();
    user.set({
      "firstName": firstName,
      "lastName": lastName,
      "zipcode": zipcode,
      'photo': parseFile
    });
    user.save(null, {
      success: function(user) {
        self.setState({'sayHello': true});
      },
      error: function(user, error) {
        console.log('Failed to create new object, with error code: ' + error.message);
      }
    });
  },

  render: function(){
    var content;
    if(this.state.sayHello == true){
      var name = localStorage.getItem('username');
      content = <SayHello name={name}/>;
    }else{
      content =(
        <div className="login-content col-md-4 col-md-offset-4">
          <h3>Prepare to be extemporaneous.</h3>
          <form onSubmit={this.createProfile}>
            <input type="text" className="form-control" id="cp-fname" placeholder="First Name" />
            <input type="text" className="form-control" id="cp-lname" placeholder="Last Name" />
            <input type="text" className="form-control" id="cp-zipcode" placeholder="Zip Code" />
            <input type='file' id='cp-image'/>
            <button type="submit" className="btn btn-default">Shall we begin?</button>
          </form>
        </div>
      );
    }

    console.log(this.state);
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
          {content}
        </div>
      </div>
    )
  }
});

var SayHello = React.createClass({
  componentDidMount: function(){
    setTimeout( function(){
      Backbone.history.navigate('app', {trigger: true});
    },2500);
  },
  render: function(){
    return(
      <div className="say-hello col-md-12">
        <h1>Hello {this.props.name},</h1>
        <h1>Hope all is well.</h1>
      </div>
    )
  }
});


module.exports = Signup;

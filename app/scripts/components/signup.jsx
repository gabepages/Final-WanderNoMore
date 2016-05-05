var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Loading = require('react-loading');




var Signup = React.createClass({
  getInitialState: function(){
    return{
      loading: false
    }
  },
  signUp: function(e){
    e.preventDefault();
    var email = $('#signup-e').val();
    var password = $('#signup-p').val();
    this.setState({'loading': true});
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
    var content;
    if(this.state.loading == true){
      content = (
          <div id="loader">
            <Loading type='cylon' color='#ffffff' width='175px' />
            <h3>Loading..</h3>
          </div>
      );
    }else{
      content = (
        <div className="signup-content col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2 col-xs-12  animated fadeIn">
          <h3>Welcome. Please sign up.</h3>
          <form onSubmit={this.signUp}>
            <input type="email" className="form-control" id="signup-e" placeholder="Email" />
            <input type="password" className="form-control" id="signup-p" placeholder="Password" />
            <button type="submit" className="btn btn-default">sign up</button>
          </form>
          <p>Already have an account? <a href="#login">Login</a></p>
        </div>
      );
    }
    return(
      <div className='signup'>
        <div className="row  logo-header">
          <div className="col-xs-12 small-header">
            <img src="images/blackdots.svg" alt="" />
          </div>
        </div>
        <div className="row signup-section">
          {content}
        </div>
        <div style={{"clear": "both"}}></div>
      </div>
    )
  }
});



var CreateProfile = React.createClass({
  getInitialState: function(){
    return{
      'sayHello': false,
      'loading': false
    }
  },
  createProfile: function(e){
    e.preventDefault();
    var self = this;
    var firstName = $('#cp-fname').val();
    var lastName = $('#cp-lname').val();
    var zipcode = $('#cp-zipcode').val();
    var fileUploadControl = $("#cp-image")[0];
    this.setState({"loading": true});
    localStorage.setItem('username', firstName);

    setTimeout(function(){
      var Parse = self.props.parse;

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
          self.setState({'loading': false});
          self.setState({'sayHello': true});
        },
        error: function(user, error) {
          console.log('Failed to create new object, with error code: ' + error.message);
        }
      });
    },2750);

  },

  render: function(){
    var content;
    if(this.state.sayHello == true){
      var name = localStorage.getItem('username');
      content = <SayHello name={name}/>;
    }else if(this.state.loading == true){
      content = (
          <div id="loader">
            <Loading type='cylon' color='#ffffff' width='175px' />
            <h3>Loading..</h3>
          </div>
      );
    }else{
      content =(
        <div className="login-content col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2 col-xs-12 animated fadeIn">
          <h3>Prepare to be extemporaneous.</h3>
          <form onSubmit={this.createProfile}>
            <input type="text" className="form-control" id="cp-fname" placeholder="First Name" />
            <input type="text" className="form-control" id="cp-lname" placeholder="Last Name" />
            <input type="text" className="form-control" id="cp-zipcode" placeholder="Zip Code" />
            <label htmlFor="cp-image">
              <h4>Profile Picture:</h4>
            </label>
            <input type='file' id='cp-image' required/>
            <button type="submit" className="btn btn-default">Shall we begin?</button>
          </form>
        </div>
      );
    }

    console.log(this.state);
    return(
      <div className='login'>
        <div className="row  logo-header">
          <div className="col-md-12 small-header">
            <img src="images/blackdots.svg" alt="" />
          </div>
        </div>
        <div className="row signup-section">
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
      <div className="say-hello col-md-12 animated fadeIn">
        <h1>Hello {this.props.name},</h1>
        <h1>Hope all is well.</h1>
      </div>
    )
  }
});


module.exports = Signup;

var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var Loading = require('react-loading');



var Login = React.createClass({
  getInitialState: function(){
    return{
      sayHello: false,
      loading: false,
      username: ""
    }
  },
  login: function(e){
    e.preventDefault();
    var self = this;
    var email = $('#login-e').val();
    var password = $('#login-p').val();
    var Parse = this.props.parse;
    Parse.User.logIn(email, password, {
      success: function(user) {
          console.log(user.attributes);
          self.setState({
            'username': user.attributes.firstName,
            'sayHello': true
          });
          self.sendToApp();
      },
      error: function(user, error) {
        alert("Error! Try again!");
        Backbone.history.navigate('', {trigger: true});
      }
    });
  },
  sendToApp: function(){
    setTimeout(function(){
      Backbone.history.navigate('app', {trigger: true});
    },2500);
  },
  render: function(){
    var content =(
                <div className="login-content col-md-4 col-md-offset-4">
                  <h3>Welcome. Please Login.</h3>
                  <form onSubmit={this.login}>
                    <input type="email" className="form-control" id="login-e" placeholder="Email" />
                    <input type="password" className="form-control" id="login-p" placeholder="Password" />
                    <button type="submit" className="btn btn-default">login</button>
                  </form>
                  <p>New Here? <a href="#signup">Sign up</a></p>
                </div>
                );
    if(this.state.loading == true){
      content = (
                <div className="login-content col-md-4 col-md-offset-4">
                  <div id="loader">
                    <Loading type='cylon' color='#ffffff' width='175px' />
                    <h3>loading...</h3>
                  </div>
                </div>
      );
    }
    if(this.state.sayHello == true){
      content = (
        <div className="say-hello col-md-12">
          <h1>Hello {this.state.username},</h1>
          <h1>Hope all is well.</h1>
        </div>
      );
    }

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
            {content}
        </div>
      </div>
    )
  }
});


module.exports = Login;

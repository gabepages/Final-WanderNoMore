var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');

var Settings = React.createClass({
  getInitialState: function(){
    var user = localStorage.getItem('Parse/finalproject/currentUser');
    user = JSON.parse(user);
    return{
      iconOne: "fa fa-pencil",
      iconTwo: "fa fa-pencil",
      iconThree: "fa fa-pencil",
      firstName: user.firstName,
      lastName: user.lastName,
      zipcode: user.zipcode
    }
  },
  toggleNav: function(e){
    e.preventDefault();
    $('.nav').slideToggle(500);
  },
  sendHome: function(){
    Backbone.history.navigate("app", {trigger: true});
  },
  displayEdit: function(){
    $('#image-edit').css('display', 'inline-block');
  },
  unMountEdit: function(){
    $('#image-edit').css('display', 'none');
  },
  addEditFirstName: function(){

    if($('#first-input').css('display') != 'none'){
      $('#first-input').slideToggle(500);
      function callback(){
        $('#first-name').slideToggle(500);
      };
      setTimeout(callback,600);
      this.setState({"iconOne": "fa fa-pencil"});
    }
    else{
      $('#first-name').slideToggle(500)
      function callback(){
        $('#first-input').slideToggle(500);
      };
      setTimeout(callback,600);
      this.setState({"iconOne": "fa fa-times"});
    }
  },
  addEditLastName: function(){
    if($('#last-input').css('display') != 'none'){
      $('#last-input').slideToggle(500);
      function callback(){
        $('#last-name').slideToggle(500);
      };
      setTimeout(callback,600);
      this.setState({"iconTwo": "fa fa-pencil"});
    }
    else{
      $('#last-name').slideToggle(500)
      function callback(){
        $('#last-input').slideToggle(500);
      };
      setTimeout(callback,600);
      this.setState({"iconTwo": "fa fa-times"});
    }
  },
  addEditZipcode: function(){


    if($('#zipcode-input').css('display') != 'none'){
      $('#zipcode-input').slideToggle(500);
      function callback(){
        $('#zipcode').slideToggle(500);
      };
      setTimeout(callback,600);
      this.setState({"iconThree": "fa fa-pencil"});
    }
    else{
      $('#zipcode').slideToggle(500)
      function callback(){
        $('#zipcode-input').slideToggle(500);
      };
      setTimeout(callback,600);
      this.setState({"iconThree": "fa fa-times"});
    }
  },
  saveFirstName: function(e){
    e.preventDefault();
    var firstName = $('#first-input').val();
    var Parse = this.props.parse;
    var user = Parse.User.current();
    user.set({
      "firstName": firstName
    });
    this.setState({'firstName': firstName});
    this.addEditFirstName();
    user.save(null, {
      success: function(user) {
        // console.log("success, new name saved");
      },
      error: function(user, error) {
        console.log('Failed to create new object, with error code: ' + error.message);
        alert('Sorry, First Name Failed to save to server. Please reload page and try again.');
      }
    });
  },
  saveLastName: function (e){
    e.preventDefault();
    var lastName = $('#last-input').val();
    var Parse = this.props.parse;
    var user = Parse.User.current();
    user.set({
      "lastName": lastName
    });
    this.setState({'lastName': lastName});
    this.addEditLastName();
    user.save(null, {
      success: function(user) {
        // console.log("success, new name saved");
      },
      error: function(user, error) {
        console.log('Failed to create new object, with error code: ' + error.message);
        alert('Sorry, Last Name Failed to save to server. Please reload page and try again.');
      }
    });
  },
  saveZipcode: function(e){
    e.preventDefault();
    var zipcode = $('#zipcode-input').val();
    var Parse = this.props.parse;
    var user = Parse.User.current();
    user.set({
      "zipcode": zipcode
    });
    this.setState({'zipcode': zipcode});
    this.addEditZipcode();
    user.save(null, {
      success: function(user) {
        // console.log("success, new zipcode saved: ", user);
      },
      error: function(user, error) {
        console.log('Failed to create new object, with error code: ' + error.message);
        alert('Sorry, Zipcode Failed to save to server. Please reload page and try again.');
      }
    });
  },
  signOut: function(e){
    e.preventDefault();
    this.props.parse.User.logOut().then(function(){
      console.log(this.props.parse.User.current());
    });
    Backbone.history.navigate('', {trigger: true});
  },
  render: function (){

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
            <li>Wandered</li>
            <li>Favorites</li>
            <li>Settings</li>
            <li id="last-nav" onClick={this.signOut}>Sign Out</li>
          </ul>
        </div>
        <div className="app-content">
          <div className="row">
            <div className="col-md-4 col-md-offset-4 settings">
              <h1>Settings</h1>
              <div className="image" onMouseEnter={this.displayEdit} onMouseLeave={this.unMountEdit}>
                <img src="images/profile-pic.jpg" alt=""/>
                <i className="fa fa-pencil" id='image-edit' aria-hidden="true"></i>
              </div>
              <div className="user-info">
                <h2>First Name:</h2>
                <i className={this.state.iconOne} aria-hidden="true" onClick={this.addEditFirstName}></i>
                <h2 id='first-name'>{this.state.firstName}</h2>
                <form onSubmit={this.saveFirstName}>
                  <input type="text" className="form-control edit-inputs" placeholder="First Name" id='first-input' style={{'display':"none"}}/>
                </form>
              </div>
              <div className="user-info">
                <h2>Last Name:</h2>
                <i className={this.state.iconTwo} aria-hidden="true" onClick={this.addEditLastName}></i>
                <h2 id='last-name'>{this.state.lastName}</h2>
                <form onSubmit={this.saveLastName}>
                  <input type="text" className="form-control edit-inputs" placeholder="Last Name" id='last-input' style={{'display':"none"}}/>
                </form>
              </div>
              <div className="user-info">
                <h2>Zipcode:</h2>
                <i className={this.state.iconThree} aria-hidden="true" onClick={this.addEditZipcode}></i>
                <h2 id='zipcode'>{this.state.zipcode}</h2>
                <form onSubmit={this.saveZipcode}>
                  <input type="text" className="form-control edit-inputs" placeholder="Zipcode" id='zipcode-input' style={{'display':"none"}}/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});


module.exports = Settings;

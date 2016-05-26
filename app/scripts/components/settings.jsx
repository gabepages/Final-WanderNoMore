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
      zipcode: user.zipcode,
      photo: user.photo.url
    }
  },
  toggleNav: function(e){
    e.preventDefault();
    $('.nav').slideToggle(500);
  },
  sendHome: function(){
    Backbone.history.navigate("app", {trigger: true});
  },
  sendToWanderedTo: function(){
    Backbone.history.navigate('app/wanderedTo', {trigger: true});
  },
  sendToSettings: function(){
    Backbone.history.navigate('app/settings', {trigger: true});
  },
  sendToFavorites: function(){
    Backbone.history.navigate('app/favorites', {trigger: true});
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
      setTimeout(function(){
        $('#first-name').slideToggle(500);
      },600);
      this.setState({"iconOne": "fa fa-pencil"});
    }
    else{
      $('#first-name').slideToggle(500)
      setTimeout(function(){
        $('#first-input').slideToggle(500);
      },600);
      this.setState({"iconOne": "fa fa-times"});
    }
  },
  addEditLastName: function(){
    if($('#last-input').css('display') != 'none'){
      $('#last-input').slideToggle(500);
      setTimeout(function (){
        $('#last-name').slideToggle(500);
      },600);
      this.setState({"iconTwo": "fa fa-pencil"});
    }
    else{
      $('#last-name').slideToggle(500)
      setTimeout(function (){
        $('#last-input').slideToggle(500);
      },600);
      this.setState({"iconTwo": "fa fa-times"});
    }
  },
  addEditZipcode: function(){


    if($('#zipcode-input').css('display') != 'none'){
      $('#zipcode-input').slideToggle(500);
      setTimeout(function callback(){
        $('#zipcode').slideToggle(500);
      },600);
      this.setState({"iconThree": "fa fa-pencil"});
    }
    else{
      $('#zipcode').slideToggle(500)
      setTimeout(function (){
        $('#zipcode-input').slideToggle(500);
      },600);
      this.setState({"iconThree": "fa fa-times"});
    }
  },


  saveFirstName: function(e){
    e.preventDefault();
    var firstName = $('#first-input').val();
    var object ={'firstName': firstName};
    this.saveEditedItem('firstName', firstName, object);
    this.setState({'firstName': firstName});
    this.addEditFirstName();
  },
  saveLastName: function (e){
    e.preventDefault();
    var lastName = $('#last-input').val();
    var object ={'lastName': lastName};
    this.saveEditedItem('lastName', lastName, object);
    this.setState({'lastName': lastName});
    this.addEditLastName();
  },
  editPhoto: function(e){
    e.preventDefault();
    $('#cog').removeClass('hide');
    var Parse = this.props.parse;
    var fileUploadControl = $('#file-input')[0];
    if (fileUploadControl.files.length > 0) {
      var file = fileUploadControl.files[0];
      var name = "photo.jpg";
      var parseFile = new Parse.File(name, file);
    }
    var object = {'photo': parseFile};
    console.log(parseFile);
    this.saveEditedItem('photo', parseFile, object);

  },
  changePhoto: function(){
    var self = this;
    setTimeout(function(){
      var user = localStorage.getItem('Parse/finalproject/currentUser');
      user = JSON.parse(user);
      console.log("local storage: ", user.photo.url);
      self.setState({'photo': user.photo.url});
      $('#cog').addClass('hide');
    },100);

  },
  saveZipcode: function(e){
    e.preventDefault();
    var zipcode = $('#zipcode-input').val();
    this.setState({'zipcode': zipcode});
    var object ={'zipcode': zipcode};
    this.saveEditedItem('zipcode', zipcode, object);
    this.addEditZipcode();
  },
  saveEditedItem: function(name, value, object){
    var self= this;
    var Parse = this.props.parse;
    var user = Parse.User.current();
    user.set(object);
    user.save(null, {
      success: function(user) {
        self.changePhoto();
        // console.log("success, new zipcode saved: ", user);
      },
      error: function(user, error) {
        console.log('Failed to create new object, with error code: ' + error.message);
        alert('Sorry, Failed to save to server. Please reload page and try again.');
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
    console.log("state: ",this.state.photo);
    return(
      <div className="app">
        <div className="app-header">
          <div className="col-md-3 header-logo">
            <img src="images/whitedots.svg" alt="" onClick={this.sendHome}/>
          </div>
          <div className="col-md-6 col-xs-9 title">
            <h2>Wander No More</h2>
          </div>
          <div className="profile col-md-3 col-xs-3" onClick={this.toggleNav}>
            <div className='icon'>
              <img src={this.state.photo} alt="" />
              <i className="fa fa-caret-down"></i>
            </div>
          </div>
          <ul className="nav" style={{"display":"none"}}>
            <li onClick={this.sendHome}>Home</li>
            <li onClick={this.sendToWanderedTo}>Wandered</li>
            <li onClick={this.sendToFavorites}>Favorites</li>
            <li onClick={this.sendToSettings}>Settings</li>
            <li id="last-nav" onClick={this.signOut}>Sign Out</li>
          </ul>
        </div>
        <div className="app-content animated fadeIn">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 settings">
              <h1>Settings</h1>
              <div className="image">
                <div className="image-upload">
                    <label htmlFor="file-input" onMouseEnter={this.displayEdit} onMouseLeave={this.unMountEdit}>
                        <img src={this.state.photo} alt=""/>
                        <i className="fa fa-pencil" id='image-edit' aria-hidden="true" style={{'display':'none'}}></i>
                        <i className="fa fa-cog fa-spin fa-3x fa-fw margin-bottom hide" id='cog'></i>
                    </label>
                    <input onChange={this.editPhoto} id="file-input" type="file"/>
                </div>

              </div>
              <div className="user-info">
                <h2>First Name:</h2>
                <i className={this.state.iconOne} aria-hidden="true" onClick={this.addEditFirstName}></i>
                <h2 id='first-name'>{this.state.firstName}</h2>
                <form onSubmit={this.saveFirstName}>
                  <input type="text" className="form-control edit-inputs" placeholder="First Name" id='first-input' style={{'display':"none"}}/>
                </form>
              </div>
              <div className="user-info ">
                <h2>Last Name:</h2>
                <i className={this.state.iconTwo} aria-hidden="true" onClick={this.addEditLastName}></i>
                <h2 id='last-name'>{this.state.lastName}</h2>
                <form onSubmit={this.saveLastName}>
                  <input type="text" className="form-control edit-inputs" placeholder="Last Name" id='last-input' style={{'display':"none"}}/>
                </form>
              </div>
              <div className="user-info ">
                <h2>Zip Code:</h2>
                <i className={this.state.iconThree} aria-hidden="true" onClick={this.addEditZipcode}></i>
                <h2 id='zipcode'>{this.state.zipcode}</h2>
                <form onSubmit={this.saveZipcode}>
                  <input type="text" className="form-control edit-inputs" placeholder="Zip Code" id='zipcode-input' style={{'display':"none"}}/>
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

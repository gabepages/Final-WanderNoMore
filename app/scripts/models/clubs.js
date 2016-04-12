var $ = require('jquery');
var Backbone = require('backbone');


var Club = Backbone.Model.extend({

});

var ClubCollection = Backbone.Collection.extend({
  model: Club,
  url: function(){
    var yelpUrl = "http://yelpproxy.herokuapp.com/clubs/?term=" + this.term + "&location=" + this.zipcode + "&radius_filter=" + this.radius;
    return yelpUrl;
  }
});

module.exports =ClubCollection;

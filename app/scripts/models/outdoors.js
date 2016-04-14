var $ = require('jquery');
var Backbone = require('backbone');


var Outdoors = Backbone.Model.extend({

});

var OutdoorsCollection = Backbone.Collection.extend({
  model: Outdoors,
  url: function(){
    var yelpUrl = "http://yelpproxy.herokuapp.com/outdoors/?term=" + this.term + "&location=" + this.zipcode + "&radius_filter=" + this.radius;
    return yelpUrl;
  }
});

module.exports =OutdoorsCollection;

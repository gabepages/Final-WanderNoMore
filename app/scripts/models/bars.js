var $ = require('jquery');
var Backbone = require('backbone');


var Bar = Backbone.Model.extend({

});

var BarCollection = Backbone.Collection.extend({
  model: Bar,
  url: function(){
    var yelpUrl = "http://yelpproxy.herokuapp.com/bars/?term=" + this.term + "&location=" + this.zipcode + "&radius_filter=" + this.radius;
    return yelpUrl;
  }
});

module.exports =BarCollection;

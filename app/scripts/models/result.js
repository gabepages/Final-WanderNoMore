var $ = require('jquery');
var Backbone = require('backbone');


var Result = Backbone.Model.extend({

});

var ResultCollection = Backbone.Collection.extend({
  model: Result,
  url: function(){
    var yelpUrl = "http://yelpproxy.herokuapp.com/result/?term=" + this.term + "&location=" + this.zipcode + "&radius_filter=" + this.radius;
    return yelpUrl;
  }
});

module.exports =ResultCollection;

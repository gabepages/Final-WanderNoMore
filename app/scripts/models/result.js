var $ = require('jquery');
var Backbone = require('backbone');


var Result = Backbone.Model.extend({

});

var ResultCollection = Backbone.Collection.extend({
  model: Result,
  url: function(){
    var yelpUrl = "http://yelpproxy.herokuapp.com/yelp/?term=" + this.term + "&location=" + this.zipcode + "&radius_filter=" + this.radius + "&category_filter=" + this.categoryFilter;
    return yelpUrl;
  }
});

module.exports = ResultCollection;

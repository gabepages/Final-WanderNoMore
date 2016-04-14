var $ = require('jquery');
var Backbone = require('backbone');


var Food = Backbone.Model.extend({

});

var FoodCollection = Backbone.Collection.extend({
  model: Food,
  url: function(){
    var yelpUrl = "http://yelpproxy.herokuapp.com/food/?term=" + this.term + "&location=" + this.zipcode + "&radius_filter=" + this.radius;
    return yelpUrl;
  }
});

module.exports = FoodCollection;

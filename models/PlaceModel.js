var mongoose = require('mongoose');

var PlaceModel = mongoose.Schema({

// Count users going
PlaceModel.methods.countGoers = function() {
    return this.goers.length;
};

// Check if the given user is the last to cancel this
PlaceModel.methods.isLast = function(goer) {
  return this.goers === [goer];
};


module.exports = mongoose.model('Place', PlaceModel);
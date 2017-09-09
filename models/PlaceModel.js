var mongoose = require('mongoose');

var PlaceModel = mongoose.Schema({  'uid': {type: String, unique : true, required : true},  'goers': [{    type: mongoose.Schema.Types.ObjectId,    ref: 'User'  }]});

// Count users going
PlaceModel.methods.countGoers = function() {
    return this.goers.length;
};

// Check if the given user is the last to cancel this
PlaceModel.methods.removeUser = function(goerIndex) {
  return this.goers.splice(goerIndex,1);
};


module.exports = mongoose.model('Place', PlaceModel);

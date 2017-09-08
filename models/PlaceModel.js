var mongoose = require('mongoose');

var PlaceModel = mongoose.Schema({  'name': {type: String, default: ""},  'uid': {type: String, unique : true, required : true},  'goers': [{    type: mongoose.Schema.Types.ObjectId,    ref: 'User'  }]});

// Count users going
PlaceModel.methods.countGoers = function() {
    return this.goers.length;
};

// Check if the given user is the last to cancel this
PlaceModel.methods.isLast = function(goer) {
  return this.goers === [goer];
};


module.exports = mongoose.model('Place', PlaceModel);

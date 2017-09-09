var UserModel = require('../models/UserModel.js');
var PlaceModel = require('../models/PlaceModel.js');
var request = require('request');
var env = require('dotenv').load();
//Offline JSON file to not waste limited requests (تقشف)
// var MYFILE = require('./MYFILE').results;
var GOOGLE_PLACES = process.env.GOOGLE_PLACES || "";
/**
 * PlaceController.js
 *
 * @description :: Server-side logic for managing Places and Users.
 */
module.exports = {
  search: function (req, res) {
    var placeArray = [];
    var placesIDs = [];
    var query = req.query.query || "";
    var isOpennow = req.query.opennow ? "&opennow" : "";
    var url = "https://maps.googleapis.com/maps/api/place/textsearch/json" +
                "?key=" + GOOGLE_PLACES +"&query="+ query + isOpennow;

    request({url: url}, function(error, response, body) {
      if (!error) {
        // placeArray = MYFILE.results; Uncomment to use offline file
        placeArray = JSON.parse(body).results;
        placesIDs = placeArray.map(function(p){ return p.id});

        PlaceModel.find({uid: {$in: placesIDs}}, function (err, Places) {
          if (err || !Places) {
            return res.status(500).json({
              message: 'Error when getting Place.',
              error: err
            });
          }

          placeArray.map(function(place){
            var vote = 0;
            for (var i = 0; i < Places.length; i++) {
              if (place.id === Places[i].uid) {
                vote = Places[i].countGoers();
                break;
              }
            }
            place.votes = vote;
            return place;
          });
          console.log("Success: API Fetched");
          return res.json({'results': placeArray})
        });

      } else {
        console.log("Error when fetching results from API");
        return res.json({'results':{}})
      }
    });
  },
  goToPlace: function (req, res) {
    var id = req.params.id;
    var currentUserID = req.user._id;
    PlaceModel.findOne({uid: id}, function (err, Place) {
      if (err) {
        return res.status(500).json({
            message: 'Error when getting Place.',
            error: err
        });
      }
      if (!Place) {
        var Place = new PlaceModel({
          uid: id,
          goers: [req.user]
        });

        Place.save(function (err, newPlace) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Place',
                    error: err
                });
            }
            console.log("Success: Created new Place Model");
            return res.status(201).json(newPlace);
        });

      } else {
        var userIndex = Place.goers.indexOf(currentUserID);
        if (userIndex > -1) {
          /*
          * If the user is in Goer list remove him
          * If he's the last user remove the object
          */
          Place.removeUser(currentUserID);
          if (Place.countGoers() === 0) {
            Place.remove(function(errorRmoving){
              if (!errorRmoving) {
                console.log("Success: removing object, last user removed");
                return res.status(200).json({});
              }
              return res.status(500).json({
                  message: 'Error when removing Place',
                  error: err
              });
            });
          }
        } else {
          Place.goers.push(req.user);
          Place.save(function (err, Place) {
              if (err) {
                  return res.status(500).json({
                      message: 'Error when updating Place',
                      error: err
                  });
              }
              console.log("Success: Add new goer to goers");
              return res.status(201).json(Place);
          });
        }
      }
    })
  },
    // Used for testing only
    /**
     *
     */
    list: function (req, res) {
        PlaceModel.find(function (err, Places) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Place.',
                    error: err
                });
            }
            return res.json(Places);
        });
    },

    /**
     *
     */
    show: function (req, res) {
        var id = req.params.id;
        PlaceModel.findOne({_id: id}, function (err, Place) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Place.',
                    error: err
                });
            }
            if (!Place) {
                return res.status(404).json({
                    message: 'No such Place'
                });
            }
            return res.json(Place);
        });
    },
};

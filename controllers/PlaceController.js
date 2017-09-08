var UserModel = require('../models/UserModel.js');
var PlaceModel = require('../models/PlaceModel.js');
var request = require('request');
var env = require('dotenv').load();
//Offline JSON file to not waste limited requests (تقشف)
var MYFILE = require('./MYFILE').results;
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
      if (!error && response.statusCode === 200) {
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

          return res.json({'results': placeArray})
        });

      } else {
        return res.json({'results':{}})
      }
    });
  },



  /**************************************************************/
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

    /**
     *
     */
    create: function (req, res) {
// TODO:
        PlaceModel.save(function (err, Place) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Place',
                    error: err
                });
            }
            return res.status(201).json(Place);
        });
    },
};

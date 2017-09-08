var UserModel = require('../models/UserModel.js');
var PlaceModel = require('../models/PlaceModel.js');
var request = require('request');
var env = require('dotenv').load();
// var MYFILE = require('./MYFILE').results; Offline JSON file to not waste limited requests (تقشف)
var GOOGLE_PLACES = process.env.GOOGLE_PLACES || "";
/**
 * PlaceController.js
 *
 * @description :: Server-side logic for managing Places and Users.
 */
module.exports = {
  search: function (req, res) {
    var query = req.query.query || "";
    var isOpennow = req.query.opennow ? "&opennow" : "";
    var url = "https://maps.googleapis.com/maps/api/place/textsearch/json" +
                "?key=" + GOOGLE_PLACES +"&query="+ query + isOpennow;
    request({url: url}, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        return res.json({'results':JSON.parse(body).results})
      } else {
        return res.json({'results':{}})
      }
    });
    // return res.json({'results': MYFILE.results})
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

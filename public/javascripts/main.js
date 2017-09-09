var apiURL = window.location.origin + '/api/places/search'
var serverCall;
/**
 * Actual demo
 */

var myApplication = new Vue({

  el: '#app',

  data: {
    isLoading: false,
    placesList: [],
    isOpennow: false,
    query: "",
    goingTo: '',
  },

  created: function () {
    this.fetchLocalStorage();
    this.fetchData();
    this.isLoading = false;
  },

  watch: {
    query: 'fetchData',
    isOpennow: 'fetchData',
    goingTo: function(){
      myApplication.$forceUpdate();
    }
  },

  methods: {
    fetchLocalStorage: function () {
      this.query = localStorage.getItem("query_fcc_app") || "";
      this.isOpennow = JSON.parse(localStorage.getItem("isopennow_fcc_app")) || false;
    },
    fetchData: function () {
      if (this.query === "") {
        this.isLoading = false;
        return 0;
      } else {
        clearTimeout(serverCall);
        this.isLoading = true;
        var xhr = new XMLHttpRequest();
        var _this = this;
        serverCall = setTimeout(function(){
          console.log("Calling: " + apiURL + "?query=" + _this.query + "&opennow=" + _this.isOpennow);
          xhr.open('GET', apiURL + "?query=" + _this.query + "&opennow=" + _this.isOpennow);
          xhr.onload = function () {
            _this.placesList = JSON.parse(xhr.responseText).results;
            _this.isLoading = false;
          }
          xhr.send();
          localStorage.setItem('query_fcc_app', _this.query);
          localStorage.setItem('isopennow_fcc_app', _this.isOpennow);
        },1000);

      }
    },
    goToPlace: function (placeID) {
      var xhrr = new XMLHttpRequest();
      var _this = this;
      var place;
      var objindex;
      xhrr.open('GET', apiURL + "/goto/" + placeID);
      xhrr.onload = function () {
        place = JSON.parse(xhrr.responseText);
        objindex = _.findIndex(_this.placesList, {'id': placeID});
        if (!place || _.isEmpty(place)) {
          _this.placesList[objindex].votes = 0;
        } else {
          _this.placesList[objindex].votes = place.goers.length;
        }
        this.goingTo = new Date().getTime();
      }
      xhrr.send();
    },

  }
})

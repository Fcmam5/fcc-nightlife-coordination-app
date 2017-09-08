var apiURL = window.location + 'api/places/search'
var serverCall;
/**
 * Actual demo
 */

var myApplication = new Vue({

  el: '#app',

  data: {
    placesList: null,
    isOpennow: false,
    query: "restaurent",
  },

  created: function () {
    this.fetchData()
  },

  watch: {
    query: 'fetchData',
    isOpennow: 'fetchData',
  },

  methods: {
    fetchData: function () {
      clearTimeout(serverCall);
      var xhr = new XMLHttpRequest();
      var _this = this;
      serverCall = setTimeout(function(){
        xhr.open('GET', apiURL + "?query=" + _this.query + "&opennow=" + _this.isOpennow);
        xhr.onload = function () {
          _this.placesList = JSON.parse(xhr.responseText).results;
        }
        xhr.send();
      },2000);
    },
    goToPlace: function (placeID) {
      // SEND USERNAME
    },
  }
})

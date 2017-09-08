var apiURL = window.location + 'api/places/search'
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
    goingTo:[]
  },

  created: function () {
    this.fetchData();
    this.isLoading = false;
  },

  watch: {
    query: 'fetchData',
    isOpennow: 'fetchData',
  },

  methods: {
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
          xhr.open('GET', apiURL + "?query=" + _this.query + "&opennow=" + _this.isOpennow);
          xhr.onload = function () {
            _this.placesList = JSON.parse(xhr.responseText).results;
            _this.isLoading = false;
          }
          xhr.send();
        },1000);

      }
    },
    goToPlace: function (placeID) {
      // SEND USERNAME
    },
  }
})

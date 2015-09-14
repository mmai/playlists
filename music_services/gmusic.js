var Q = require('q');
var Playmusic = require('playmusic');

var Gmusic = function (options) {
  this.logged_in = false
  this.api = new Playmusic();
  this.options = options;
  this.callbacks_store_name = options.callbacks_store_name;//Required for browser
  this.store = {
    tracks:[]
  };
};

Gmusic.prototype.checklogin = function checklogin (){
    var deferred = Q.defer();
    if (this.logged_in) {
      // console.log("already logged in");
      deferred.resolve(true);
    } else {
      this.api.init({ email: this.options.email, password: this.options.password }, function (err){
          if (err) {
            // console.error(err);
            deferred.reject(err);
          } else {
            this.logged_in = true;
            // console.log("logged in");
            deferred.resolve(true);
          }
        });
    }
    return deferred.promise;
}

Gmusic.prototype.getPlaylists = function(){
    var deferred = Q.defer();
    that = this;

    this.checklogin().then(function(){
        that.api.getPlayLists(function(err, data) {
            deferred.resolve(data.data.items);
          });
      });
    return deferred.promise;
  };

Gmusic.prototype.fetchAllTracks = function fetchAllTracks(){
    var deferred = Q.defer();
    that = this;

    if (this.store.tracks.length > 0){
      deferred.resolve(this.store.tracks);
    } else {
      this.checklogin().then(function(){
          that.api.getAllTracks({limit:30000}, function(err, data) {
              that.store.tracks = data.data.items;
              deferred.resolve(that.store.tracks);
            });
        });
    }
    return deferred.promise;
  };

Gmusic.prototype.getLovedTracks = function getLovedTracks(){
    var deferred = Q.defer();
    that = this;

    this.fetchAllTracks().then(function(allTracks){
        var searchResults = allTracks.filter(function(track) {
            return (track.rating > 0 );
          });
        deferred.resolve(searchResults);
      });
    return deferred.promise;
  };

module.exports = Gmusic;

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
    that = this;

    if (this.logged_in) {
      // console.log("already logged in");
      deferred.resolve(true);
    } else {
            // console.log("logging in");
      this.api.init({ email: this.options.email, password: this.options.password }, function (err){
          if (err) {
            console.error(err);
            deferred.reject(err);
          } else {
            that.logged_in = true;
            // console.log("logged in");
            deferred.resolve(true);
          }
        });
    }
    return deferred.promise;
}

Gmusic.prototype.search = function search (track){
    var deferred = Q.defer();
    that = this;

    this.checklogin().then(function(){
        var searchstring = track.name + " " + track.artist.name;
        that.api.search(searchstring, 5, function(err, data) {
            var songs = data.map(function(song){
                    return {
                        id: song.track.id,
                        title: song.track.title,
                        artist: {name:song.track.artist}
                    };
                });
            deferred.resolve({songs:songs, track: track});
          });
      });
    return deferred.promise;
};

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

  // gets all playlists and all entries on each
Gmusic.prototype.getPlaylistsEntries = function(){
    var deferred = Q.defer();
    that = this;

    this.checklogin().then(function(){
        // console.log("logged in");
        that.api.getPlayListEntries(function(err, data) {
        // console.error(err);
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
              if (err){
                deferred.reject(err);
              } else {
                that.store.tracks = data.data.items.map(function(track){
                    return {
                      id: track.id,
                      title: track.title,
                      album: track.album,
                      rating: track.rating,
                      artist: {name: track.artist}
                    };
                  });
                deferred.resolve(that.store.tracks);
              }
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
            return (track.rating > 4 );
          });
        deferred.resolve(searchResults);
      });
    return deferred.promise;
  };

module.exports = Gmusic;

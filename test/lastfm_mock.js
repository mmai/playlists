var Q = require('q');

var Lastfm = function (api_key, user) {
  this.user = user;
  this.api_key = api_key;
};

Lastfm.prototype.getLovedTracks = function(){
    return this.getPlaylist();
};

Lastfm.prototype.getPlaylist = function(name){
  var deferred = Q.defer();

  var tracks = [
      { name: "01 aa", artist: {name: "Abob"}},
      { name: "04 bb", artist: {name: "Qsdfsqdf"}},
      { name: "06 vbvbv", artist: {name: "Vovovo"}},
      { name: "05 ooowww", artist: {name: "CCCVVoqd"}}
  ];

  deferred.resolve(tracks);
  return deferred.promise;
};

module.exports = Lastfm;

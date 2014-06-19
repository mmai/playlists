var Q = require('q');

var Lastfm = function (options) {
  this.user = options.user;
  this.api_key = options.key;
  this.callbacks_store_name = options.callbacks_store_name;//Required for browser
};

Lastfm.prototype.getLovedTracks = function(){
  var deferred = Q.defer();

  that = this;
  var limit = 50;
  var page_number = 1;
  var tracks = [];
  
  function getLovedPage(page_number){
      var url = 'http://ws.audioscrobbler.com/2.0/?method=user.getlovedtracks&format=json&api_key=' + that.api_key + '&user=' + that.user + '&limit=' + limit + '&page='+page_number;
//      var url = 'mock_lastfm.js?test=test';
//      console.log('fetching ' + url);

    var makeUrl = function (callbackName){
        if (typeof callbackName === 'undefined'){
            //no callback name : called from node
            return url;
        } else {
            //callback name provided : need JSONP
            return url + "&callback=" + callbackName;
        }
    };

      that.serviceRequest(makeUrl, function (err, data) {
              if (err){
                  deferred.reject(err);
              } else if (!data.lovedtracks.track){
                  deferred.reject(new Error("Lastfm user '"+that.user+"' has no loved tracks"));
              } else {
                  tracks = tracks.concat( data.lovedtracks.track);
                  if (data.lovedtracks['@attr'].totalPages <= page_number){
                      //Decode uri strings
                      tracks = tracks.map(function(track){
                              return {
                                  id: track.id,
                                  name: decodeURIComponent(track.name),
                                  url: decodeURIComponent(track.url),
                                  artist: {name: decodeURIComponent(track.artist.name)}
                              };
                          });
                      deferred.resolve(tracks);
                  } else {
                      page_number += 1;
                      getLovedPage(page_number);
                  }
              }
          });
  }

  getLovedPage(page_number);

  return deferred.promise;
};

Lastfm.prototype.getPlaylists = function(){
    var deferred = Q.defer();
    that = this;
    var limit = 50;
    var page = 1;
    var playlists = [];
    var url = 'http://ws.audioscrobbler.com/2.0/?method=user.getPlaylists&format=json&callback=cb&api_key=' + that.api_key + '&user=' + that.user + '&limit=' + limit + '&page='+page;
    jsonpClient(url, function (err, data) {
            if (err){
                console.log(err);
            }
            playlists = playlists.concat( data.playlists.playlist);
            deferred.resolve(playlists);
        });
    return deferred.promise;
};

module.exports = Lastfm;

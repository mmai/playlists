var Q = require('q');

var Spotify = function(options) {
    this.name = "spotify";
//    this.api_key = options.key;
//    this.callbacks_store_name = options.callbacks_store_name;//Required for browser
};

Spotify.prototype.search = function(track){
    var that = this;
    var deferred = Q.defer();
    var searchstring = track.name + " " + track.artist.name;
    var songs = [];

    var callback = function (data) {
        /*if (res == "You hit the rate limit, wait 10 seconds and try again"){
          setTimeout(function(){spotify.search(searchstring, callback);}, 10000);
        } else {
        */
        try {
            var songs = data.tracks.map(function(track){
                    return {
                        url: track.href,
                        id: track.href
                    };
                });
            deferred.resolve({songs:songs, searchstring: searchstring});
        } catch(e){
            console.log(e.message);
            deferred.reject(e);
        }
    };

    var url = "http://ws.spotify.com/search/1/track.json?q="+escape(searchstring);
    that.serviceRequest(url, callback);

    return deferred.promise;
};

module.exports = Spotify;

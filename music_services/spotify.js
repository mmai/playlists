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

    var callback = function (err, data) {
        /*if (res == "You hit the rate limit, wait 10 seconds and try again"){
          setTimeout(function(){spotify.search(searchstring, callback);}, 10000);
        } else {
        */
        try {
            var songs = data.tracks.map(function(track){
                    return {
                        url: track.href,
                        title: track.name,
                        id: track.href
                    };
                });
            deferred.resolve({songs:songs, track: track});
        } catch(e){
            console.log(e.message);
            deferred.reject(e);
        }
    };

    var url = "http://ws.spotify.com/search/1/track.json?q="+escape(searchstring);
    var makeUrl = function (callbackName){
        if (typeof callbackName === 'undefined'){
            //no callback name : called from node
            return url;
        } else {
            //callback name provided : need JSONP
            throw new Error("Grooveshark does not provide JSONP");
        }
    };

    that.serviceRequest(makeUrl, callback);

    return deferred.promise;
};

module.exports = Spotify;

var Q = require('q');

var Soundcloud = function(options) {
    this.name = "soundcloud";
    this.api_key = options.key;
    this.callbacks_store_name = options.callbacks_store_name;//Required for browser
};

Soundcloud.prototype.search = function(track){
    var that = this;
    var deferred = Q.defer();
    var searchstring = track.name + " " + track.artist.name;

    var callback = function (data) {
            var songs = data.map(function(track){
                    return {
                        url: track.permalink_url,
                        id: track.id,
                        title: track.title
                    };
                });
            deferred.resolve({songs:songs, track: track});
        };

    var url = "https://api.soundcloud.com/tracks.json?consumer_key=" + that.api_key + "&filter=streamable&q="+searchstring;

    that.serviceRequest(url, callback);

    return deferred.promise;
};

module.exports = Soundcloud;

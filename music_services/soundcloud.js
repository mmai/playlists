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
    var url = "https://api.soundcloud.com/tracks.json?consumer_key=" + that.api_key + "&filter=streamable&q="+searchstring;

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
            var songs = data.map(function(track){
                    return {
                        url: track.permalink_url,
                        id: track.id,
                        title: track.title
                    };
                });
            deferred.resolve({songs:songs, track: track});
        }
    );

    return deferred.promise;
};

module.exports = Soundcloud;

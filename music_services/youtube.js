var Q = require('q');

var Youtube = function(options) {
    this.name = "youtube";
    this.api_key = options.key;
    this.callbacks_store_name = options.callbacks_store_name;//Required for browser
};

Youtube.prototype.search = function(track){
    var that = this;
    var deferred = Q.defer();
    var searchstring = track.name + " " + track.artist.name;
    var songs = [];

    var callback = function (err, data) {
        var id, title, url;
        for (itemId in data.items){
            id = data.items[itemId].id.videoId;
            title = data.items[itemId].snippet.title;
            songs.push({
                    id: track.id,
                    url: "http://www.youtube.com/watch?v=" + id,
                    title: title
                });
        }
        deferred.resolve( {songs:songs, track: track});
    };

    var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=" + that.api_key + "&q="+escape(searchstring);

    var makeUrl = function (callbackName){
        if (typeof callbackName === 'undefined'){
            //no callback name : called from node
            return url;
        } else {
            //callback name provided : need JSONP
            return url + "&callback=" + callbackName;
        }
    };

    that.serviceRequest(makeUrl, callback);

    return deferred.promise;
};

module.exports = Youtube;

var Q = require('q');

var Hypem = function(options) {
    options = options || {};
    this.name = "hypem";
    this.callbacks_store_name = options.callbacks_store_name;//Required for browser
};

Hypem.prototype.search = function(track){
    var that = this;
    var deferred = Q.defer();
    var searchstring = track.name + " " + track.artist.name;
    var songs = [];
    var url = "http://api.hypem.com/playlist/search/"+escape(searchstring)+"/json/1";

    var makeUrl = function (callbackName){
        if (typeof callbackName === 'undefined'){
            //no callback name : called from node
            return url;
        } else {
            //callback name provided : need JSONP
            throw new Error("JSONP not available for Hype Machine")
//            return url + "&output=jsonp&callback=" + callbackName;
        }
    };

    that.serviceRequest(makeUrl, function (err, data) {
        var id, title, url;
        var item;
        if (err){
            deferred.reject(err);
        } else if (data === 'undefined' || typeof(data) === 'undefined'){
            deferred.reject(new Error("nothing"));
        } else {
            for (itemId in data.data){
                song = data.data[itemId];
                id = song.id;
                title = song.title;
                songs.push({
                        id: track.id,
                        url: song.link,
                        title: song.title
                    });
            }
            deferred.resolve( {songs:songs, track: track});
        }
    });

    return deferred.promise;
};

module.exports = Hypem;

var Q = require('q');

var Deezer = function(options) {
    options = options || {};
    this.name = "deezer";
    this.callbacks_store_name = options.callbacks_store_name;//Required for browser
};

Deezer.prototype.search = function(track){
    var that = this;
    var deferred = Q.defer();
    var searchstring = track.name + " " + track.artist.name;
    var songs = [];
    var url = "http://api.deezer.com/search?q=" + escape(searchstring);

    var makeUrl = function (callbackName){
        if (typeof callbackName === 'undefined'){
            //no callback name : called from node
            return url + "&output=json";
        } else {
            //callback name provided : need JSONP
            return url + "&output=jsonp&callback=" + callbackName;
        }
    };

    that.serviceRequest(makeUrl, function (err, data) {
        var id, title, url;
        var item;
        if (err){
            deferred.reject(err);
        }

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
    });

    return deferred.promise;
};

module.exports = Deezer;

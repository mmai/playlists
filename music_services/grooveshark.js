var Q = require('q');

var Grooveshark = function(options) {
    this.name = "grooveshark";
    this.api_key = options.key;
    this.callbacks_store_name = options.callbacks_store_name;//Required for browser
};

Grooveshark.prototype.search = function(track){
    var that = this;
    var deferred = Q.defer();
    var searchstring = track.name + " " + track.artist.name;
    var songs = [];

    var callback = function (err, data) {
        var id, title, url;
        var item;
        if (err){
            deferred.reject(err);
        }
        for (itemId in data){
            song = data[itemId];
            id = song.SongId;
            title = song.SongName;
            songs.push({
                    id: track.id,
                    url: song.Url,
                    title: song.SongName
                });
        }
        deferred.resolve( {songs:songs, track: track});
    };

    var url = "http://tinysong.com/s/" + escape(searchstring) + "?format=json&limit=3&key=" + that.api_key;

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

module.exports = Grooveshark;

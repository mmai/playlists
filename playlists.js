var request;
var q = require('q');
var musicServices = require('./music_services');

var Playlist = function Playlist(songs){
    this.songs = songs.map(function(song, id){
            if (song.id === undefined){
                song.id = id;
            }
            return song;
        });
};

Playlist.prototype.toText = function(){
    return this.songs.map(function(song){
            return song.url;
        }).join("\n");
}

//Common musicService functions

/* searchPlaylist
 * initialPlaylist : playlist to search 
 * searchStatusCallback : function to call when a song have been found (or not): can be used to display the result of a song search
 */
searchPlaylist = function searchPlaylist(initialPlaylist, searchStatusCallback){
            searchStatusCallback = searchStatusCallback || function(){};
            var deferred = q.defer();
            var playlist = [];
            var that = this;
            var searchPromises = initialPlaylist.songs.map(function(initialTrack){
                    var searchPromise = that.search(initialTrack);
                    searchPromise.then(function(res){
                            var foundSongs = res.songs;
                            var searchedTrack = res.track;
                            searchedTrack.id = initialTrack.id;
                            if (foundSongs && foundSongs.length > 0 ) {
                                searchStatusCallback(searchedTrack, foundSongs[0]);
                                playlist.push(foundSongs[0]);
                            } else {
                                searchStatusCallback(searchedTrack, false);
                            }
                        }).done();
                    return searchPromise;
                });

            q.all(searchPromises).then(function(res){
                    deferred.resolve(new Playlist(playlist));
                }).done();
            return deferred.promise;
        };

serviceRequest = function(url, callback) {
    if (typeof(this.callbacks_store_name) !== 'undefined'){
        //called in browser, need jsonp
        url += '&callback=' + this.callbacks_store_name + '.' + this.getUniqueCallbackName(callback);
        var script = document.createElement('script');
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    } else {
        //Called in node
        request = request || require('request');
        request(url, function (err, res, body) {
                if (err || !res || res.statusCode >= 400) {
                    err = new Error('Could not fetch url ' + url_to_fetch + ', with status ' + (res && res.statusCode) + '. Got error: ' + (err && err.message) + '.');
                }
                callback(JSON.parse(body));
            });
    }
}

getUniqueCallbackName = function(callback) {
    that = this;
    that.callbacks_store = eval(that.callbacks_store_name);
    that.callbacks_store.count = that.callbacks_store.count || 0;

    var name = "fn" + that.callbacks_store.count++;
    that.callbacks_store[name] = function() {
        callback.apply(this, arguments);
    }
    return name;
}

var playlists = {
    Playlist: Playlist,
    makeMusicService: function makeMusicService(bareMusicService, options){
        if (typeof bareMusicService === "string"){
            bareMusicService = musicServices[bareMusicService];
        }
        bareMusicService.prototype.searchPlaylist = searchPlaylist;
        bareMusicService.prototype.serviceRequest = serviceRequest;
        bareMusicService.prototype.getUniqueCallbackName = getUniqueCallbackName;
        return new bareMusicService(options);
    },
}

module.exports = playlists;

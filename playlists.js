var q = require('q');

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
            var searchPromises = initialPlaylist.songs.map(function(track){
                    var searchPromise = that.search(track);
                    searchPromise.then(function(res){
                            var foundSongs = res.songs;
                            var searchedTrack = res.track;
                            searchedTrack.id = track.id;
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

var playlists = {
    Playlist: Playlist,
    makeMusicService: function makeMusicService(bareMusicService, options){
        bareMusicService.prototype.searchPlaylist = searchPlaylist;
        return new bareMusicService(options);
    },
}

module.exports = playlists;

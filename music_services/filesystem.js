var Q = require('q');
var glob = require('glob');

var FileSystem = function(options) {
    this.name = "filesystem";
    this.basepath = options.basepath;
    this.globSearch = options.globSearch;
};

FileSystem.prototype.search = function(track){
    var that = this;
    var deferred = Q.defer();
    var songs = [];

    if (track.album == undefined){
      track.album = "?"
    }

    if (track.name == undefined){
      track.name = track.title; 
    }

    var searchstring = this.globSearch(this.basepath, normalize(track.artist.name), normalize(track.album), normalize(track.name));
    // console.log(searchstring);

    glob(searchstring, {nocase:true}, function(err, files){
        if (err){
          console.log(err);
          deferred.reject(err);
        }
        var songs = files.map(function(file){
            return {
              url:file,
              name:track.name,
              artist:track.artist.name
            }
          });
        deferred.resolve( {songs:songs, track: track});
      });

    return deferred.promise;

    function normalize(str){
      str = str.replace(/the/ig, '*');
      return str.replace(/[^a-z0-9]/ig, '*');
    }
};

module.exports = FileSystem;

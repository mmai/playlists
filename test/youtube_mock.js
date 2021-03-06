var Q = require('q');
var fs = require('fs');
var sys = require('sys');

var Youtube = function() {};

Youtube.prototype.search = function(track){

    var deferred = Q.defer();
    var songs = [
        {title: track.title, url: "http://youtube.com/"+track.title, id: track.id},
        {title: track.title, url: "http://youtube.com/bb", id: "bb"},
    ];
    deferred.resolve( {songs:songs, track: track});
    return deferred.promise;
};


Youtube.prototype.showPlaylist = function(youtube_songs){
    fs.writeFile("/tmp/youtube.html", this.html_page(youtube_songs), function(err) {
            if(err) {
                sys.puts(err);
            } else {
                var exec = require('child_process').exec;
                var child = exec("firefox /tmp/youtube.html &", function (error, stdout, stderr) {
                        sys.print('stdout: ' + stdout);
                        sys.print('stderr: ' + stderr);
                        if (error !== null) {
                            console.log('exec error: ' + error);
                        }
                    });
            }
        });
};

module.exports = Youtube;

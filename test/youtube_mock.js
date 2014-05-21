var Q = require('q');
var _ = require('lodash');
var fs = require('fs');
var sys = require('sys');

var Youtube = function() {};

Youtube.prototype.search = function(searchstring){

    var deferred = Q.defer();
    var songs = [
        {title: searchstring, url: "http://youtube.com/"+searchstring, id: searchstring.substring(0,3)},
        {title: searchstring, url: "http://youtube.com/bb", id: "bb"},
    ];
    deferred.resolve( {songs:songs, searchstring: searchstring});
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

Youtube.prototype.html_page = function(songs){
  html =  '<html> <head> <script language="javascript"> function show_video(id){ document.getElementById("player").setAttribute("src", "http://www.youtube.com/embed/"+id); } </script> </head> <body onload="show_video(\''+songs[0].id+'\');"><div  style="float:right;"><h3>Click on a title to open it</h3><ul id="playlist">';
  html += _.map(songs, function(song){return '<li onclick="show_video(\''+song.id+'\');">'+song.title+'</li>';}).join('');
  html += '</ul></div> <iframe id="player" title="YouTube video player" width="425" height="349" src="" frameborder="0" allowfullscreen></iframe> </body></html>';
  return html;
};

module.exports = Youtube;

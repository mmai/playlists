# Playlists

Music services playlist manager

A common wrapper around music providers APIs.

* LastFM
* Youtube
* Spotify
* Deezer
* Google Music
* soundcloud
* local file system

Each service should be initialized with its own settings.

```javascript
var playlists_manager = require("playlists");

var gmusic = playlists_manager.makeMusicService( "gmusic", {
    email: 'xxxxxx@gmail.com',
    password: 'xxxxx'
  });

var filesystem = playlists_manager.makeMusicService("filesystem", {
    basepath: '/home/someuser/music/',
    globSearch: function(basepath, artist, album, title){ //glob pattern for searching music files
      return basepath + '*' + artist + "*/*" + album + "*/*" + title + "*.*";
    }
  });

gmusic.getLovedTracks().then(function(lovedTracks){
    lovedTracks.forEach(function(track){
        filesystem.search(track).then(function(searchResult){
            var searchTrack = searchResult.track;
            if (searchResult.songs.length == 0){
              console.log("NOT FOUND: " + searchTrack.title + " / " +searchTrack.artist.name);
            } else {
              console.log(searchResult.songs[0].url);
            }
          });
      });
  });
```

See https://github.com/mmai/playlists-bin.git and https://github.com/mmai/playlists-web for other usage examples in node.js and the browser.


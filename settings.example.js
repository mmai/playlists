module.exports = {
  filesystem: {
    basepath: '/home/user/music/',
    globSearch: function(basepath, artist, album, title){
      //glob pattern for searching music files
      return basepath + '*' + artist + "*/*" + album + "*/*" + title + "*.*";
    }
  },
  lastfm: {
    user: 'xxxx',
    key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  },
  soundcloud: {
    key: 'xxxxxxxxxxxxxxxxxxxxxx'
  },
  youtube: {
    key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  },
  gmusic: {
    email: 'xxxxxxxxx@gmail.com',
    password: 'xxxxxxx'
  }
};

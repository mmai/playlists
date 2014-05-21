var chai = require("chai");
var expect = chai.expect;

var playlists_manager = require("../playlists");

var YoutubeMock = require('./youtube_mock');
var LastfmMock = require('./lastfm_mock');

describe( 'makeMusicService', function() {
        describe('creation', function(){
                var musicService;
                beforeEach(function(){
                        musicService = playlists_manager.makeMusicService(YoutubeMock);
                    })
                it('should create a music service object', function(){
                        expect(musicService).instanceof(Object);
                    });
            });
    });

describe('MusicService', function(){
        var lastfmService;
        beforeEach(function(){
                var options = {key: 'fake_lastfm_api_key', user: 'mmai'};
                lastfmService = playlists_manager.makeMusicService(LastfmMock, options);
            });

        describe('getLovedTracks', function(){
                it('should return a playlist', function(done){
                        lastfmService.getLovedTracks().then(function(playlist){
                                expect(playlist).to.not.be.null;
                                expect(playlist).to.have.length.above(0);
                                done();
                            });
                    })
            });

        describe('searchPlaylist', function(){
                it('should return a list of songs with their associated urls', function(done){
                        var youtube = playlists_manager.makeMusicService(YoutubeMock);
                        var initialPlaylist = new playlists_manager.Playlist([
                                { title: "01 aa", artist: {name: "Abob"}},
                                { title: "04 bb", artist: {name: "Qsdfsqdf"}},
                                { title: "06 vbvbv", artist: {name: "Vovovo"}},
                                { title: "05 ooowww", artist: {name: "CCCVVoqd"}}
                            ]);
                        youtube.searchPlaylist(initialPlaylist).then(function(playlist){
                                expect(playlist.songs[0].url).to.not.be.null;
                                done();
                            });

                    });
            });
    });

describe('Playlist', function(){
        beforeEach(function(){
                var songs = [
                    { title: "01 a test", url: 'http://aaa', artist: {name: "AAA"}},
                    { title: "04 from a cool playlist", url: 'http://bbb', artist: {name: "BBB"}},
                    { title: "06 designed with love", url: 'http://ccc', artist: {name: "CCC"}},
                ];
                playlist = new playlists_manager.Playlist(songs);
            });
        describe('toText', function(){
                it('should return a string representation of a song list', function(){
                        expect(playlist.toText()).to.equal("http://aaa\nhttp://bbb\nhttp://ccc");
                    });
            });
})

var chai = require("chai");
var expect = chai.expect;

var Spotify = require("../music_services/spotify");
var playlists = require('..');

describe('Spotify', function(){
        var spotify;
        beforeEach(function(){
                spotify = playlists.makeMusicService(Spotify);
            });

        describe('search', function(){
                it('should return a list of found songs', function(done){
                        var track = {
                            name: 'where is my mind',
                            artist: {
                                name: 'Pixies'
                            }
                        };
                        spotify.search(track).then(function(searchResult){
                                expect(searchResult).to.not.be.null;
                                expect(searchResult.songs).to.have.length.above(0);
                                done();
                            });
                    });
            });

    });

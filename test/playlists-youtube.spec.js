var chai = require("chai");
var expect = chai.expect;

var Youtube = require("../music_services/youtube");
var playlists = require('..');
var settings = require("../settings");

describe('Youtube', function(){
        var youtube;
        beforeEach(function(){
                youtube = playlists.makeMusicService(Youtube, settings.youtube);
        });

        describe('search', function(){
                it('should return a list of found songs', function(done){
                        var track = {
                            name: 'where is my mind',
                            artist: {
                                name: 'Pixies'
                            }
                        };
                        youtube.search(track).then(function(searchResult){
                                expect(searchResult).to.not.be.null;
                                expect(searchResult.songs).to.have.length.above(0);
                                done();
                            });
                    });
            });

    });

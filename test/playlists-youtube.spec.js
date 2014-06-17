var chai = require("chai");
var expect = chai.expect;

var Youtube = require("../music_services/youtube");
var playlists = require('..');

describe('Youtube', function(){
        var youtube;
        beforeEach(function(){
                youtube = playlists.makeMusicService(Youtube, {key: 'AIzaSyB1OG8q7t-tuVYfL6qVw9GZ-cvjO56X2j0'});
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

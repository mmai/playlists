var chai = require("chai");
var expect = chai.expect;

var Grooveshark = require("../music_services/grooveshark");
var playlists = require('..');

describe('Grooveshark', function(){
        var grooveshark;
        beforeEach(function(){
                grooveshark = playlists.makeMusicService(Grooveshark, {key: '61f57ab5afabe2840e08066ba9eb60d0'});
        });

        describe('search', function(){
                it('should return a list of found songs', function(done){
                        var track = {
                            name: 'where is my mind',
                            artist: {
                                name: 'Pixies'
                            }
                        };
                        grooveshark.search(track).then(function(searchResult){
                                expect(searchResult).to.not.be.null;
                                expect(searchResult.songs).to.have.length.above(0);
                                done();
                            });
                    });
            });

    });

var chai = require("chai");
var expect = chai.expect;

var Soundcloud = require("../music_services/soundcloud");
var playlists = require('..');

describe('Soundcloud', function(){
        var soundcloud;
        beforeEach(function(){
                soundcloud = playlists.makeMusicService(Soundcloud, {key: 'TiNg2DRYhBnp01DA3zNag'});
            });

        describe('search', function(){
                it('should return a list of found songs', function(done){
                        var track = {name: "where is my mind", artist:{name: "Pixies"}};
                        soundcloud.search(track).then(function(searchResult){
                                expect(searchResult).to.not.be.null;
                                expect(searchResult.songs).to.have.length.above(0);
                                done();
                            });
                    });
            });

    });

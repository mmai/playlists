var chai = require("chai");
var expect = chai.expect;

var Lastfm = require("../music_services/lastfm");
var playlists = require('..');

describe('Lastfm', function(){
        var lastfm;
        beforeEach(function(){
                lastfm = playlists.makeMusicService(Lastfm, {key: '1e049e903004205189901533570d81b1', user: 'mmai'});
            });

        describe('getLovedTracks', function(){
                it('should return a playlist', function(done){
                        this.timeout(4000);
                        lastfm.getLovedTracks().then(function(playlist){
                                expect(playlist).to.not.be.null;
                                expect(playlist).to.have.length.above(0);
                                done();
                            });
                    })
            });

    });

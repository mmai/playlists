var chai = require("chai");
var expect = chai.expect;

var Lastfm = require("../music_services/lastfm");
var playlists = require('..');
var settings = require("../settings");

describe('Lastfm', function(){
        var lastfm;
        beforeEach(function(){
                lastfm = playlists.makeMusicService(Lastfm, settings.lastfm);
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

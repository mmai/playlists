var chai = require("chai");
var expect = chai.expect;

var Gmusic = require("../music_services/gmusic");
var playlists = require('..');
var settings = require('../settings');

describe('Gmusic', function(){
        var gmusic;
        beforeEach(function(){
                gmusic = playlists.makeMusicService(Gmusic, settings.gmusic);
            });

        describe('getPlaylists', function(){
                it('should return a list of playlists', function(done){
                        this.timeout(4000);
                        gmusic.getPlaylists().then(function(playlists){
                            // console.log(playlists);
                            expect(playlists).to.not.be.null;
                            expect(playlists).to.have.length.above(0);
                            done();
                            });
                    })
            });

        // describe('getPlaylistsEntries', function(){
        //         it('should return a list of playlists with their entries', function(done){
        //                 this.timeout(10000);
        //                 gmusic.getPlaylistsEntries().then(function(tracks){
        // //                         console.log(JSON.stringify(tracks));
        //                     expect(tracks).to.not.be.null;
        //                     expect(tracks).to.have.length.above(0);
        //                     done();
        //                     });
        //             })
        //     });

        // describe('getLovedTracks', function(){
        //         it('should return tracks', function(done){
        //                 this.timeout(50000);
        //                 gmusic.getLovedTracks().then(function(tracks){
        //                         expect(tracks).to.not.be.null;
        //                         expect(tracks).to.have.length.above(0);
        //                         console.log(JSON.stringify(tracks));
        //                         done();
        //                     });
        //             })
        //     });

    });

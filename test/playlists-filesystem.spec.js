var chai = require("chai");
var expect = chai.expect;

var FileSystem = require("../music_services/filesystem");
var playlists = require('..');
var settings = require("../settings");

describe('FileSystem', function(){
        var filesystem;
        beforeEach(function(){
                filesystem = playlists.makeMusicService(FileSystem, settings.filesystem);
        });

        describe('search', function(){
                it('should return a list of found songs', function(done){
                        this.timeout(6000);
                        var track = {
                            name: 'Where is my mind',
                            artist: {
                                name: 'Pixies'
                            }
                        };
                        filesystem.search(track).then(function(searchResult){
                            console.log(searchResult);
                                expect(searchResult).to.not.be.null;
                                expect(searchResult.songs).to.have.length.above(0);
                                done();
                            });
                    });
            });

    });

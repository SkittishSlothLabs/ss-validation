'use strict';

var validate = require('../src/validate');
var exceptions = require('../src/exceptions');

var should = require('should');

describe("Validate", function() {
    it("should exist", function(done) {
        should.exist(validate);

        done();
    });

    it("should have a default state of 'checkOnly' set to false", function(done) {
        validate().checkOnly.should.be.False;

        done();
    });

    describe("#check", function() {
        it("should set the 'checkOnly' state in the validator to true", function(done) {
            var state = validate().check;

            state.checkOnly.should.be.True;

            done();
        });
    });

    describe("#isDefined", function() {
        it("should throw an exception if the state's current value is undefined", function(done) {
            var value = undefined;

            should.throws(
                function() {
                    validate(value).isDefined;
                },
                exceptions.ValueUndefinedException
            );

            done();
        });

        it("should not throw an exception if the state's current value is not undefined", function(done) {

            should.doesNotThrow(
                function() {
                    validate(null).isDefined;
                },
                exceptions.ValueUndefinedException
            );

            should.doesNotThrow(
                function() {
                    validate({}).isDefined;
                },
                exceptions.ValueUndefinedException
            )

            done();
        });
        
        it("should register an error if value is undefined and #check has been called", function(done) {
            var state = null;
            should.doesNotThrow(
                function() {
                    state = validate(undefined).check.isDefined;
                },
                exceptions.ValueUndefinedException
            );
            
            state.errors.should.have.length(1);
            state.errors[0].should.containEql("Specified value was undefined.");
            
            done();
        });
    });
    
    describe("#exists", function() {
        it("should throw an exception if the state's current value is null or undefined", function(done) {
            var value = undefined;

            should.throws(
                function() {
                    validate(value).exists;
                },
                exceptions.ValueDoesNotExistException
            );
            
            should.throws(
                function() {
                    validate(null).exists;
                },
                exceptions.ValueDoesNotExistException
            );

            done();
        });

        it("should not throw an exception if the state's current value is not null or undefined", function(done) {

            should.doesNotThrow(
                function() {
                    validate(5).exists;
                },
                exceptions.ValueDoesNotExistException
            );

            done();
        });
        
        it("should register an error if value is null or undefined and #check has been called", function(done) {
            var undefState = null;
            should.doesNotThrow(
                function() {
                    undefState = validate(undefined).check.exists;
                },
                exceptions.ValueDoesNotExistException
            );
            
            var nullState = null;
            should.doesNotThrow(
                function() {
                    nullState = validate(null).check.exists;
                },
                exceptions.ValueDoesNotExistException
            );
            
            undefState.errors.should.have.length(1);
            undefState.errors[0].should.containEql("Specified value was null or undefined.");
            
            nullState.errors.should.have.length(1);
            nullState.errors[0].should.containEql("Specified value was null or undefined.");
            
            done();
        });
    });
    
    describe("#ensure", function() {
        it("should throw exception on subsequent failures", function(done) {
            should.throws(
                function() {
                    validate(null).check.isDefined.ensure.exists;
                },
                exceptions.ValueDoesNotExistException
            );
            
            done();
        });
        
        it("should still contain errors from previous failures", function(done) {
            var state = validate(null).check.exists;
            should.throws(
                function() {
                    state.ensure.exists;
                },
                exceptions.ValueDoesNotExistException
            );
            
            state.errors.should.have.length(1);
            state.errors[0].should.containEql("Specified value was null or undefined.");
            
            done();
        });
    });
});
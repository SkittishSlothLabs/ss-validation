'use strict';

var ValueUndefinedException = function() {
    Error.call(this);

    this.message = "Specified value is undefined.";
    this.name = "ValueUndefinedException";
};

var ValueDoesNotExistException = function() {
    Error.call(this);
    
    this.message = "Specified value is null or undefined.";
    this.name = "ValueDoesNotExistException";
};

module.exports.ValueUndefinedException = ValueUndefinedException;
module.exports.ValueDoesNotExistException = ValueDoesNotExistException;
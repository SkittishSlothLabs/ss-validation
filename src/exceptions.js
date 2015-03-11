'use strict';

/**
 * @class ValueUndefinedException
 */
var ValueUndefinedException = function() {
    Error.call(this);
    
    /**
     * The message for this exception.
     */
    this.message = "Specified value is undefined.";
    this.name = "ValueUndefinedException";
    this.something = null;
};

var ValueDoesNotExistException = function() {
    Error.call(this);
    
    this.message = "Specified value is null or undefined.";
    this.name = "ValueDoesNotExistException";
};

var ValuesNotEqualException = function() {
    Error.call(this);
    
    this.message = "Specified values are not equal.";
    this.name = "ValuesNotEqualException";
}

module.exports.ValueUndefinedException = ValueUndefinedException;
module.exports.ValueDoesNotExistException = ValueDoesNotExistException;
module.exports.ValuesNotEqualException = ValuesNotEqualException;
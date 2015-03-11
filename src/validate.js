'use strict';

var ex = require('./exceptions');

/** @class ValidationState
 *  
 *  Fluent validation interface.
 */
function ValidationState() {
    this._checkOnly = false;
    this._currentValue = null;
    this._errors = [];
};

Object.defineProperties(ValidationState.prototype, {
    /**
     * Indicates that validation is in 'check-only' mode -- track errors but don't throw.
     * If this is `true` then errors are stored in an internal array.  If this is `false`
     * then any failure along the chain throws an exception.
     */
    "checkOnly": {
        get: function() {
            return this._checkOnly;
        },

        set: function(val) {
            this._checkOnly = val;
        }
    },
    
    /**
     *  The current value being validated.
     */
    "currentValue": {
        get: function() {
            return this._currentValue;
        },
        set: function(val) {
            this._currentValue = val;
        }
    },
    
    /**
     * Flags the validation stated as being in `checkOnly` mode.
     */
    "check": {
        get: function() {
            this._checkOnly = true;
            return this;
        }
    },
    
    /**
     * Sets `checkOnly` mode to `false`, so that **any** failures in a validation method 
     * called after this point result in an exception.
     */
    "ensure": {
        get: function() {
            this._checkOnly = false;
            return this;
        }
    },
    
    "errors": {
        get: function() {
            return this._errors;
        }
    },
    
    "exists": {
        get: function() {
            var val = this.currentValue;
            var error = ((val === null) || (val === undefined) || (typeof val === 'undefined'));
            if (error) {
                if (this.checkOnly === true) {
                    this.errors.push("Specified value was null or undefined.");
                } else {
                    throw new ex.ValueDoesNotExistException();
                }
            }

            return this;
        }
    },

    "isDefined": {
        get: function() {
            var val = this.currentValue;
            var error = ((val === undefined) || (typeof val === 'undefined'));
            if (error) {
                if (this.checkOnly === true) {
                    this.errors.push("Specified value was undefined.");
                } else {
                    throw new ex.ValueUndefinedException();
                }
            }

            return this;
        }
    }
});

ValidationState.prototype.equals = function(val) {
    var curVal = this.currentValue;
    var error = (curVal != val);
    if (error) {
        if (this.checkOnly === true) {
            this.errors.push("Specified values are not equal.");
        } else {
            throw new ex.ValuesNotEqualException();
        }
    }
    
    return this;
};

Object.seal(ValidationState);

function validate(arg) {
    var state = new ValidationState();
    state.currentValue = arg;
    return state;
};

module.exports = validate;
'use strict';

var ex = require('./exceptions');

function ValidationState() {
    this._checkOnly = false;
    this._currentValue = null;
    this._errors = [];
};

Object.defineProperties(ValidationState.prototype, {
    "checkOnly": {
        get: function() {
            return this._checkOnly;
        },

        set: function(val) {
            this._checkOnly = val;
        }
    },
    
    "currentValue": {
        get: function() {
            return this._currentValue;
        },
        set: function(val) {
            this._currentValue = val;
        }
    },
    "check": {
        get: function() {
            this._checkOnly = true;
            return this;
        }
    },
    
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

Object.seal(ValidationState);

function validate(arg) {
    var state = new ValidationState();
    state.currentValue = arg;
    return state;
};

module.exports = validate;
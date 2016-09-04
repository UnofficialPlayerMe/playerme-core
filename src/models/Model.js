/**
 * A model representing a Player.me User.
 * @memberOf module:models
 */
class Model {

    toString(){
        var str = '['+this.constructor.name;
        if (typeof this.id != 'undefined'){
            str += ' id="'+this.id+'"';
        }
        return str+']';
    }

    /**
     * Create a non-enumerable property
     * @param {string}  name                - Name of the property
     * @param {*}       [value=undefined]   - Initial value of the property
     * @param {boolean} [writable=true]     - If assignment operators can be used
     * @returns {module:models.Model}
     * @private
     */
    _definePrivate(name, value=undefined, writable=true){
        Object.defineProperty(this, name, {
            'value': value,
            'writable': writable,
            'enumerable': false
        });
        return this;
    }

    /**
     * Define an enumerable getter/setter
     * @param {string}      name                - Name of the accessor
     * @param {function}    [getter=undefined]  - Get method
     * @param {function}    [setter=undefined]  - Set method
     * @returns {module:models.Model}
     * @private
     */
    _defineAccessor(name, getter, setter){
        Object.defineProperty(this, name, {
            'get': getter || undefined,
            'set': setter || undefined,
            'enumerable': true
        });
        return this;
    }
}

export default Model;

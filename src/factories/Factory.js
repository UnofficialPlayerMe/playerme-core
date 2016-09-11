/**
 * The base factory class
 * @memberOf module:factories
 */
class Factory {
    /**
     * Update the `target` with the values of `source`, using `fields` as a guide
     * @param {object} source
     * @param {object} target
     * @param {module:factories.FactoryField[]} fields
     * @returns {object} Updated target
     */
    copyRemoteToLocal(source, target, fields){
        for (var i=0; i < fields.length; i++){
            var field = fields[i];
            if (source.hasOwnProperty(field.remoteFieldName) == false) continue;

            var value = source[field.remoteFieldName];
            if (field.parser){
                value = field.parser(value);
            }

            target[field.clientFieldName] = value;
        }
        return target;
    }

    /**
     * Get the fields that define the model this factory is for
     * @returns {module:factories.FactoryField[]}
     */
    getFields(){
        throw new Error("getFields not implemented on "+this.constructor.name);
    }

    buildFromResponse(obj){
        throw new Error("buildFromResponse not implemented on "+this.constructor.name);
    }

    buildMultipleFromResponse(obj){
        throw new Error("buildMultipleFromResponse not implemented on "+this.constructor.name);
    }
}

export default Factory;

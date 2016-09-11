import Factory from '../../Factory';
import FactoryField from '../../FactoryField';
import Avatar from '../../../models/account/info/Avatar';

import ImageDataFactory from '../../image/ImageDataFactory';
const imageDataFactory = new ImageDataFactory;

const Fields = [
    new FactoryField('id'),
    new FactoryField('user_id'),
    new FactoryField('filename', null, (obj) => imageDataFactory.buildFromResponse(obj)),
    new FactoryField('is_active'),
    new FactoryField('created_at'),
    new FactoryField('updated_at'),
    new FactoryField('deleted_at')
];

/**
 * A model representing a Player.me Account.
 * @memberOf module:models/account
 */
class AvatarFactory extends Factory {

    /** @inheritDoc */
    getFields(){
        return Fields;
    }

    /**
     * Build a single model from the passed object
     * @param obj
     * @return module:models/account/info.Avatar
     */
    buildFromResponse(obj){
        return super.buildFromResponse(obj, Avatar);
    }

    /**
     * Build multiple models from an array of objects
     * @param {object[]} arr
     * @return {module:models/account/info.Avatar[]}
     */
    buildMultipleFromResponse(arr){
        return super.buildMultipleFromResponse(arr, Avatar);
    }
}

export default AvatarFactory;

import Factory from '../Factory';
import FactoryField from '../FactoryField';
import ImageData from '../../models/image/ImageData';

const Fields = [
    new FactoryField('original'),
    new FactoryField('cached'),
    new FactoryField('original_filename'),
];

/**
 * A model representing a Player.me Account.
 * @memberOf module:models/account
 */
class ImageDataFactory extends Factory {

    /** @inheritDoc */
    getFields(){
        return Fields;
    }

    /**
     * Build a single model from the passed object
     * @param obj
     * @return module:models/image.ImageData
     */
    buildFromResponse(obj){
        return super.buildFromResponse(obj, ImageData);
    }

    /**
     * Build multiple models from an array of objects
     * @param {object[]} arr
     * @return {module:models/image.ImageData}
     */
    buildMultipleFromResponse(arr){
        return super.buildMultipleFromResponse(arr, ImageData);
    }
}

export default ImageDataFactory;

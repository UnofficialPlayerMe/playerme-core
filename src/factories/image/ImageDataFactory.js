import Factory from '../Factory';
import FactoryField from '../FactoryField';
import ImageData from '../../models/image/ImageData';

const Fields = [
    //TODO
    // new FactoryField('id'),
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
     * Build
     * @param obj
     * @return module:models/account.Account
     */
    buildFromResponse(obj){
        return this.copyRemoteToLocal(
            obj, new ImageData(), Fields
        );
    }
}

export default ImageDataFactory;

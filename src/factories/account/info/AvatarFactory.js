import Factory from '../../Factory';
import FactoryField from '../../FactoryField';
import Avatar from '../../../models/account/info/Avatar';

const Fields = [
    new FactoryField('id'),
];

/**
 * A model representing a Player.me Account.
 * @memberOf module:models/account
 */
class AccountFactory extends Factory {

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
            obj, new Avatar(), Fields
        );
    }

    /**
     * Build multiple
     * @param {object[]} arr
     * @return {module:models/account/info.Avatar[]}
     */
    buildMultipleFromResponse(arr){
        var result = [];
        for (var key in arr){
            result.push(this.buildFromResponse(arr[key]));
        }
        return result;
    }
}

export default AccountFactory;

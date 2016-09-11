import Factory from '../Factory';
import FactoryField from '../FactoryField';
import Account from '../../models/account/Account';

import ImageDataFactory from '../image/ImageDataFactory';
const imageDataFactory = new ImageDataFactory;

import AvatarFactory from '../account/info/AvatarFactory';
const avatarFactory = new AvatarFactory;

const Fields = [
    new FactoryField('id'),
    new FactoryField('account_type'),
    new FactoryField('slug'),
    new FactoryField('short_description'),
    new FactoryField('description'),
    new FactoryField('description_html'),
    new FactoryField('username'),
    new FactoryField('url'),
    new FactoryField('cover'),
    new FactoryField('avatar'),
    new FactoryField('cover_object', null, (obj) => imageDataFactory.buildFromResponse(obj)),
    new FactoryField('avatar_object', null, (obj) => imageDataFactory.buildFromResponse(obj)),
    new FactoryField('created_at'),
    new FactoryField('followers_count'),
    new FactoryField('following_count'),
    new FactoryField('is_private'),
    new FactoryField('is_verified'),
    new FactoryField('is_partner'),
    new FactoryField('is_superuser'),
    new FactoryField('is_poweruser'),
    new FactoryField('is_current_user'),
    new FactoryField('is_following'),
    new FactoryField('is_followed'),
    new FactoryField('is_friend'),
    new FactoryField('is_blocked'),
    new FactoryField('can_message'),
    new FactoryField('is_online'),
    new FactoryField('is_featured'),
    new FactoryField('is_gamedeveloper'),
    new FactoryField('is_ambassador'),
    new FactoryField('avatars', null, (arr) => avatarFactory.buildMultipleFromResponse(arr)),
    new FactoryField('browse_type')
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
            obj, new Account(), Fields
        );
    }
}

export default AccountFactory;

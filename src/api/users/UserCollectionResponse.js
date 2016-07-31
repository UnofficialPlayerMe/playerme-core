import CollectionResponse from '../request/response/CollectionResponse';
import UserExtendedModel from '../../models/user/UserExtendedModel';

/**
 * Response containing a collection of users
 */
class UserCollectionResponse extends CollectionResponse {
    constructor(rawResponse)
    {
        super(UserExtendedModel, rawResponse);
    }

    /**
     * The users
     * @returns {UserExtendedModel[]}
     */
    get results(){
        return this._results;
    }
}

export default UserCollectionResponse;

import EntityResponse from '../request/response/EntityResponse';
import UserExtendedModel from '../../models/user/UserExtendedModel';

/**
 * Response containing a single user
 * @extends EntityResponse
 * @memberOf module:api/users
 */
class UserEntityResponse extends EntityResponse {
    constructor(rawResponse)
    {
        super(UserExtendedModel, rawResponse);
    }

    /**
     * The user
     * @returns {UserExtendedModel}
     */
    get result(){
        return this._result;
    }
}

export default UserEntityResponse;

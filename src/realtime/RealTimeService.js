import Sails                 from './Sails';
import FeedRealTime          from './api/feed/FeedRealTime';
import NotificationsRealTime from './api/notifications/NotificationsRealTime';

/**
 * @class The core Sails.io.js wrapper for PlayerMe
 * @extends Sails
 * @memberOf module:realtime
 */
class RealTimeService extends Sails {
    // <editor-fold desc="Static Methods">

    /**
     * @returns {object}
     */
    static getSailsIO(){
        return Sails.getSailsIO();
    }

    // </editor-fold>
    // <editor-fold desc="Setup">

    /**
     * @param {string}  url                  Server to connect to
     * @param {boolean} [autoGetCookie=true] Set to false if running outside of a browser and use `verifyWithOAuth`
     * @param {object}  [options]            Custom options to override the defaults
     */
    constructor(url, autoGetCookie=true, options) {
        super();

        Sails.getSailsIO().useCORSRouteToGetCookie = autoGetCookie;

        this._verifiedUserId = 0;

        this._defaultConnectionOptions = {
            transports: ['websocket']
        };

        this._connect(url, options);

        this.feed = new FeedRealTime(this);
        this.notifications = new NotificationsRealTime(this);
    }

    // </editor-fold>
    // <editor-fold desc="Verification">

    /**
     * This will link the Socket ID to the User ID,
     * so that the Sails can send user-wide messages to the correct sockets.
     * Send this immediately after connect.
     * http://docs.playerme.apiary.io/#reference/RealTime/oauth/authenticate-+++
     * @param {function} [callback]
     * @returns {RealTimeService} Itself
     */
    verify(callback){
        // Use super's post method to avoid verification check
        super.post('/verify', null, (body, jwr)=>{
            if(body && body.id) {
                this._verifiedUserId = body.id;
            }
            if (callback){
                callback(body, jwr);
            }
        });
        return this;
    }

    /**
     * @param {string} [accessToken]
     * @param {function} callback
     * @returns {RealTimeService} Itself
     */
    verifyWithOAuth(accessToken, callback){
        var params = accessToken ? { access_token: accessToken } : null;

        // Use super's post method to avoid verification check
        super.post('/oauth', params, (body, jwr)=>{
            if(body && body.id) {
                this._verifiedUserId = body.id;
            }
            if (callback){
                callback(body, jwr);
            }
        });
        return this;
    }

    /**
     * Whether the user has been verified
     * @returns {boolean}
     */
    get isVerified(){
        return this._verifiedUserId > 0;
    }

    /**
     * The ID of the verified user, or 0
     * @returns {int}
     */
    get verifiedUserId(){
        return this._verifiedUserId;
    }

    /**
     * Throw an error if the user isn't verified before calling the passed method name.
     * @param {string} methodName
     * @protected
     */
    _checkVerified(methodName){
        if (!this.isVerified){
            throw new Error(
                "The user must be verified before calling "+
                    this.constructor.name+"."+methodName+"."
            );
        }
    }

    // </editor-fold> Verification
    // <editor-fold desc="Debugging">

    /**
     * Send a message which will be picked up by onTest()
     * @param {string} message The message to make the round-trip.
     * @returns {RealTimeService}
     */
    postTest(message){
        this.post('/test', {message: message});
        return this;
    }

    /**
     * @param {function} callback
     * @return {Sails} Itself
     */
    onTest(callback){
        this.on('test', (data)=>{
            callback(data.message);
        });
        return this;
    }

    // </editor-fold> Debugging
    // <editor-fold desc="Request Methods">

    /** @inheritdoc */
    get(url, data, callback){
        this._checkVerified('get()');
        super.get(url, data, callback);
    }

    /** @inheritdoc */
    post(url, data, callback){
        this._checkVerified('post()');
        super.post(url, data, callback);
    }

    /** @inheritdoc */
    put(url, data, callback){
        this._checkVerified('put()');
        super.put(url, data, callback);
    }

    /** @inheritdoc */
    del(url, data, callback){
        this._checkVerified('del()');
        super.del(url, data, callback);
    }

    // </editor-fold> Request Methods
}

export default RealTimeService;
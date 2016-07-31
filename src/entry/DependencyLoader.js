/**
 * This is an object with can have dynamic properties added for the library items,
 * plus some extra stuff for managing callbacks whilst its dependencies are loading.
 */
class DependencyLoader {
    constructor(){
        this._dependenciesLoading = 0;
        this._loaderCallbacks = [];
        this._items = {};
    }

    /**
     * @returns {boolean}
     */
    get loading(){
        return this._dependenciesLoading > 0;
    }

    /**
     * Adds a callback to be called once the entity has finished loading, or right away if loaded
     * @param {function} callback
     */
    onLoad(callback){
        if (this.loading == false){
            callback.apply(this, [this._items]);
            return;
        }
        this._loaderCallbacks.push(callback);
    }

    /**
     * Increment the loading dependency counter, which calls finishedLoading() when it hits zero
     */
    addLoadingDependency(){
        this._dependenciesLoading++;
    }

    /**
     * Decrement the loading dependency counter, which calls finishedLoading() when it hits zero
     */
    dependencyLoaded(){
        this._dependenciesLoading--;
        if (this._dependenciesLoading == 0){
            this.finishedLoading();
        }
    }

    /**
     * Store items that were loaded, which also get passed to the callback
     * @param {Object} items
     */
    addItems(items){
        for (var key in items){
            if (items.hasOwnProperty(key)){
                this.addItem(key, items[key]);
            }
        }
    }

    /**
     * Store item that was loaded, which also get passed to the callback
     * @param {string} key
     * @param {*} value
     */
    addItem(key, value){
        this[key] = this._items[key] = value;
    }

    /**
     * Remove the item with the given name
     * @param {string} key
     */
    removeItem(key){
        if (this._items.hasOwnProperty(key)){
            delete this[key];
            delete this._items[key];
        }
    }

    /**
     * Clear the loading state and call all the callbacks passed to onLoad().
     */
    finishedLoading(){
        var callbacks = this._loaderCallbacks;
        this._dependenciesLoading = 0;
        this._loaderCallbacks = [];

        for (var i=0; i < callbacks.length; i++){
            callbacks[i].apply(this, [this._items]);
        }
    }
}

export default DependencyLoader;
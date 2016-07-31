/**
 * The paging status of a request
 */
class PagerData{
    /**
     * @param {object} rawPager The paging data in a RawResponse body.
     */
    constructor(rawPager){
        this._raw = rawPager;
    }

    /**
     * The number of entities returned
     * @returns {int}
     */
    get limit(){
        return this._raw.limit;
    }

    /**
     * The offset of the search
     * @returns {int}
     */
    get from(){
        return this._raw.from;
    }

    /**
     * The total number of entities available
     * @returns {int}
     */
    get total(){
        return this._raw.total;
    }

    /**
     * Whether this pager uses pages
     * @returns {boolean}
     */
    get hasPages(){
        return this._raw.hasOwnProperty('total_pages') && this._raw.hasOwnProperty('current_page');
    }

    /**
     * The total number of pages available
     * @returns {int}
     */
    get totalPages(){
        return this._raw.total_pages;
    }

    /**
     * The number of the current page
     * @returns {int}
     */
    get currentPages(){
        return this._raw.current_page;
    }
}

export default PagerData;
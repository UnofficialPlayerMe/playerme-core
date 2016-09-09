import QuerySelection from './QuerySelection';
import QuerySelectionCollection from './QuerySelectionCollection';

/**
 * @memberOf module:graphql
 */
class RootQuery {
    user(id, fields=null, alias=''){
        return new QuerySelection('user', {id: id}, fields, alias);
    }

    userBySlug(slug, fields=null, alias=''){
        return new QuerySelection('user', {slug: slug}, fields, alias);
    }
}

export default new RootQuery();

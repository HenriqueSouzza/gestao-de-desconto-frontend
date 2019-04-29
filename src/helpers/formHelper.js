import _ from 'lodash';

/**
 * 
 * @param {*} item 
 * @param {*} router 
 * @param {*} location 
 * @param {*} getDetail 
 * @param {*} setDetail 
 */
export const setFormValue = (item, router,  location, getDetail, setDetail) => {
   
    if (!_.isUndefined(router.params.id )) {
        const values = item.list.content.filter((item) => item.id === parseInt(router.params.id));
        if (values.length === 1) {
            setDetail(values[0]);
        } else {
            getDetail(router.params.id);
        }
    } else {
        if (!_.isUndefined(location.state)) {
            setDetail(location.state);
        }
    }
}

/**
 * 
 * @param {*} router 
 * @param {*} values 
 * @param {*} create 
 * @param {*} update 
 * @param {*} customUrl 
 */
export const create_or_update = (router, values, create, update, customUrl=null) => {
    
    const url = !_.isNull(customUrl) && customUrl.hasOwnProperty("callbackUrl") ? customUrl.callbackUrl : null;
    if (_.isUndefined(router.params.id)) {
        create(values, router, url);
    } else {
        values['id'] = router.params.id;
        update(values, router, url);
    }
}

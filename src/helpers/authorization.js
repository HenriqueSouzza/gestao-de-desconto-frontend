
/**
 * 
 */
export const ACTION_RULES = {
    can_see: 'can_see',
    can_detail: 'can_detail',
    can_create: 'can_create',
    can_edit: 'can_edit',
    can_remove: 'can_remove',
    can_all: [
        'can_see',
        'can_create',
        'can_edit',
        'can_remove',
    ],
    can_all_with_detail: [
        'can_see',
        'can_detail',
        'can_create',
        'can_edit',
        'can_remove',
    ]
}

/**
 * 
 * @param {*} role 
 * @param {*} permissions 
 */
export const has_action = (role, permissions) => {

    if (permissions.indexOf(ACTION_RULES[role]) >= 0) {
        return true
    }
    return false;
  

}

/**
 * 
 * @param {*} data 
 * @param {*} authorizations 
 */
export const is_authorized = (data, authorizations) => {
    const user = data;
    for (const p of user.groups) {
        if (authorizations.indexOf(p.id) >= 0) return true;
    }

    return false;
}

/**
 * 
 * @param {*} data 
 * @param {*} authorizations 
 */

export const is_authorized_module = (data, authorizations) => {
    const user = data;
    for (const p of user.groups) {
        if (authorizations.indexOf(p.id) >= 0) return true;
    }

    return false;
}

/**
 * 
 * @param {*} data 
 * @param {*} authorizations 
 */
export const is_authorized_resource = (data, authorizations) => {
    const user = data;
    for (const p of user.groups) {
        if (authorizations.indexOf(p.id) >= 0) return true;
    }

    return false;
}

/**
 * 
 * @param {*} data 
 * @param {*} authorizations 
 */
export const is_authorized_action = (data, authorizations) => {
    const user = data;
    for (const p of user.groups) {
        if (authorizations.indexOf(p.id) >= 0) return true;
    }

    return false;
}

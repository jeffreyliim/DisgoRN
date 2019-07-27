
// if object is empty returns true
export function objectIsEmpty(obj) {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

export function formatResult(result) {
    return result.json()
}

export function dateFormat() {
    return 'Do MMMM YYYY'
}

export const createParamsObject = (params) => {
    const obj = {}
    for (let key of params.keys()) {
        if (key.includes('page') || key.includes('from') || key.includes('to')) {
            obj[key] = params.get(key)
        } else {
            obj[key] = params.getAll(key)
        }
    }
    return obj
}
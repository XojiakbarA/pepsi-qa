export const createParamsObject = (params) => {
    const obj = {}
    for (let key of params.keys()) {
        if (key.includes('page') || key.includes('from') || key.includes('to') || key.includes('syrup_id')) {
            obj[key] = params.get(key)
        } else {
            obj[key] = params.getAll(key)
        }
    }
    return obj
}

export const createValue = (name, options, params) => {
    const ids = params.getAll(name).map(id => Number(id))
    return options.filter(item => ids.includes(item.id))
}
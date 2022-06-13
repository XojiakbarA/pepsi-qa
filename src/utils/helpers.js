import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import HomeIcon from "@mui/icons-material/Home"

export const createParamsObject = (params) => {
    const obj = {}
    for (let key of params.keys()) {
        if (key.endsWith('ids')) {
            obj[key] = params.getAll(key)
        } else {
            obj[key] = params.get(key)
        }
    }
    return obj
}

export const createIDsValue = (name, options, params) => {
    const ids = params.getAll(name).map(id => Number(id))
    return options.filter(item => ids.includes(item.id))
}

export const createRangeValue = (params, field) => {
    const min = params.get(`${field}_min`) || ''
    const max = params.get(`${field}_max`) || ''
    return { min, max }
}

export const createShiftButtons = (sequence) => {
    return sequence?.map(item => {
        switch (item) {
            case 'day':
                return { title: 'day', color: 'warning', icon: <LightModeIcon/> }
            case 'night':
                return { title: 'night', color: 'info', icon: <DarkModeIcon/> }
            default:
                return { title: 'weekend', color: 'standard', icon: <HomeIcon/> }
        }
    })
}
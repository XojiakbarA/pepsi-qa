import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import HomeIcon from "@mui/icons-material/Home"
import WeekendIcon from "@mui/icons-material/Weekend"
import HotelIcon from "@mui/icons-material/Hotel"

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

export const toUpperCaseFirstLetters = (string) => {
    const arr = []
    let index = 0
    while (index !== -1) {
        index = string.indexOf('-', index + 1)
        arr.push(index + 1)
    }

    return string.split('').map((item, i) => {
        if (arr.includes(i)) return item.toUpperCase()
        return item
    }).join('')
}

export const setColor = (value) => {
    switch (value) {
        case 'day': return 'warning'
        case 'night': return 'info'
        case 'leave': return 'secondary'
        case 'sick_leave': return 'error'
        default: return 'default'
    }
}
export const setIcon = (value) => {
    switch (value) {
        case 'day': return <LightModeIcon color="inherit" fontSize="inherit"/>
        case 'night': return <DarkModeIcon color="inherit" fontSize="inherit"/>
        case 'leave': return <WeekendIcon color="inherit" fontSize="inherit"/>
        case 'sick_leave': return <HotelIcon color="inherit" fontSize="inherit"/>
        default: return <HomeIcon color="inherit" fontSize="inherit"/>
    }
}
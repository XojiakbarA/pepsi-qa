import axios from "axios"

export const baseURL = "http://localhost:8000/"

export const instance = axios.create({
    baseURL,
    withCredentials: true
})

export const fetchProducts = async () => {
    return await instance.get('api/products')
}

export const fetchLines = async () => {
    return await instance.get('api/lines')
}

export const fetchFormats = async () => {
    return await instance.get('api/formats')
}

export const fetchContainerSuppliers = async () => {
    return await instance.get('api/container-suppliers')
}

export const fetchCaps = async () => {
    return await instance.get('api/caps')
}

export const fetchUsers = async () => {
    return await instance.get('api/users')
}

export const fetchPhysicalChemicalAnalyses = async (params) => {
    return await instance.get(`api/physical-chemical-analyses`, { params})
}

export const fetchRemovalTorqueAnalyses = async (params) => {
    return await instance.get(`api/removal-torque-analyses`, { params })
}

export const fetchSectionWeightAnalyses = async (params) => {
    return await instance.get(`api/section-weight-analyses`, { params })
}

export const fetchWaterAnalyses = async (params) => {
    return await instance.get(`api/water-analyses`, { params })
}

export const fetchSecureSealTests = async (params) => {
    return await instance.get(`api/secure-seal-tests`, { params })
}

export const fetchUser = async () => {
    return await instance.get('api/auth')
}

export const fetchCsrfCookie = async () => {
    return await instance.get('sanctum/csrf-cookie')
}

export const userRegister = async (data) => {
    return await instance.post('register', data)
}

export const userLogin = async (data) => {
    return await instance.post('login', data)
}

export const userLogout = async () => {
    return await instance.post('logout')
}
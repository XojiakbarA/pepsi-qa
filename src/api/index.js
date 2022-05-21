import axios from "axios"

export const api = "http://127.0.0.1:8000/"

export const instance = axios.create({
    baseURL: `${api}api/`
})

export const fetchProducts = async () => {
    return await instance.get('products')
}

export const fetchLines = async () => {
    return await instance.get('lines')
}

export const fetchFormats = async () => {
    return await instance.get('formats')
}

export const fetchContainerSuppliers = async () => {
    return await instance.get('container-suppliers')
}

export const fetchCaps = async () => {
    return await instance.get('caps')
}

export const fetchPhysicalChemicalAnalyses = async () => {
    return await instance.get(`physical-chemical-analyses`)
}
import {useEffect, useState} from "react";
import {createParamsObject} from "../utils/helpers"

export const useAnalyses = (params, fetchResource) => {

    const [analyses, setAnalyses] = useState({data: [], meta: {}, loading: false})

    useEffect(() => {
        const getAnalyses = async () => {
            setAnalyses(prev => ({ ...prev, loading: true }))
            const res = await fetchResource(createParamsObject(params))
            if (res.status === 200) {
                setAnalyses({ data: res.data.data, meta: res.data.meta, loading: false })
            }
        }
        getAnalyses()
    }, [params, fetchResource])

    return analyses
}
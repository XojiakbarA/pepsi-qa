import {Grid} from "@mui/material"
import PageHeader from "../components/common/PageHeader"
import ShiftTable from "../components/table/ShiftTable"
import {useSearchParams} from "react-router-dom"
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getShifts} from "../store/actionCreators"
import {createParamsObject} from "../utils/helpers"

const ShiftSchedule = () => {

    const [params] = useSearchParams()
    const dispatch = useDispatch()

    const { data, loading } = useSelector(state => state.shifts)

    useEffect(() => {
        dispatch(getShifts(createParamsObject(params)))
    }, [dispatch, params])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageHeader/>
            </Grid>
            <Grid item xs={12}>
                {
                    <ShiftTable shifts={data} loading={loading}/>
                }
            </Grid>
        </Grid>
    )
}

export default ShiftSchedule
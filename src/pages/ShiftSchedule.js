import {CircularProgress, Grid} from "@mui/material"
import ScheduleIcon from "../components/icons/ScheduleIcon"
import PageHeader from "../components/common/PageHeader"
import ShiftTable from "../components/table/ShiftTable"
import {useSearchParams} from "react-router-dom"
import {useAnalyses} from "../hooks/useAnalyses"
import {fetchShifts} from "../api"

const ShiftSchedule = () => {

    const [params] = useSearchParams()

    const { data, loading } = useAnalyses(params, fetchShifts)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageHeader
                    icon={<ScheduleIcon width={40}/>}
                    title="Shift Schedule"
                />
            </Grid>
            <Grid item xs={12}>
                {
                    loading
                    ?
                    <CircularProgress/>
                    :
                    <ShiftTable shifts={data}/>
                }
            </Grid>
        </Grid>
    )
}

export default ShiftSchedule
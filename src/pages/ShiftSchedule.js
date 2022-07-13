import {Grid} from "@mui/material"
import PageHeader from "../components/common/PageHeader"
import ShiftTable from "../components/table/ShiftTable"

const ShiftSchedule = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageHeader/>
            </Grid>
            <Grid item xs={12}>
                <ShiftTable/>
            </Grid>
        </Grid>
    )
}

export default ShiftSchedule
import {CircularProgress, Grid, Stack} from "@mui/material"
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import {DataGrid} from "@mui/x-data-grid"
import MyGridToolbar from "../components/data-grid/MyGridToolbar"
import PageHeader from "../components/common/PageHeader"
import PageFooter from "../components/common/PageFooter"
import NoResults from "../components/common/NoResults"
import BarometerIcon from "../components/icons/BarometerIcon"
import {useSearchParams} from "react-router-dom"
import {useAnalyses} from "../hooks/useAnalyses"
import {fetchSecureSealTests} from "../api"

const columns = [
    {
        flex: 1,
        minWidth: 80,
        field: 'id',
        headerName: 'ID'
    },
    {
        flex: 2,
        minWidth: 80,
        field: '7_bar',
        headerName: '7 bar',
        renderCell: ({row}) => row['7_bar'] ? <CheckIcon color="success"/> : <CloseIcon color="error"/>
    },
    {
        flex: 2,
        minWidth: 80,
        field: '10_bar',
        headerName: '10 bar',
        renderCell: ({row}) => row['10_bar'] ? <CheckIcon color="success"/> : <CloseIcon color="error"/>
    },
]

const SecureSealTests = () => {

    const [params] = useSearchParams()

    const { data, meta, loading } = useAnalyses(params, fetchSecureSealTests)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageHeader
                    icon={<BarometerIcon width={40}/>}
                    title="Secure Seal Tests"
                />
            </Grid>
            <Grid item xs={12}>
                <Stack spacing={2}>
                    {
                        loading
                        ?
                        <CircularProgress/>
                        :
                        !data.length
                        ?
                        <NoResults/>
                        :
                        <Grid container spacing={2}>
                            {
                                data.map(analysis => (
                                    <Grid item xs={12} sm={6} lg={4} xl={2} key={analysis.id}>
                                        <DataGrid
                                            autoHeight
                                            disableColumnMenu
                                            disableSelectionOnClick
                                            hideFooter
                                            density="compact"
                                            components={{
                                                Toolbar: MyGridToolbar
                                            }}
                                            columns={columns}
                                            rows={analysis.secure_seal_test_values}
                                            componentsProps={{toolbar: {analysis}}}
                                        />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    }
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <PageFooter
                    visible={!loading && !!data.length}
                    count={meta.last_page}
                    options={[6, 12, 18]}
                />
            </Grid>
        </Grid>
    )
}

export default SecureSealTests
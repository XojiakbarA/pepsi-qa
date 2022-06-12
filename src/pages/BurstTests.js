import {CircularProgress, Grid, Stack} from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import {DataGrid} from "@mui/x-data-grid"
import MyGridToolbar from "../components/data-grid/MyGridToolbar"
import PageHeader from "../components/common/PageHeader"
import PageFooter from "../components/common/PageFooter"
import NoResults from "../components/common/NoResults"
import BrokenIcon from "../components/icons/BrokenIcon"
import ProductAnalysisFilters from "../components/common/ProductAnalysisFilters"
import {useSearchParams} from "react-router-dom"
import {useAnalyses} from "../hooks/useAnalyses"
import {fetchBurstTests} from "../api"

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
        field: '135_psi',
        headerName: '135 bar',
        renderCell: ({row}) => row['135_psi'] ? <CheckIcon color="success"/> : <CloseIcon color="error"/>
    },
    {
        flex: 2,
        minWidth: 80,
        field: 'psi_of_burst',
        headerName: 'psi of burst'
    },
]

const BurstTests = () => {

    const [params] = useSearchParams()

    const { data, meta, loading } = useAnalyses(params, fetchBurstTests)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageHeader
                    icon={<BrokenIcon width={40}/>}
                    title="Burst Tests"
                    rightComponent={<ProductAnalysisFilters/>}
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
                                            rows={analysis.burst_test_values}
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
                <PageFooter meta={meta}/>
            </Grid>
        </Grid>
    )
}

export default BurstTests
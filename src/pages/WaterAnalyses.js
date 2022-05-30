import {Grid, LinearProgress} from "@mui/material"
import WaterIcon from "../components/icons/WaterIcon"
import PageHeader from "../components/common/PageHeader"
import {DataGrid} from "@mui/x-data-grid"
import {useSearchParams} from "react-router-dom"
import {useAnalyses} from "../hooks/useAnalyses"
import {fetchWaterAnalyses} from "../api"
import {createParamsObject} from "../utils/helpers"

const columns = [
    {
        flex: 1,
        minWidth: 80,
        field: 'place',
        headerName: 'Place'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'hardness',
        headerName: 'Hardness'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'tds',
        headerName: 'TDS'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'alkalinity',
        headerName: 'Alkalinity'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'conductivity',
        headerName: 'Conductivity'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'turbidity',
        headerName: 'Turbidity'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'temperature',
        headerName: 'Temperature'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'cl',
        headerName: 'Cl'
    },
    {
        flex: 1,
        minWidth: 60,
        field: 'mn',
        headerName: 'Mn'
    },
    {
        flex: 1,
        minWidth: 50,
        field: 'fe',
        headerName: 'Fe'
    },
    {
        flex: 1.5,
        minWidth: 80,
        field: 'checked_by',
        headerName: 'Checked By'
    },
    {
        flex: 1.5,
        minWidth: 80,
        field: 'checked_at',
        headerName: 'Checked At'
    },
]

const WaterAnalyses = () => {

    const [params, setParams] = useSearchParams()

    const { data, meta, loading } = useAnalyses(params, fetchWaterAnalyses)

    const pageSize = Number(params.get('per_page')) || 10
    const page = Number(params.get('page') || 1)

    const handlePageSizeChange = (per_page) => {
        const prevParams = createParamsObject(params)
        setParams({ ...prevParams, per_page, page: 1})
    }
    const handlePageChange = (page) => {
        page += 1
        const prevParams = createParamsObject(params)
        setParams({ ...prevParams, page })
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageHeader
                    icon={<WaterIcon width={40}/>}
                    title="Water Analyses"
                    filterType="water"
                />
            </Grid>
            <Grid item xs={12}>
                <DataGrid
                    autoHeight
                    disableColumnMenu
                    disableSelectionOnClick
                    density="compact"
                    loading={loading}
                    columns={columns}
                    rows={data}
                    rowCount={meta.total || 100}
                    page={page - 1}
                    pageSize={pageSize}
                    rowsPerPageOptions={[10, 25, 50]}
                    onPageSizeChange={handlePageSizeChange}
                    onPageChange={handlePageChange}
                    paginationMode="server"
                    components={{ LoadingOverlay: LinearProgress }}
                />
            </Grid>
        </Grid>
    )
}

export default WaterAnalyses
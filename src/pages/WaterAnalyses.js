import {Box, Grid, LinearProgress} from "@mui/material"
import PageHeader from "../components/common/PageHeader"
import {DataGrid, GridToolbar} from "@mui/x-data-grid"
import WaterAnalysisFilterPanel from "../components/data-grid/WaterAnalysisFilterPanel"
import {useSearchParams} from "react-router-dom"
import {useSelector} from "react-redux"
import {useAnalyses} from "../hooks/useAnalyses"
import {fetchWaterAnalyses} from "../api"
import {createParamsObject} from "../utils/helpers"
import {perPagesSelector} from "../store/selectors"

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

    const { singleTable: rowPerPageOptions } = useSelector(perPagesSelector)

    const { data, meta, loading } = useAnalyses(params, fetchWaterAnalyses)

    const pageSize = Number(params.get('per_page') || rowPerPageOptions[0])
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
                <PageHeader/>
            </Grid>
            <Grid item xs={12}>
                <Box height={550} mb={2}>
                    <DataGrid
                        disableColumnMenu
                        loading={loading}
                        columns={columns}
                        rows={data}
                        rowCount={meta.total || 100}
                        page={page - 1}
                        pageSize={pageSize}
                        rowsPerPageOptions={rowPerPageOptions}
                        onPageSizeChange={handlePageSizeChange}
                        onPageChange={handlePageChange}
                        paginationMode="server"
                        components={{
                            Toolbar: GridToolbar,
                            FilterPanel: WaterAnalysisFilterPanel,
                            LoadingOverlay: LinearProgress
                        }}
                        componentsProps={{
                            panel: { sx: { maxWidth: 'calc(100% - 32px)', maxHeight: 'calc(100% - 32px)' } }
                        }}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}

export default WaterAnalyses
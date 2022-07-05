import { Box, Grid } from "@mui/material"
import PageHeader from "../../components/common/PageHeader"
import PhChAnalysesDataGrid from "../../components/data-grid/PhChAnalysesDataGrid"
import PhChAnalysesFilterPanel from "../../components/data-grid/PhChAnalysesFilterPanel"
import { useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useAnalyses } from "../../hooks/useAnalyses"
import { fetchCarbonatedAnalyses } from "../../api"
import { perPagesSelector } from "../../store/selectors"
import { createParamsObject } from "../../utils/helpers"

const columns = [
    {
        flex: 1,
        minWidth: 80,
        field: 'syrup_name',
        headerName: 'Syrup',
        sortable: false
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'time',
        headerName: 'Time',
        renderCell: ({ row }) => {
            const date = new Date(row.checked_at)
            return String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0')
        }
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
        field: 'pressure',
        headerName: 'Pressure'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'carbonate',
        headerName: 'Carbonate'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'brix',
        headerName: 'Brix'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'inverted_brix',
        headerName: 'Inverted Brix'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'density',
        headerName: 'Density'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'acidity',
        headerName: 'Acidity'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'ph',
        headerName: 'pH'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'fullness',
        headerName: 'Fullness'
    },
    {
        flex: 1,
        minWidth: 120,
        field: 'checked_by',
        headerName: 'Checked By'
    },
]

const CarbonatedDrinks = () => {

    const [params, setParams] = useSearchParams()

    const { data, meta, loading } = useAnalyses(params, fetchCarbonatedAnalyses)

    const { singleTable: rowPerPageOptions } = useSelector(perPagesSelector)

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
                    <PhChAnalysesDataGrid
                        columns={columns}
                        rows={data}
                        loading={loading}
                        rowCount={meta.total || 100}
                        rowPerPageOptions={rowPerPageOptions}
                        pageSize={pageSize}
                        onPageSizeChange={handlePageSizeChange}
                        page={page - 1}
                        onPageChange={handlePageChange}
                        groupBy="syrup_name"
                        FilterPanel={PhChAnalysesFilterPanel}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}

export default CarbonatedDrinks
import { Box, Grid, Stack, Typography } from "@mui/material"
import PageHeader from "../../components/common/PageHeader"
import ProductAnalysesDataGrid from "../../components/data-grid/ProductAnalysesDataGrid"
import ProductAnalysesFilterPanel from "../../components/data-grid/ProductAnalysesFilterPanel"
import { useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useAnalyses } from "../../hooks/useAnalyses"
import { baseURL, fetchCarbonatedAnalyses } from "../../api"
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

    const getGroupedRows = () => (
        data
            .map(item => item.syrup_name)
            .filter((item, i, self) => self.indexOf(item) === i)
            .map(item => {
                const row = data.find(row => row.syrup_name === item)
                const checked_ats = data.filter(row => row.syrup_name === item).map(row => new Date(row.checked_at).getTime())
                const checked_at = new Date(Math.min(...checked_ats))
                return {
                    id: row.syrup_id + item,
                    syrup_name: row.syrup_name,
                    product_logo: row.product_logo,
                    target: row.target,
                    checked_at: checked_at,
                    isGroupRow: true
                }
            })
    )
    const groupByRenderCell = (row) => (
        <Stack direction="row" spacing={4} alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
                <img src={baseURL + row.product_logo} alt="syrup-logo" width={30}/>
                <Typography variant="body2">{row.syrup_name}</Typography>
            </Stack>
            <Typography variant="body2">Target: {row.target}</Typography>
            <Typography variant="body2">Checked At: {new Date(row.checked_at).toLocaleDateString()}</Typography>
        </Stack>
    )

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageHeader/>
            </Grid>
            <Grid item xs={12}>
                <Box height={550}>
                    <ProductAnalysesDataGrid
                        columns={columns}
                        rows={data}
                        loading={loading}
                        rowCount={meta.total || 100}
                        rowPerPageOptions={rowPerPageOptions}
                        pageSize={pageSize}
                        onPageSizeChange={handlePageSizeChange}
                        page={page}
                        onPageChange={handlePageChange}
                        groupBy="syrup_name"
                        getGroupedRows={getGroupedRows}
                        groupByRenderCell={groupByRenderCell}
                        FilterPanel={ProductAnalysesFilterPanel}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}

export default CarbonatedDrinks
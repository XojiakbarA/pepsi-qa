import {Divider, Grid, IconButton, LinearProgress, Stack, Typography} from "@mui/material"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import ChemicalReactionIcon from "../components/icons/ChemicalReactionIcon"
import {DataGrid} from "@mui/x-data-grid"
import PageHeader from "../components/common/PageHeader"
import SyrupMorePopover from "../components/popover/SyrupMorePopover"
import SyrupAnalysisFilter from "../components/common/SyrupAnalysisFilter"
import {useState} from "react"
import {useSelector} from "react-redux"
import {useLocation, useSearchParams} from "react-router-dom"
import {useAnalyses} from "../hooks/useAnalyses"
import {baseURL, fetchSyrups} from "../api"
import {perPagesSelector} from "../store/selectors"
import {createParamsObject} from "../utils/helpers"

const SyrupAnalyses = () => {

    const location = useLocation()

    const [params, setParams] = useSearchParams()

    const [popoverProps, setPopoverProps] = useState({ anchorEl: null, syrup_id: null })
    const [selectionModel, setSelectionModel] = useState(location.state?.syrup_id ? [location.state?.syrup_id] : [])

    const { singleTable: perPageOptions } = useSelector(perPagesSelector)

    const { data, meta, loading } = useAnalyses(params, fetchSyrups)

    const pageSize = Number(params.get('per_page')) || perPageOptions[0]
    const page = Number(params.get('page') || 1)

    const handleArrowClick = (id) => {
        setSelectionModel(prev => prev[0] === id ? [] : [id])
    }
    const handleMoreClick = (anchorEl, syrup_id) => {
        setPopoverProps({anchorEl, syrup_id})
    }
    const handlePageSizeChange = (per_page) => {
        const prevParams = createParamsObject(params)
        setParams({ ...prevParams, per_page, page: 1})
    }
    const handlePageChange = (page) => {
        page += 1
        const prevParams = createParamsObject(params)
        setParams({ ...prevParams, page })
        setSelectionModel([])
    }

    const columns = [
        {
            headerAlign: 'center',
            flex: 3,
            minWidth: 200,
            field: 'product_name',
            headerName: 'Product',
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton
                        size="small"
                        color="primary"
                        onClick={ e => handleArrowClick(row.id) }
                    >
                        {
                            row.id === selectionModel[0]
                            ?
                            <KeyboardArrowUpIcon color="inherit" fontSize="small"/>
                            :
                            <KeyboardArrowDownIcon color="inherit" fontSize="small"/> }
                    </IconButton>
                    <IconButton
                        size="small"
                        color="primary"
                        onClick={ e => handleMoreClick(e.currentTarget, row.id) }
                    >
                        <MoreVertIcon color="inherit" fontSize="inherit"/>
                    </IconButton>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2">{row.product_name}</Typography>
                        <img src={baseURL + row.product_logo} alt="product-logo" width={25}/>
                    </Stack>
                </Stack>
            )
        },
        {
            flex: 2,
            minWidth: 80,
            field: 'tank_number',
            headerName: 'Tank',
        },
        {
            flex: 1,
            minWidth: 80,
            field: 'volume',
            headerName: 'Volume',
        },
        {
            flex: 1,
            minWidth: 80,
            field: 'sugar_syrup_brix',
            headerName: 'Sugar Syrup Brix',
            renderCell: ({ row }) => (
                <Stack spacing={2} divider={<Divider/>}>
                    <Typography variant="body2">{row.sugar_syrup_brix}</Typography>
                    { selectionModel[0] && selectionModel[0] === row.id && <Typography variant="body2">After Day:</Typography> }
                </Stack>
            )
        },
        {
            flex: 1,
            minWidth: 80,
            field: 'blend_syrup_brix',
            headerName: 'Blend Syrup Brix',
            renderCell: ({ row }) => (
                <Stack spacing={2} divider={<Divider/>}>
                    <Typography variant="body2">{row.blend_syrup_brix}</Typography>
                    { selectionModel[0] && selectionModel[0] === row.id && <Typography variant="body2">{row.inverted_syrup.blend_syrup_brix}</Typography> }
                </Stack>
            )
        },
        {
            flex: 1,
            minWidth: 80,
            field: 'drink_brix',
            headerName: 'Drink Brix',
            renderCell: ({ row }) => (
                <Stack spacing={2} divider={<Divider/>}>
                    <Typography variant="body2">{row.drink_brix}</Typography>
                    { selectionModel[0] && selectionModel[0] === row.id && <Typography variant="body2">{row.inverted_syrup.drink_brix}</Typography> }
                </Stack>
            )
        },
        {
            flex: 1,
            minWidth: 80,
            field: 'blend_density',
            headerName: 'Blend Density',
            renderCell: ({ row }) => (
                <Stack spacing={2} divider={<Divider/>}>
                    <Typography variant="body2">{row.blend_density}</Typography>
                    { selectionModel[0] && selectionModel[0] === row.id && <Typography variant="body2">{row.inverted_syrup.blend_density}</Typography> }
                </Stack>
            )
        },
        {
            flex: 1,
            minWidth: 80,
            field: 'drink_density',
            headerName: 'Drink Density',
            renderCell: ({ row }) => (
                <Stack spacing={2} divider={<Divider/>}>
                    <Typography variant="body2">{row.drink_density}</Typography>
                    { selectionModel[0] && selectionModel[0] === row.id && <Typography variant="body2">{row.inverted_syrup.drink_density}</Typography> }
                </Stack>
            )
        },
        {
            flex: 1,
            minWidth: 80,
            field: 'drink_inverted_brix',
            headerName: 'Drink Inverted Brix',
            renderCell: ({ row }) => (
                <Stack spacing={2} divider={<Divider/>}>
                    <Typography variant="body2">{row.drink_inverted_brix}</Typography>
                    { selectionModel[0] && selectionModel[0] === row.id && <Typography variant="body2">{row.inverted_syrup.drink_inverted_brix}</Typography> }
                </Stack>
            )
        },
        {
            flex: 1,
            minWidth: 80,
            field: 'drink_acidity',
            headerName: 'Drink Acidity',
            renderCell: ({ row }) => (
                <Stack spacing={2} divider={<Divider/>}>
                    <Typography variant="body2">{row.drink_acidity}</Typography>
                    { selectionModel[0] && selectionModel[0] === row.id && <Typography variant="body2">{row.inverted_syrup.drink_acidity}</Typography> }
                </Stack>
            )
        },
        {
            flex: 1,
            minWidth: 80,
            field: 'drink_ph',
            headerName: 'Drink pH',
            renderCell: ({ row }) => (
                <Stack spacing={2} divider={<Divider/>}>
                    <Typography variant="body2">{row.drink_ph}</Typography>
                    { selectionModel[0] && selectionModel[0] === row.id && <Typography variant="body2">{row.inverted_syrup.drink_ph}</Typography> }
                </Stack>
            )
        },
        {
            flex: 2,
            minWidth: 80,
            field: 'checked_at',
            headerName: 'Checked At',
            renderCell: ({ row }) => (
                <Stack spacing={2} divider={<Divider/>}>
                    <Typography variant="body2">{row.checked_at}</Typography>
                    { selectionModel[0] && selectionModel[0] === row.id && <Typography variant="body2">{row.inverted_syrup.checked_at}</Typography> }
                </Stack>
            )
        },
        {
            flex: 2,
            minWidth: 80,
            field: 'checked_by',
            headerName: 'Checked By',
            renderCell: ({ row }) => (
                <Stack spacing={2} divider={<Divider/>}>
                    <Typography variant="body2">{row.checked_by}</Typography>
                    { selectionModel[0] && selectionModel[0] === row.id && <Typography variant="body2">{row.inverted_syrup.checked_by}</Typography> }
                </Stack>
            )
        },
        {
            flex: 1,
            minWidth: 80,
            field: 'target',
            headerName: 'Target',
            renderCell: ({ row }) => row.inverted_syrup.target
        },
    ]

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageHeader rightComponent={<SyrupAnalysisFilter/>}/>
            </Grid>
            <Grid item xs={12}>
                <DataGrid
                    autoHeight
                    disableColumnMenu
                    keepNonExistentRowsSelected
                    selectionModel={selectionModel}
                    getRowHeight={({id}) => id === selectionModel[0] ? 100 : null}
                    loading={loading}
                    columns={columns}
                    rows={data}
                    rowCount={meta.total || 100}
                    page={page - 1}
                    pageSize={pageSize}
                    rowsPerPageOptions={perPageOptions}
                    onPageSizeChange={handlePageSizeChange}
                    onPageChange={handlePageChange}
                    paginationMode="server"
                    components={{ LoadingOverlay: LinearProgress }}
                />
                <SyrupMorePopover
                    { ...popoverProps }
                    onClose={ e => setPopoverProps({ anchorEl: null, syrup_id: null }) }
                />
            </Grid>
        </Grid>
    )
}

export default SyrupAnalyses
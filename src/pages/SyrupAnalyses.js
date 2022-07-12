import {Box, Grid, IconButton, LinearProgress, Stack} from "@mui/material"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import {DataGrid, GridToolbar} from "@mui/x-data-grid"
import PageHeader from "../components/common/PageHeader"
import SyrupMorePopover from "../components/popover/SyrupMorePopover"
import SyrupAnalysisFilterPanel from "../components/data-grid/SyrupAnalysisFilterPanel"
import GridCellExpand from "../components/data-grid/GridCellExpand"
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

    const [popoverProps, setPopoverProps] = useState({ anchorEl: null, syrup: null })

    const { singleTable: perPageOptions } = useSelector(perPagesSelector)

    const { data, meta, loading } = useAnalyses(params, fetchSyrups)

    const [syrupIDs, setSyrupIDs] = useState(location.state?.id ? [location.state?.id] : [])

    const pageSize = Number(params.get('per_page')) || perPageOptions[0]
    const page = Number(params.get('page') || 1)

    const handleArrowClick = (id) => {
        setSyrupIDs(prev => {
            if (prev.find(item => item === id)) {
                return prev.filter(item => item !== id)
            } else {
                return prev.concat(id)
            }
        })
    }
    const handleMoreClick = (anchorEl, syrup) => {
        setPopoverProps({anchorEl, syrup})
    }
    const handlePageSizeChange = (per_page) => {
        const prevParams = createParamsObject(params)
        setParams({ ...prevParams, per_page, page: 1})
    }
    const handlePageChange = (page) => {
        page += 1
        const prevParams = createParamsObject(params)
        setParams({ ...prevParams, page })
    }

    const columns = [
        {
            flex: 1,
            minWidth: 80,
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            filterable: false,
            renderCell: ({ row }) => (
                row.isSubRow
                ?
                ''
                :
                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton
                        size="small"
                        color="primary"
                        onClick={ e => handleArrowClick(row.id) }
                        disabled={!row.inverted_syrup}
                    >
                        {
                            syrupIDs.find(item => item === row.id)
                            ?
                            <KeyboardArrowUpIcon color="inherit" fontSize="inherit"/>
                            :
                            <KeyboardArrowDownIcon color="inherit" fontSize="inherit"/>
                        }
                    </IconButton>
                    <IconButton
                        size="small"
                        color="primary"
                        onClick={ e => handleMoreClick(e.currentTarget, row) }
                    >
                        <MoreVertIcon color="inherit" fontSize="inherit"/>
                    </IconButton>
                </Stack>
            )
        },
        {
            flex: 3,
            minWidth: 150,
            field: 'product_name',
            headerName: 'Product',
            renderCell: ({ row, colDef }) => (
                row.isSubRow
                ?
                ''
                :
                <GridCellExpand
                    value={row.product_name}
                    width={colDef.computedWidth}
                >
                    <img src={baseURL + row.product_logo} alt="product-logo" width={25}/>
                </GridCellExpand>
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
            headerName: 'Sugar Syrup Brix'
        },
        {
            flex: 1,
            minWidth: 80,
            field: 'blend_syrup_brix',
            headerName: 'Blend Syrup Brix'
        },
        {
            flex: 1,
            minWidth: 80,
            field: 'drink_brix',
            headerName: 'Drink Brix'
        },
        {
            flex: 1,
            minWidth: 80,
            field: 'blend_density',
            headerName: 'Blend Density'
        },
        {
            flex: 1,
            minWidth: 80,
            field: 'drink_density',
            headerName: 'Drink Density'
        },
        {
            flex: 1,
            minWidth: 80,
            field: 'drink_inverted_brix',
            headerName: 'Drink Inverted Brix'
        },
        {
            flex: 1,
            minWidth: 80,
            field: 'drink_acidity',
            headerName: 'Drink Acidity'
        },
        {
            flex: 1,
            minWidth: 80,
            field: 'drink_ph',
            headerName: 'Drink pH'
        },
        {
            flex: 2,
            minWidth: 80,
            field: 'checked_at',
            headerName: 'Checked At',
            valueGetter: ({ row }) => new Date(row.checked_at).toLocaleString(),
            renderCell: ({ value, colDef }) => (
                <GridCellExpand value={value} width={colDef.computedWidth}/>
            )
        },
        {
            flex: 2,
            minWidth: 80,
            field: 'checked_by',
            headerName: 'Checked By',
            renderCell: ({ value, colDef }) => (
                <GridCellExpand value={value} width={colDef.computedWidth}/>
            )
        },
        {
            flex: 1,
            minWidth: 80,
            field: 'target',
            headerName: 'Target',
            renderCell: ({ row }) => row?.inverted_syrup?.target ?? ''
        },
    ]

    const getRows = () => {
        const rows = [...data]
        if (syrupIDs.length && rows.length) {
            syrupIDs.forEach(id => {
                const syrup = rows.find(item => item.id === id)
                if (syrup) {
                    const invertedSyrup = syrup.inverted_syrup
                    if (invertedSyrup) {
                        const newRow = { ...invertedSyrup, id: syrup.product_name + invertedSyrup.id, isSubRow: true }
                        const i = rows.findIndex(item => item.id === id)
                        rows.splice(i + 1, 0, newRow)
                    }
                }
            })
        }
        return rows
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
                        rows={getRows()}
                        rowCount={meta.total || 1000}
                        page={page - 1}
                        pageSize={pageSize}
                        rowsPerPageOptions={perPageOptions}
                        onPageSizeChange={handlePageSizeChange}
                        onPageChange={handlePageChange}
                        paginationMode="server"
                        components={{
                            Toolbar: GridToolbar,
                            FilterPanel: SyrupAnalysisFilterPanel,
                            LoadingOverlay: LinearProgress
                        }}
                        componentsProps={{
                            panel: { sx: { maxWidth: 'calc(100% - 32px)', maxHeight: 'calc(100% - 32px)' } }
                        }}
                    />
                </Box>
                <SyrupMorePopover
                    { ...popoverProps }
                    onClose={ e => setPopoverProps({ anchorEl: null, syrup: null }) }
                />
            </Grid>
        </Grid>
    )
}

export default SyrupAnalyses
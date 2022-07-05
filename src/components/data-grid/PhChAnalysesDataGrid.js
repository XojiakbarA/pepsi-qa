import { useCallback, useEffect, useState } from "react"
import { Divider, IconButton, LinearProgress, Stack, Typography } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AnalysisMorePopover from "../popover/AnalysisMorePopover"
import SyrupLink from "../links/SyrupLink"

const PhChAnalysesDataGrid = ({
    columns, rows, loading, rowCount, rowPerPageOptions, pageSize, page,
    onPageSizeChange, onPageChange, autoHeight, groupBy, FilterPanel
}) => {

    const [groupedRows, setGroupedRows] = useState([])

    const [anchorEl, setAnchorEl] = useState(null)

    const getGroupedRows = useCallback(() => (
        rows
            .map(item => item.syrup_name)
            .filter((item, i, self) => self.indexOf(item) === i)
            .map(item => {
                const row = rows.find(row => row.syrup_name === item)
                const checked_ats = rows.filter(row => row.syrup_name === item).map(row => new Date(row.checked_at).getTime())
                const checked_at = new Date(Math.min(...checked_ats))
                return {
                    id: row.syrup_id + item,
                    syrup_id: row.syrup_id,
                    syrup_name: row.syrup_name,
                    product_logo: row.product_logo,
                    target: row.target,
                    cap_name: row.cap_name,
                    container_supplier_name: row.container_supplier_name,
                    format_value: row.format_value,
                    line_name: row.line_name,
                    checked_at: checked_at,
                    isGroupRow: true
                }
            })
    ), [rows])

    const getRows = () => {
        if (groupBy) {
            const grouped = getGroupedRows()
            if (groupedRows.length) {
                groupedRows.forEach(groupedRow => {
                    const showRows = rows.filter(item => item[groupBy] === groupedRow[groupBy])
                    const i = grouped.findIndex(item => item[groupBy] === groupedRow[groupBy])
                    grouped.splice(i + 1, 0, ...showRows)
                })
            }
            return grouped
        } else {
            return rows
        }
    }

    const renderCell = ({ row }) => (
        row.isGroupRow
        ?
        <Stack
            alignItems="center"
            direction="row"
            spacing={1}
            divider={<Divider orientation="vertical" flexItem/>}
        >
            <IconButton
                size="small"
                color="primary"
                onClick={ e => handleClick(row) }
            >
                {
                    groupedRows.find(item => item.id === row.id)
                    ?
                    <KeyboardArrowUpIcon color="inherit" fontSize="inherit"/>
                    :
                    <KeyboardArrowDownIcon color="inherit" fontSize="inherit"/> }
            </IconButton>
            <IconButton
                size="small"
                color="primary"
                onClick={ e => setAnchorEl(e.currentTarget) }
            >
                <MoreVertIcon color="inherit" fontSize="inherit"/>
            </IconButton>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2">Syrup:</Typography>
                    <SyrupLink
                        src={row.product_logo}
                        id={row.syrup_id}
                    >
                        {row.syrup_name}
                    </SyrupLink>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2">Target:</Typography>
                    <Typography variant="body2" color="primary">{row.target}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2">Checked At:</Typography>
                    <Typography variant="body2" color="primary">{new Date(row.checked_at).toLocaleDateString()}</Typography>
                </Stack>
            <AnalysisMorePopover
                anchorEl={anchorEl}
                onClose={ e => setAnchorEl(null) }
                analysis={row}
            />
        </Stack>
        :
        ''
    )
    const colSpan = ({ row }) => row.isGroupRow ? columns.length : null

    const getColumns = () => {
        if (groupBy) {
            const withRenderCell = columns.map(item => {
                if (item.field === groupBy) {
                    return { ...item, headerName: 'Syrup', colSpan, renderCell }
                }
                return item
            })
            const groupedCol = withRenderCell.find(item => item.field === groupBy)
            const otherCols = withRenderCell.filter(item => item.field !== groupBy)
            return [ groupedCol, ...otherCols ]
        } else {
            return columns
        }
    }

    const handleClick = (row) => {
        setGroupedRows(prev => {
            if (prev.find(item => item.id === row.id)) {
                return prev.filter(item => item.id !== row.id)
            } else {
                return prev.concat(row)
            }
        })
    }

    useEffect(() => {
        setGroupedRows(getGroupedRows())
    }, [getGroupedRows])

    return (
        <DataGrid
            autoHeight={autoHeight}
            disableColumnMenu
            loading={loading}
            columns={getColumns()}
            rows={getRows()}
            paginationMode="server"
            rowCount={rowCount}
            rowsPerPageOptions={rowPerPageOptions}
            pageSize={pageSize}
            onPageSizeChange={onPageSizeChange}
            page={page}
            onPageChange={onPageChange}
            components={{
                Toolbar: GridToolbar,
                FilterPanel,
                LoadingOverlay: LinearProgress
            }}
            componentsProps={{
                panel: { sx: { maxWidth: 'calc(100% - 32px)', maxHeight: 'calc(100% - 32px)' } }
            }}
        />
    )
}

export default PhChAnalysesDataGrid
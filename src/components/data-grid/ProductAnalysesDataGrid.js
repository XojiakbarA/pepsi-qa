import { useEffect, useState } from "react"
import { IconButton, LinearProgress, Stack } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

const ProductAnalysesDataGrid = ({
    columns, rows, loading, rowCount, rowPerPageOptions, pageSize, page,
    onPageSizeChange, onPageChange, autoHeight,
    groupBy, groupByRenderCell, getGroupedRows, FilterPanel
}) => {

    const [groupedRows, setGroupedRows] = useState([])

    useEffect(() => {
        setGroupedRows(getGroupedRows())
    }, [getGroupedRows])

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
        <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
                onClick={ e => handleClick(row) }
            >
                {
                    groupedRows.find(item => item.id === row.id)
                    ?
                    <KeyboardArrowUpIcon/>
                    :
                    <KeyboardArrowDownIcon/> }
            </IconButton>
            {groupByRenderCell(row)}
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
            page={page - 1}
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

export default ProductAnalysesDataGrid
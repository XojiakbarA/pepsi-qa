import { Box, Card, CardContent, Collapse, IconButton, Stack, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { StyledBadge } from "../styled"
import { useRef, useState } from "react"
import { baseURL } from "../../api"

const LineCard = ({ line }) => {

    const [open, setOpen] = useState(line.status === 'works' ? true : false)

    const ref = useRef(null)

    const setColor = () => {
        switch (line.status) {
            case 'stop': return 'error'
            case 'cip': return 'warning'
            default: return 'success'
        }
    }

    return (
        <StyledBadge
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            variant="dot"
            color={setColor()}
        >
        <Card sx={{ width: '100%' }}>
            <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <img src={baseURL + line.logo} alt="line-logo" height={line.name === 'KHS' ? 20 : 30}/>
                    <Stack>
                        <Typography variant="h6">{`${line.name} ${line.container_name} ${line.speed}`}</Typography>
                        <Typography variant="body2">{`(${line.factory_name})`}</Typography>
                    </Stack>
                    <Box flexGrow={1}/>
                    <Stack>
                        <IconButton
                            disabled={line.status !== 'works'}
                            onClick={ e => setOpen(prev => !prev) }
                        >
                            { open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/> }
                        </IconButton>
                    </Stack>
                </Stack>
                <Collapse in={open} collapsedSize={ref.current?.offsetHeight}>
                    <Table size="small">
                        <TableBody>
                            <TableRow ref={ref}>
                                <TableCell>Status</TableCell>
                                <TableCell>{line.status}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>{line.product_name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Format</TableCell>
                                <TableCell>{line.format_value}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Container Supplier</TableCell>
                                <TableCell>{line.container_supplier_name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Cap</TableCell>
                                <TableCell>{line.cap_name}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Collapse>
            </CardContent>
        </Card>
        </StyledBadge>
    )
}

export default LineCard
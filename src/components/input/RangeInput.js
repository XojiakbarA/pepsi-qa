import {Stack, TextField, Typography} from "@mui/material"

const RangeInput = ({ label, value, onMinChange, onMaxChange }) => {

    return (
        <Stack spacing={1} direction="row" alignItems="end">
            <TextField
                variant="standard"
                type="number"
                placeholder="Min"
                label={label}
                value={value.min}
                onChange={onMinChange}
                InputLabelProps={{ shrink: true }}
            />
            <Typography variant="h6">-</Typography>
            <TextField
                variant="standard"
                type="number"
                placeholder="Max"
                value={value.max}
                onChange={onMaxChange}
            />
        </Stack>
    )
}

export default RangeInput
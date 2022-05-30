import {FormControl, Input, InputLabel, Stack, Typography} from "@mui/material"

const RangeInput = ({ label, value, onMinChange, onMaxChange }) => {

    return (
        <Stack spacing={1} direction="row" alignItems="end">
            <FormControl variant="standard">
                <InputLabel htmlFor={label + 'min'} shrink>{label}</InputLabel>
                <Input
                    id={label + 'min'}
                    variant="standard"
                    type="number"
                    placeholder="Min"
                    value={value.min}
                    onChange={onMinChange}
                />
            </FormControl>
            <Typography variant="h6">-</Typography>
            <FormControl variant="standard">
                <InputLabel htmlFor={label + 'max'} shrink></InputLabel>
                <Input
                    id={label + 'max'}
                    variant="standard"
                    type="number"
                    placeholder="Max"
                    value={value.max}
                    onChange={onMaxChange}
                />
            </FormControl>
        </Stack>
    )
}

export default RangeInput
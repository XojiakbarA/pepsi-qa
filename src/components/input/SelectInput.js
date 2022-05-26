import {Box, InputLabel, MenuItem, FormControl, Select} from '@mui/material'

const SelectInput = ({ perPage, onChange, options }) => {

    return (
        <Box sx={{ minWidth: 100 }}>
            <FormControl fullWidth variant="standard">
                <InputLabel id="per-page">Per Page</InputLabel>
                <Select
                    labelId="per-page"
                    value={perPage}
                    label="Per Page"
                    onChange={onChange}
                >
                    {
                        options.map(option => (
                            <MenuItem dense key={option} value={option}>{option}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectInput
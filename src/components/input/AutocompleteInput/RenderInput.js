import {CircularProgress, TextField} from "@mui/material"

const RenderInput = ({ params, name, label, loading }) => {

    return (
        <TextField
            {...params}
            name={name}
            variant="standard"
            label={label}
            InputProps={{
                ...params.InputProps,
                endAdornment: (
                    <>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                    </>
                ),
            }}
        />
    )
}

export default RenderInput
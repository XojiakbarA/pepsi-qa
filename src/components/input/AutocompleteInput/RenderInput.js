import {CircularProgress, TextField} from "@mui/material"

const RenderInput = ({ variant, params, name, label, loading, error, helperText }) => {

    return (
        <TextField
            variant={variant}
            {...params}
            name={name}
            label={label}
            error={error}
            helperText={helperText}
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
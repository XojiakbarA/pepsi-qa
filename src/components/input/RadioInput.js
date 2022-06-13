import {FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup} from "@mui/material"

const RadioInput = ({
    label, name, size, row, value, radios,
    onChange, onBlur, error, helperText
}) => {

    return (
        <FormControl error={error}>
            <FormLabel id={name}>{label}</FormLabel>
            <RadioGroup
                row={row}
                aria-labelledby={name}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            >
                {
                    radios.map(({ label, value, id }) => (
                        <FormControlLabel
                            key={id}
                            label={label}
                            value={id}
                            control={<Radio size={size}/>}
                        />
                    ))
                }
            </RadioGroup>
            <FormHelperText sx={{ m: 0 }} error={error}>{helperText}</FormHelperText>
        </FormControl>
    )
}

export default RadioInput
import {FormControl, FormHelperText, FormLabel, Stack, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material'
import {useState} from "react"

const ToggleInput = ({
     name, label, size, buttons, value,
     error, helperText, onChange
}) => {

    const [focused, setFocused] = useState(false)

    return (
        <FormControl error={error} fullWidth>
            <FormLabel id={name} focused={focused}>{label}</FormLabel>
            <ToggleButtonGroup
                fullWidth
                exclusive
                size={size}
                aria-label={name}
                id={name}
                value={value}
                onChange={onChange}
                onBlur={ e => setFocused(false) }
                onFocus={ e => setFocused(true) }
                sx={{ overflow: 'auto' }}
            >
                {
                    buttons.map(({ title, color, icon }, i) => (
                        <ToggleButton
                            key={i}
                            aria-label={title}
                            value={i}
                            color={color}
                            sx={{ textTransform: 'none' }}
                        >
                            <Stack alignItems="center">
                                {icon}
                                <Typography
                                    whiteSpace="nowrap"
                                    variant="caption"
                                >
                                    {title}
                                </Typography>
                            </Stack>
                        </ToggleButton>
                    ))
                }
            </ToggleButtonGroup>
            <FormHelperText sx={{ m: 0 }} error={error}>{helperText}</FormHelperText>
        </FormControl>
    )
}

export default ToggleInput
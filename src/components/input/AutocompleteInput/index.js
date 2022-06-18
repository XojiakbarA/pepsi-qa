import {Autocomplete} from "@mui/material"
import RenderInput from "./RenderInput"

const AutocompleteInput = ({
    name, label, loading, value, options, getOptionLabel, getOptionDisabled,
    renderOption, renderTag, onChange, onBlur, error, helperText, disabled
}) => {

    return (
        <Autocomplete
            fullWidth
            multiple
            ChipProps={{ size: 'small' }}
            disabled={disabled}
            getOptionDisabled={getOptionDisabled}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            loading={loading}
            options={options}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            renderOption={renderOption}
            renderTags={renderTag}
            renderInput={(params) => (
                <RenderInput
                    variant="standard"
                    params={params}
                    name={name}
                    label={label}
                    loading={loading}
                    error={error}
                    helperText={helperText}
                />
            )}
        />
    )
}

export default AutocompleteInput
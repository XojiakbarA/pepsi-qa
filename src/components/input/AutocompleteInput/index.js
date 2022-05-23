import {Autocomplete} from "@mui/material"
import RenderInput from "./RenderInput"

const AutocompleteInput = ({
   name, label, loading, value, options, getOptionLabel,
   renderOption, renderTag, onChange
}) => {

    return (
        <Autocomplete
            fullWidth
            multiple
            loading={loading}
            options={options}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={value}
            onChange={onChange}
            ChipProps={{ size: 'small' }}
            renderInput={(params) => (
                <RenderInput
                    params={params}
                    name={name}
                    label={label}
                    loading={loading}
                />
            )}
            renderOption={renderOption}
            renderTags={renderTag}
        />
    )
}

export default AutocompleteInput
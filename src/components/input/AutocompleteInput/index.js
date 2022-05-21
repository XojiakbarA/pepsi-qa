import {Autocomplete} from "@mui/material"
import RenderInput from "./RenderInput"

const AutocompleteInput = ({
   name, label, loading, option, options, getOptionLabel,
   renderOption, renderTag
}) => {

    const handleChange = (e, v) => {
        // console.log(v)
    }

    return (
        <Autocomplete
            fullWidth
            multiple
            loading={loading}
            options={options}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={option}
            onChange={handleChange}
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
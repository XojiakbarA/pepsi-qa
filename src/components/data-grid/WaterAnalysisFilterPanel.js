import {Grid, Paper, TextField} from "@mui/material"
import DateTimeRangePicker from "../input/DateTimeRangePicker"
import AutocompleteInput from "../input/AutocompleteInput"
import RangeInput from "../input/RangeInput"
import RenderUserTag from "../input/AutocompleteInput/RenderUserTag"
import {useSearchParams} from "react-router-dom"
import {useSelector} from "react-redux"
import {createParamsObject, createRangeValue, createIDsValue} from "../../utils/helpers"
import { usersSelector } from "../../store/selectors"

const WaterAnalysisFilterPanel = () => {

    const [params, setParams] = useSearchParams()

    const { data: users } = useSelector(usersSelector)

    const userValue = createIDsValue('user_ids', users, params)
    const hardnessValue = createRangeValue(params, 'hardness')
    const tdsValue = createRangeValue(params, 'tds')
    const alkalinityValue = createRangeValue(params, 'alkalinity')
    const conductivityValue = createRangeValue(params, 'conductivity')
    const turbidityValue = createRangeValue(params, 'turbidity')
    const temperatureValue = createRangeValue(params, 'temperature')
    const clValue = createRangeValue(params, 'cl')
    const mnValue = createRangeValue(params, 'mn')
    const feValue = createRangeValue(params, 'fe')
    const dateValue = { from: params.get('from'), to: params.get('to') }

    const handleFieldChange = (e, field) => {
        const value = e.target.value?.trim()
        const prevParams = createParamsObject(params)
        if (value) {
            setParams({ ...prevParams, [field]: value, page: 1 })
        } else {
            delete prevParams[field]
            setParams({ ...prevParams })
        }
    }
    const handleDateChange = (value, field) => {
        const prevParams = createParamsObject(params)
        if (value) {
            setParams({ ...prevParams, [field]: value.toJSON(), page: 1 })
        } else {
            delete prevParams[field]
            setParams({ ...prevParams })
        }
    }
    const handleIDsChange = (value, field) => {
        const ids = value.map(item => item.id)
        const prevParams = createParamsObject(params)
        setParams({ ...prevParams, [field]: ids, page: 1 })
    }

    return (
        <Paper sx={{ p: 2 }}>
            <Grid container spacing={2} maxWidth={600}>
                <Grid item xs={6} sm={4}>
                    <TextField
                        fullWidth
                        variant="standard"
                        name="place"
                        label="Place"
                        value={params.get('place') || ''}
                        onChange={ e => handleFieldChange(e, 'place') }
                    />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <AutocompleteInput
                        name="user_name"
                        label="Checked By"
                        options={users}
                        value={userValue}
                        onChange={(e, v) => handleIDsChange(v, 'user_ids')}
                        getOptionLabel={option => `${option.last_name} ${option.first_name}`}
                        renderTag={(value, getTagProps) => <RenderUserTag value={value} getTagProps={getTagProps}/>}
                    />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <RangeInput
                        label="Hardness"
                        value={hardnessValue}
                        onMinChange={ e => handleFieldChange(e, 'hardness_min') }
                        onMaxChange={ e => handleFieldChange(e, 'hardness_max') }
                    />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <RangeInput
                        label="TDS"
                        value={tdsValue}
                        onMinChange={ e => handleFieldChange(e, 'tds_min') }
                        onMaxChange={ e => handleFieldChange(e, 'tds_max') }
                    />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <RangeInput
                        label="Alkalinity"
                        value={alkalinityValue}
                        onMinChange={ e => handleFieldChange(e, 'alkalinity_min') }
                        onMaxChange={ e => handleFieldChange(e, 'alkalinity_max') }
                    />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <RangeInput
                        label="Conductivity"
                        value={conductivityValue}
                        onMinChange={ e => handleFieldChange(e, 'conductivity_min') }
                        onMaxChange={ e => handleFieldChange(e, 'conductivity_max') }
                    />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <RangeInput
                        label="Turbidity"
                        value={turbidityValue}
                        onMinChange={ e => handleFieldChange(e, 'turbidity_min') }
                        onMaxChange={ e => handleFieldChange(e, 'turbidity_max') }
                    />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <RangeInput
                        label="Temperature"
                        value={temperatureValue}
                        onMinChange={ e => handleFieldChange(e, 'temperature_min') }
                        onMaxChange={ e => handleFieldChange(e, 'temperature_max') }
                    />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <RangeInput
                        label="Cl"
                        value={clValue}
                        onMinChange={ e => handleFieldChange(e, 'cl_min') }
                        onMaxChange={ e => handleFieldChange(e, 'cl_max') }
                    />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <RangeInput
                        label="Mn"
                        value={mnValue}
                        onMinChange={ e => handleFieldChange(e, 'mn_min') }
                        onMaxChange={ e => handleFieldChange(e, 'mn_max') }
                    />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <RangeInput
                        label="Fe"
                        value={feValue}
                        onMinChange={ e => handleFieldChange(e, 'fe_min') }
                        onMaxChange={ e => handleFieldChange(e, 'fe_max') }
                    />
                </Grid>
                <Grid item xs={12}>
                    <DateTimeRangePicker
                        label="Checked At"
                        value={dateValue}
                        onFromChange={ v => handleDateChange(v, 'from') }
                        onToChange={ v => handleDateChange(v, 'to') }
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}

export default WaterAnalysisFilterPanel
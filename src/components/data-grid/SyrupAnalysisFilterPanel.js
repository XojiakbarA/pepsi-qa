import {Grid, Paper, TextField} from "@mui/material"
import RangeInput from "../input/RangeInput"
import AutocompleteInput from "../input/AutocompleteInput"
import DateTimeRangePicker from "../input/DateTimeRangePicker"
import RenderOption from "../input/AutocompleteInput/RenderOption"
import RenderTag from "../input/AutocompleteInput/RenderTag"
import RenderUserTag from "../input/AutocompleteInput/RenderUserTag"
import {useSelector} from "react-redux"
import {useSearchParams} from "react-router-dom"
import {createIDsValue, createParamsObject, createRangeValue} from "../../utils/helpers"
import { usersSelector } from "../../store/selectors"

const SyrupAnalysisFilterPanel = () => {

    const [ params, setParams ] = useSearchParams()

    const products = useSelector(state => state.products.data)
    const tanks = useSelector(state => state.tanks.data)
    const { data: users } = useSelector(usersSelector)

    const productValue = createIDsValue('product_ids', products, params)
    const tankValue = createIDsValue('tank_ids', tanks, params)
    const userValue = createIDsValue('user_ids', users, params)
    const volumeValue = createRangeValue(params, 'volume')
    const sugarSyrupBrixValue = createRangeValue(params, 'sugar_syrup_brix')
    const blendSyrupBrixValue = createRangeValue(params, 'blend_syrup_brix')
    const drinkBrixValue = createRangeValue(params, 'drink_brix')
    const blendDensityValue = createRangeValue(params, 'blend_density')
    const drinkDensityValue = createRangeValue(params, 'drink_density')
    const drinkInvertedBrixValue = createRangeValue(params, 'drink_inverted_brix')
    const drinkAcidityValue = createRangeValue(params, 'drink_acidity')
    const drinkpHValue = createRangeValue(params, 'drink_ph')
    const targetValue = createRangeValue(params, 'target')
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
    const handleSyrupNumberChange = (e) => {
        const id = e.target.value
        const prevParams = createParamsObject(params)
        if (id) {
            setParams({ id })
        } else {
            delete prevParams.id
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
        delete prevParams.syrup_id
        setParams({ ...prevParams, [field]: ids, page: 1 })
    }

    return (
        <Paper sx={{ p: 2 }}>
            <Grid container spacing={2} maxWidth={600}>
                <Grid item xs={6} sm={3}>
                    <TextField
                        fullWidth
                        variant="standard"
                        name="id"
                        label="Syrup Number"
                        type="number"
                        value={params.get('id') || ''}
                        onChange={handleSyrupNumberChange}
                    />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <DateTimeRangePicker
                        label="Checked At"
                        value={dateValue}
                        onFromChange={ v => handleDateChange(v, 'from') }
                        onToChange={ v => handleDateChange(v, 'to') }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AutocompleteInput
                        name="product_ids"
                        label="Product"
                        options={products}
                        value={productValue}
                        onChange={(e, v) => handleIDsChange(v, 'product_ids')}
                        getOptionLabel={option => option.name}
                        renderOption={(props, option) => <RenderOption key={option.id} props={props} option={option}/>}
                        renderTag={(value, getTagProps) => <RenderTag value={value} getTagProps={getTagProps}/>}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AutocompleteInput
                        name="tank"
                        label="Tank"
                        options={tanks}
                        value={tankValue}
                        onChange={(e, v) => handleIDsChange(v, 'tank_ids')}
                        getOptionLabel={option => `${option.factory_name} ${option.number}`}
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <RangeInput
                        label="Volume"
                        value={volumeValue}
                        onMinChange={ e => handleFieldChange(e, 'volume_min') }
                        onMaxChange={ e => handleFieldChange(e, 'volume_max') }
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <RangeInput
                        label="Sugar Syrup Brix"
                        value={sugarSyrupBrixValue}
                        onMinChange={ e => handleFieldChange(e, 'sugar_syrup_brix_min') }
                        onMaxChange={ e => handleFieldChange(e, 'sugar_syrup_brix_max') }
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <RangeInput
                        label="Blend Syrup Brix"
                        value={blendSyrupBrixValue}
                        onMinChange={ e => handleFieldChange(e, 'blend_syrup_brix_min') }
                        onMaxChange={ e => handleFieldChange(e, 'blend_syrup_brix_max') }
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <RangeInput
                        label="Drink Brix"
                        value={drinkBrixValue}
                        onMinChange={ e => handleFieldChange(e, 'drink_brix_min') }
                        onMaxChange={ e => handleFieldChange(e, 'drink_brix_max') }
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <RangeInput
                        label="Blend Density"
                        value={blendDensityValue}
                        onMinChange={ e => handleFieldChange(e, 'blend_density_min') }
                        onMaxChange={ e => handleFieldChange(e, 'blend_density_max') }
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <RangeInput
                        label="Drink Density"
                        value={drinkDensityValue}
                        onMinChange={ e => handleFieldChange(e, 'drink_density_min') }
                        onMaxChange={ e => handleFieldChange(e, 'drink_density_max') }
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <RangeInput
                        label="Drink Inverted Brix"
                        value={drinkInvertedBrixValue}
                        onMinChange={ e => handleFieldChange(e, 'drink_inverted_brix_min') }
                        onMaxChange={ e => handleFieldChange(e, 'drink_inverted_brix_max') }
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <RangeInput
                        label="Drink Acidity"
                        value={drinkAcidityValue}
                        onMinChange={ e => handleFieldChange(e, 'drink_acidity_min') }
                        onMaxChange={ e => handleFieldChange(e, 'drink_acidity_max') }
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <RangeInput
                        label="Drink pH"
                        value={drinkpHValue}
                        onMinChange={ e => handleFieldChange(e, 'drink_ph_min') }
                        onMaxChange={ e => handleFieldChange(e, 'drink_ph_max') }
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <RangeInput
                        label="Target"
                        value={targetValue}
                        onMinChange={ e => handleFieldChange(e, 'target_min') }
                        onMaxChange={ e => handleFieldChange(e, 'target_max') }
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
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
            </Grid>
        </Paper>
    )
}

export default SyrupAnalysisFilterPanel
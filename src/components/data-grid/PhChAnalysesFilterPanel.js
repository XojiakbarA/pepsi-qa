import {Grid, Paper, TextField} from "@mui/material"
import AutocompleteInput from "../input/AutocompleteInput"
import DateTimeRangePicker from "../input/DateTimeRangePicker"
import RenderLineOption from "../input/AutocompleteInput/RenderLineOption"
import RenderLineTag from "../input/AutocompleteInput/RenderLineTag"
import RenderOption from "../input/AutocompleteInput/RenderOption"
import RenderTag from "../input/AutocompleteInput/RenderTag"
import RenderUserTag from "../input/AutocompleteInput/RenderUserTag"
import {useSearchParams} from "react-router-dom"
import {useSelector} from "react-redux"
import {createParamsObject, createIDsValue} from "../../utils/helpers"
import { linesSelector, usersSelector } from "../../store/selectors"

const PhChAnalysesFilterPanel = () => {

    const [ params, setParams ] = useSearchParams()

    const products = useSelector(state => state.products.data)
    const { data: lines } = useSelector(linesSelector)
    const formats = useSelector(state => state.formats.data)
    const containerSuppliers = useSelector(state => state.containerSuppliers.data)
    const caps = useSelector(state => state.caps.data)
    const { data: users } = useSelector(usersSelector)

    const productValue = createIDsValue('product_ids', products, params)
    const lineValue = createIDsValue('line_ids', lines, params)
    const formatValue = createIDsValue('format_ids', formats, params)
    const containerSupplierValue = createIDsValue('container_supplier_ids', containerSuppliers, params)
    const capValue = createIDsValue('cap_ids', caps, params)
    const userValue = createIDsValue('user_ids', users, params)
    const dateValue = { from: params.get('from'), to: params.get('to') }

    const handleSyrupNumberChange = (e) => {
        const syrup_id = e.target.value
        const prevParams = createParamsObject(params)
        if (syrup_id) {
            setParams({ syrup_id })
        } else {
            delete prevParams.syrup_id
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
                        name="syrup_id"
                        label="Syrup Number"
                        type="number"
                        value={params.get('syrup_id') || ''}
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
                        name="line_ids"
                        label="Line"
                        options={lines}
                        value={lineValue}
                        onChange={(e, v) => handleIDsChange(v, 'line_ids')}
                        getOptionLabel={option => option.name}
                        renderOption={(props, option) => <RenderLineOption key={option.id} props={props} option={option}/>}
                        renderTag={(value, getTagProps) => <RenderLineTag value={value} getTagProps={getTagProps}/>}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AutocompleteInput
                        name="format_ids"
                        label="Format"
                        options={formats}
                        value={formatValue}
                        onChange={(e, v) => handleIDsChange(v, 'format_ids')}
                        getOptionLabel={option => String(option.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AutocompleteInput
                        name="container_supplier_ids"
                        label="Container Supplier"
                        options={containerSuppliers}
                        value={containerSupplierValue}
                        onChange={(e, v) => handleIDsChange(v, 'container_supplier_ids')}
                        getOptionLabel={option => option.name}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AutocompleteInput
                        name="cap_ids"
                        label="Cap"
                        options={caps}
                        value={capValue}
                        onChange={(e, v) => handleIDsChange(v, 'cap_ids')}
                        getOptionLabel={option => option.name}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AutocompleteInput
                        name="user_ids"
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

export default PhChAnalysesFilterPanel
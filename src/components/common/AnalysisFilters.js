import {Grid, IconButton, Popover, Stack, TextField} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import AutocompleteInput from "../input/AutocompleteInput"
import DateTimeRangePicker from "../input/DateTimeRangePicker"
import RenderLineOption from "../input/AutocompleteInput/RenderLineOption"
import RenderLineTag from "../input/AutocompleteInput/RenderLineTag"
import RenderOption from "../input/AutocompleteInput/RenderOption"
import RenderTag from "../input/AutocompleteInput/RenderTag"
import RenderUserTag from "../input/AutocompleteInput/RenderUserTag"
import {useSearchParams} from "react-router-dom"
import {useSelector} from "react-redux"
import {createParamsObject, createValue} from "../../utils/helpers"

const AnalysisFilters = ({ anchorEl, onClose }) => {

    const [ params, setParams ] = useSearchParams()

    const products = useSelector(state => state.products.data)
    const lines = useSelector(state => state.lines.data)
    const formats = useSelector(state => state.formats.data)
    const containerSuppliers = useSelector(state => state.containerSuppliers.data)
    const caps = useSelector(state => state.caps.data)
    const users = useSelector(state => state.users.data)

    const productValue = createValue('product_ids', products, params)
    const lineValue = createValue('line_ids', lines, params)
    const formatValue = createValue('format_ids', formats, params)
    const containerSupplierValue = createValue('container_supplier_ids', containerSuppliers, params)
    const capValue = createValue('cap_ids', caps, params)
    const userValue = createValue('user_ids', users, params)

    const renderLineOption = (props, option) => (
        <RenderLineOption key={option.id} props={props} option={option}/>
    )
    const renderLineTag = (value, getTagProps) => (
        <RenderLineTag value={value} getTagProps={getTagProps}/>
    )
    const renderProductOption = (props, option) => (
        <RenderOption key={option.id} props={props} option={option}/>
    )
    const renderProductTag = (value, getTagProps) => (
        <RenderTag value={value} getTagProps={getTagProps}/>
    )
    const renderUserTag = (value, getTagProps) => (
        <RenderUserTag value={value} getTagProps={getTagProps}/>
    )

    const handleSyrupNumberChange = (e) => {
        const syrup_id = e.target.value
        if (syrup_id) setParams({ syrup_id })
        else setParams({})
    }
    const handleFromChange = (value) => {
        const prevParams = createParamsObject(params)
        delete prevParams.syrup_id
        if (value) {
            const from = value.toJSON()
            setParams({ ...prevParams, from, page: 1 })
        } else {
            delete prevParams.from
            setParams({ ...prevParams })
        }
    }
    const handleToChange = (value) => {
        const prevParams = createParamsObject(params)
        delete prevParams.syrup_id
        if (value) {
            const to = value.toJSON()
            setParams({ ...prevParams, to, page: 1 })
        } else {
            delete prevParams.to
            setParams({ ...prevParams })
        }
    }
    const handleProductChange = (e, products) => {
        const product_ids = products.map(item => item.id)
        const prevParams = createParamsObject(params)
        delete prevParams.syrup_id
        setParams({ ...prevParams, product_ids, page: 1 })
    }
    const handleLineChange = (e, lines) => {
        const line_ids = lines.map(item => item.id)
        const prevParams = createParamsObject(params)
        delete prevParams.syrup_id
        setParams({ ...prevParams, line_ids, page: 1 })
    }
    const handleFormatChange = (e, formats) => {
        const format_ids = formats.map(item => item.id)
        const prevParams = createParamsObject(params)
        delete prevParams.syrup_id
        setParams({ ...prevParams, format_ids, page: 1 })
    }
    const handleContainerChange = (e, containers) => {
        const container_supplier_ids = containers.map(item => item.id)
        const prevParams = createParamsObject(params)
        delete prevParams.syrup_id
        setParams({ ...prevParams, container_supplier_ids, page: 1 })
    }
    const handleCapChange = (e, caps) => {
        const cap_ids = caps.map(item => item.id)
        const prevParams = createParamsObject(params)
        delete prevParams.syrup_id
        setParams({ ...prevParams, cap_ids, page: 1 })
    }
    const handleUserChange = (e, users) => {
        const user_ids = users.map(item => item.id)
        const prevParams = createParamsObject(params)
        delete prevParams.syrup_id
        setParams({ ...prevParams, user_ids, page: 1 })
    }

    return (
        <Popover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{ sx: { padding: 1 } }}
        >
            <Stack direction="row" justifyContent="end">
                <IconButton size="small" onClick={onClose}>
                    <CloseIcon fontSize="small"/>
                </IconButton>
            </Stack>
            <Grid container spacing={2} maxWidth={600}>
                <Grid item xs={12} sm={4}>
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
                <Grid item xs={12} sm={8}>
                    <DateTimeRangePicker
                        from={params.get('from')}
                        to={params.get('to')}
                        onFromChange={handleFromChange}
                        onToChange={handleToChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AutocompleteInput
                        name="product_name"
                        label="Product Name"
                        options={products}
                        value={productValue}
                        onChange={handleProductChange}
                        getOptionLabel={option => option.name}
                        renderOption={renderProductOption}
                        renderTag={renderProductTag}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AutocompleteInput
                        name="line_name"
                        label="Line Name"
                        options={lines}
                        value={lineValue}
                        onChange={handleLineChange}
                        getOptionLabel={option => option.name}
                        renderOption={renderLineOption}
                        renderTag={renderLineTag}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AutocompleteInput
                        name="format_value"
                        label="Format Value"
                        options={formats}
                        value={formatValue}
                        onChange={handleFormatChange}
                        getOptionLabel={option => String(option.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AutocompleteInput
                        name="container_supplier_name"
                        label="Container Supplier"
                        options={containerSuppliers}
                        value={containerSupplierValue}
                        onChange={handleContainerChange}
                        getOptionLabel={option => option.name}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AutocompleteInput
                        name="cap_name"
                        label="Cap Name"
                        options={caps}
                        value={capValue}
                        onChange={handleCapChange}
                        getOptionLabel={option => option.name}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AutocompleteInput
                        name="user_name"
                        label="Checked By"
                        options={users}
                        value={userValue}
                        onChange={handleUserChange}
                        getOptionLabel={option => `${option.last_name} ${option.first_name}`}
                        renderTag={renderUserTag}
                    />
                </Grid>
            </Grid>
        </Popover>
    )
}

export default AnalysisFilters
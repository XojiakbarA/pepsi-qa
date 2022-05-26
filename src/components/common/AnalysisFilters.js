import {IconButton, Popover, Stack} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import AutocompleteInput from "../input/AutocompleteInput"
import DateTimeRangePicker from "../input/DateTimeRangePicker"
import RenderLineOption from "../input/AutocompleteInput/RenderLineOption"
import RenderLineTag from "../input/AutocompleteInput/RenderLineTag"
import RenderOption from "../input/AutocompleteInput/RenderOption"
import RenderTag from "../input/AutocompleteInput/RenderTag"
import RenderUserTag from "../input/AutocompleteInput/RenderUserTag"
import {useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom"
import {fetchCaps, fetchContainerSuppliers, fetchFormats, fetchLines, fetchProducts, fetchUsers} from "../../api"
import {createParamsObject} from "../../utils/helpers"

const AnalysisFilters = ({ anchorEl, onClose }) => {

    const [options, setOptions] = useState({ products: [],  lines: [],  formats: [], containers: [], caps: [], users: [] })
    const [values, setValues] = useState({ products: [],  lines: [],  formats: [], containers: [], caps: [], users: [] })

    const [ params, setParams ] = useSearchParams()

    useEffect(() => {
        const getOptions = async () => {
            const products = await fetchProducts()
            if (products.status === 200) {
                setOptions(prev => ({ ...prev, products: products.data.data }))
            }
            const lines = await fetchLines()
            if (lines.status === 200) {
                setOptions(prev => ({ ...prev, lines: lines.data.data }))
            }
            const formats = await fetchFormats()
            if (formats.status === 200) {
                setOptions(prev => ({ ...prev, formats: formats.data.data }))
            }
            const containers = await fetchContainerSuppliers()
            if (containers.status === 200) {
                setOptions(prev => ({ ...prev, containers: containers.data.data }))
            }
            const caps = await fetchCaps()
            if (caps.status === 200) {
                setOptions(prev => ({ ...prev, caps: caps.data.data }))
            }
            const users = await fetchUsers()
            if (users.status === 200) {
                setOptions(prev => ({ ...prev, users: users.data.data }))
            }
        }
        getOptions()
    }, [])

    useEffect(() => {
        const createValue = (name, options) => {
            const ids = params.getAll(name).map(id => Number(id))
            return options.filter(item => ids.includes(item.id))
        }

        const products = createValue('product_ids', options.products)
        const lines = createValue('line_ids', options.lines)
        const formats = createValue('format_ids', options.formats)
        const containers = createValue('container_supplier_ids', options.containers)
        const caps = createValue('cap_ids', options.caps)
        const users = createValue('user_ids', options.users)

        setValues(prev => ({ ...prev, products, lines, formats, containers, caps, users }))
    }, [params, options])

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

    const handleProductChange = (e, products) => {
        const product_ids = products.map(item => item.id)
        const prevParams = createParamsObject(params)
        setParams({ ...prevParams, product_ids, page: 1 })
    }
    const handleLineChange = (e, lines) => {
        const line_ids = lines.map(item => item.id)
        const prevParams = createParamsObject(params)
        setParams({ ...prevParams, line_ids, page: 1 })
    }
    const handleFormatChange = (e, formats) => {
        const format_ids = formats.map(item => item.id)
        const prevParams = createParamsObject(params)
        setParams({ ...prevParams, format_ids, page: 1 })
    }
    const handleContainerChange = (e, containers) => {
        const container_supplier_ids = containers.map(item => item.id)
        const prevParams = createParamsObject(params)
        setParams({ ...prevParams, container_supplier_ids, page: 1 })
    }
    const handleCapChange = (e, caps) => {
        const cap_ids = caps.map(item => item.id)
        const prevParams = createParamsObject(params)
        setParams({ ...prevParams, cap_ids, page: 1 })
    }
    const handleUserChange = (e, users) => {
        const user_ids = users.map(item => item.id)
        const prevParams = createParamsObject(params)
        setParams({ ...prevParams, user_ids, page: 1 })
    }
    const handleFromChange = (value) => {
        const from = value.toJSON()
        const prevParams = createParamsObject(params)
        setParams({ ...prevParams, from, page: 1 })
    }
    const handleToChange = (value) => {
        const to = value.toJSON()
        const prevParams = createParamsObject(params)
        setParams({ ...prevParams, to, page: 1 })
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
            <Stack spacing={4} padding={1} sx={{ maxWidth: 350 }}>
                <AutocompleteInput
                    name="product_name"
                    label="Product Name"
                    options={options.products}
                    value={values.products}
                    onChange={handleProductChange}
                    getOptionLabel={option => option.name}
                    renderOption={renderProductOption}
                    renderTag={renderProductTag}
                />
                <AutocompleteInput
                    name="line_name"
                    label="Line Name"
                    options={options.lines}
                    value={values.lines}
                    onChange={handleLineChange}
                    getOptionLabel={option => option.name}
                    renderOption={renderLineOption}
                    renderTag={renderLineTag}
                />
                <AutocompleteInput
                    name="format_value"
                    label="Format Value"
                    options={options.formats}
                    value={values.formats}
                    onChange={handleFormatChange}
                    getOptionLabel={option => String(option.value)}
                />
                <AutocompleteInput
                    name="container_supplier_name"
                    label="Container Supplier"
                    options={options.containers}
                    value={values.containers}
                    onChange={handleContainerChange}
                    getOptionLabel={option => option.name}
                />
                <AutocompleteInput
                    name="cap_name"
                    label="Cap Name"
                    options={options.caps}
                    value={values.caps}
                    onChange={handleCapChange}
                    getOptionLabel={option => option.name}
                />
                <AutocompleteInput
                    name="user_name"
                    label="Checked By"
                    options={options.users}
                    value={values.users}
                    onChange={handleUserChange}
                    getOptionLabel={option => `${option.last_name} ${option.first_name}`}
                    renderTag={renderUserTag}
                />
                <DateTimeRangePicker
                    from={params.get('from')}
                    to={params.get('to')}
                    onFromChange={handleFromChange}
                    onToChange={handleToChange}
                />
            </Stack>
        </Popover>
    )
}

export default AnalysisFilters
import {Popover, Stack} from "@mui/material"
import AutocompleteInput from "../input/AutocompleteInput"
import DateTimeRangePicker from "../input/DateTimeRangePicker"
import RenderLineOption from "../input/AutocompleteInput/RenderLineOption"
import RenderLineTag from "../input/AutocompleteInput/RenderLineTag"
import RenderOption from "../input/AutocompleteInput/RenderOption"
import RenderTag from "../input/AutocompleteInput/RenderTag"
import {useEffect, useState} from "react"
import {fetchCaps, fetchContainerSuppliers, fetchFormats, fetchLines, fetchProducts} from "../../api"

const AnalysisFilters = ({ anchorEl, onClose }) => {

    const [products, setProducts] = useState([])
    const [lines, setLines] = useState([])
    const [formats, setFormats] = useState([])
    const [containers, setContainers] = useState([])
    const [caps, setCaps] = useState([])

    useEffect(() => {
        const getOptions = async () => {
            const products = await fetchProducts()
            if (products.status === 200) {
                setProducts(products.data.data)
            }
            const lines = await fetchLines()
            if (lines.status === 200) {
                setLines(lines.data.data)
            }
            const formats = await fetchFormats()
            if (formats.status === 200) {
                setFormats(formats.data.data)
            }
            const containers = await fetchContainerSuppliers()
            if (containers.status === 200) {
                setContainers(containers.data.data)
            }
            const caps = await fetchCaps()
            if (caps.status === 200) {
                setCaps(caps.data.data)
            }
        }
        getOptions()
    }, [])

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

    return (
        <Popover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Stack spacing={4} padding={1} sx={{ maxWidth: 350 }}>
                <AutocompleteInput
                    name="product_name"
                    label="Product Name"
                    options={products}
                    getOptionLabel={option => option.name}
                    renderOption={renderProductOption}
                    renderTag={renderProductTag}
                />
                <AutocompleteInput
                    name="line_name"
                    label="Line Name"
                    options={lines}
                    getOptionLabel={option => option.name}
                    renderOption={renderLineOption}
                    renderTag={renderLineTag}
                />
                <AutocompleteInput
                    name="format_value"
                    label="Format Value"
                    options={formats}
                    getOptionLabel={option => String(option.value)}
                />
                <AutocompleteInput
                    name="container_supplier_name"
                    label="Container Supplier"
                    options={containers}
                    getOptionLabel={option => option.name}
                />
                <AutocompleteInput
                    name="cap_name"
                    label="Cap Name"
                    options={caps}
                    getOptionLabel={option => option.name}
                />
                <DateTimeRangePicker/>
            </Stack>
        </Popover>
    )
}

export default AnalysisFilters
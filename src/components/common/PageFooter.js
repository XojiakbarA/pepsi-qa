import {Box, Pagination, Stack, useMediaQuery} from "@mui/material"
import SelectInput from "../input/SelectInput"
import {useSearchParams} from "react-router-dom"
import {useSelector} from "react-redux"
import {createParamsObject} from "../../utils/helpers"
import {perPagesSelector} from "../../store/selectors"

const PageFooter = ({ meta }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const [params, setParams] = useSearchParams()

    const { multiTable: options } = useSelector(perPagesSelector)

    const handlePageChange = (e, page) => {
        const prevParams = createParamsObject(params)
        setParams({ ...prevParams, page })
    }
    const handlePerPageChange = (e) => {
        const per_page = e.target.value
        const prevParams = createParamsObject(params)
        setParams({ ...prevParams, per_page, page: 1 })
    }

    return (
        <Box display="flex" justifyContent="flex-end" mb={2}>
            <Stack
                spacing={2}
                direction={isDownSm ? "column-reverse" : "row"}
                alignItems={isDownSm ? "start" : "center"}
            >
                {
                    meta?.total > options[0] &&
                    <SelectInput
                        perPage={params.get('per_page') || options[0]}
                        options={options}
                        onChange={handlePerPageChange}
                    />
                }
                {
                    meta?.last_page > 1 &&
                    <Pagination
                        count={meta.last_page}
                        color="primary"
                        page={Number(params.get('page')) || 1}
                        onChange={handlePageChange}
                    />
                }
            </Stack>
        </Box>
    )
}

export default PageFooter
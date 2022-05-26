import {Box, Pagination, Stack, useMediaQuery} from "@mui/material"
import SelectInput from "../input/SelectInput"
import {useSearchParams} from "react-router-dom"
import {createParamsObject} from "../../utils/helpers"

const PageFooter = ({ analyses, options }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const [params, setParams] = useSearchParams()

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
        <Box display="flex" justifyContent="flex-end">
            {
                !analyses.loading && !!analyses.data.length
                &&
                <Stack
                    spacing={2}
                    direction={isDownSm ? "column-reverse" : "row"}
                    alignItems={isDownSm ? "start" : "center"}
                >
                    <SelectInput
                        perPage={params.get('per_page') || options[0]}
                        options={options}
                        onChange={handlePerPageChange}
                    />
                    <Pagination
                        count={analyses.meta.last_page}
                        color="primary"
                        page={Number(params.get('page')) || 1}
                        onChange={handlePageChange}
                    />
                </Stack>
            }
        </Box>
    )
}

export default PageFooter
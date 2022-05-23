import {CircularProgress, Grid, Pagination, Stack} from "@mui/material"
import {DataGrid} from "@mui/x-data-grid"
import ChemicalIcon from "../components/icons/ChemicalIcon"
import PageTitle from "../components/common/PageTitle"
import MyGridToolbar from "../components/data-grid/MyGridToolbar"
import NoResults from "../components/common/NoResults"
import SelectInput from "../components/input/SelectInput"
import {useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom"
import {fetchPhysicalChemicalAnalyses} from "../api"
import {createParamsObject} from "../utils/helpers"

const columns = [
    {
        flex: 1,
        field: 'time',
        headerName: 'Time'
    },
    {
        flex: 1,
        field: 'temperature',
        headerName: 'Temperature'
    },
    {
        flex: 1,
        field: 'pressure',
        headerName: 'Pressure'
    },
    {
        flex: 1,
        field: 'carbonate',
        headerName: 'Carbonate'
    },
    {
        flex: 1,
        field: 'brix',
        headerName: 'Brix'
    },
    {
        flex: 1,
        field: 'inverted_brix',
        headerName: 'Inverted Brix'
    },
    {
        flex: 1,
        field: 'density',
        headerName: 'Density'
    },
    {
        flex: 1,
        field: 'acidity',
        headerName: 'Acidity'
    },
    {
        flex: 1,
        field: 'ph',
        headerName: 'pH'
    },
    {
        flex: 1,
        field: 'fullness',
        headerName: 'Fullness'
    },
    {
        flex: 1,
        field: 'checked',
        headerName: 'Checked'
    },
]

const PhysicalChemicalAnalyses = () => {

    const [params, setParams] = useSearchParams()
    const [analyses, setAnalyses] = useState({data: [], meta: {}, loading: false})

    useEffect(() => {
        const getAnalyses = async () => {
            setAnalyses(prev => ({ ...prev, loading: true }))
            const res = await fetchPhysicalChemicalAnalyses(createParamsObject(params))
            if (res.status === 200) {
                setAnalyses({ data: res.data.data, meta: res.data.meta, loading: false })
            }
        }
        getAnalyses()
    }, [params])

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
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageTitle
                    icon={<ChemicalIcon width={40}/>}
                    title="Physical-Chemical Analyses"
                />
            </Grid>
            <Grid item xs={12}>
                <Stack spacing={2}>
                {
                    analyses.loading
                    ?
                    <CircularProgress/>
                    :
                    !analyses.data.length
                    ?
                    <NoResults/>
                    :
                    analyses.data.map(analysis => (
                        <DataGrid
                            key={analysis.id}
                            autoHeight
                            disableColumnMenu
                            disableSelectionOnClick
                            hideFooter
                            density="compact"
                            components={{
                                Toolbar: MyGridToolbar
                            }}
                            columns={columns}
                            rows={analysis.values}
                            componentsProps={{ toolbar: { analysis } }}
                        />
                    ))
                }
                </Stack>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
                {
                    !analyses.loading && !!analyses.data.length
                    &&
                    <Stack direction="row" spacing={2} alignItems="center">
                        <SelectInput
                            perPage={params.get('per_page') || 5}
                            options={[5, 10, 20]}
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
            </Grid>
        </Grid>
    )
}

export default PhysicalChemicalAnalyses
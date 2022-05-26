import {CircularProgress, Grid, Stack} from "@mui/material"
import {DataGrid} from "@mui/x-data-grid"
import ChemicalIcon from "../components/icons/ChemicalIcon"
import PageHeader from "../components/common/PageHeader"
import PageFooter from "../components/common/PageFooter"
import MyGridToolbar from "../components/data-grid/MyGridToolbar"
import NoResults from "../components/common/NoResults"
import {useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom"
import {fetchPhysicalChemicalAnalyses} from "../api"
import {createParamsObject} from "../utils/helpers"

const columns = [
    {
        flex: 1,
        minWidth: 80,
        field: 'time',
        headerName: 'Time'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'temperature',
        headerName: 'Temperature'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'pressure',
        headerName: 'Pressure'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'carbonate',
        headerName: 'Carbonate'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'brix',
        headerName: 'Brix'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'inverted_brix',
        headerName: 'Inverted Brix'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'density',
        headerName: 'Density'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'acidity',
        headerName: 'Acidity'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'ph',
        headerName: 'pH'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'fullness',
        headerName: 'Fullness'
    },
    {
        flex: 1,
        minWidth: 120,
        field: 'checked_by',
        headerName: 'Checked By'
    },
]

const PhysicalChemicalAnalyses = () => {

    const [params] = useSearchParams()

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

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageHeader
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
            <Grid item xs={12}>
                <PageFooter analyses={analyses}  options={[5, 10, 20]}/>
            </Grid>
        </Grid>
    )
}

export default PhysicalChemicalAnalyses
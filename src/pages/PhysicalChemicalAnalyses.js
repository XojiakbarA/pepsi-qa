import {Grid, LinearProgress, Pagination, Stack} from "@mui/material"
import {DataGrid} from "@mui/x-data-grid"
import ChemicalIcon from "../components/icons/ChemicalIcon"
import PageTitle from "../components/common/PageTitle"
import MyGridToolbar from "../components/data-grid/MyGridToolbar"
import {useEffect, useState} from "react"
import {fetchPhysicalChemicalAnalyses} from "../api"

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

    const [analyses, setAnalyses] = useState([])

    useEffect(() => {
        const getAnalyses = async () => {
            const res = await fetchPhysicalChemicalAnalyses()
            if (res.status === 200) {
                setAnalyses(res.data.data)
            }
        }
        getAnalyses()
    }, [])

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
                    analyses.map(analysis => (
                        <DataGrid
                            key={analysis.id}
                            autoHeight
                            disableColumnMenu
                            disableSelectionOnClick
                            hideFooter
                            density="compact"
                            components={{
                                Toolbar: MyGridToolbar,
                                LoadingOverlay: LinearProgress
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
                <Pagination count={10} color="primary"/>
            </Grid>
        </Grid>
    )
}

export default PhysicalChemicalAnalyses
import {CircularProgress, Grid, Stack} from "@mui/material"
import {DataGrid} from "@mui/x-data-grid"
import CapIcon from "../components/icons/CapIcon"
import PageHeader from "../components/common/PageHeader"
import PageFooter from "../components/common/PageFooter"
import MyGridToolbar from "../components/data-grid/MyGridToolbar"
import NoResults from "../components/common/NoResults"
import {useState, useEffect} from "react"
import {useSearchParams} from "react-router-dom"
import {fetchRemovalTorqueAnalyses} from "../api"
import {createParamsObject} from "../utils/helpers"

const columns = [
    {
        flex: 1,
        minWidth: 80,
        field: 'id',
        headerName: 'ID'
    },
    {
        flex: 2,
        minWidth: 80,
        field: 'lb',
        headerName: 'Lb'
    },
    {
        flex: 2,
        minWidth: 80,
        field: 'angle',
        headerName: 'Angle'
    },
]

const RemovalTorqueAnalyses = () => {

    const [params] = useSearchParams()

    const [analyses, setAnalyses] = useState({data: [], meta: {}, loading: false})

    useEffect(() => {
        const getAnalyses = async () => {
            setAnalyses(prev => ({ ...prev, loading: true }))
            const res = await fetchRemovalTorqueAnalyses(createParamsObject(params))
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
                    icon={<CapIcon width={40}/>}
                    title="Removal Torque Analyses"
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
                    <Grid container spacing={2}>
                        {
                        analyses.data.map(analysis => (
                            <Grid item xs={12} sm={6} lg={4} xl={2} key={analysis.id}>
                                <DataGrid
                                    autoHeight
                                    disableColumnMenu
                                    disableSelectionOnClick
                                    hideFooter
                                    density="compact"
                                    components={{
                                        Toolbar: MyGridToolbar
                                    }}
                                    columns={columns}
                                    rows={analysis.removal_torque_values}
                                    componentsProps={{toolbar: {analysis}}}
                                />
                            </Grid>
                        ))
                        }
                </Grid>
                }
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <PageFooter analyses={analyses} options={[6, 12, 18]}/>
            </Grid>
        </Grid>
    )
}

export default RemovalTorqueAnalyses
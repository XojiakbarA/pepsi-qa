import {CircularProgress, Grid, Stack} from "@mui/material"
import {DataGrid} from "@mui/x-data-grid"
import BottleIcon from "../components/icons/BottleIcon"
import PageHeader from "../components/common/PageHeader"
import PageFooter from "../components/common/PageFooter"
import MyGridToolbar from "../components/data-grid/MyGridToolbar"
import NoResults from "../components/common/NoResults"
import {useSearchParams} from "react-router-dom"
import {useAnalyses} from "../hooks/useAnalyses"
import {fetchSectionWeightAnalyses} from "../api"

const columns = [
    {
        flex: 1,
        minWidth: 80,
        field: 'id',
        headerName: 'ID'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'top',
        headerName: 'Top'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'label',
        headerName: 'Label'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'body',
        headerName: 'Body'
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'base',
        headerName: 'Base'
    },
]

const SectionWeightAnalyses = () => {

    const [params] = useSearchParams()

    const { data, meta, loading } = useAnalyses(params, fetchSectionWeightAnalyses)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageHeader
                    icon={<BottleIcon width={40}/>}
                    title="Section Weight Analyses"
                />
            </Grid>
            <Grid item xs={12}>
                <Stack spacing={2}>
                {
                    loading
                    ?
                    <CircularProgress/>
                    :
                    !data.length
                    ?
                    <NoResults/>
                    :
                    <Grid container spacing={2}>
                    {
                        data.map(analysis => (
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
                                    rows={analysis.section_weight_values}
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
                <PageFooter
                    visible={!loading && !!data.length}
                    count={meta.last_page}
                    options={[6, 12, 18]}
                />
            </Grid>
        </Grid>
    )
}

export default SectionWeightAnalyses
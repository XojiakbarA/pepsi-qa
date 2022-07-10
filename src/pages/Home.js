import { CircularProgress, Grid, Stack, Typography } from "@mui/material"
import LineCard from "../components/card/LineCard"
import { useSelector } from "react-redux"
import { linesSelector } from "../store/selectors"

const Home = () => {

    const { data, loading } = useSelector(linesSelector)

    const lines = [...data].sort((_, b) => b.status === 'works' ? 1 : -1)

    return (
        <Grid container spacing={2} mb={2}>
            <Grid item xs={12} lg={4}>
                <Typography variant="h4" gutterBottom>Lines</Typography>
                <Stack spacing={2}>
                    {
                        loading
                        ?
                        <CircularProgress/>
                        :
                        lines.map(line => (
                            <LineCard key={line.id} line={line}/>
                        ))
                    }
                </Stack>
            </Grid>
        </Grid>
    )
}

export default Home
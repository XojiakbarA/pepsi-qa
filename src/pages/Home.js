import { Grid, Stack, Typography } from "@mui/material"
import LineCard from "../components/card/LineCard"
import UserCard from "../components/card/UserCard"
import { useSelector } from "react-redux"
import { linesSelector, usersSelector } from "../store/selectors"

const Home = () => {

    const { data: lines } = useSelector(linesSelector)
    const { data: users } = useSelector(usersSelector)

    const workingLines = [...lines].sort((_, b) => b.status === 'works' ? 1 : -1)
    const onShiftUsers = users.filter(user => user.is_on_shift)

    return (
        <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6} lg={4}>
                <Typography variant="h4" gutterBottom>Lines</Typography>
                <Stack spacing={2}>
                    {
                        workingLines.map(line => (
                            <LineCard key={line.id} line={line}/>
                        ))
                    }
                </Stack>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <Typography variant="h4" gutterBottom>Now On Shift</Typography>
                <Grid container spacing={2}>
                    {
                        onShiftUsers.map(user => (
                            <Grid item xs={12} key={user.id}>
                                <UserCard user={user}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home
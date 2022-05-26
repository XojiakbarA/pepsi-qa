import {Box, CircularProgress, Fade, Grid, useMediaQuery} from "@mui/material"
import {Navigate} from "react-router"
import AuthCard from "../components/card/AuthCard"
import {useSelector} from "react-redux"
import pepsiLogo from "../assets/images/pepsi-logo-with-text.png"
import {userSelector} from "../store/selectors"

const Auth = () => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const { auth, getLoading } = useSelector(userSelector)

    if (auth) {
        return <Navigate to="/"/>
    }

    return (
        <Grid
            container
            minHeight="100vh"
            bgcolor="primary.main"
        >
            <Grid
                item
                xs={12}
                md={6}
                display="flex"
                justifyContent="center"
                alignItems={{ md: 'center', xs: 'start' }}
                padding={1}
            >
                <Fade in timeout={1000}>
                    <Box>
                        {
                            <img
                                src={pepsiLogo}
                                alt="pepsi-logo"
                                width={isDownSm ? 150 : 400}
                            />
                        }
                    </Box>
                </Fade>
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
                display="flex"
                justifyContent="center"
                alignItems={{ md: 'center', xs: 'start' }}
                padding={2}
            >
                {
                    getLoading
                    ?
                    <CircularProgress color="error"/>
                    :
                    <Fade in timeout={2000}>
                        <AuthCard/>
                    </Fade>
                }
            </Grid>
        </Grid>
    )
}

export default Auth
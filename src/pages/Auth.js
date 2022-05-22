import {Box, CircularProgress, Fade, Grid, useMediaQuery} from "@mui/material"
import {Navigate} from "react-router"
import AuthCard from "../components/card/AuthCard"
import {useSelector} from "react-redux"
import pepsiLogo from "../assets/images/pepsi-logo-with-text.png"
import horizontalPepsiLogo from "../assets/images/pepsi-logo-with-text-horizontal.png"
import {userSelector} from "../store/selectors"

const Auth = () => {

    const isDownMd = useMediaQuery((theme) => theme.breakpoints.down('md'))

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
                alignItems="center"
                padding={1}
            >
                <Fade in timeout={1000}>
                    <Box>
                        {
                            isDownMd
                            ?
                            <img src={horizontalPepsiLogo} alt="pepsi-logo" width={200}/>
                            :
                            <img src={pepsiLogo} alt="pepsi-logo" width={500}/>
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
                alignItems="center"
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
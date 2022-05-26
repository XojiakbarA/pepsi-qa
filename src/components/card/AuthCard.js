import {useState, forwardRef} from "react"
import {Button, Card, CardContent, CardHeader, Stack} from "@mui/material"
import LockResetIcon from '@mui/icons-material/LockReset'
import LoginIcon from '@mui/icons-material/Login'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import LoginForm from "../forms/LoginForm"
import RegisterForm from "../forms/RegisterForm"
import ResetForm from "../forms/ResetForm"
import {useSelector} from "react-redux"
import {userSelector} from "../../store/selectors"

const AuthCard = forwardRef((props, ref) => {

    const { loading } = useSelector(userSelector)

    const [form, setForm] = useState("login")

    const avatar = form === "reset" ? <LockResetIcon color="primary"/> : form === "register" ? <HowToRegIcon color="primary"/> : <LoginIcon color="primary"/>
    const title = form === "reset" ? "Reset Password" : form === "register" ? "Register" : "Login"
    const buttonText = form === "login" ? "Register" : "Login"

    const handleResetClick = () => {
        setForm("reset")
    }
    const handleRegisterClick = () => {
        setForm(prev => prev === "login" ? "register" : "login")
    }

    return (
        <Card
            ref={ref}
            {...props}
            sx={{ width: { xs: "100%", sm: 375 } }}
            elevation={10}
        >
            <CardHeader
                avatar={avatar}
                title={title}
                titleTypographyProps={{ variant: "h6", color: "primary" }}
            />
            <CardContent>
                {
                    form === "reset"
                    ?
                    <ResetForm/>
                    :
                    form === "register"
                    ?
                    <RegisterForm/>
                    :
                    <LoginForm/>
                }
                <Stack direction="row" justifyContent="space-between" marginTop={2}>
                    <Button
                        size="small"
                        disabled={loading}
                        onClick={handleResetClick}
                    >
                        Forgot Password?
                    </Button>
                    <Button
                        size="small"
                        disabled={loading}
                        onClick={handleRegisterClick}
                    >
                        {buttonText}
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    )
})

export default AuthCard
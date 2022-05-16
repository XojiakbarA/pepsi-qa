import pepsiLogo from "../../assets/images/pepsi-logo.png"

const AppLogo = ({ width = 40 }) => {

    return (
        <img src={pepsiLogo} alt="pepsi-logo" width={width}/>
    )
}

export default AppLogo
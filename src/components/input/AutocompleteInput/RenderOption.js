import {ListItemIcon, ListItemText, MenuItem} from "@mui/material"
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported"
import {baseURL} from "../../../api"

const RenderOption = ({ props, option }) => {

    return (
        <MenuItem dense { ...props }>
            <ListItemIcon>
                {
                    option.logo
                    ?
                    <img src={baseURL + option.logo} alt="i" width={25}/>
                    :
                    <ImageNotSupportedIcon/>
                }
            </ListItemIcon>
            <ListItemText>{option.name}</ListItemText>
        </MenuItem>
    )
}

export default RenderOption
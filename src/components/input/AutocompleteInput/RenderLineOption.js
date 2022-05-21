import {ListItemIcon, ListItemText, MenuItem} from "@mui/material"
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported"
import {api} from "../../../api"

const RenderLineOption = ({ props, option }) => {

    return (
        <MenuItem dense { ...props }>
            <ListItemIcon>
                {
                    option.logo
                        ?
                        <img src={api + option.logo} alt="i" width={25}/>
                        :
                        <ImageNotSupportedIcon/>
                }
            </ListItemIcon>
            <ListItemText>{`${option.name} ${option.container_name} ${option.speed}`}</ListItemText>
        </MenuItem>
    )
}

export default RenderLineOption
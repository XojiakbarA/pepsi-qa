import {Avatar, Chip} from "@mui/material"
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported"
import {baseURL} from "../../../api"

const RenderLineTag = ({ value, getTagProps }) => {

    return value.map((item, index) => (
        <Chip
            size="small"
            avatar={item.logo ? <Avatar src={baseURL + item.logo}/> : <ImageNotSupportedIcon/>}
            key={item.id}
            label={`${item.name} ${item.container_name} ${item.speed}`}
            {...getTagProps({ index })}
        />
    ))
}

export default RenderLineTag
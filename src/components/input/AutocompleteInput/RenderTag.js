import {Avatar, Chip} from "@mui/material"
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported"
import {api} from "../../../api"

const RenderTag = ({ value, getTagProps }) => {

    return value.map((item, index) => (
                <Chip
                    size="small"
                    avatar={item.logo ? <Avatar src={api + item.logo}/> : <ImageNotSupportedIcon/>}
                    key={item.id}
                    label={item.name}
                    {...getTagProps({ index })}
                />
            ))
}

export default RenderTag
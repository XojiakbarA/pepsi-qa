import {Chip} from "@mui/material"

const RenderUserTag = ({ value, getTagProps }) => {

    return value.map((item, index) => (
        <Chip
            size="small"
            key={item.id}
            label={item.name}
            {...getTagProps({ index })}
        />
    ))
}

export default RenderUserTag
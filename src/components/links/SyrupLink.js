import { Link, Stack } from "@mui/material"
import {Link as RouterLink} from "react-router-dom"
import { baseURL } from "../../api"

const SyrupLink = ({ src, id, children }) => {

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <img src={baseURL + src} alt="syrup-logo" width={30}/>
            <Link
                component={RouterLink}
                to={`/syrup-analyses?id=${id}`}
                state={{ id }}
            >
                {children}
            </Link>
        </Stack>
    )
}

export default SyrupLink
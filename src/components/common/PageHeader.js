import {Stack} from "@mui/material"
import MyBreadcrumbs from "./MyBreadcrumbs"

const PageHeader = ({ rightComponent, justifyContent, alignItems }) => {

    return (
        <Stack
            direction="row"
            justifyContent={justifyContent ?? 'space-between'}
            alignItems={alignItems ?? 'flex-start'}
            minHeight={40}
        >
            <MyBreadcrumbs/>
            {rightComponent}
        </Stack>
    )
}

export default PageHeader
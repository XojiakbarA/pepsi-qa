import { Breadcrumbs, Link, useMediaQuery } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useLocation } from 'react-router'
import { toUpperCaseFirstLetters } from '../../utils/helpers'

const MyBreadcrumbs = () => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const location = useLocation()

    const array = location.pathname.split('/').filter(p => p)

    const pathnames = array.map((item, i) => ({
        path: '/' + array.slice(0, i + 1).join('/'),
        name: toUpperCaseFirstLetters(item)
    }))

    return (
        <Breadcrumbs aria-label="breadcrumb">
            {
                pathnames.map(({ path, name }) => (
                    <Link
                        key={name}
                        underline="hover"
                        color={location.pathname === path ? "primary" : "inherit"}
                        component={RouterLink}
                        to={path}
                        fontSize={isDownSm ? "small" : "large"}
                    >
                        {name}
                    </Link>
                ))
            }
        </Breadcrumbs>
)
}

export default MyBreadcrumbs
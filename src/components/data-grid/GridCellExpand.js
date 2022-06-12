import {Box, Typography, Paper, Popper} from '@mui/material'
import PropTypes from 'prop-types'
import { useState, useEffect, useRef, memo } from "react"

function isOverflown(element) {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

const GridCellExpand = memo(function GridCellExpand({ width, value, children }) {
    const wrapper = useRef(null)
    const cellDiv = useRef(null)
    const cellValue = useRef(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const [showFullCell, setShowFullCell] = useState(false)
    const [showPopper, setShowPopper] = useState(false)

    const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current)
        setShowPopper(isCurrentlyOverflown)
        setAnchorEl(cellDiv.current)
        setShowFullCell(true)
    };

    const handleMouseLeave = () => {
        setShowFullCell(false)
    };

    useEffect(() => {
        if (!showFullCell) {
            return undefined
        }

    function handleKeyDown(nativeEvent) {
        // IE11, Edge (prior to using Bink?) use 'Esc'
        if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
            setShowFullCell(false)
        }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
        document.removeEventListener('keydown', handleKeyDown)
    };
}, [setShowFullCell, showFullCell])

    return (
        <Box
            ref={wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                alignItems: 'center',
                lineHeight: '24px',
                width: 1,
                height: 1,
                position: 'relative',
                display: 'flex',
            }}
        >
            <Box
                ref={cellDiv}
                sx={{
                    height: 1,
                    width,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                }}
            />
            {children}
            <Box
                ref={cellValue}
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
                {value ?? '-'}
            </Box>
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    // style={{ width }}
                >
                    <Paper
                        elevation={1}
                        // style={{ minHeight: wrapper.current.offsetHeight - 3 }}
                    >
                        <Typography variant="body2" sx={{ padding: 1, whiteSpace: 'nowrap' }}>
                            {value}
                        </Typography>
                    </Paper>
                </Popper>
            )}
        </Box>
    );
});

GridCellExpand.propTypes = {
    width: PropTypes.number.isRequired,
}

export default GridCellExpand
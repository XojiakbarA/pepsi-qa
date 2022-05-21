import {List, ListItem, ListItemSecondaryAction, ListItemText, Popover} from "@mui/material"

const AnalysisDetails = ({ anchorEl, onClose, analysis }) => {

    return (
        <Popover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
            <List dense sx={{ width: 300 }}>
                <ListItem>
                    <ListItemText>Line Name:</ListItemText>
                    <ListItemSecondaryAction>{ analysis.line_name }</ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemText>Format:</ListItemText>
                    <ListItemSecondaryAction>{ analysis.format_value }</ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemText>Container:</ListItemText>
                    <ListItemSecondaryAction>{ analysis.container_supplier_name }</ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemText>Cap:</ListItemText>
                    <ListItemSecondaryAction>{ analysis.cap_name }</ListItemSecondaryAction>
                </ListItem>
            </List>
        </Popover>
    )
}

export default AnalysisDetails
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

const ConfirmDialog = ({ open, content, loading, handleCancelClick, handleConfirmClick }) => {

    return (
        <Dialog open={open} onClose={handleCancelClick} maxWidth='xs' fullWidth={true}>
            { loading && <CircularProgress size={25} sx={{position: 'absolute', top: 15, right: 15}}/> }
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>
                <DialogContentText height={40}>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelClick} disabled={loading}>No</Button>
                <Button onClick={handleConfirmClick} disabled={loading}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
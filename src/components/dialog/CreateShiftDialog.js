import {Dialog, DialogContent, DialogTitle} from '@mui/material'
import CreateShiftForm from "../forms/CreateShiftForm"

const CreateShiftDialog = ({ date, open, onClose }) => {

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>Create Shift</DialogTitle>
            <DialogContent>
                <CreateShiftForm
                    date={date}
                    handleClose={onClose}
                />
            </DialogContent>
        </Dialog>
    )
}

export default CreateShiftDialog
import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp'
import { StyledModal } from './styles';
import {EntityType } from '../../data/types';


interface ModalProps {
    entity:EntityType
}


const FormModal = ({entity}:ModalProps) => {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault()
        handleClose()
    }

    return (
        <div>
            <Button onClick={handleOpen}>
                <AddBoxSharpIcon fontSize='large' />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <StyledModal>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add entity
                    </Typography>
                    <form onSubmit={handleSubmit}>

                    <button>submit</button>
                    </form>
                </StyledModal>
            </Modal>
        </div>
    );
}

export default FormModal
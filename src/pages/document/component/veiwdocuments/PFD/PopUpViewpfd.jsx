import React, { useState } from "react";

import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Pdfdocument from "./pdfdocument";
// import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

export default function PopUpViewpfd(props) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <React.Fragment>
            <Button variant="outlined" size="medium"
                startIcon={<PictureAsPdfIcon />}
                style={{ alignContent: 'center' }}
                onClick={handleClickOpen('paper')} ></Button>

            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >

                <DialogTitle sx={{ m: 0, p: 2, justifyContent: 'center', display: 'flex' }} id="customized-dialog-title">
                    แสดงข้อมูลเอกสาร
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers sx={{ justifyContent: 'center', display: 'flex' }}>
                    <div style={{ width: 1000 }}>
                        <center>
                            <Pdfdocument jourID={props.jourID} />
                        </center>
                    </div>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose}>close</Button>
                </DialogActions> */}
            </Dialog>
        </React.Fragment>
    )
}

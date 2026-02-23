import React, { useState } from "react";

import Button from '@mui/material/Button';
// import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import ViewDocuments from "../veiwdocuments/viewDocuments";
import ViewDocumentFinished from "../veiwdocuments/viewDocumentFinished";
import StepViewProcess from "../workflow/stepViewProcess";
// import Slide from '@mui/material/Slide';
import PageviewIcon from '@mui/icons-material/Pageview';
import Tooltip from '@mui/material/Tooltip';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function PopUpViewProcess(props) {
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
            <div onClick={handleClickOpen('paper')} style={{ cursor: 'pointer' }}>
                <Tooltip title="View" placement="top-start">
                    <PageviewIcon color="primary" style={{ width: 25, height: 25 }} />
                </Tooltip>
            </div>
            <Dialog
                fullScreen
                TransitionComponent={Transition}
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >

                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">

                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>

                <DialogContent dividers={scroll === 'paper'}>

                    {/* <ViewDocuments jourID={props.jourId} /> */}
                    <ViewDocumentFinished jourID={props.jourId}/>

                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

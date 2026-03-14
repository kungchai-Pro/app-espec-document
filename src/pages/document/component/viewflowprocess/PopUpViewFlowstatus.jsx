import React, { useState ,useEffect} from "react";
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import StepFlowProcess from "./StepFlowProcess";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
// import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';


import FetchApi from'../../../customhooks/Functionapi';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PopUpViewFlowstatus(props) {
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
          
                <div onClick={handleClickOpen('paper')} style={{cursor:'pointer'}}>
                     <Tooltip title="flow" placement="top-start">
                    <AccountTreeIcon  style={{width:25,height:25}} color="warning"/> 
                    </Tooltip>
                </div>

            <Dialog
                // fullScreen
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
                   <div style={{width:500,height:'auto'}}>
                   <StepFlowProcess  jourID={props.jourId} />
                   </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

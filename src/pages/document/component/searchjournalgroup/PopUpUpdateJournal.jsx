import React, { useState } from "react";
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import UpdateJournal from "./UpdateJournal";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function PopUpUpdateJournal(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = (val) => {
    setOpen(val);
  };
  
  React.useEffect(() => {

  }, []);

  return (
    <React.Fragment>

      <div>
        <Button variant="contained" color='warning'
          onClick={handleClickOpen('paper')}
          startIcon={<UpgradeIcon />}>อัพเดทข้อมูล</Button>

      </div>

      <Dialog
        fullScreen
        TransitionComponent={Transition}
        open={open}
        onClose={() => handleClose(false)}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >

        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => handleClose(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">

            </Typography>
            <Button autoFocus color="inherit" onClick={() => handleClose(false)}>
              Close
            </Button>
          </Toolbar>
        </AppBar>

        <DialogContent dividers={scroll === 'paper'}>
          <UpdateJournal 
            RowData={props.RowData}
            journalData={props.journalData}
            dataitemAll={props.dataitem}
            typeEdit={props.typeEdit}
            handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

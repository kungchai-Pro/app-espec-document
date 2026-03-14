import React, { useEffect, useState } from 'react'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ViewNotereject from '../viewNotereject';


const PopUphistoryNotes = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        ประวัติแก้ไข
      </Button>
      <Dialog
        fullWidth={'lg'}
        maxWidth={'lg'}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>ข้อมูลรายละเอียด</DialogTitle>
        <DialogContent>
            <ViewNotereject Id={props.jourID}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    )
}

export default PopUphistoryNotes
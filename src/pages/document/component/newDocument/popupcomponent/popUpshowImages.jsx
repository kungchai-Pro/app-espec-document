import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import FetchErp from '../../../../customhooks/FunctionErp';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import { host } from '../../../../customhooks/Functionapi';
function PopUpshowImages(props) {
  const FetchErps = new FetchErp();
  const [dataItemdatail, setDataItemdatail] = useState([]);
  const [datasearch, setDatasearch] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    // setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);

  useEffect(() => {
   
  }, [])



  return (
    <div>
      <React.Fragment>
        <SearchIcon onClick={handleClickOpen('paper')} style={{cursor:'pointer', width: 35, height: 35}}   />

        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          maxWidth={'lg'}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >

          <div style={{ flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: '#4160D9', alignContent: 'end', display: 'flex' }}>
            <HighlightOffIcon style={{ width: 30, height: 30, color: '#ffff', margin: 5 }} onClick={() => handleClose()} />
          </div>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div style={{ width: 850, height: 650,padding:10 }}>
                <div>
              {/* <label style={{ padding: 5 }}>show images</label> */}
               <div>ภาพประกอบ : {props.PkDescription} {props.ItemID}</div>
              </div>
              <img src={host + `/file/images/files/${props.nameimage}`} alt="My local" width={'100%'} />
            </div>
          </DialogContentText>
        </Dialog>
      </React.Fragment>
    </div>
  )
}

export default PopUpshowImages
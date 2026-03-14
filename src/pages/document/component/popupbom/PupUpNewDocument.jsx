import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import NewDocument from '../../NewDocument';
import { useSelector, useDispatch } from 'react-redux'
import FetchApi from './../../../customhooks/Functionapi';
import { UploadFiles } from '../../../customhooks/FuctionUpload'
import { runnumberDocument } from '../../../customhooks/FunctionRunnumber';
import { UpdateDetailList } from '../../../customhooks/Functiondocument';
import './document.scss';
import { IoMdAdd } from "react-icons/io";

import Swal from 'sweetalert2';

import { objectHearder } from '../newDocument/objectdata/typeobject';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const PopUPAlert = (props) => {
  const [open, setOpen] = useState(props.openalert);

  const handleClose = () => {
    props.isAlertwarning(false)
  };

  return <>
    <Dialog
      open={props.openalert}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" style={{ backgroundColor: '#EBEBEB' }}>
        <label style={{ color: 'red' }}>แจ้งเตือน</label>
      </DialogTitle>
      <div style={{ margin: 10, width: 500, height: 150 }}>
        <div>คุณยังไม่ได้เลือก ลำดับอนุมัติ ( Flow ) กรุณาเลือก Flow  </div>
      </div>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  </>
}



const PupUpNewDocument = () => {

  const FetchApis = new FetchApi();

  const d = new Date();
  let convertdate = ""
  let convertmonth = d.getMonth() + 1;

  if (d.getDate() < 10) {
    convertdate = "0" + d.getDate();
  }
  else {
    convertdate = d.getDate();
  }
  if (d.getMonth() + 1 < 10) {
    convertmonth = "0" + convertmonth
  }
  else {
    convertmonth = convertmonth
  }

  const [open, setOpen] = React.useState(false);
  const [openalert, setOpenalert] = useState(false);
  

  const handleClickOpen = () => {
    Swal.fire({
      title: "แจ้งการสร้างเอกสาร?",
      text: "คุณแน่ใจที่จะสร้างเอกสาร ใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "สร้างเอกสาร",
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        setOpen(true);
        NewJouranl_Darft();
      }
    });
  };

  const NewJouranl_Darft = () => {
     window.location.href=`/newducument`
 
  }




  const isAlertwarning = (val) => {
    setOpenalert(val);
  }

  return (
    <div>
      <button
        className="btn"
        onClick={handleClickOpen}
      >
        <IoMdAdd />
        New Document
      </button>
      <PopUPAlert isAlertwarning={isAlertwarning} openalert={openalert} />
    </div>
  )
}

export default PupUpNewDocument
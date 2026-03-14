import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { flowsubColumns } from '../component/tablecolumn/flowsubColumn';
import { Link } from "react-router-dom";
import FetchApi from '../../../customhooks/Functionapi';
import Swal from 'sweetalert2';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Button } from '@mui/material';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function PupUpEditFlowsub(props) {

  const FetchApis = new FetchApi();

  const [open, setOpen] = React.useState(false);
  const [flowdata, setFlowdata] = useState({
    version: "",
    active: "0",
    flowId: ''
  })


  const handleClickOpen = () => {
    setOpen(true);
    getflowsublist();
  };
  const handleClose = () => {
    isEditflowsub()
   
  };

  const getflowsublist=()=>{
    FetchApis.FethcGet(`/flowsystemsub/flowsystemsubById/${props.flowdsubId}`).then(res=>{
      if(res){
          setFlowdata(res.data[0])
      }
    })
  }

  const isEditflowsub=()=>{
    FetchApis.FethcUpdate(`/flowsystemsub/updateflowsystemsub/${props.flowdsubId}`,flowdata).then(res=>{
      if(res){
         setOpen(false);
         window.location.reload();
      }
    })
  }

  return <>
    <React.Fragment>
      <Button onClick={handleClickOpen} size='smal'>
        Edit
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          แก้ไขข้อมูล
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
        <DialogContent dividers>
          <div style={{ margin: 10, width: 400 }} className='space-row-layer'>
            <label style={{ width: 150 }}>Version Name</label>
            <input type='text' placeholder='input name'
            value={flowdata.version}
              onChange={(e) => setFlowdata({ ...flowdata, version: e.target.value })}
              className='input-box' style={{ width: 200, marginRight: 20 }} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            แก้ไขข้อมูล
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  </>
}



///------------>
function Flowsublist({ id }) {
  const FetchApis = new FetchApi();
  const [datalist, setDatalist] = useState([])
  const [selectionId, setSelectionId] = useState([]);

  useEffect(() => {
    getflowsublist();

  }, [selectionId])

  const getflowsublist = () => {

    FetchApis.FethcGet(`/flowsystemsub/flowsystemsubByflowId/${id}`).then(res => {
      if (res.status == 200) {
        setDatalist(res.data)
      }
    })
  }


  const handleDelete = (id) => {
    FetchApis.FethcGet(`/flowdetail/ListflowBysubId/${id}`).then(res => {
      // console.log(res)
      if (res) {
        if (res.data.length > 0) {
          Swal.fire({
            title: "แจ้งเตือน",
            text: "มีข้อมูลการใช้งานอยู่ไม่สามารถ ลบข้อมูลได้",
            icon: "warning"
          });
        } else {
          deleteById(id)
        }
      }
    })

  }


  const deleteById = (id) => {
    Swal.fire({
      title: "แจ้งเตือน",
      text: "คุณต้องการลบข้อมูล ใช่หรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "บันทึก",
      cancelButtonText: "ยกเลิก"
    }).then((result) => {
      if (result.isConfirmed) {

        FetchApis.FethcDelete(`/flowsystemsub/deleteById/${id}`).then(res => {
          if (res) {

            if (res.status == 200) {

              Swal.fire({
                title: "แจ้งการลบ",
                text: "คุณทำการบันทึกเรียบร้อยแล้ว",
                icon: "success"
              });

            } else if (res.status == 400) {
              Swal.fire({
                title: "แจ้งการลบ !",
                text: "แจ้งเกิดการผิดพลาดในการลบข้อมูล",
                icon: "error"
              });

            }
          }
        })

      }

    });
  }


  const getRowId = (row) => {
    return row.flowdsubId;
  }



  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/admin/Flow/flowdetail/${params.row.flowdsubId}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">จัดการ flow</div>
            </Link>
            <div className="cellAction">
              <PupUpEditFlowsub flowdsubId={params.row.flowdsubId} />
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.flowdsubId)}
            >
              Delete
            </div>

          </div>
        );
      },
    },
  ];

  const handleRowSelection = (ids) => {
    setSelectionId(ids)

  };

  const handleActive = () => {
    const checkActive = datalist.find((row) => row.active === '1');
    console.log(checkActive)
    if (checkActive !== undefined) {

      Swal.fire({
        title: "แจ้งเตือน",
        text: "มีรายการที่ Active อยู่แล้ว",
        icon: "error"
      });

    } else {

      if (selectionId.length > 1) {
        Swal.fire({
          title: "แจ้งเตือน",
          text: "คุณเลือกรายการเกิน 1 รายการ",
          icon: "error"
        });

      } else if (selectionId.length == 0) {
        Swal.fire({
          title: "แจ้งเตือน",
          text: "คุณไม่ได้เลือกรายการ",
          icon: "error"
        });
      } else {

        updteActive(selectionId[0])

      }
    }
  }

  const updteActive = (ids) => {

    const selectedRow = datalist.find((row) => row.flowdsubId === ids);
    const dataobject = {
      version: selectedRow.version,
      active: '1',
      flowId: selectedRow.flowId
    }

    FetchApis.FethcUpdate(`/flowsystemsub/updateflowsystemsub/${ids}`, dataobject).then(res => {
      if (res.status == 200) {
        Swal.fire({
          title: "แจ้งเตือน",
          text: "คุณทำการ Active เรียบร้อยแล้ว",
          icon: "success"
        });
        getflowsublist();
      }
    })
  }


  const handleUnActive = () => {
    if (selectionId.length > 1) {
      Swal.fire({
        title: "แจ้งเตือน",
        text: "คุณเลือกรายการเกิน 1 รายการ",
        icon: "error"
      });

    } else if (selectionId.length == 0) {
      // alert('คุณไม่เลือกรายการ');
      Swal.fire({
        title: "แจ้งเตือน",
        text: "คุณไม่ได้เลือกรายการ",
        icon: "error"
      });
    } else {

      updteUnActive(selectionId[0])

    }
  }

  const updteUnActive = (ids) => {

    const selectedRow = datalist.find((row) => row.flowdsubId === ids);
    // console.log(selectedRow)
    const dataobject = {
      version: selectedRow.version,
      active: '0',
      flowId: selectedRow.flowId
    }

    FetchApis.FethcUpdate(`/flowsystemsub/updateflowsystemsub/${ids}`, dataobject).then(res => {
      if (res.status == 200) {
        Swal.fire({
          title: "แจ้งเตือน",
          text: "คุณทำการ UnActive เรียบร้อยแล้ว",
          icon: "success"
        });
        getflowsublist();
      }
    })
  }


  return (
    <div style={{ width: '85%' }}>
      <div style={{ flexDirection: 'row', display: 'flex' }}>
        <div style={{ padding: 10 }}>
          <Button variant="contained" size='small' color='success' onClick={handleActive}>Active</Button>
        </div>
        <div style={{ padding: 10 }}>
          <Button variant="contained" size='small' color='warning' onClick={handleUnActive}>UnActive</Button>
        </div>
      </div>
      <DataGrid
        className="datagrid"
        getRowId={getRowId}
        rows={datalist}
        columns={flowsubColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[9]}
        checkboxSelection
        // disableRowSelectionOnClick
        onRowSelectionModelChange={handleRowSelection}

      />

    </div>
  )
}

export default Flowsublist
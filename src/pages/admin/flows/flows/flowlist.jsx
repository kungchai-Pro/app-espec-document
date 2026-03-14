import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { flowColumns } from '../component/tablecolumn/flowColumn';
import FetchApi from '../../../customhooks/Functionapi';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';


// popUp Edit 

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

//-------->
function PopUPEdit(props) {

  const FetchApis = new FetchApi();
  const [open, setOpen] = React.useState(false);
  const [typedocument, setTypedocument] = useState([])
  const [flowdata, setFlowdata] = useState({
    flowName: "",
    detail: "",
    typeId: ""
  });


  useEffect(() => {
    FetchApis.FethcGet(`/flowsystem/flowsystemById/${props.flowId}`).then(res => {
      if (res) {
        setFlowdata(res.data[0])
      }
    })
  }, [])


  const handleClickOpen = () => {
    setOpen(true);
    gettypedocument()
  };

  const handleClose = () => {
    isEditflow()
  };

  const isEditflow = () => {
    FetchApis.FethcUpdate(`/flowsystem/updateflowsystem/${props.flowId}`,flowdata).then(res => {
      if (res) {
        setOpen(false);
        window.location.reload()
      }
    })
  }


  const gettypedocument = () => {
    FetchApis.FethcGet(`/typedocument/typeDocumentListall`).then(res => {
      if (res.status == 200) {
        setTypedocument(res.data)
      }
    })
  }

  return <>
    <React.Fragment>
      <Button size="small" onClick={handleClickOpen}>
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

          <div className='top' style={{ width: 500 }}>
            <div style={{ margin: 10 }}>
              <label style={{ width: 100 }}>Flow name</label>
              <input type='text' placeholder='input name'
                value={flowdata.flowName}
                onChange={(e) => setFlowdata({ ...flowdata, flowName: e.target.value })}
                className='input-box' style={{ width: 200 }} />
              <div>
                <label style={{ width: 100 }}>Flow detial</label>
                {/* <input type='text' placeholder='input detial' className='input-box' style={{ width: 200 }} /> */}
                <textarea className='input-box'
                  value={flowdata.detail}
                  onChange={(e) => setFlowdata({ ...flowdata, detail: e.target.value })}
                  style={{ height: 35, width: 250 }} />
              </div>

            </div>

            <div style={{ margin: 10 }}>
              <label style={{ width: 150 }}>Document Type</label>
              <select className="input-box" name="typeId" id="typeId"
                onChange={(e) => setFlowdata({ ...flowdata, typeId: e.target.value })}
                style={{ marginRight: 5 }}>
                <option value="">เลือกประเภทเอกสาร  . . .</option>
                {typedocument.map((item, i) => (
                  <option value={item.typeId}>{item.typename}</option>
                ))}
              </select>

            </div>

          </div>


        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            แก้ไข
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  </>
}


function Flowlist() {
  const FetchApis = new FetchApi();
  const [data, setData] = useState([]);

  useEffect(() => {
    getflowlist();
  }, [])


  const getRowId = (row) => {
    return row.flowId;
  }

  const getflowlist = () => {
    FetchApis.FethcGet(`/flowsystem/flowsystemListall`).then(res => {
      setData(res.data)
    })
  }


  const handleDelete = (id) => {
    // setData(data.filter((item) => item.flowId !== id));
    FetchApis.FethcGet(`/flowsystemsub/flowsystemsubByflowId/${id}`).then(res => {
      if (res) {
        if (res.data > 0) {

        } else {
          isDelete(id)
        }
      }
    })
  }

  const isDelete = (id) => {

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
        FetchApis.FethcDelete(`/flowsystem/deleteById/${id}`).then(res => {
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
        })
      }

    });
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/admin/Flow/Flowsub/${params.row.flowId}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">จัดการ</div>
            </Link>
            <div className="viewButton">
              <PopUPEdit flowId={params.row.flowId} />
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.flowId)}
            >
              Delete
            </div>


          </div>
        );
      },
    },
  ];

  const handleRowSelection = (ids) => {
    console.log(ids)

  };

  const handleRowClick = (params) => {
    console.log(params.row)

  };

  return (
    <div style={{ width: '85%' }}>
      <DataGrid
        className="datagrid"
        getRowId={getRowId}
        rows={data}
        columns={flowColumns.concat(actionColumn)}
        // columns={userColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        onRowSelectionModelChange={handleRowSelection}
      //  onRowClick={handleRowClick}
      />

    </div>
  )
}

export default Flowlist
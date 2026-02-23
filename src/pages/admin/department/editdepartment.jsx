import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import FetchApi from '../../customhooks/Functionapi';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


function EditDepartment(props) {  
  const [Departments, setDepartments] = useState({ departmentname:"", departmentcode:"" })
  const FetchApis = new FetchApi();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    FetchApis.FethcGet(`/department/departmentById/${props.departmentId}`).then(res=>{
      setDepartments(res.data[0]);
    })
  }, [])

  const isSaveDepartments = (e) => {
     e.preventDefault()
    FetchApis.FethcUpdate(`/department/updatedepartment/${props.departmentId}`, Departments).then(res => {
      if (res) {

      window.location.reload();

      }
    })

  }
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        แก้ไขข้อมูลแผนก
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
          
          <form  style={{width:500,height:400}}>
          <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop:10 }}>
          <label>แก้ไข Department</label>
          </div>
          <div className='datatable'>

            <div style={{ backgroundColor: '#E9EDE9', padding: 10 }}>
              <div>
                <div>
                  <label>Department Name</label>
                </div>
                <div>
                  <input type='text' name='typename' value={Departments.departmentname}
                    onChange={(e) => setDepartments({ ...Departments, departmentname: e.target.value })}
                  />
                </div>

              </div>
              <div>
                <div>
                  <label>Department Code</label>
                </div>
                <div>
                  <textarea type='text' name='typedetail' value={Departments.departmentcode} style={{ width: '100%' }}
                    onChange={(e) => setDepartments({ ...Departments, departmentcode: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E9EDE9' }}>
              <div style={{ marginRight: 10 }}>
                <Button variant="contained" color='success' onClick={(e)=>isSaveDepartments(e)}>บันทึก</Button>
              </div>
              <div>
                <Button variant="contained" color='warning'>ยกเลิก</Button>
              </div>
            </div>

          </div>
        </form>


        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </React.Fragment>
  )
}

export default EditDepartment
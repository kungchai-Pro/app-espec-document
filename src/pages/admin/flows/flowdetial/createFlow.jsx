import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemButton from '@mui/material/ListItemButton';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import './flowdetail.scss';
import FetchApi from '../../../customhooks/Functionapi';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function CreateFlow({ flowStatus, flowstate, department, departcode, detailId }) {

  const FetchApis = new FetchApi();
  const [open, setOpen] = React.useState(false);
  const [userlist, setUserlist] = React.useState([]);
  const [datalist, setDatalist] = React.useState([]);

  const [dataAll, setDataAll] = React.useState({
    flowdetailId: detailId,
    approveBydId: "",
    stateFlow: flowstate,
    active: '1'
  })

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {

    getUserBydepartment();
    DetailList();

  }, [])

  const getUserBydepartment = () => {
    FetchApis.FethcGet(`/user/userListBydepartment/${departcode}`).then(res => {
      if (res.status == 200) {

        setUserlist(res.data)
      }

    })
  }

  const isSave = () => {
    if(dataAll.approveBydId==""){
        window.confirm('ไม่มีข้อมูลผู้ใช้งาน กรุณาเลือก')
    }else{
          FetchApis.FethcPost(`/flowdetailsub/createflowdetailsub`, dataAll).then(res => {
      if (res.status == 200) {
        DetailList()
      }
    })
    }
  }

  const DetailList = () => {
    FetchApis.FethcGet(`/flowdetailsub/flowdetailBydetailsubId/${detailId}`).then(res => {
      if (res) {
        setDatalist(res.data)
      }

    })
  }

  const isRemove=(id)=>{
    FetchApis.FethcDelete(`/flowdetailsub/deleteById/${id}`).then(res=>{
      if(res){
        console.log(res)
        DetailList()
      }
    })
  }

  return (
    <React.Fragment>
      <Button variant="outlined" size='small' onClick={handleClickOpen}>
        Add flow
      </Button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
      // TransitionComponent={Transition}
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
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" onClick={handleClose}>
              close
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Container >
          <Box sx={{ bgcolor: '#cfe8fc', height: '70vh' }} className='datatable' >
            <Card>
              <div style={{ padding: 20, margin: 5, width: '100%' }}>

                <div style={{ width: '100%' }} className='space-row-layer'>
                  <div style={{ width: 200 }}>
                    <label >Status flow :</label>
                  </div>
                  <input type='text' value={flowStatus} className='input-box' style={{ width: 300 }} disabled />
                </div>

                <div className='space-row-layer'>
                  <div style={{ width: 200 }}>
                    <label >Department : </label>
                  </div>
                  <div>
                    <input type='text' value={department} className='input-box' style={{ width: 300 }} disabled />
                  </div>
                </div>

                <div className='space-row-layer'>
                  <div style={{ width: 200 }} >
                    <label>Name Approved </label>
                  </div>
                  <div>
                    <select className='input-box' onChange={(e) => setDataAll({ ...dataAll, approveBydId: e.target.value })}>
                      <option value={''}>เลือกผู้อนุมัติ ....</option>
                      {userlist.map((item, i) => (
                        <option value={item.userId}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{ width: '100%' }}>
                  <center>
                    <Button variant="contained"
                      onClick={() => isSave()}
                      color='success' style={{ width: 150, margin: 5 }}>เพิ่มข้อมูล</Button>
                 
                  </center>
                </div>
              </div>
            </Card>
            <div style={{ marginTop: 10 }}>
             
              {datalist.map((item, i) => (
                <Card>
                  <div style={{ padding: 10 }}>
                    <div style={{ margin: 5 }}>ชื่อผุ้อนุมัติ :{item.name}</div>
                    <div style={{ margin: 5 }}>ตำแหน่งงาน : {item.position}</div>
                    <div style={{ margin: 5 }}>Email :  {item.email}</div>
                    <div style={{ margin: 5 }}> <label style={{color:'green'}}>Status Type :  {item.typestatus}</label></div>
                    <div style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', display: 'flex' }}>
                      <Button color='error' onClick={()=>isRemove(item.flowdetailsubId)}>Delete</Button>
                    </div>
                  </div>
                </Card>
              ))}

            </div>
          </Box>
        </Container>
      </Dialog>
    </React.Fragment>
  );
}

export default CreateFlow
import React, { useState, useEffect } from 'react';

import FetchApi from './../../../customhooks/Functionapi';
import { FaCheckCircle } from "react-icons/fa";
import { AiFillExclamationCircle } from "react-icons/ai";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import moment from 'moment/moment.js';
import './viewdocument.scss';
import imagestep from '../../../../images/minus.png';
const steps = [
  'Select master blaster campaign settings',
  'Create an ad group',
  'Create an ad',
];

export default function StepViewProcess(props) {
  const FetchApis = new FetchApi();
  const [datalist, setDatalist] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [typestatusflow, setTypestatusflow] = useState([{
    nameStatus: '',
    userbyflow: '',
    departments: '',
    stateflow: '',
    Startdatetime: '',
    Enddatetime: '',
    statusType: '',
    activerecieved: '',
    active: ''
  }]);


  useEffect(() => {

    flowlistStep()
  }, [])



  async function flowlistStep() {

    await FetchApis.FethcGet(`/flowrunsystem/flowSteplistByJourId/${props.jourID}`).then(res => {
      if (res) {
        // console.log(res.data);
        setDatalist(res.data)
      }
    })

  }
  const handleClickOpen = (nameStatus, userbyflow, departments, stateflow, Startdatetime, Enddatetime, statusType, activerecieved, active) => {

    // HistoryByUser(jourID, statflow, UserId)
    setTypestatusflow({
      ...typestatusflow,
      nameStatus: nameStatus,
      userbyflow: userbyflow,
      departments: departments,
      stateflow: stateflow,
      Startdatetime: Startdatetime,
      Enddatetime: Enddatetime,
      statusType: statusType,
      activerecieved: activerecieved,
      active: active
    })
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='layout-flex-line' style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
      {datalist.map((item, indix) => (<div>
        <div style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          {indix > 0 && <img src={imagestep} alt="Logo" height={30} width={70} />}

          <div style={{ margin: 5, padding: 5, backgroundColor: '#D3EBDA', borderRadius: 100, cursor: 'pointer' }}>
            <div style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              {item.activerecieved == 1 && <FaCheckCircle color={item.active == 1 ? 'green' : '#E07828'} />}
              <div style={{ fontSize: 13, marginLeft: 3, cursor: 'pointer' }}
                onClick={() => handleClickOpen(item.nameStatus, item.userbyflow, item.departments, item.stateflow, item.Startdatetime, item.Enddatetime, item.statusType, item.activerecieved, item.active)}>คุณ : {item.userbyflow}</div>
            </div>
          </div>
        </div>
      </div>))}

      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"ประวัติอนุมัติ"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">

              <div style={{ flexDirection: 'column', justifyContent: 'space-between', display: 'flex', width: 500 }}>
                <div>
                  <label style={{ fontWeight: '800', fontSize: 20 }}>ผู้อนุมัติ : {typestatusflow.userbyflow}</label>
                </div>
                <br />
                <div>
                  <label>ลำดับอนุมัติ : {typestatusflow.stateflow}</label>
                </div>
                <div>
                  <label>แผนก :{typestatusflow.departments}</label>
                </div>
                <div>
                  <label>สถานะ : {typestatusflow.nameStatus}</label>
                </div>
                <br />
                <hr></hr>
                {typestatusflow.activerecieved == '1' &&
                  <div>
                    {typestatusflow.statusType == '100' ? <label style={{ color: '#1C08CF' }}>วันที่สร้าง :{moment(typestatusflow.Startdatetime).format('DD/MM/yyyy   HH:mm:ss')}</label> : <label style={{ color: '#1C08CF' }}>วันที่รับ :{moment(typestatusflow.Startdatetime).format('DD/MM/yyyy   HH:mm:ss')}</label>}
                  </div>}
                {typestatusflow.active == '1' &&
                  <div>
                    <label style={{ color: 'green' }}>วันที่อนุมัติ :{moment(typestatusflow.Enddatetime).format('DD/MM/yyyy   HH:mm:ss')}</label>
                  </div>}
              </div>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>ปิด</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

    </div >
  );
}
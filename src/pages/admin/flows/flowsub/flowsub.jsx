import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Flowsublist from './flowsublist';
import Sidebar from '../../../../components/sidebar/Sidebar';
import Navbar from '../../../../components/navbar/Navbar';
import FetchApi from '../../../customhooks/Functionapi';

import Swal from 'sweetalert2';
import {
  useParams
} from "react-router-dom";
import "./flowsub.scss";

function Flowsub() {
  const FetchApis = new FetchApi();
  let { id } = useParams();
  const [flows, setFlows] = useState([])
  const [flowdata, setFlowdata] = useState({
    version: "",
    active: "0",
    flowId: id
  })

  useEffect(() => {
    getflowBydi()
  }, [])

  const getflowBydi = () => {
    FetchApis.FethcGet(`/flowsystem/flowsystemById/${id}`).then(res => {
      if (res) {
        setFlows(res.data[0])
        
      }
    })
  }

  const isSaveflow = () => {
    if (flowdata.version == "") {
      Swal.fire({
        title: "แจ้งการบันทึก",
        text: "กรุณาป้อนข้อมูล version name",
        icon: "warning"
      });
    } else {

      Swal.fire({
        title: "แจ้งเตือน",
        text: "คุณต้องการบันทึก ใช่หรือไม่ ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "บันทึก",
        cancelButtonText: "ยกเลิก"
      }).then((result) => {
        if (result.isConfirmed) {

          FetchApis.FethcPost(`/flowsystemsub/createflowsystemsub`, flowdata).then(res => {
            if (res.status == 200) {
              Swal.fire({
                title: "แจ้งการบันทึก",
                text: "คุณทำการบันทึกเรียบร้อยแล้ว",
                icon: "success"
              });
              setTimeout(() => {
                window.location.reload();
              }, 1200);
            }

          })

        }
      });

    }
  }

  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className='datatable'>
          <div className="datatableTitle">
            Flow / Add New Flow Version 
          </div>
          <div>
            <label>Flow Name :</label> {flows.flowName}
          </div>
          <div className='top'>
            <div style={{ margin: 10 }} className='space-row-layer'>
              <label style={{ width: 150 }}>Version Name</label>
              <input type='text' placeholder='input name'
                onChange={(e) => setFlowdata({ ...flowdata, version: e.target.value })}
                className='input-box' style={{ width: 200, marginRight: 20 }} />

              <Button variant="outlined" color="success" onClick={() => isSaveflow()}>
                Add new
              </Button>

            </div>
          </div>

          <div>
            <Flowsublist id={id}/>
            
          </div>
        </div>

      </div>
    </div>
  )
}

export default Flowsub
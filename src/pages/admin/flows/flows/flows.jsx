import React, { useState, useEffect } from 'react'
import Sidebar from '../../../../components/sidebar/Sidebar';
import Navbar from '../../../../components/navbar/Navbar';
import Flowlist from './flowlist';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import FetchApi from '../../../customhooks/Functionapi';
import Swal from 'sweetalert2';
import "./flows.scss";

function Flows() {
    const FetchApis = new FetchApi();
    const [typedocument, setTypedocument] = useState([])
    const [flowdata, setFlowdata] = useState({
        flowName: "",
        detail: "",
        typeId: ""
    })

    useEffect(() => {
        gettypedocument();
    }, [])

    const gettypedocument = () => {
        FetchApis.FethcGet(`/typedocument/typeDocumentListall`).then(res => {
            if (res.status == 200) {
                setTypedocument(res.data)
            }
        })
    }

    const isSave = () => {

        if (flowdata.flowName == ""||flowdata.typeId=="") {
            Swal.fire({
                title: "แจ้งการบันทึก",
                text: "กรุณาป้อนข้อมูล flow name หรือ ประเภทเอกสาร",
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


                    FetchApis.FethcPost(`/flowsystem/createflowsystem`, flowdata).then(res => {
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
                        Add New Flow
                        <Button variant="outlined" color="success" onClick={() => isSave()}>
                            Add new
                        </Button>
                    </div>
                    <div className='top'>
                        <div style={{ margin: 10 }}>
                            <label style={{ width: 100 }}>Flow name</label>
                            <input type='text' placeholder='input name'
                                onChange={(e) => setFlowdata({ ...flowdata, flowName: e.target.value })}
                                className='input-box' style={{ width: 200 }} />
                            <div>
                                <label style={{ width: 100 }}>Flow detial</label>
                                {/* <input type='text' placeholder='input detial' className='input-box' style={{ width: 200 }} /> */}
                                <textarea className='input-box'
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

                    <div>
                        <Flowlist />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Flows
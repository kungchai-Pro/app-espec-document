import React, { useState, useEffect } from 'react'
import Sidebar from '../../../../components/sidebar/Sidebar';
import Navbar from '../../../../components/navbar/Navbar';
import FetchApi from '../../../customhooks/Functionapi';
import './flowdetail.scss';
import { Button } from '@mui/material';
import Flowdetaillist from './flowdetaillist';
import Swal from 'sweetalert2';
import Card from '@mui/material/Card';
import axios from 'axios';
import {
    useParams
} from "react-router-dom";

function Flowdetail() {
    const FetchApis = new FetchApi();
    let { id } = useParams();

    const [documentStatusType, setDocumentStatusType] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [data, setData] = useState([]);
    const [flowlist, setFlowlist] = useState([]);
    const [flowversion, setFlowversion] = useState([]);

    const [flowdata, setFlowdata] = useState({
        statusType: "", // darft ,view , approved
        departmentType: "",
        stateflow: "",
        active: "",
        flowlevel: "",
        flowdsubId: id
    })

    useEffect(() => {
        getStatusType();
        getDepartment();
        getflowdetaillist();
        getListflowBysubId();
        getflowsystemsubById();

    }, [])

    const getflowdetaillist = () => {
        FetchApis.FethcGet(`/flowdetail/flowdetailBysubId/${id}`).then(res => {

            if (res.status == 200) {
                setData(res.data)

                setFlowdata({ ...flowdata, stateflow: res.data.length + 1 })

            }
            else {
                console.log(res)
            }

        })
    }

    const getflowsystemsubById = () => {

        FetchApis.FethcGet(`/flowsystemsub/flowsystemsubById/${id}`).then(res => {

            if (res.status == 200) {
                setFlowversion(res.data[0])
            }
            else {
                console.log(res)
            }

        })
    }

    const getStatusType = () => {
        FetchApis.FethcGet(`/typestatus/typestatusListall`).then(res => {
            if (res.status == 200) {
                setDocumentStatusType(res.data);
            }

        })
    }

    const getDepartment = () => {

        FetchApis.FethcGet(`/department/departmentListall`).then(res => {
            if (res.status == 200) {
                setDepartmentList(res.data)
            }
        })
    }


    const isClangeDepartment = (e) => {
        setFlowdata({ ...flowdata, departmentType: e })
    }

    const isSave = () => {

        if (flowdata.departmentType == "" || flowdata.statusType == "") {
            Swal.fire({
                title: "แจ้งการบันทึก",
                text: "เกิดข้อผิดพลาดในการบันทึก กรุณาตรวจสอบ",
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

                    FetchApis.FethcPost(`/flowdetail/createflowdetail`, flowdata).then(res => {
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

    const getListflowBysubId = () => {
        FetchApis.FethcGet(`/flowdetail/ListflowBysubId/${id}`).then(res => {
            if (res.status == 200) {
                console.log(res.data)
                setFlowlist(res.data)
            }
        })
    }

    const isRemove = (id) => {
        FetchApis.FethcGet(`/flowdetailsub/flowdetailBydetailsubId/${id}`).then(res => {
            if (res.data.length > 0) {
                // alert('ไม่สามารถลบได้เนื่องจากยังไม่ข้อมูล User')
                Swal.fire({
                    title: "แจ้งเตือนการลบ",
                    text: "ไม่สามารถลบได้เนื่องจากยังไม่ข้อมูล User",
                    icon: "warning"
                });
            } else {
                isDelete(id)
                // alert('ทำการลบเรียบร้อยแล้ว')
            }

        })

    }

    const isDelete = (id) => {
        FetchApis.FethcDelete(`/flowdetail/deleteById/${id}`).then(res => {
            if (res) {
                getflowdetaillist()
            }
        })
    }


    return (
        <div className='list'>
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div className='datatable'>
                    <div className="datatableTitle">
                        Flow / Add new flow detail
                    </div>
                    <div>
                        <label>ชื่อเวอร์ชั่น     =  {flowversion.version} </label>
                    </div>
                    <div className='top'>
                        <div className='space-row-layer' style={{ width: '100%' }}>

                            <div style={{ display: 'flex', margin: 10, width: '30%' }}>
                                <label>กลุ่มสถานะ</label>
                                <select className='input-box' onChange={(e) => setFlowdata({ ...flowdata, statusType: e.target.value })}>
                                    <option value={""}>เลือกสถานะ ...</option>
                                    {documentStatusType.map((item, i) => (
                                        <option value={item.typecode}>{item.typename}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ display: 'flex', margin: 10, width: '30%' }}>
                                <label >แผนก</label>
                                <select className='input-box' onChange={(e) => isClangeDepartment(e.target.value)}>
                                    <option value={""}>เลือกแผนก ...</option>
                                    {departmentList.map((item, i) => (
                                        <option value={item.departmentcode}>{item.departmentname}</option>
                                    ))}
                                </select>
                            </div>
                            <Button variant="contained" color="success" onClick={() => isSave()}>บันทึก</Button>
                        </div>
                    </div>

                    <div>
                        <Flowdetaillist dataresult={data} isRemove={isRemove} />
                    </div>
                    <div style={{ padding: 10, backgroundColor: '#f9cf74' }}>
                        <label >Flows All </label>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: 20 }}>
                        {flowlist.map((item, i) => (
                            <div style={{
                                flexDirection: 'row',
                                justifyContent: "center",
                                alignContent: 'center',
                                alignItems: 'center',
                                display: 'flex'
                            }}>
                                <div>{flowlist.length > i ? <div style={{ flexDirection: 'row', alignItems: 'center', display: 'flex' }}>{i == 0 && <div style={{
                                    borderRadius: 10,
                                    width: 20, height: 20, backgroundColor: 'red'
                                }}></div>} <label style={{ color: 'green', marginLeft: 5, marginRight: 5 }}> - - </label> </div> : "---"}</div>
                                <Card style={{ padding: 10, justifyItems: 'center' }}>
                                    <div>
                                        <label style={{ fontSize: 14 }}>{i + 1} . {item.typeName}</label>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 10 }}> {item.department}</label>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 10 }}>
                                            {item.userName}
                                        </label>
                                    </div>
                                </Card>

                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Flowdetail
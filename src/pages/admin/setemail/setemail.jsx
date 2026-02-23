import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import './setemail.scss';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import FetchApi from '../../customhooks/Functionapi';

function Setemail() {
    const FetchApis = new FetchApi();
    const [dataEmail, setDataEmail] = useState({
        eId: '',
        hostname: '',
        euser: '',
        epassword: ''
    })

    useEffect(() => {
        getHostname()
    }, [])

    const getHostname = () => {
        FetchApis.FethcGet('/hostemail/hostemailListall').then(res => {
            if (res.status == 200) {
                // setDataEmail(res.data[0])
                if (res.data.length > 0) {
                    setDataEmail(res.data[0])
                }
            } else {
                alert('เกิดการผิดพลาดในการเรียกข้อมูล')
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        Swal.fire({
            title: "แจ้งเตือน",
            text: "คุณต้องการบันทึกข้อมูล ใช่หรือไม่ ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "บันทึก",
            cancelButtonText: "ยกเลิก"
        }).then((result) => {
            if (result.isConfirmed) {
                if (dataEmail.eId == "") {
                    FetchApis.FethcPost(`/hostemail/createHostemail`, dataEmail).then(res => {
                        if (res.status == 200) {
                            Swal.fire({
                                title: "แจ้งการบันทึก",
                                text: "คุณทำการบันทึกเรียบร้อยแล้ว",
                                icon: "success"
                            });
                            getHostname();
                        }
                    })
                }
                else {
                    FetchApis.FethcUpdate(`/hostemail/updateHostemail/${dataEmail.eId}/`, dataEmail).then(res => {
                        if (res.status == 200) {
                            Swal.fire({
                                title: "แจ้งการบันทึก",
                                text: "คุณทำการบันทึกเรียบร้อยแล้ว",
                                icon: "success"
                            });
                            getHostname();
                        }
                    })
                }

            }

        });

    }


    return (
        <div className='list'>
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div className='datatable'>
                    <form onSubmit={handleSubmit}>
                        <div style={{ padding: 10, backgroundColor: '#f0efef' }}>
                            <div style={{ justifyContent: 'center', display: 'flex' }}>
                                <label style={{ padding: 10, backgroundColor: '#bacbfc', borderRadius: 10, fontWeight: '800' }}>Setting Hosting Email</label>
                            </div>
                            <div>
                                <div>
                                    <label>HOST EMAIL</label>
                                </div>
                                <div style={{ marginLeft: 20 }}>
                                    <input type='text' placeholder='host name' className='input-box' style={{ width: 400 }}
                                        value={dataEmail.hostname}
                                        onChange={(e) => setDataEmail({ ...dataEmail, hostname: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <div>
                                    <label>USER</label>
                                </div>
                                <div style={{ marginLeft: 20 }}>
                                    <input type='text' placeholder='e-mail user' className='input-box' style={{ width: 400 }}
                                        value={dataEmail.euser}
                                        onChange={(e) => setDataEmail({ ...dataEmail, euser: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label>PASSWORD</label>
                                </div>
                                <div style={{ marginLeft: 20 }}>
                                    <input type='text' placeholder='e-mail password ' className='input-box' style={{ width: 400 }}
                                        value={dataEmail.epassword}
                                        onChange={(e) => setDataEmail({ ...dataEmail, epassword: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div style={{ justifyContent: 'center', display: 'flex' }}>

                                <div style={{ margin: 5 }}>  <Button variant="contained" color='success' type='submit'>บันทึก</Button></div>
                                <div style={{ margin: 5 }}>  <Button variant="contained" color='warning'>ยกเลิก</Button></div>


                            </div>
                        </div>
                    </form>

                    {/* // ข้อมูลที่ set นำมาแสดง  */}
                    <div style={{ padding: 10, backgroundColor: '#f0efef' }}>
                        <div className='box-email'>
                            <div className='row-layer'>
                                <div style={{ width: 200 }}>
                                    <label>HOST EMAIL</label>
                                </div>
                                <div>
                                    <label>{dataEmail.hostname}</label>
                                </div>
                            </div>
                            <div className='row-layer'>
                                <div style={{ width: 200 }}>
                                    <label>USER</label>
                                </div>
                                <div>
                                    <label>{dataEmail.euser}</label>
                                </div>
                            </div>
                            <div className='row-layer'>
                                <div style={{ width: 200 }}>
                                    <label>PASSWORD</label>
                                </div>
                                <div>
                                    <label>{dataEmail.epassword}</label>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Setemail
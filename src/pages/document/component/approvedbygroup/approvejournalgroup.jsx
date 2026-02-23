import React, { useState, useEffect } from 'react'
import NavbarUser from '../../../../components/navbar/NavbarUser'
import FetchApi, { host } from '../../../customhooks/Functionapi';
import Poprejectgroup from './poprejectgroup';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { columns } from './columnlist';
import Container from '@mui/material/Container';
import { ApprovedGroupSend } from '../../component/aprovedStatusAll/ApprovedFunction';
import Swal from 'sweetalert2';
import './approvdeitemgroup.scss';
import { Button } from '@mui/material';
import { ToastContainer, toast, Slide } from 'react-toastify';
import moment from 'moment/moment.js';
import StepViewProcess from '../veiwdocuments/stepViewProcess';
import { IoMdDownload } from "react-icons/io";
import PopUpHitoryNote from './popUpHitoryNote';


const Approvejournalgroup = () => {
    let { id, status } = useParams();
    const userId = sessionStorage.getItem('userId');
    const FetchApis = new FetchApi();
    const [datajournal, setDatajournal] = useState([]);

    const [noetelistbatch, setNoatelistbatch] = useState([]);
    const [noetelistitem, setNoatelistitem] = useState([]);
    const [reloading, setReloading] = useState(false)
    useEffect(() => {
        getjournalgroup()
    }, [])

    function getjournalgroup() {
        FetchApis.FethcGet(`/JournalBygroup/journalgroupBycode/${id}`).then(res => {
            if (res) {
                console.log(res.data);

                var datacall = res.data[0];
                setDatajournal(res.data);
                if (datacall.editType == '1') {
                    getdataNoteItem(datacall.journalGroupID)
                }
                else if (datacall.editType == '2') {
                    getdataNotebatch(datacall.journalGroupID)
                }

            }
        });
    }


    function getdataNoteItem(idcode) {

        FetchApis.FethcGet(`/notejournalgroup/getnoteItem/${idcode}`).then(res => {
            if (res) {

                setNoatelistitem(res.data)
            }
        });
    }

    function getdataNotebatch(idcode) {
        FetchApis.FethcGet(`/notejournalgroup/getnotebatch/${idcode}`).then(res => {
            if (res) {
                setNoatelistbatch(res.data)

            }
        });
    }


    const isSaveUpdate = () => {

        Swal.fire({
            title: "แจ้งเตือน อนุมัติ?",
            text: "คุณต้องการ อนุมัติเอกสาร ใช่หรือไม่ !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "อนุมัติเอกสาร",
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                for (let index = 0; index < datajournal.length; index++) {
                    const element = datajournal[index];
                    getFlowstatus(element);
                }

                toast.success('บันทึกเรียบร้อยแล้ว!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });

                setTimeout(() => {
                    window.location.href = '/approvedGroup';
                }, 1500);
            }
        });
    }

    const getFlowstatus = async (data) => {
        await FetchApis.FethcPost(`/flowrunsystem/flowrunByUserId`, {
            journalId: data.JournalID,
            stateflow: data.stateflow,
            UserId: userId
        }).then(res => {
            if (res.data.length > 0) {
                ApprovedGroupSend(data, userId, res.data[0].statusType, res.data[0].stateEnd).then(res => { console.log(res) })
            }

        })

    }


    function getRowId(row) {
        return row.JournalID;
    }

    function getloadfile(filename) {
        window.location.href = `${host}/file/images/files/${filename}`
    }

    return (
        <div>
            <div><NavbarUser /></div>
            <Container >
                <div>
                    {datajournal.length > 0 &&
                        <StepViewProcess jourID={datajournal[0].JournalID} />
                    }
                </div>
                {status == '102' &&
                    <div style={{ marginTop: 10, marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', display: 'flex', width: '100%' }}>
                        <div>
                            <label style={{ color: '#2f90d3', padding: 10 }}>คำร้องขอแก้ไขเอกสาร</label>
                            <PopUpHitoryNote  jordata={datajournal}/>
                        </div>
                        <div style={{ flexDirection: 'row', display: 'flex' }}>
                            <div>
                                <Button variant="contained" color='success' onClick={() => isSaveUpdate()}>APPROVED</Button>
                            </div>
                            {datajournal.length > 0 &&
                                <div>
                                    {datajournal[0].createBy !== userId && <Poprejectgroup jourId={id} />}
                                </div>}

                        </div>
                    </div>}
                {datajournal.length > 0 && <div className='row-pace-w100-line' style={{ fontSize: 14 }}>
                    <div style={{ width: '70%', backgroundColor: '#dedfe1', padding: 10 }}>
                        <div className='layout-flex-line' style={{ width: '100%' }}>
                            <div style={{ width: 200 }}>
                                <label>วัติถุประสงค์ อธิบายคำร้อง</label>
                            </div>
                            <div style={{ width: '80%' }}>
                                <label>{datajournal[0].purposer}</label>
                            </div>
                        </div>
                        <div className='layout-flex-line' style={{ width: '100%' }}>
                            <div style={{ width: 200 }}>
                                <label>ผู้ร้องขอ</label>
                            </div>
                            <div style={{ width: '80%', marginTop: 2 }}>
                                <label>{datajournal[0].userRequest}</label>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '30%', backgroundColor: '#f9d4ae', padding: 10 }}>
                        <div className='layout-flex-line'>
                            <div style={{ width: 150 }}>
                                <label>วันที่สร้างเอกสาร</label>
                            </div>
                            <div>
                                <label>{moment(datajournal[0].createDatetime).format('DD/MM/yyyy hh:mm:ss')}</label>
                            </div>
                        </div>
                        <div className='layout-flex-line'>
                            <div style={{ width: 150 }}>
                                <label>วันที่ Approved</label>
                            </div>
                            <div>
                                <label>{moment(datajournal[0].confirmDateTime).format('DD/MM/yyy')}</label>
                            </div>
                        </div>
                        <div className='layout-flex-line'>
                            <div style={{ width: 150 }}>
                                <label>เอกสารกลุ่ม (SDSS)</label>
                            </div>
                            <div>
                                <label>{datajournal[0].journalGroupID}</label>
                            </div>
                        </div>
                        <div className='layout-flex-line'>
                            <div style={{ width: 150 }}>
                                <label>เลขที่เอกสาร (ECN)</label>
                            </div>
                            <div>
                                <label>{datajournal[0].refECN}</label>
                            </div>
                        </div>
                        <div className='layout-flex-line'>
                            <div style={{ width: 150 }}>
                                <label>ไฟล์เอกสาร :</label>
                            </div>
                            <div>
                                <label>{datajournal[0].partfile}
                                    {datajournal[0].partfile != "" && <IoMdDownload size={20} style={{ cursor: 'pointer' }} onClick={() => getloadfile(datajournal[0].partfile)} />}

                                </label>
                            </div>
                        </div>
                    </div>
                </div>}

                <div style={{ margin: 3, padding: 5, backgroundColor: '#F9FAFB' }}>
                    <div>
                        <label>ข้อมูลที่แก้ไข</label>
                    </div>
                    {noetelistitem.length != 0 &&
                        <div style={{ width: '100%', backgroundColor: '#F9FAFB', fontSize: 12 }}>
                            {noetelistitem.map((item, index) => (
                                <div style={{ width: '100%' }} className='layout-flex-line'>
                                    {item.typenote == '1' ? <label style={{ width: 200, color: '#155DFC' }}>ข้อมูลเดิม</label> : <label style={{ width: 200, color: '#1F7A55' }}>ข้อมูลใหม่</label>}
                                    {item.typenote == '1' ?
                                        <div style={{ width: '100%' }} className='layout-flex-line'>
                                            <div style={{ width: '20%' }}>
                                                <label style={{ marginRight: 10 }}>ชื่อกลุ่ม :</label>
                                                <label>{item.typeProduct} </label>
                                            </div>
                                            <div style={{ width: '20%' }}>
                                                <label style={{ marginRight: 10 }}> Item Id :</label>
                                                <label>{item.itemId} </label>
                                            </div>
                                            <div style={{ width: '50%' }}>
                                                <label style={{ marginRight: 10 }}>Item Name :</label>
                                                <label>{item.itemName}</label>
                                            </div>
                                        </div> : <div style={{ width: '100%' }} className='layout-flex-line'>
                                            <div style={{ width: '20%' }}>
                                                <label style={{ marginRight: 10 }}>ชื่อกลุ่ม :</label>
                                                <label>{item.typeProduct} </label>
                                            </div>
                                            <div style={{ width: '20%' }}>
                                                <label style={{ marginRight: 10 }}> Item Id :</label>
                                                <label>{item.itemId} </label>
                                            </div>
                                            <div style={{ width: '50%' }}>
                                                <label style={{ marginRight: 10 }}>Item Name :</label>
                                                <label>{item.itemName}</label>
                                            </div>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>}
                    {
                        noetelistbatch.length > 0 && <div style={{ fontSize: 12 }}>
                            {noetelistbatch.map((item, index) => (
                                <div style={{ width: '100%' }}>

                                    <div>
                                        <label style={{ marginRight: 10 }}>รูปแบบที่ {item.numbers}</label>
                                        {item.typenote == '1' ? <label style={{ width: 200, color: '#155DFC' }}>ข้อมูลเดิม</label> : <label style={{ width: 200, color: '#1F7A55' }}>ข้อมูลใหม่</label>}
                                    </div>

                                    <div className='layout-flex-line' style={{ width: '100%' }}>
                                        <div className='layout-flex-line' style={{ width: '35%' }}>
                                            <div style={{ width: 150 }}>
                                                {item.TypeBatch == '1' && <label>( ยิงบนบรรจุภัณฑ์  )</label>}
                                                {item.TypeBatch == '2' && <label>( ยิงบนกล่องนอก )</label>}
                                            </div>
                                            <div>
                                                <label style={{ marginRight: 10, width: 200 }}>{item.batchName1}</label>
                                            </div>
                                        </div>
                                        <div className='layout-flex-line' style={{ width: '45%' }}>
                                            <div style={{ width: 65 }}>
                                                <label>อธิบาย 1</label>
                                            </div>
                                            <div style={{ marginRight: 10 }}>
                                                <label style={{ marginRight: 10, width: 200 }}>{item.batchDetail1}</label>
                                            </div>
                                        </div>
                                        <div className='layout-flex-line' style={{ width: '20%' }}>
                                            <div style={{ marginRight: 10 }}>
                                                <label>ตัวอย่าง</label>
                                            </div>
                                            <div >
                                                <label style={{ marginRight: 10, width: 200 }}>{item.batchExample1}</label>
                                            </div>
                                        </div>
                                    </div>
                                    {item.batchName2 !== '' &&
                                        <div className='layout-flex-line' style={{ marginTop: 1 }}>
                                            <div className='layout-flex-line' style={{ width: '35%' }}>
                                                <div style={{ width: 150 }}></div>
                                                <div>
                                                    <label style={{ marginRight: 10, width: 200 }}>{item.batchName2}</label>
                                                </div>
                                            </div>

                                            <div className='layout-flex-line' style={{ width: '45%' }}>
                                                <div style={{ width: 65 }}>
                                                    <label>อธิบาย 2</label>
                                                </div>
                                                <div style={{ marginRight: 10 }}>
                                                    <label style={{ marginRight: 10, width: 200 }}>{item.batchDetail2}</label>
                                                </div>
                                            </div>
                                            <div className='layout-flex-line' style={{ width: '20%' }}>
                                                <div style={{ marginRight: 10 }}>
                                                    <label>ตัวอย่าง</label>
                                                </div>
                                                <div >
                                                    <label style={{ marginRight: 10, width: 200 }}>{item.batchExample2}</label>
                                                </div>
                                            </div>
                                        </div>}
                                    {item.typenote == '1' && <hr></hr>}
                                </div>
                            ))}
                        </div>
                    }

                </div>
                <div>

                    <DataGrid
                        rows={datajournal}
                        getRowId={getRowId}
                        columns={columns}
                        loading={reloading}
                        slots={{ toolbar: GridToolbar }}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        pageSizeOptions={[10]}
                    />
                </div>
            </Container>
        </div>
    )
}

export default Approvejournalgroup
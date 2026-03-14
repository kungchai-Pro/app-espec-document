import React, { useState, useEffect } from 'react';
import FetchApi from '../../../customhooks/Functionapi';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Container from '@mui/material/Container';
import { AiFillInfoCircle } from "react-icons/ai";
import moment from 'moment/moment.js';
const ViewNotereject = (props) => {

    const FetchApis = new FetchApi();
    const [notedetail, setNotedetail] = useState([])
    const [notedetailedit, setNotedetailedit] = useState([])

    useEffect(() => {
        getNoteReject()
        // getNoteRejectEdit()
    }, [])


    const getNoteReject = () => {

        FetchApis.FethcGet(`/transitionnote/TransitionnoteBydocumentId/${props.Id}`).then(res => {
            if (res) {
                setNotedetail(res.data)
            }
        })
    }

    const getNoteRejectEdit = () => {

        FetchApis.FethcGet(`/transitionnote/TransitionnoteRejectById/${props.Id}/${props.userId}`).then(res => {
            if (res) {
                setNotedetailedit(res.data)
            }
        })

    }

    return (
        <div>
            {notedetail.length == 0 ? <div style={{
                width: '100%', height: 200, backgroundColor: '#EDE9E8',
                flexDirection: 'row', display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center'
            }}>
                <center>
                    <div><AiFillInfoCircle size={50} color='#F78B6D' /></div>
                    <label style={{ color: 'red', alignItems: 'center', fontSize: 18 }}>ไม่มีข้อมูลการแก้ไขเอกสาร</label>
                </center>
            </div> : <div>

                {notedetail.map((item, index) => (
                    <div style={{ fontSize: 12 }}>
                        <div>ลำดับที่ {index + 1}</div>

                        <div style={{ flexDirection: 'row', display: 'flex', width: '100%' }}>
                            <div style={{ width: '50%', backgroundColor: '#F5F2ED', margin: 2, padding: 2 }}>

                                <label>ผู้แจ้ง :{item.nameReject}</label>
                                <div style={{ padding: 5, margin: 5, height: 'auto' }}>
                                    {/* <label>รายละเอียด</label> */}
                                    <div style={{ fontSize: 12, marginLeft: 20 }}>{item.notedetail}</div>
                                </div>
                                <div>
                                    <label>เวลาที่แจ้ง {moment(item.datetimenote).format('DD/MM/yyy HH:mm:ss')}</label>
                                </div>
                            </div>
                            <div style={{ width: '50%', backgroundColor: '#F5F2ED', margin: 2, padding: 2 }}>
                                <label>ผู้ตอบ :{item.nameEditReject}</label>
                                <div style={{ padding: 5, margin: 5, height: 'auto' }}>
                                    {/* <label>รายละเอียด</label> */}
                                    <div style={{ fontSize: 12, marginLeft: 20 }}>{item.noteedit}</div>
                                </div>
                                <div>
                                    <label style={{ fontSize: 12 }}>เวลาตอบกลับ {item.datetimeedit != "" && moment(item.datetimeedit).format('DD/MM/yyyy HH:mm:ss')}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default ViewNotereject
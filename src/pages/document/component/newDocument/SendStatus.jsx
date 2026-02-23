import React, { useState, useEffect } from 'react'
import NavbarUser from '../../../../components/navbar/NavbarUser';
import ViewDocuments from '../veiwdocuments/viewDocuments'
import FetchApi from '../../../customhooks/Functionapi';
import {ApprovedSend} from'../../component/aprovedStatusAll/ApprovedFunction';
import {
    useParams
} from "react-router-dom";
import { Button } from '@mui/material';
import { Container } from '@mui/material';
import'./newdocument.scss';
import Swal from 'sweetalert2';


const d = new Date();
let  convertdate=""
let convertmonth=d.getMonth()+1;
if(d.getDate() <10){
  convertdate="0"+d.getDate();
}
else{
    convertdate=d.getDate();
}
if(d.getMonth()+1<10){
  convertmonth="0"+convertmonth
}else{
    convertmonth=convertmonth
}
var timestampsnow=d.getFullYear()+"-"+convertmonth+"-"+convertdate+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
var timestampsDate=d.getFullYear()+"-"+convertmonth+"-"+convertdate;



function SendStatus(props) {
    let { id } = useParams(); //journalID
    const FetchApis = new FetchApi();
    const userId = sessionStorage.getItem("userId")
    const [datajournal, sertDatajournal] = useState([]);
    const [flowStatus, setFlowStatus] = useState("");
    const [flowStateEnd, setFlowStateEnd] = useState("");


    useEffect(() => {
        getJournalbyId()
    }, [])
    const getJournalbyId = () => {

        FetchApis.FethcGet(`/document/DocumentById/${id}`).then(res => {
            if (res) {

                sertDatajournal(res.data)
                getFlowstatus(res.data)
            }

        })
    }


    const getFlowstatus = (data) => {

        FetchApis.FethcPost(`/flowrunsystem/flowrunByUserId`, {
            journalId: id,
            stateflow: data[0].stateflow,
            UserId: userId
        }).then(res => {

            if (res.data.length > 0) {
                setFlowStatus(res.data[0].statusType)
                setFlowStateEnd(res.data[0].stateEnd)
            }

        })
    }

    const isAPPROVED = () => {

        Swal.fire({
            title: "แจ้งเตือน",
            text: "คุณต้องการบันทึก ส่งข้อมูล ใช่หรือไม่ ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "บันทึก",
            cancelButtonText: "ยกเลิก"
        }).then((result) => {
            if (result.isConfirmed) {

                ApprovedSend(datajournal, userId, flowStatus, flowStateEnd,timestampsnow).then(res => {
                    if (res.status == 200) {

                        Swal.fire({
                            title: "แจ้งการบันทึก",
                            text: "คุณทำการบันทึกเรียบร้อยแล้ว",
                            icon: "success"
                        });

                        setTimeout(() => {
                            window.location.href = '/documents'
                        }, 1000);
                    }
                })

            }
        });

    }

    return (
        <div>
            <NavbarUser />
            <Container>
                <div>
                    <div style={{ flex: 'row', justifyContent: 'flex-end', display: 'flex', marginTop: 10, marginRight: 20 }}>
                        <button className='customSuccess-button' onClick={()=>isAPPROVED()}>ส่งข้อมูล</button>
                    </div>
                    <ViewDocuments jourID={id} />
                </div>
            </Container>
        </div>
    )
}

export default SendStatus
import React, { useState, useEffect, useReducer } from 'react'
import FetchApi from '../../../customhooks/Functionapi'
import { Button } from '@mui/material';
import { ApprovedById, RecievedById, rejectById, EditReject } from './ApprovedFunction';
import { Route, Link, Routes, useLocation, useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Swal from 'sweetalert2';

// Form  Reject --------> 
function PopUpReject({ datajournal, userId, flowStatus, flowStateEnd }) {
    const FetchApis = new FetchApi()

    const [notereject, setNotereject] = useState("");

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [userlist, setUserlist] = useState([])
    const [UserReject, setUserReject] = useState({
        UserId: "",
        reject_stateflow: ""
    })

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        isRejectJournal()
        setOpen(false);
    };

    useEffect(() => {

        getUserByFlow();
    }, [])


    // เรียกชื่อผู้อยู่ใน flow
    const getUserByFlow = () => {

        FetchApis.FethcGet(`/flowrunsystem/flowrunUserApproved/${datajournal[0].JournalID}/${datajournal[0].stateflow}`).then(res => {
            if (res) {
                setUserlist(res.data)
            }

        })

    }

    const datetimenow = () => {
        const now = new Date();

        // แปลงเป็นเวลาไทย
        const options = {
            timeZone: "Asia/Bangkok",
        };
        const thaiDate = new Date(now.toLocaleString("en-US", options));

        // แยกค่าต่างๆ ออกมาเป็นตัวเลข
        const year = thaiDate.getFullYear() + 543; // แปลงเป็น พ.ศ.
        const month = String(thaiDate.getMonth() + 1).padStart(2, "0");
        const day = String(thaiDate.getDate()).padStart(2, "0");
        const hour = String(thaiDate.getHours()).padStart(2, "0");
        const minute = String(thaiDate.getMinutes()).padStart(2, "0");
        const second = String(thaiDate.getSeconds()).padStart(2, "0");

        // รูปแบบวันที่และเวลา (เช่น 05/11/2568 14:32:10)
        var timestampsnow = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        return timestampsnow
    }

    const isRejectJournal = () => {
        var getdatetime = datetimenow();

        var ob = {
            journalId: datajournal[0].JournalID, //รหัสเอกสาร
            stateflow: datajournal[0].stateflow, // state ปัจจุบันเอกสาร
            UserId: userId, //รหัสผู้บันทึก ปัจจุบัน
            reject_stateflow: UserReject.reject_stateflow, //flow  ต้องการ upate journal
            notedetail: notereject, // รายละเอียด
            rejectToId: UserReject.UserId, // id user ที่จะ update ยัง journal
            stamptimeUpdate: getdatetime,
            eventstatus: '1'
        }

        // rejectById(ob)

        Swal.fire({
            title: "แจ้งเตือน",
            text: "คุณต้องการบันทึก Reject ใช่หรือไม่ ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "บันทึก",
            cancelButtonText: "ยกเลิก"
        }).then((result) => {
            if (result.isConfirmed) {
                rejectById(ob).then(res => {

                    if (res.status == 200) {
                        Swal.fire({
                            title: "แจ้งการบันทึก",
                            text: "คุณทำการบันทึกเรียบร้อยแล้ว",
                            icon: "success"
                        });

                        setTimeout(() => {
                            setOpen(false);
                            window.location.href = '/approvelist'
                        }, 1000);
                    }
                })
            }
        });

    }

    const isOnChageSelect = (e) => {

        const datauserId = userlist.filter((item) => item.approveById == e)

        setUserReject({
            ...UserReject, UserId: datauserId[0].approveById,
            reject_stateflow: datauserId[0].stateflow
        })


    }

    const handleChangeText = e => {
        var input = e.target.value;
        const cleanInput = input.replace(/[^a-zA-Z0-9ก-๙\s()#/.%:";,=\-&@$<>+*/?!]/g, "");
        setNotereject(cleanInput);
    };


    return (<>
        <Button style={{ color: '#f0a102' }} variant="outlined" onClick={() => handleClickOpen()()}>REJECT</Button>

        <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">REJECT JOURNAL ( {datajournal[0].JournalCode} )</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                <div style={{ width: 600, height: 500 }}>
                    <div>
                        <label>รายชื่อผู้แก้ไขข้อมูล</label>
                    </div>
                    <div style={{ margin: 10, padding: 10 }}>
                        <select style={{ width: '90%', height: 35 }} onChange={(e) => isOnChageSelect(e.target.value)}>
                            <option value={''}>เลือกรายชื่อผู้แก้ไข ....</option>
                            {userlist.map((item, i) => (
                                <option value={item.approveById}>{item.approvename}</option>
                            ))}

                        </select>
                    </div>
                    <div>
                        <label>N0TE (อธิบายเพิ่มเติม)</label>
                    </div>
                    <div>
                        <textarea style={{ width: '85%', height: 50, padding: 10, margin: 10 }}
                            name='notereject'
                            value={notereject}
                            onChange={(e) => handleChangeText(e)}
                        ></textarea>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>

    </>)
}




function Approvedstatusall({ Id, statusAction, userId }) {

    const FetchApis = new FetchApi();
    const [datajournal, sertDatajournal] = useState([]);
    const [flowStatus, setFlowStatus] = useState("");
    const [flowStateEnd, setFlowStateEnd] = useState("");
    const [notedetail, setNotedetail] = useState([])
    const [notedetailedit, setNotedetailedit] = useState([])



    useEffect(() => {
        getJournalbyId();

    }, [])

    const getJournalbyId = () => {

        FetchApis.FethcGet(`/document/DocumentById/${Id}`).then(res => {
            if (res) {

                sertDatajournal(res.data)
                getFlowstatus(res.data)
                getNoteReject()
                getNoteRejectEdit()
            }

        })
    }

    const datetiemnow = () => {
        const now = new Date();

        // แปลงเป็นเวลาไทย
        const options = {
            timeZone: "Asia/Bangkok",
        };
        
        const thaiDate = new Date(now.toLocaleString("en-US", options));

        // แยกค่าต่างๆ ออกมาเป็นตัวเลข
        const year = thaiDate.getFullYear() + 543; // แปลงเป็น พ.ศ.
        const month = String(thaiDate.getMonth() + 1).padStart(2, "0");
        const day = String(thaiDate.getDate()).padStart(2, "0");
        const hour = String(thaiDate.getHours()).padStart(2, "0");
        const minute = String(thaiDate.getMinutes()).padStart(2, "0");
        const second = String(thaiDate.getSeconds()).padStart(2, "0");

        // รูปแบบวันที่และเวลา (เช่น 05/11/2568 14:32:10)
        var timestampsnow = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        return timestampsnow
    }

    const getFlowstatus = (data) => {

        FetchApis.FethcPost(`/flowrunsystem/flowrunByUserId`, {
            journalId: Id,
            stateflow: data[0].stateflow,
            UserId: userId
        }).then(res => {

            if (res.data.length > 0) {
                setFlowStatus(res.data[0].statusType)
                setFlowStateEnd(res.data[0].stateEnd)
            }

        })

    }

    const getNoteReject = () => {

        FetchApis.FethcGet(`/transitionnote/TransitionnoteById/${Id}/${userId}`).then(res => {
            if (res) {
                setNotedetail(res.data)

            }
        })
    }

    const getNoteRejectEdit = () => {

        FetchApis.FethcGet(`/transitionnote/TransitionnoteRejectById/${Id}/${userId}`).then(res => {
            if (res) {
                setNotedetailedit(res.data)
            }
        })

    }


    const isRECIEVED = () => {
        var datadatetime = datetiemnow();
        Swal.fire({
            title: "แจ้งเตือน",
            text: "คุณต้องการบันทึกรับงาน ใช่หรือไม่ ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "รับเอกสาร",
            cancelButtonText: "ยกเลิก"
        }).then((result) => {
            if (result.isConfirmed) {

                RecievedById(datajournal, userId, flowStatus, flowStateEnd, datadatetime).then(res => {
                    if (res.status == 200) {
                        Swal.fire({
                            title: "แจ้งการบันทึก",
                            text: "คุณทำการบันทึกเรียบร้อยแล้ว",
                            icon: "success"
                        });
                        setTimeout(() => {
                            window.location.href = '/approvelist'
                        }, 1000);

                    }
                })
            }
        });
    }


    const isAPPROVED = () => {
        var datadatetime = datetiemnow();
        Swal.fire({
            title: "แจ้งเตือน",
            text: "คุณต้องการ อนุมัติงาน ใช่หรือไม่ ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "อนุมัติ",
            cancelButtonText: "ยกเลิก"
        }).then((result) => {
            if (result.isConfirmed) {

                ApprovedById(datajournal, userId, flowStatus, flowStateEnd, datadatetime).then(res => {
                    if (res.status == 200) {

                        Swal.fire({
                            title: "แจ้งการบันทึก",
                            text: "คุณทำการบันทึกเรียบร้อยแล้ว",
                            icon: "success"
                        });

                        setTimeout(() => {
                            window.location.href = '/approvelist'
                        }, 1000);
                    }
                })

            }
        });

    }


    return (
        <div style={{ flexDirection: 'row', justifyContent: "space-between", display: 'flex', width: '100%', backgroundColor: '#fafafa', }}>

            <div style={{
                flexDirection: 'row', justifyContent: 'end',
                display: 'flex', margin: 10, padding: 5, borderRadius: 5
            }}>

                {statusAction == '201' ?
                    <div style={{ padding: 10, backgroundColor: '#fcede7', width: 700, borderRadius: 5 }}>
                        <div style={{ backgroundColor: '#fab398', alignContent: 'center', alignItems: 'center', display: 'flex' }}>
                            <ErrorOutlineIcon style={{ width: 35, height: 35, color: 'red' }} />
                            <label style={{ padding: 5 }}>ข้อมูลการแจ้งเตือน</label>
                        </div>
                        <label style={{ fontSize: 12 }}>{notedetail.length > 0 && notedetail[0].notedetail}</label>
                    </div> : <div >
                        {statusAction != '202' && <div style={{ padding: 10, backgroundColor: '#fb9a4e' }}>
                            <label style={{ color: '#ffff' }}>แสดงรายการ เอกสาร</label>
                        </div>}
                    </div>
                }

                {statusAction == '202' &&
                    <div style={{ flexDirection: 'row', justifyContent: 'flex-start', display: 'flex', width: '100%' }}>
                        {notedetailedit.length > 0 && <div style={{ margin: 10, padding: 10, backgroundColor: '#fbecd9', width: 450, borderRadius: 5 }}>

                            <div>สาเหตุการแจ้งตีกลับ  <label>ผู้แจ้ง : {notedetailedit[0].createname}</label> </div>

                            <div>
                                <label style={{ fontSize: 12 }}> {notedetailedit.length > 0 && notedetailedit[0].notedetail} </label>
                            </div>
                        </div>}
                        {notedetailedit.length > 0 &&
                            <div style={{ margin: 10, padding: 10, backgroundColor: '#e1f1e3', width: 450, borderRadius: 5 }}>
                                <div>คำธิบายการแก้ไข <label>ผู้ตอบรับ :{notedetailedit[0].editname}</label> </div>
                                <div style={{ fontSize: 12 }}>{notedetailedit.length > 0 && notedetailedit[0].noteedit}</div>
                            </div>}

                    </div>
                }

            </div>

            <div style={{
                flexDirection: 'row', justifyContent: 'end',
                display: 'flex', margin: 10, padding: 5, borderRadius: 5
            }}>

                {statusAction == '112' && <div>

                    <div>
                        <Button variant="outlined" style={{ color: 'green' }} onClick={() => isRECIEVED()}>RECIEVED</Button>

                    </div>

                </div>}


                {statusAction == '103' &&
                    <div>

                        <div>
                            <Button variant="outlined" style={{ color: 'green' }} onClick={() => isAPPROVED()}>APPROVED</Button>
                            {datajournal.length > 0 ? <PopUpReject datajournal={datajournal} userId={userId} flowStatus={flowStatus} flowStateEnd={flowStateEnd} /> : ""}
                        </div>

                    </div>}
            </div>

        </div>
    )
}

export default Approvedstatusall
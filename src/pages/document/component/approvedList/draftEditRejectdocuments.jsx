import React, { useState, useEffect, useRef } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './newdocument.scss';
import DraftAddDetaildocument from './draftAddDetaildocument';
import PopUpEditJournalImages from '../newDocument/popupcomponent/popUpEditJournalImages';
import FetchApi, { host } from '../../../customhooks/Functionapi';
import { useSelector, useDispatch } from 'react-redux'
import { UpdateDetailList } from '../../../customhooks/Functiondocument';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2';
import moment from 'moment/moment.js';
import { objectHearder, ItmeTypeID } from '../newDocument/objectdata/typeobject';
import { Route, Link, Routes, useLocation, useNavigate } from 'react-router-dom';
import ImageZoom from "react-image-zooom";
import SearchIcon from '@mui/icons-material/Search';
import { ApprovedById, RecievedById, rejectById, EditReject } from '../aprovedStatusAll/ApprovedFunction';
import { AddHeader, AddDetail, AddImages } from '../../../redux/features/document/documentHeaderSlice';

import { Container } from '@mui/material';

const DraftEditRejectdocuments = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const FetchApis = new FetchApi()

    const documentDetial = useSelector((state) => state.documentHeader.valueDetail);
    const [addImages, setAddImages] = useState([]);
    const ref_imagse = useRef(null);
    const [dataHeader, setDataHeader] = useState({ ...objectHearder });
    const userId = sessionStorage.getItem("userId")
    const [journalImages, setJournalImages] = useState([]);

    const [datajournal, sertDatajournal] = useState([]);
    const [flowStatus, setFlowStatus] = useState("");
    const [flowStateEnd, setFlowStateEnd] = useState("");
    const [notedetail, setNotedetail] = useState([])
    const [notedetailedit, setNotedetailedit] = useState([])

    function getdatadetail(data) {
        dispatch(AddDetail(data))
    }

    function getdataImages(data) {
        dispatch(AddImages(data))
    }


    useEffect(() => {

        getJournalById()
    }, [ref_imagse])

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
        var timestampsnow = year + "-" + month+ "-" + day + " " + hour + ":" + minute + ":" + second;
        return timestampsnow
    }

    const getJournalById = () => {
        FetchApis.FethcGet(`/document/DocumentById/${props.documentId}`).then(res => {
            if (res) {
                sertDatajournal(res.data[0])

                getjournalImagseList(res.data[0].JournalCode);
                var dataItemTypeID = res.data[0]
                var datatpurposelist = dataItemTypeID.PurposeDetail.split(",");
                if (dataItemTypeID.ItemTypeID == "") {

                    setDataHeader({
                        ...res.data[0],
                        ItemTypeID: [],
                        PurposeDetail: datatpurposelist
                    })
                } else {
                    var itemtypeId = dataItemTypeID.ItemTypeID.split(',')
                    setDataHeader({
                        ...res.data[0],
                        ItemTypeID: itemtypeId,
                        PurposeDetail: datatpurposelist
                    })
                }

            }


            getFlowstatus(res.data)
            getNoteReject()
            getNoteRejectEdit()

        })
    }


    const getFlowstatus = (data) => {

        FetchApis.FethcPost(`/flowrunsystem/flowrunByUserId`, {
            journalId: props.documentId,
            stateflow: data[0].stateflow,
            UserId: userId
        }).then(res => {

            if (res.data.length > 0) {
                setFlowStatus(res.data[0].statusType)
                setFlowStateEnd(res.data[0].stateEnd)
            }

        })

    }
    //แสดงรูปที่ทำการบันทึก 
    const getjournalImagseList = (code) => {

        FetchApis.FethcGet(`/journalImages/JouranlImagesByCode/${code}`).then(res => {
            if (res) {
                setJournalImages(res.data);
            }
        })
    }

    function isRemoveImages(index) {
        const newArray = [...addImages];
        newArray.splice(index, 1);
        setAddImages(newArray);

    }

    function onCheckType(e) {
        const { ItemTypeID } = dataHeader;
        const value = e.target.value;

        if (e.target.checked == true) {
            if (dataHeader.ItemTypeID == '') {
                var typeitem = dataHeader.ItemTypeID[0] = value

                setDataHeader({ ...dataHeader, ItemTypeID: [typeitem] })
            } else {
                setDataHeader({ ...dataHeader, ItemTypeID: [...ItemTypeID, value] })
            }

        }

        else if (e.target.checked == false) {
            setDataHeader({
                ...dataHeader,
                ItemTypeID: ItemTypeID.filter((e) => e !== value),
            });
        }
    }

    // ข้อมูลก่อน save
    const isSaveUpdate = () => {


        if (dataHeader.PartFileECN != "") {


            UpdateDetailList(documentDetial).then(res => {
                if (res == true) {
                    Swal.fire({
                        title: "แจ้งการบันทึก",
                        text: "คุณสร้างเอกสารเรียบร้อยแล้ว",
                        icon: "success"
                    });

                    // setTimeout(() => {
                    // }, 1000);
                }
            })

        } else {
            UpdateDetailList(documentDetial).then(res => {
                if (res == true) {
                    Swal.fire({
                        title: "แจ้งการบันทึก",
                        text: "คุณสร้างเอกสารเรียบร้อยแล้ว",
                        icon: "success"
                    });

                    // setTimeout(() => {
                    // }, 1000);
                }
            })

        }

    };

    const ClickTypeItem = (key) => {
        var typeItem = dataHeader.ItemTypeID.find(val => val == key);
        return typeItem;
    }

    function RevoveImage(id) {

        Swal.fire({
            title: "แจ้งการลบ?",
            text: "คุณแน่ใจที่ลบข้อมูล ใช่หรือไม่ !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ลบเอกสาร",
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {

                FetchApis.FethcDelete(`/journalImages/JournalImagsById/${id}`).then(res => {
                    if (res) {
                        window.location.reload();
                    }
                })

            }
        });

    }


    // edit ได้
    function Retureimag() {
        return (<div style={{ width: '100%' }}>

            {journalImages.map((val, index) =>
                <Box sx={{ height: 'auto', marginTop: '1', padding: 1, width: '100%', display: 'flex', fontSize: 14 }}>
                    <div className='row-pace-w100-line'
                        style={{ backgroundColor: '#faf8f8', padding: 10 }}>
                        {/* ส่วนที่1 */}
                        <div style={{ width: '25%' }}>
                            <div style={{
                                width: 50, height: 30, backgroundColor: '#2c82c6', color: '#ffff', flexDirection: 'row',
                                alignItems: 'center', display: 'flex'
                            }}>
                                <label>No.{index + 1}</label>
                            </div>
                            <div>
                                <div style={{ marginBottom: 5 }}>
                                    <label>หัวข้อ</label>
                                    <div style={{ marginLeft: 20, padding: 10, backgroundColor: '#E6EBEA' }}>
                                        <label>{val.SubjectDetails}</label>
                                    </div>

                                </div>
                                <div>
                                    <label>รายละเอียด</label>
                                    <div style={{ marginLeft: 20, padding: 10, backgroundColor: '#E6EBEA' }}>
                                        <label>{val.SubjectExtend}</label>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* ส่วนที่2 */}
                        <div style={{ width: '65%', padding: 10 }} className='row-pace-w100-line'>
                            <div style={{
                                width: '100%', height: 320, backgroundColor: "#d6d8d7"
                            }}>

                                <div>ภาพประกอบ : {val.PkDescription} {val.ItemID}</div>
                                <ImageZoom
                                    src={host + `/file/images/files/${val.LocationPic}`}

                                    width={'auto'}
                                    height={280}
                                    alt="Logo"
                                    zoom="200"
                                />


                            </div>
                            <div>
                                <div>
                                    <SearchIcon style={{ width: 35, height: 35 }} />
                                </div>
                            </div>
                        </div>
                        {/* ส่วนที่3 */}
                        <div style={{ width: '20%' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>

                                <div>
                                    <div style={{ backgroundColor: '#e0fbeb', alignItems: 'center', display: 'flex', padding: 10 }}>
                                        <CheckCircleOutlineIcon sx={{ color: '#39995f' }} />
                                        <label style={{ color: '#39995f' }}>Confirmed</label>
                                    </div>
                                    <center>
                                        <div>
                                            <label>Prepared By</label>
                                            <div>
                                                <label style={{ fontSize: 12 }}> {val.NameUserConfirm} {val.lastnameUserConfirm} </label>
                                            </div>
                                            <hr />
                                        </div>
                                        <div>
                                            <label>create datetime</label>
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 12 }}>{moment(val.ConfirmDateTime).format('DD/MM/yyyy hh:mm:ss')}</label>
                                        </div>
                                    </center>
                                </div>

                                {val.UserIdConfirm == userId && <div ref={props.ref_imagse}>
                                    <div style={{ flexDirection: 'row', justifyContent: 'center', display: 'flex' }}>

                                        <div style={{ marginTop: 5, marginRight: 30, flexDirection: 'row', justifyContent: 'flex-end', display: 'flex' }}>
                                            <Button variant="outlined" size="small" color='error' onClick={() => RevoveImage(val.JournalID)}>Remove</Button>
                                        </div>

                                        <PopUpEditJournalImages
                                            getdataImages={props.getdataImages}
                                            valDateail={""}
                                            SlotNo={""}
                                            ItemName={""}
                                            ItemID={""}
                                            JourId={val.JourId}
                                            getjourDetailList={""}
                                            JournalID={val.JournalID}
                                        />
                                    </div>
                                </div>}

                            </div>

                        </div>
                    </div>

                </Box>)}

        </div>)
    }


    //  การทำบันทึก reject 
    function PopUpEditReject(props) {
        const FetchApis = new FetchApi()
        const [editNotereject, setEditNotereject] = useState("");
        const navigate = useNavigate();
        const [open, setOpen] = React.useState(false);
        const [scroll, setScroll] = React.useState('paper');

        const handleClickOpen = (scrollType) => () => {
            setOpen(true);
            setScroll(scrollType);
        };

        const handleClose = () => {
            setOpen(false);
        };

        const handleSave = () => {
            var datenowtimes = datetimenow();
            var ob = {
                documentId: props.notereject.documentId,
                stateflownote: props.notereject.stateflownote,
                createnoteby: props.notereject.createnoteby,
                noteId: props.notereject.noteId,
                userId: props.userId,
                notedetail: editNotereject,
                stateflow: props.datajournal.stateflow,
                statusflow: props.flowStatus,
                stamptimeUpdate: datenowtimes,
                eventstatus: '0',
            }
            // console.log(ob)
            isSaveUpdate()
            EditReject(ob).then(res => {

                if (res.status == 200) {
                    Swal.fire({
                        title: "แจ้งการบันทึก",
                        text: "คุณทำการบันทึก edit reject เรียบร้อยแล้ว",
                        icon: "success"
                    });

                    setTimeout(() => {
                        setOpen(false);
                        navigate(-1)

                    }, 1000);
                }
            })


        };

        const handleChangeText = e => {
            var input = e.target.value;
            const cleanInput = input.replace(/[^a-zA-Z0-9ก-๙\s()#/.%:";,=\-&@$<>+*/?!]/g, "");
            setEditNotereject(cleanInput);
        };

        return (<>
            <Button variant="contained" style={{ marginRight: 5 }} onClick={() => handleClickOpen()()}>บันทึกแก้ไข</Button>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">REJECT JOURNAL ( {props.datajournal.JournalCode} )</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <div style={{ width: 600, height: 500 }}>
                        <div style={{ marginBottom: 10 }}>
                            <div>
                                <label>ข้อมูลแจ้งแก้ไข </label>
                            </div>
                            <div style={{ width: '80%', padding: 20, margin: 10, backgroundColor: '#f7f6f6' }}>
                                <label style={{ fontSize: 12 }}>{props.notereject.notedetail} </label>
                            </div>
                        </div>
                        <div>
                            <label>N0TE  EDIT (อธิบายเพิ่มเติม)</label>
                        </div>
                        <div>
                            <textarea style={{ width: '85%', height: 50, padding: 10, margin: 10 }}
                                // onChange={(e) => setNotereject(e.target.value)}
                                name='notereject'
                                value={editNotereject}
                                onChange={(e) => handleChangeText(e)}
                            ></textarea>
                        </div>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleSave()}>Save</Button>
                </DialogActions>
            </Dialog>

        </>)
    }

    const getNoteReject = () => {

        FetchApis.FethcGet(`/transitionnote/TransitionnoteById/${props.documentId}/${userId}`).then(res => {
            if (res) {
                setNotedetail(res.data[0])
                // console.log(res.data)

            }
        })
    }

    const getNoteRejectEdit = () => {

        FetchApis.FethcGet(`/transitionnote/TransitionnoteRejectById/${props.documentId}/${userId}`).then(res => {
            if (res) {
                setNotedetailedit(res.data[0])
                // console.log(res.data)
            }
        })

    }





    return (
        <div>
            <div>
                <Container>
                    <CssBaseline />

                    <div style={{ justifyContent: 'flex-end', display: 'flex', marginTop: 10 }}>
                        {datajournal &&
                            <PopUpEditReject
                                notereject={notedetail}
                                datajournal={datajournal}
                                userId={userId}
                                flowStatus={flowStatus}
                                flowStateEnd={flowStateEnd}
                            />}
                        {/* <button className='customSuccess-button' style={{ marginRight: 10 }} onClick={() => isSaveUpdate()}>บันทึก</button> */}
                        <button className='customWarning-button' onClick={() => navigate(-1)}>ยกเลิก</button>
                    </div>

                    <Box sx={{ height: 'auto', marginTop: '10px', fontSize: 14 }} >
                        <Card sx={{ minWidth: 275 }}>
                            <div style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>
                                <label style={{ padding: 5, backgroundColor: '#f5dc9f', borderRadius: 5, color: '#68684' }}>ส่วนของคำร้องขอ</label>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                <div style={{ width: '70%' }}>
                                    <div className='row-pace-w100-line'>
                                        <div style={{ width: 150 }}>
                                            <label style={{ width: 150, fontWeight: '800' }}>ประเภทสินค้า</label>
                                        </div>

                                        {ItmeTypeID.map((val, index) => (
                                            <div style={{ padding: 5, marginRight: 5 }}>
                                                {dataHeader.ItemTypeID == val ?
                                                    <div> <input type='checkbox' name='1' value={val} onClick={(e) => onCheckType(e)} defaultChecked={true} disabled /><label> {val}</label></div> :
                                                    <div><input type='checkbox' name='1' value={val} onClick={(e) => onCheckType(e)} defaultChecked={false} disabled /><label> {val}</label></div>
                                                }

                                            </div>
                                        ))}
                                    </div>

                                    <div className='row-pace-w100-line'>
                                        <div style={{ width: 150 }}>
                                            <label style={{ width: 200, fontWeight: '800' }}>ประเภทงาน</label>
                                        </div>
                                        <div style={{ width: '100%', backgroundColor: '#f8f9f9', padding: 2 }}>
                                            {dataHeader.TypeproductName}
                                        </div>

                                    </div>

                                    <div className='layout-flex-line'>
                                        <div style={{ width: 150 }}>
                                            <label style={{ width: 200, fontWeight: '800' }}>วัตถุประสงค์</label>
                                        </div>
                                        {dataHeader.PurposeDetail[0] !== "" && <div style={{ width: '25%', backgroundColor: '#f8f9f9', padding: 2 }}>
                                            {dataHeader.PurposeDetail.map((item, index) => (
                                                <div style={{ marginLeft: 25 }}>
                                                    <label>{index + 1}.{item}</label>
                                                </div>
                                            ))}
                                        </div>}
                                        <div style={{ width: '65%', backgroundColor: '#f8f9f9', padding: 2 }}>
                                            <textarea disabled style={{ height: 100, width: '100%' }} value={dataHeader.Purpose}></textarea>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: 3 }} className='layout-flex-line'>
                                        <div style={{ width: 150 }}>
                                            <label style={{ width: 150, fontWeight: '800' }}>ผู้ร้องขอ</label>
                                        </div>
                                        <input type='text' value={dataHeader.UserIDRequest} onChange={(e) => setDataHeader({ ...dataHeader, UserIDRequest: e.target.value })}
                                            placeholder='ชื่อ / สกุล' className='input-box' style={{ width: '100%' }} disabled />
                                    </div>
                                </div>

                                <div style={{ width: '30%' }}>
                                    <div className='row-pace-w100-line'>
                                        <div style={{ width: 200 }}>
                                            <label style={{ fontWeight: '800' }}>วันที่สร้างเอกสาร</label>
                                        </div>
                                        <div style={{ width: '100%' }}>
                                            <label>{moment(dataHeader.TransDate).format('DD/MM/yyyy')}</label>

                                        </div>
                                    </div>

                                    <div className='row-pace-w100-line'>
                                        <div style={{ width: 200 }}>
                                            <label style={{ fontWeight: '800' }}>วันที่ Approved</label>
                                        </div>
                                        <div style={{ width: '100%' }}>
                                            <label>{moment(dataHeader.LastApprovedDate).format('DD/MM/yyyy')}</label>
                                        </div>
                                    </div>
                                    <div className='row-pace-w100-line'>
                                        <div style={{ width: 200 }}>
                                            <label style={{ fontWeight: '800', width: 200 }}>เอกสารบรรจุ (SSD)</label>
                                        </div>
                                        <div style={{ width: '100%' }}>
                                            <input type='text' disabled style={{ marginTop: 3 }} value={dataHeader.JournalCode}
                                                onChange={(e) => setDataHeader({ ...dataHeader, JournalCode: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ width: '15%' }}>
                                    <div className='row-pace-w100-line'>
                                        <div style={{ width: '80%' }}>
                                            <label style={{ fontWeight: '800' }}>เลขที่เอกสาร (ECN) *</label>
                                            <input type='text'
                                                value={dataHeader.RefECN} onChange={(e) => setDataHeader({ ...dataHeader, RefECN: e.target.value })}
                                                className='input-box' style={{ width: '100%' }} disabled />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: '800' }}>ชื่อไฟล์ : {dataHeader.PartFileECN}</label>
                                    </div>
                                </div>
                            </div>

                            {/* ส่วนข้อมูลลูกค้า1 */}
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                <div style={{ width: '30%' }}>
                                    <div className='row-pace-w100-line' style={{ width: '100%' }}>
                                        <label style={{ width: 200, fontWeight: '800' }}>รหัสลูกค้า</label>
                                        <input type='text' className='input-box' style={{ width: '100%' }} value={dataHeader.CustID}
                                            onChange={(e) => setDataHeader({ ...dataHeader, CustID: e.target.value })} disabled />

                                    </div>
                                    <div className='row-pace-w100-line' style={{ marginTop: 3 }}>
                                        <label style={{ width: 200, fontWeight: '800' }}>รหัสสินค้า</label>
                                        <input type='text' className='input-box' style={{ width: '100%' }} value={dataHeader.ItemID}
                                            onChange={(e) => setDataHeader({ ...dataHeader, ItemID: e.target.value })} disabled />

                                    </div>
                                </div>
                                <div style={{ width: '40%', marginLeft: 10 }}>
                                    <div className='row-pace-w100-line'>
                                        <div style={{ width: 80 }}>
                                            <label style={{ width: 100, fontWeight: '800' }} >ชื่อลูกค้า</label>
                                        </div>
                                        <div style={{ width: '100%' }}>
                                            <input type='text' value={dataHeader.CustName} onChange={(e) => setDataHeader({ ...dataHeader, CustName: e.target.value })}
                                                className='input-box'
                                                style={{ width: '100%' }} disabled />
                                        </div>
                                    </div>

                                    <div className='row-pace-w100-line'>
                                        <div style={{ flexDirection: 'row', display: 'flex', width: '100%', marginTop: 3 }}>
                                            <div style={{ width: 80 }}>
                                                <label style={{ width: 100, fontWeight: '800' }}>ชื่อสินค้า</label>
                                            </div>
                                            <input type='text'
                                                value={dataHeader.ItemName}
                                                onChange={(e) => setDataHeader({ ...dataHeader, ItemName: e.target.value })}
                                                className='input-box' style={{ width: '100%' }} disabled />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ width: '30%' }}>
                                    <div className='row-pace-w100-line' style={{ marginTop: 3, marginLeft: 10 }}>
                                        <div style={{ width: 80 }}>
                                            <label style={{ fontWeight: '800' }}>ตราสินค้า</label>
                                        </div>
                                        <div style={{ width: '100%', flexDirection: 'row', display: 'flex' }}>
                                            <input type='text'
                                                value={dataHeader.BrandID}
                                                onChange={(e) => setDataHeader({ ...dataHeader, BrandID: e.target.value })}
                                                className='input-box'
                                                style={{ width: '85%' }}
                                                disabled
                                            />

                                        </div>


                                    </div>
                                </div>
                            </div>

                            {/* ส่วนข้อมูลลูกค้า2 */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                                width: '100%',
                                margin: 10
                            }}>
                                <div style={{ width: '95%' }}>

                                    <div className='row-pace-w100-line' style={{ marginTop: 3 }}>
                                        <div style={{ flexDirection: 'row', display: 'flex', width: '60%' }}>
                                            <div style={{ width: 155 }}>
                                                <label style={{ width: 110, fontWeight: '800' }}>การบรรจุงาน</label>
                                            </div>
                                            <input type='text'
                                                value={dataHeader.PackagingDetails} onChange={(e) => setDataHeader({ ...dataHeader, PackagingDetails: e.target.value })}
                                                className='input-box' style={{ width: '100%' }} disabled />
                                        </div>
                                        <div style={{ flexDirection: 'row', display: 'flex', width: '45%' }}>
                                            <div style={{ width: 70, marginLeft: 10 }}>
                                                <label style={{ fontWeight: '800' }}>Spec ID</label>
                                            </div>
                                            <div>
                                                <input type='text'
                                                    name='SpecId'
                                                    value={dataHeader.SpecId}

                                                    style={{ width: 300 }} className='input-box'
                                                    disabled
                                                />
                                            </div>

                                        </div>
                                    </div>
                                    <div className='row-pace-w100-line' style={{ marginTop: 3 }}>
                                        <div style={{ flexDirection: 'row', display: 'flex', width: '100%' }}>
                                            <div style={{ width: 120 }}>
                                                <label style={{ width: 155, fontWeight: '800' }}>Spec Name</label>
                                            </div>
                                            <input type='text'
                                                value={dataHeader.SpecName}
                                                className='input-box' style={{ width: '50%' }} disabled />
                                        </div>
                                    </div>

                                    <div className='row-pace-w100-line' style={{ marginTop: 3 }}>
                                        <div style={{ flexDirection: 'row', display: 'flex', width: '100%' }}>
                                            <div style={{ width: 120 }}>
                                                <label style={{ width: 155, fontWeight: '800' }}>อธิบายเพิ่มเติม 1</label>
                                            </div>
                                            <input type='text'
                                                value={dataHeader.Remark}
                                                onChange={(e) => setDataHeader({ ...dataHeader, Remark: e.target.value })}
                                                className='input-box' style={{ width: '50%' }} disabled />
                                        </div>
                                    </div>
                                    <div className='row-pace-w100-line' style={{ marginTop: 3, justifyContent: 'flex-end' }}>

                                        <div style={{ flexDirection: 'row', display: 'flex' }}>

                                            <div style={{ flexDirection: 'row', display: 'flex', marginRight: 10 }}>
                                                <div style={{ width: 85 }}>
                                                    <label style={{ fontWeight: '800' }}>Confirm By :</label>
                                                </div>
                                                <div>
                                                    <label>{dataHeader.nameConfirme} {dataHeader.lastname}</label>
                                                </div>
                                            </div>
                                            <div style={{ flexDirection: 'row', display: 'flex' }}>
                                                <div style={{ width: 70 }}>
                                                    <label style={{ fontWeight: '800' }}>วันที่/เวลา :</label>
                                                </div>
                                                <div>
                                                    <label>{moment(dataHeader.TransDate).format('DD/MM/yyyy')}</label>
                                                </div>
                                            </div>
                                            <div><CheckCircleOutlineIcon sx={{ color: '#39995f' }} /></div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </Card>
                    </Box>
                </Container>
            </div>

            <div>
                {dataHeader.JournalID != "" &&

                    <DraftAddDetaildocument
                        getdatadetail={getdatadetail}
                        isRemoveImages={isRemoveImages}
                        getdataImages={getdataImages}
                        dataHeader={dataHeader}
                        HdJourCode={dataHeader.JournalCode}
                    />
                }

            </div>
            <div>
                <Container>
                    {journalImages.length > 0 ? <div>
                        <div style={{ padding: 10, backgroundColor: '#B2D4D1' }}>
                            <label>รูปประกอบเพิ่มเติม</label>
                        </div>
                        <Retureimag />
                    </div> : <div>

                    </div>}
                </Container>
            </div>
        </div>
    )
}

export default DraftEditRejectdocuments
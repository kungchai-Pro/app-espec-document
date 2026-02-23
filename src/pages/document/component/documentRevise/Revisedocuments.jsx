import React, { useState, useEffect, useRef } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './newdocument.scss';
import ReviseDetaildocument from './ReviseDetaildocument';
import { Route, Link, Routes, useLocation, useNavigate } from 'react-router-dom';
import FetchApi, { host } from '../../../customhooks/Functionapi';
import { createJournalRevise } from '../../../customhooks/Functiondocument';
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2';
import NavbarUser from '../../../../components/navbar/NavbarUser'
import { objectHearder, ItmeTypeID } from '../newDocument/objectdata/typeobject';
import { AddHeader, AddDetail, AddImages } from '../../../redux/features/document/documentHeaderSlice';
import PopUpshowImages from '../newDocument/popupcomponent/popUpshowImages';
import ImageZoom from "react-image-zooom";
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';


import moment from 'moment/moment.js';
import {
    useParams
} from "react-router-dom";
import { Container } from '@mui/material';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const Revisedocuments = (props) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const FetchApis = new FetchApi()

    const userId = sessionStorage.getItem("userId")
    const documentDetial = useSelector((state) => state.documentHeader.valueDetail);
    const documentImages = useSelector((state) => state.documentHeader.valueImages);

    const d = new Date();
    let convertdate = ""
    let convertmonth = d.getMonth() + 1;

    if (d.getDate() < 10) {
        convertdate = "0" + d.getDate();
    }
    else {
        convertdate = d.getDate();
    }
    if (d.getMonth() + 1 < 10) {
        convertmonth = "0" + convertmonth
    }
    else {
        convertmonth = convertmonth
    }

    var datenow = d.getFullYear() + "-" + convertmonth + "-" + convertdate;
    const [addImages, setAddImages] = useState([]);
    const ref_imagse = useRef(null);
    const [dataHeader, setDataHeader] = useState({ ...objectHearder });
    const [journalImages, setJournalImages] = useState([]);


    const [open, setOpen] = React.useState(false);

    function getdatadetail(data) {
        dispatch(AddDetail(data))
    }

    function getdataImages(data) {
        dispatch(AddImages(data))
    }


    useEffect(() => {

        getJournalById()
    }, [ref_imagse])


    const getJournalById = () => {
        FetchApis.FethcGet(`/document/DocumentById/${id}`).then(res => {
            if (res) {
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
     

        Swal.fire({
            title: "แจ้งเตือน ?",
            text: "คุณแน่ใจที่สร้างเอกสาร ใช่หรือไม่ !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "สร้างเอกสาร",
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                createJournalRevise(dataHeader, documentDetial, documentImages, journalImages).then(res => {
                    if (res) {
                        // console.log(res)
                        setTimeout(() => {
                            Swal.fire({
                                title: "แจ้งเตือน!",
                                text: "คุณได้สร้างเอกสารเรียบร้อยแล้ว!",
                                icon: "success"
                            });

                            window.location.href = `/editdocument/${res.insertId}`
                        }, 800);

                    }
                })
            }
        })


    };



    const ClickTypeItem = (key) => {
        var typeItem = dataHeader.ItemTypeID.find(val => val == key);
        return typeItem;
    }

    const loadfile = (filenames) => {
        window.location.href = `${host}/file/images/files/${filenames}`
    }


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
                                    <div style={{ marginLeft: 20, padding: 10 }}>
                                        {/* <label>{val.SubjectExtend}</label> */}
                                        <label
                                            style={{
                                                display: "block",
                                                whiteSpace: "pre-wrap", // ✅ เคารพการเคาะบรรทัด
                                                border: "1px solid #ccc",
                                                padding: "8px",
                                                minHeight: "auto",
                                                width: "100%",
                                                // background: "#f9f9f9"
                                            }}
                                        >{val.SubjectExtend}</label>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* ส่วนที่2 */}
                        <div style={{ width: '65%', padding: 10 }} className='row-pace-w100-line'>
                            <div style={{
                                width: '100%', height: 310, backgroundColor: "#d6d8d7"
                            }}>
                                <img src={host + `/file/images/files/${val.LocationPic}`} alt="My local" style={{ width: '100%', height: 280 }} />
                                {/* <ImageZoom
                                    src={host + `/file/images/files/${val.LocationPic}`}

                                    width={'auto'}
                                    height={280}
                                    alt="Logo"
                                    zoom="200"
                                /> */}
                                <div >
                                    <label style={{ cursor: 'pointer' }} onClick={() => loadfile(val.LocationPic)} ><DownloadIcon />ชื่อไฟล์ : {val.LocationPic}</label></div>
                            </div>
                            <div>
                                <div>
                                    {/* <SearchIcon style={{ width: 35, height: 35 }} /> */}
                                    <PopUpshowImages nameimage={val.LocationPic} PkDescription={val.SubjectDetails} ItemID={val.ItemID} />
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
                                            <label>Prepared By </label>
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

                                <div ref={props.ref_imagse}>
                                    <div style={{ flexDirection: 'row', justifyContent: 'center', display: 'flex' }}>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                </Box>)}

        </div>)
    }



    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setOpen(false);
        isSaveUpdate()
       
    };

    function PopUpConfirm() {

        return (
            <React.Fragment>
                {/* <Button variant="outlined" onClick={handleClickOpen}>
                    Open dialog
                </Button> */}
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        อธิบายเพิ่มเติม
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <div style={{ width: 450, height: 150 }}>
                            <textarea value={dataHeader.noteRevise} style={{ width: 450, height: 100 }} 
                            onChange={(e) => setDataHeader({ ...dataHeader, noteRevise: e.target.value })} />
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleSave} variant="outlined">
                            บันทึก สร้างเอกสาร
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </React.Fragment>
        );

    }



    return (
        <div>
            <React.Fragment >
                <NavbarUser />
                <Container>
                    <CssBaseline />

                    <div style={{ justifyContent: 'space-between', display: 'flex', marginTop: 10 }}>
                        <div>
                            <label style={{ fontWeight: '800', padding: 3, backgroundColor: '#3f94f5', color: '#ffff' }}>ตัวอย่างเอกสาร ทำการ Revies </label>
                        </div>
                        <div>
                            <button className='customSuccess-button' style={{ marginRight: 10 }} onClick={() => handleClickOpen()}>สร้างเอกสาร </button>
                            <button className='customWarning-button' onClick={() => navigate(-1)}>ยกเลิก</button>
                        </div>
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
                                            <label style={{ width: 200 }}>ประเภทสินค้า</label>
                                        </div>

                                        {ItmeTypeID.map((val, index) => (
                                            <div style={{ padding: 5, marginRight: 5 }}>
                                                {ClickTypeItem(val) == val ?
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

                                    <div style={{ marginTop: 3 }} className='row-pace-w100-line'>
                                        <div style={{ width: 150 }}>
                                            <label style={{ width: 200 }}>ผู้ร้องขอ</label>
                                        </div>
                                        <input type='text' value={dataHeader.UserIDRequest} onChange={(e) => setDataHeader({ ...dataHeader, UserIDRequest: e.target.value })}
                                            placeholder='ชื่อ / สกุล' className='input-box' style={{ width: '100%' }} disabled />

                                    </div>
                                </div>

                                <div style={{ width: '30%' }}>
                                    <div className='row-pace-w100-line'>
                                        <div style={{ width: 150 }}>
                                            <label style={{ fontSize: 12 }}>วันที่สร้างเอกสาร</label>
                                        </div>
                                        <div style={{ width: '100%' }}>
                                            <label>{moment(dataHeader.TransDate).format('DD/MM/yyyy')}</label>
                                        </div>
                                    </div>

                                    <div className='row-pace-w100-line'>
                                        <div style={{ width: 150 }}>
                                            <label style={{ fontSize: 12 }}>วันที่ Approved</label>
                                        </div>
                                        <div style={{ width: '100%' }}>
                                            <label>{moment(dataHeader.LastApprovedDate).format('DD/MM/yyyy')}</label>
                                        </div>
                                    </div>
                                    <div className='row-pace-w100-line'>
                                        <div style={{ width: 150 }}>
                                            <label style={{ fontSize: 12 }}>เอกสารบรรจุ (SSD)</label>
                                        </div>
                                        <div style={{ width: '100%' }}>
                                            <input type='text' disabled style={{ marginTop: 3 }} value={dataHeader.JournalCode}
                                                onChange={(e) => setDataHeader({ ...dataHeader, JournalCode: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ width: '20%' }}>
                                    <div className='row-pace-w100-line'>
                                        <div style={{ width: '80%' }}>
                                            <label style={{ fontSize: 12 }}>เอกสารบรรจุ (SSD) *</label>
                                            <input type='text'
                                                value={dataHeader.JournalGroupID} onChange={(e) => setDataHeader({ ...dataHeader, JournalGroupID: e.target.value })}
                                                className='input-box' style={{ width: '100%' }} disabled />
                                        </div>
                                    </div>

                                    <div style={{ marginTop: 3 }}>

                                    </div>
                                    <div>
                                        <label style={{ fontSize: 11 }}>ชื่อไฟล์ : {dataHeader.PartFileECN}</label>
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
                                <div style={{ width: '100%' }}>

                                    <div className='row-pace-w100-line' style={{ marginTop: 3 }}>
                                        <div style={{ flexDirection: 'row', display: 'flex', width: '60%' }}>
                                            <div style={{ width: 150 }}>
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

                                        <div style={{ flexDirection: 'row', display: 'flex', marginRight: 20 }}>

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
                                                    <label>{moment(dataHeader.stamptimeUpdate).format('DD/MM/yyyy hh:mm:ss')}</label>
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

            </React.Fragment>
            <div>
                {dataHeader.JournalID != "" &&

                    <ReviseDetaildocument
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

            <div>

                 <React.Fragment>
                {/* <Button variant="outlined" onClick={handleClickOpen}>
                    Open dialog
                </Button> */}
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        อธิบายเพิ่มเติม
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <div style={{ width: 450, height: 150 }}>
                            <textarea value={dataHeader.noteRevise} style={{ width: 450, height: 100 }} 
                            onChange={(e) => setDataHeader({ ...dataHeader, noteRevise: e.target.value })} maxLength={500}/>
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleSave} variant="outlined">
                            บันทึก สร้างเอกสาร
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </React.Fragment>

            </div>
        </div>
    )
}

export default Revisedocuments
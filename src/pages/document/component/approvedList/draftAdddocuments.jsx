import React, { useState, useEffect, useRef } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './newdocument.scss';
import DraftAddDetaildocument from './draftAddDetaildocument';
import PopUpEditJournalImages from '../newDocument/popupcomponent/popUpEditJournalImages';
import PopUpshowImages from '../newDocument/popupcomponent/popUpshowImages';
import FetchApi, { host } from '../../../customhooks/Functionapi';
import { useSelector, useDispatch } from 'react-redux'
import { UpdateDetailList } from '../../../customhooks/Functiondocument';
import { UploadFiles } from '../../../customhooks/FuctionUpload';
import Swal from 'sweetalert2';
import NavbarUser from '../../../../components/navbar/NavbarUser'
import { objectHearder, ItmeTypeID } from '../newDocument/objectdata/typeobject';
import { Route, Link, Routes, useLocation, useNavigate } from 'react-router-dom';
import ImageZoom from "react-image-zooom";
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment/moment.js';
import { AddHeader, AddDetail, AddImages } from '../../../redux/features/document/documentHeaderSlice';
import {
    useParams
} from "react-router-dom";
import { Container } from '@mui/material';


const DraftAdddocuments = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const FetchApis = new FetchApi()
    let { id } = useParams();

    const documentDetial = useSelector((state) => state.documentHeader.valueDetail);

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
    const userId = sessionStorage.getItem("userId")
    const [journalImages, setJournalImages] = useState([]);

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
        setDataHeader({ ...dataHeader, ItemTypeID: value })
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

                    setTimeout(() => {

                        // window.location.href = '/approvelist'
                        window.location.reload()
                    }, 1000);
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

                    setTimeout(() => {

                        // window.location.href = '/approvelist'
                        window.location.reload()
                    }, 1000);
                }
            })

        }


    };

    function RevoveImage(id) {
        UpdateDetailList(documentDetial);

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
                        // getjourDetailList();
                        window.location.reload();
                    }
                })

            }
        });

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
                                    <div style={{ marginLeft: 20 }}>
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
                                width: '100%', height: 320, backgroundColor: "#d6d8d7"
                            }}>

                                <div>ภาพประกอบ : {val.PkDescription} {val.ItemID}</div>
                                <img src={host + `/file/images/files/${val.LocationPic}`} alt="My local" style={{ width: '100%', height: 280 }}/>
                                {/* <ImageZoom
                                    src={host + `/file/images/files/${val.LocationPic}`}

                                    width={'auto'}
                                    height={280}
                                    alt="Logo"
                                    zoom="200"
                                /> */}


                            </div>
                            <div>
                                <div>
                                    {/* <SearchIcon style={{ width: 35, height: 35 }} /> */}
                                     <PopUpshowImages nameimage={val.LocationPic} PkDescription={val.SubjectDetails} ItemID={val.ItemID}/>
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
                                            <label>Confirm DateTime</label>
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


    return (
        <div>
            <div>
                <NavbarUser />
                <Container>
                    <CssBaseline />
                    
                    <div style={{ justifyContent: 'flex-end', display: 'flex', marginTop: 10 }}>
                        <button className='customSuccess-button' style={{ marginRight: 10 }} onClick={() => isSaveUpdate()}>บันทึก</button>
                        <button className='customWarning-button' onClick={() => navigate(-1)}>กลับหน้าหลัก</button>
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
                                            {/* <input type='text' value={dataHeader.TransDate} onChange={(e) => setDataHeader({ ...dataHeader, TransDate: e.target.value })}
                                                disabled style={{ marginTop: 3 }} /> */}
                                        </div>
                                    </div>

                                    <div className='row-pace-w100-line'>
                                        <div style={{ width: 200 }}>
                                            <label style={{ fontWeight: '800' }}>วันที่ Approved</label>
                                        </div>
                                        <div style={{ width: '100%' }}>
                                        <label>{moment(dataHeader.LastApprovedDate).format('DD/MM/yyyy')}</label>
                                            {/* <input type='text' disabled style={{ marginTop: 3 }} value={dataHeader.LastApprovedDate}
                                                onChange={(e) => setDataHeader({ ...dataHeader, LastApprovedDate: e.target.value })} /> */}
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
                                                    // onChange={(e) => handleChangeText(e)}
                                                    style={{ width: 300 }} className='input-box'
                                                disabled
                                                />
                                            </div>
                                            {/* <PopUpdetailSpecId inDetailSpec={inDetailSpec} /> */}
                                        </div>
                                    </div>
                                    <div className='row-pace-w100-line' style={{ marginTop: 3 }}>
                                        <div style={{ flexDirection: 'row', display: 'flex', width: '100%' }}>
                                            <div style={{ width: 120 }}>
                                                <label style={{ width: 155, fontWeight: '800' }}>Spec Name</label>
                                            </div>
                                            <input type='text'
                                                value={dataHeader.SpecName}
                                                // onChange={(e) => setDataHeader({ ...dataHeader, Remark: e.target.value })}
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

export default DraftAdddocuments
import React, { useState, useEffect, useRef } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import PopUpViewpfd from './PFD/PopUpViewpfd';
import './viewdocument.scss';
import FetchApi, { host } from '../../../customhooks/Functionapi';
import DownloadIcon from '@mui/icons-material/Download';
import { useSelector, useDispatch } from 'react-redux'
import { objectHearder, ItmeTypeID } from '../newDocument/objectdata/typeobject';
import { AddDetail, AddImages } from '../../../redux/features/document/documentHeaderSlice';
import { Route, Link, Routes, useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ImageZoom from "react-image-zooom";
import SearchIcon from '@mui/icons-material/Search';
import PopUphistoryNotes from './viewpopUp/PopUphistoryNotes';
import PopUpReviseByid from './viewpopUp/popUpReviseByid';
import moment from 'moment/moment.js';
import PopUprevision from './viewpopUp/popUprevision';
import { Container } from '@mui/material';
import ViewDocumentdetail from './viewDocumentdetail';
import PopUpshowImages from '../newDocument/popupcomponent/popUpshowImages';
import StepViewProcess from './stepViewProcess';

const ViewDocuments = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const FetchApis = new FetchApi()


    const ref_imagse = useRef(null);
    const [dataHeader, setDataHeader] = useState({ ...objectHearder });
    const userId = sessionStorage.getItem("userId");
    const [IsJoarnalID, setIsJoarnalID] = useState(props.jourID);
    const [journalImages, setJournalImages] = useState([]);
    const [jouranlRevise, setJournalRevise] = useState([])

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
        FetchApis.FethcGet(`/document/DocumentById/${IsJoarnalID}`).then(res => {
            if (res) {
                getjournalImagseList(res.data[0].JournalCode);
                RevisionListBycode(res.data[0].StandardCode, res.data[0].Revise)

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


    const RevisionListBycode = (code, version) => {
      
        let dataobject = {
            code: code,
            version: version
        }

        FetchApis.FethcPost(`/document/ReviseJournallist`, dataobject).then(res => {
            if (res) {
                setJournalRevise(res.data)
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

    const ClickTypeItem = (key) => {
        var typeItem = dataHeader.ItemTypeID.find(val => val == key);
        return typeItem;
    }
    const loadfile = (filenames) => {
        window.location.href = `${host}/file/images/files/${filenames}`
    }


    // show data images list from 
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
                                width: '100%', height: 310, backgroundColor: "#d6d8d7",
                            }}>
                                
                                <ImageZoom
                                    src={host + `/file/images/files/${val.LocationPic}`}
                                    width={'100%'}
                                    height={280}
                                    alt="Logo"
                                    zoom="200"
                                />
                                <div ><label style={{ cursor: 'pointer' }} onClick={() => loadfile(val.LocationPic)} ><DownloadIcon />ชื่อไฟล์ : {val.LocationPic}</label></div>
                               
                            </div>
                            <div>
                                <div>
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
                                            <label>create datetime</label>
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 12 }}>{moment(val.ConfirmDateTime).format('DD/MM/yyy')}</label>
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

    return (
        <div>
            <React.Fragment >
                <Container>
                    <div>
                        <Button onClick={() => navigate(-1)}
                            startIcon={<ArrowBackIosNewIcon />}
                            variant="outlined">กลับ</Button>
                    </div>
                    <div style={{ marginTop: 10, flexDirection: 'row', width: '100%', display: 'flex' }}>
                        <StepViewProcess jourID={props.jourID} />
                    </div>
                    <CssBaseline />
                    <Box sx={{ height: 'auto', marginTop: '10px', fontSize: 14 }} >
                        <Card sx={{ minWidth: 275 }}>
                            <div style={{ padding: 10, fontSize: 18, fontWeight: 'bold', flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>
                                <div>
                                    <label style={{ padding: 5, backgroundColor: '#f5dc9f', borderRadius: 3, color: '#68684', marginRight: 10 }}>ส่วนของคำร้องขอ</label>
                                    {dataHeader.noteRevise!=""&&<PopUpReviseByid Id={props.jourID}/>}
                                    <PopUphistoryNotes jourID={props.jourID} />
                                    <div style={{fontSize:12,padding:5,flexDirection:'row',display:'flex',alignContent:'center'}}>
                                        <label style={{marginRight:10}}>Revision ล่าสุด </label>
                                        {jouranlRevise.map((item, index) => (<div style={{fontSize:12,padding:5,flexDirection:'row',display:'flex'}}>  
                                            <PopUprevision  revision={item.Revise} Id={item.JournalID}/>
                                        </div>))}
                                    </div>
                                </div>

                                <div style={{ backgroundColor: '#ebedef', padding: 5 }}>

                                    {dataHeader.statusflow != '105' ?<div> <label style={{
                                        color: '#e74c3c',
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        justifyContent: 'center', display: 'flex'
                                    }}>Preview</label> 
                                    <PopUpViewpfd jourID={dataHeader.JournalID} />
                                    </div>:
                                        <div style={{ justifyContent: 'center', display: 'flex' }}>
                                            <label style={{
                                                color: '#1e8449',
                                                alignItems: 'center',
                                                alignContent: 'center',
                                                justifyContent: 'center', display: 'flex'
                                            }}>Approved<BookmarkAddedIcon /></label>
                                            <PopUpViewpfd jourID={dataHeader.JournalID} />
                                        </div>
                                    }
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 10, width: '100%' }}>
                                <div style={{ width: '70%' }}>
                                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                                        <div style={{ width: 150 }}>
                                            <label style={{ width: 200, fontWeight: '800' }}>ประเภทสินค้า</label>
                                        </div>
                                        {ItmeTypeID.map((val, index) => (
                                            <div style={{ padding: 5, marginRight: 5 }}>
                                                {ClickTypeItem(val) == val ?
                                                    <div> <input type='checkbox' name='1' value={val} onClick={(e) => onCheckType(e)} defaultChecked={true} disabled /><label > {val}</label></div> :
                                                    <div><input type='checkbox' name='1' value={val} onClick={(e) => onCheckType(e)} defaultChecked={false} disabled /><label > {val}</label></div>
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
                                            <label style={{ width: 200, fontWeight: '800' }}>ผู้ร้องขอ</label>
                                        </div>
                                        <div style={{ width: '100%', backgroundColor: '#f8f9f9' }}>
                                            <label>{dataHeader.UserIDRequest}</label>
                                        </div>

                                    </div>
                                </div>
                                <div style={{ width: '30%' }}>
                                    <div >
                                        <div className='row-pace-w100-line'>
                                            <label style={{ width: 200, fontWeight: '800' }}>วันที่สร้างเอกสาร</label>
                                            <div style={{ width: '100%', backgroundColor: '#f8f9f9' }}>
                                                <label>{moment(dataHeader.TransDate).format('DD/MM/yyyy')}</label>
                                            </div>
                                        </div>

                                        <div className='row-pace-w100-line'>
                                            <label style={{ width: 200, fontWeight: '800' }}>วันที่ Approved</label>
                                            <div style={{ width: '100%', backgroundColor: '#f8f9f9', marginTop: 1 }}>
                                                <label>{moment(dataHeader.LastApprovedDate).format('DD/MM/yyyy')}</label>
                                            </div>

                                        </div>
                                        <div className='row-pace-w100-line'>
                                            <label style={{ width: 200, fontWeight: '800' }}>เลขที่เอกสาร (SSD)</label>
                                            <div style={{ width: '100%', backgroundColor: '#f8f9f9', marginTop: 1 }}>
                                                <label>{dataHeader.JournalCode}</label>
                                            </div>
                                        </div>
                                            {dataHeader.JournalGroupID!=""&&
                                         <div className='row-pace-w100-line'>
                                            <label style={{ width: 200, fontWeight: '800' }}>กลุ่มเอกสาร Revise</label>
                                            <div style={{ width: '100%', backgroundColor: '#f8f9f9', marginTop: 1 }}>
                                                <label>{dataHeader.JournalGroupID}</label>
                                            </div>
                                        </div>}

                                        <div className='row-pace-w100-line'>
                                            <label style={{ width: 200, fontWeight: '800' }}>เลขที่เอกสาร (ECN) </label>
                                            <div style={{ width: '100%', backgroundColor: '#f8f9f9' }}>
                                                <label>{dataHeader.RefECN}</label>
                                            </div>
                                        </div>
                                        {dataHeader.PartFileECN != "" && <label style={{ fontSize: 11, cursor: 'pointer' }} onClick={() => loadfile(dataHeader.PartFileECN)}><DownloadIcon />  ชื่อไฟล์ : {dataHeader.PartFileECN}</label>}
                                    </div>
                                    <div style={{ marginTop: 3 }}>
                                    </div>
                                </div>
                            </div>

                            {/* ส่วนข้อมูลลูกค้า1 */}
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 10, width: '100%' }}>
                                <div style={{ width: '30%' }}>
                                    <div className='row-pace-w100-line' style={{ width: '100%' }}>
                                        <div style={{ width: 150 }}>
                                            <label style={{ width: 150, fontWeight: '800' }}>รหัสลูกค้า</label>
                                        </div>
                                        <div style={{ width: '100%', backgroundColor: '#f8f9f9' }}>
                                            <label style={{ width: 200 }}>{dataHeader.CustID}</label>
                                        </div>
                                    </div>
                                    <div className='row-pace-w100-line' style={{ marginTop: 3 }}>
                                        <div style={{ width: 150 }}>
                                            <label style={{ width: 150, fontWeight: '800' }}>รหัสสินค้า</label>
                                        </div>
                                        <div style={{ width: '100%', backgroundColor: '#f8f9f9' }}>
                                            <label style={{ width: 200 }}>{dataHeader.ItemID}</label>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ width: '70%' }}>
                                    <div className='row-pace-w100-line' >
                                        <div style={{ flexDirection: 'row', display: 'flex', width: '50%' }}>
                                            <label style={{ fontSize: 14, width: 100, fontWeight: '800' }}>ชื่อลูกค้า</label>
                                            <div style={{ backgroundColor: '#f8f9f9', width: '100%' }}>
                                                <label >{dataHeader.CustName}</label>
                                            </div>
                                        </div>
                                        <div className='row-pace-w100-line' style={{ marginTop: 3, width: '50%' }}>
                                            <label style={{ width: 150, fontWeight: '800' }}>ตราสินค้า</label>
                                            <div style={{ width: '100%', backgroundColor: '#f8f9f9' }}>
                                                <label>{dataHeader.BrandID}</label>
                                            </div>
                                        </div>

                                    </div>
                                    <div style={{ flexDirection: 'row', display: 'flex', marginTop: 3 }}>
                                        <div style={{ width: 90 }}>
                                            <label style={{ fontWeight: '800' }}>ชื่อสินค้า</label>
                                        </div>
                                        <div style={{ width: '100%', backgroundColor: '#f8f9f9' }}>
                                            <label>{dataHeader.ItemName}</label>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* ส่วนข้อมูลลูกค้า2 */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginBottom: 10,
                                width: '100%',
                                margin: 10
                            }}>
                                <div style={{ width: '60%' }}>
                                    <div className='row-pace-w100-line' style={{ marginTop: 3 }}>
                                        <div style={{ flexDirection: 'row', display: 'flex', width: '100%' }}>
                                            <div style={{ width: 150 }}>
                                                <label style={{ width: 170, fontWeight: '800' }}>การบรรจุงาน</label>
                                            </div>
                                            <div style={{ width: '100%', backgroundColor: '#f8f9f9', padding: 2 }}>
                                                <label>{dataHeader.PackagingDetails}</label>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='row-pace-w100-line' style={{ marginTop: 3 }}>
                                        <div style={{ flexDirection: 'row', display: 'flex', width: '100%' }}>
                                            <div style={{ width: 150 }}>
                                                <label style={{ width: 150, fontWeight: '800' }}>อธิบายเพิ่มเติม 1 </label>
                                            </div>
                                            <div style={{ width: '100%', backgroundColor: '#f8f9f9', padding: 2 }}>
                                                <label>{dataHeader.Remark}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ flexDirection: 'column', display: 'flex', width: '40%' }}>
                                    <div style={{ flexDirection: 'row', display: 'flex', marginTop: 3 }}>
                                        <div style={{ width: 100 }}>
                                            <label style={{ fontWeight: '800' }}>Spec Id</label>
                                        </div>
                                        <div style={{ width: '100%', backgroundColor: '#f8f9f9', padding: 2 }}>
                                            <label>{dataHeader.SpecId}</label>
                                        </div>
                                    </div>

                                    <div style={{ flexDirection: 'row', display: 'flex', marginTop: 3 }}>
                                        <div style={{ width: 100 }}>
                                            <label style={{ fontWeight: '800' }}>Spec Name</label>
                                        </div>
                                        <div style={{ width: '100%', backgroundColor: '#f8f9f9', padding: 2 }}>
                                            <label>{dataHeader.SpecName}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'flex-end' }}>
                                <div style={{ flexDirection: 'row', display: 'flex' }}>
                                    <div style={{ width: 100 }}>
                                        <label style={{ fontWeight: '800' }}>Approve by : </label>
                                    </div>
                                    <div>
                                        <label>{dataHeader.nameConfirme} {dataHeader.lastname}</label>
                                    </div>
                                </div>
                                <div style={{ flexDirection: 'row', display: 'flex' }}>
                                    <div style={{ width: 100 }}>
                                        <label style={{ fontWeight: '800' }}>วันที่ / เวลา : </label>
                                    </div>
                                    <div>
                                        <label>{moment(dataHeader.TransDate).format('DD/MM/yyyy')}</label>
                                    </div>
                                </div>
                            </div>

                        </Card>
                    </Box>
                </Container>
            </React.Fragment>
            <div>
                {dataHeader.JournalID != "" &&
                    <ViewDocumentdetail
                        getdatadetail={getdatadetail}
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

export default ViewDocuments
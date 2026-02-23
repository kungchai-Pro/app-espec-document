import React, { useState, useEffect, useRef } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import Card from '@mui/material/Card';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PupUPbomList from './../popupbom/PupUPbomList';
import { styled } from '@mui/material/styles';
import './newdocument.scss';
import EditDetaildocument from './Editcomponent/EditDetaildocument';
import { Route, Link, Routes, useLocation, useNavigate } from 'react-router-dom';
import PopUpcustomers from './popupcomponent/popUpcustomers';
import PopUpItemdetail from './popupcomponent/popUpItemdetail';
import PopUpdetailSpecId from './popupcomponent/popUpdetailSpecId';
// import PopUpItemBrandcode from './popupcomponent/popUpItemBrandcode';
import FetchApi, { host } from '../../../customhooks/Functionapi';
import { useSelector, useDispatch } from 'react-redux'
import { UpdateDetailList } from '../../../customhooks/Functiondocument';
import { UploadFiles } from '../../../customhooks/FuctionUpload';
import Swal from 'sweetalert2';
import NavbarUser from '../../../../components/navbar/NavbarUser'
import { objectHearder, ItmeTypeID } from './objectdata/typeobject';
import ImageZoom from "react-image-zooom";
import SearchIcon from '@mui/icons-material/Search';
import PopUpEditJournalImages from './popupcomponent/popUpEditJournalImages';
import PopUpChangeFlow from './popupcomponent/popUpChangeFlow';
import PopUpPackagingDetail from './popupcomponent/popUpPackagingDetail';
import PopUpshowImages from './popupcomponent/popUpshowImages';
import moment from 'moment/moment.js';

// import moment from 'moment';

import { AddHeader, AddDetail, AddImages } from '../../../redux/features/document/documentHeaderSlice';
import {
    useParams
} from "react-router-dom";
import { Container } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const Editdocuments = (props) => {
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

    var datenow = d.getFullYear() + "-" + convertmonth + "-" + convertdate
    var datenowtime = d.getFullYear() + "-" + convertmonth + "-" + convertdate + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()

    const [addImages, setAddImages] = useState([]);
    const ref_imagse = useRef(null);
    const [dataHeader, setDataHeader] = useState({ ...objectHearder });
    const [HeaderTypeproduct, setHeaderTypeproduct] = useState([]);

    const [datatypeproduct, setDataTypeproduct] = useState([]);
    const [typeproductdetail, setTypeproductdetial] = useState([]);
    const [ischeck, setIscheck] = useState(false);
    // const [isload, setIsload] = useState(true);
    const [saleapproved, setSaleapproved] = useState([]);
    const [flowrunList, setFlowrunList] = useState([]);
    const [journalImages, setJournalImages] = useState([]);
    const [PurposeDetailList, setPurposeDetailList] = useState([]);



    const userId = sessionStorage.getItem("userId")

    function getdatadetail(data) {
        dispatch(AddDetail(data))
    }

    function getdataImages(data) {
        dispatch(AddImages(data))
    }


    useEffect(() => {

        getJournalById(id)
        gettypePorduct();
        getsaleapproved();


    }, [ref_imagse])

    //แสดงรูปที่ทำการบันทึก 
    const getjournalImagseList = (code) => {

        FetchApis.FethcGet(`/journalImages/JouranlImagesByCode/${code}`).then(res => {
            if (res) {
                setJournalImages(res.data);
            }
        })
    }

    // เรียก ประเภท  new  and revise
    const gettypePorduct = () => {

        FetchApis.FethcGet(`/typeproduct/typeProductgroup`).then(res => {
            if (res) {
                setDataTypeproduct(res.data)

            }
        })

    }

    function findTypeProduct(key) {
        var typeproductlist = HeaderTypeproduct.filter(val => val === key);
        return typeproductlist;
    }

    // กรณีกดแล้วให้แสดงหัวข้อมูล วัติถุประสงค์ตามกลุ่ม
    const gettypedetailproduct = (code) => {

        setIscheck(false)

        setTimeout(() => {
            setIscheck(true)
        }, 500);

        FetchApis.FethcGet(`/typeproduct/typeProductByCode/${code}`).then(res => {

            if (res) {
                setTypeproductdetial(res.data);
                dataHeader.Typeproduct = code;
              
            }
        })
    }

    // การเลือกหัวข้อมูล วัติถุประสงค์
    const handleChange = (e) => {

        const ischecked = e.target.checked;
        const istext = e.target.value;

        if (ischecked == true) {
            if (PurposeDetailList == "") {
                setPurposeDetailList([istext])
            }
            else {
                setPurposeDetailList([...PurposeDetailList, istext])
            }



        }
        else if (ischecked == false) {

            const index = PurposeDetailList.indexOf(e.target.value);
            PurposeDetailList.splice(index, 1);
            setPurposeDetailList(PurposeDetailList);

        }
    }


    //แสดงชื่อ flow หรือ ชื่อ sale
    const getsaleapproved = () => {

        FetchApis.FethcGet(`/flowsystem/flowgroupbyName`).then(res => {
            if (res) {
                setSaleapproved(res.data);
            }
        })
    }


    //  ส่วนกรเลือก sale เพิ่มแสดง flow running
    const isChangflow = (val) => {

        setDataHeader({ ...dataHeader, FlowrunId: val });

    }

    const handleChangeSale = (e) => {
        var val = e.target.value;
        setDataHeader({
            ...dataHeader, SaleAckUserID: val
        })

        FetchApis.FethcGet(`/flowsystem/flowbyNamelist/${val}`).then(res => {
            if (res) {
                if (res) {
                    setFlowrunList(res.data);
                }

            }
        })

    };


    const getJournalById = (jourId) => {

        FetchApis.FethcGet(`/document/DocumentById/${jourId}`).then(res => {
            if (res) {
                var dataItemTypeID = res.data[0]
                getjournalImagseList(res.data[0].JournalCode);
                gettypedetailproduct(res.data[0].Typeproduct);
                var datatypeproduct = res.data[0].Typeproduct.split(",");
                setHeaderTypeproduct(datatypeproduct);

                if (dataItemTypeID.ItemTypeID == "") {

                    setDataHeader({
                        ...res.data[0],
                        ItemTypeID: [],
                        PurposeDetail: [res.data[0].PurposeDetail]
                    })
                    var datapurpose = res.data[0].PurposeDetail.split(",");
                    var datatypeproduct = res.data[0].Typeproduct.split(",");
                    setPurposeDetailList(datapurpose);
                    setHeaderTypeproduct(datatypeproduct);

                    // get defulf tupeproduct detail list


                } else {
                    var itemtypeId = dataItemTypeID.ItemTypeID.split(',')
                    setDataHeader({
                        ...res.data[0],
                        ItemTypeID: itemtypeId,
                        PurposeDetail: [res.data[0].PurposeDetail]
                    })
                    var datapurpose = res.data[0].PurposeDetail.split(",");
                    var datatypeproduct = res.data[0].Typeproduct.split(",");

                    setPurposeDetailList(datapurpose);
                    setHeaderTypeproduct(datatypeproduct);
                }
            }

        })
    }

    const handleFile = event => {
        var input = document.getElementById('loadfile');

        if (input.files[0]) {
            const file = input.files[0]
            const size = file.size // it's in bytes
            const ext = file.name.split(".").pop();

            const newName = `${Date.now()}.` + ext;
            const renamedFile = new File([file], newName, {
                type: file.type,
            });

            if (size <= 5000000) {
                UploadFiles(renamedFile).then(res => { //upload file ก่อน ค่อย insert 
                    if (res) {
                        setDataHeader({ ...dataHeader, PartFileECN: newName })
                    }
                })
            } else {
                // alert('ขนาดใหญ่เกินไปครับกรุณาอยากเกิน 5M')
                Swal.fire({
                    title: "แจ้งเตือน",
                    text: "ขนาดไฟล์เกินกำหนด 5M ",
                    icon: "warning"
                });

            }

        }

    };

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

    function inDataCustomer(customerName, codecustomer) {
        setDataHeader({ ...dataHeader, CustID: codecustomer, CustName: customerName })
    }


     function inDataCustomerDetail(BRANDCODE, ITEMID, ITEMNAME,SPECID,SPECNAME) {
        var databranid = BRANDCODE.replace("'", " ")

        setDataHeader({
            ...dataHeader,
            ItemID: ITEMID,
            BrandID: databranid,
            ItemName: ITEMNAME,
            SpecId:SPECID,
            SpecName:SPECNAME
        })
    }

    // ข้อมูลก่อน save
    const isSaveUpdate = () => {

        dataHeader.PurposeDetail = PurposeDetailList;
        dataHeader.stamptimeUpdate = datenowtime;
        dataHeader.ConfirmDateTime = datenow;

        if (dataHeader.FlowrunId != "") {

            isUpdateJournal(dataHeader)
            UpdateDetailList(documentDetial)
            setTimeout(() => {

                window.location.href = '/documents'

            }, 700);
        } else {
            Swal.fire({
                title: "แจ้งเตือน",
                text: "คุณยังไม่ได้เลือกเป็น flow อนุมัติ",
                icon: "warning"
            });

        }


    };
    // update 
    const isUpdateJournal = (datainsert) => {

        FetchApis.FethcUpdate(`/document/updateDocument/${datainsert.JournalID}`, datainsert).then(res => {
            if (res.status == 200) {

                Swal.fire({
                    title: "แจ้งการบันทึก",
                    text: "คุณสร้างเอกสารเรียบร้อยแล้ว",
                    icon: "success"
                });

                setTimeout(() => {
                    window.location.href = '/documents'
                }, 1000);



            } else {
                console.log(res)
            }

        })
    }

    function findArrayElementByTitle(key) {

        var typeItem = PurposeDetailList.filter(val => val === key);

        return typeItem;
    }


    const handleChangeText = e => {
        // var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
        // Allow only letters, numbers, and spaces
        // var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        // var dataclecking=format.test(e.target.value);
        var input = e.target.value;
        const cleanInput = input.replace(/[^a-zA-Z0-9ก-๙\s()#/.%:";,=\-&@$<>+*/?!]/g, "");
        setDataHeader({ ...dataHeader, [e.target.name]: cleanInput });
    };

    const inDetailSpec = (SPECID, SPECNAME) => {
        setDataHeader({
            ...dataHeader,
            SpecId: SPECID,
            SpecName: SPECNAME
        })
    }


    function RevoveImage(id) {
        UpdateDetailList(documentDetial)
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

    const isGetPacklist = (datalist) => {
        setDataHeader({ ...dataHeader, PackagingDetails: datalist })
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
                                    <div style={{ marginLeft: 20, backgroundColor: '#E6EBEA' }}>
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
                                            <label style={{ fontSize: 12 }}>{moment(val.ConfirmDateTime).format('DD/MM/yyyy hh:mm:ss')}</label>
                                        </div>
                                    </center>
                                </div>

                                <div ref={props.ref_imagse}>
                                    <div style={{ flexDirection: 'row', justifyContent: 'center', display: 'flex' }}>

                                        <div style={{ marginTop: 5, marginRight: 30, flexDirection: 'row', justifyContent: 'flex-end', display: 'flex' }}>
                                            <Button variant="outlined" size="small" color='error' onClick={() => RevoveImage(val.JournalID)}>Remove</Button>
                                        </div>
                                        <PopUpEditJournalImages
                                            getdataImages={props.getdataImages}
                                            documentDetial={documentDetial}
                                            valDateail={""}
                                            SlotNo={""}
                                            ItemName={""}
                                            ItemID={""}
                                            JourId={val.JourId}
                                            getjourDetailList={""}
                                            JournalID={val.JournalID}

                                        />
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
                <NavbarUser />
                <Container>
                    <CssBaseline />
                    <div style={{ justifyContent: 'flex-end', display: 'flex', marginTop: 10 }}>
                        <button className='customSuccess-button' style={{ marginRight: 10 }} onClick={() => isSaveUpdate()}>บันทึก</button>
                        <button className='customWarning-button' onClick={() => navigate(-1)}>ยกเลิก</button>
                    </div>
                    {HeaderTypeproduct.length > 0 &&
                        <Box sx={{ height: 'auto', marginTop: '10px', fontSize: 14 }} >
                            <Card sx={{ minWidth: 275 }}>
                                <div style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>
                                    <label style={{ padding: 5, backgroundColor: '#f5dc9f', borderRadius: 5, color: '#68684' }}>ส่วนของคำร้องขอ</label>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                    <div style={{ width: '45%' }}>
                                        <div className='row-pace-w100-line'>
                                            <div style={{ width: 150 }}>
                                                <label style={{ width: 150, fontWeight: '800' }}>ประเภทสินค้า</label>
                                            </div>

                                            {ItmeTypeID.map((val, index) => (
                                                <div style={{ padding: 5, marginRight: 5 }}>
                                                    {dataHeader.ItemTypeID == val ?
                                                        <div> <input type='radio' name='1' value={val} onClick={(e) => onCheckType(e)} defaultChecked={true} /><label> {val}</label></div> :
                                                        <div><input type='radio' name='1' value={val} onClick={(e) => onCheckType(e)} defaultChecked={false} /><label> {val}</label></div>
                                                    }

                                                </div>
                                            ))}
                                        </div>

                                        <div style={{ flexDirection: 'row', display: 'flex', marginBottom: 3 }}>
                                            <div style={{ width: 150, fontWeight: '800' }}>ประเภทงาน</div>
                                            <div style={{ flexDirection: 'column', display: 'flex', marginRight: 100 }}>

                                                {datatypeproduct.map((item, index) => <div>
                                                    {findTypeProduct(item.typecode) == item.typecode ? <div>
                                                        <input type='radio' name='typeproduct' value={item.typecode}
                                                            onClick={(e) => gettypedetailproduct(e.target.value)} defaultChecked={true}
                                                        /><label style={{ marginLeft: 5 }}>{item.typeproduct}</label>
                                                    </div>
                                                        : <div>
                                                            <input type='radio' name='typeproduct' value={item.typecode}
                                                                onClick={(e) => gettypedetailproduct(e.target.value)} defaultChecked={false}
                                                            /><label style={{ marginLeft: 5 }}>{item.typeproduct}</label>
                                                        </div>
                                                    }
                                                </div>)}
                                            </div>
                                            <div>
                                                {typeproductdetail.map((item, index) => (<div style={{ flexDirection: 'row', display: 'flex' }}>
                                                    {ischeck != false && <div>
                                                        {findArrayElementByTitle(item.detailproduct) == item.detailproduct ? <div>

                                                            <input type='checkbox' value={item.detailproduct} name={'typeDetail'}
                                                                id="typeDetail"
                                                                onChange={(e) => handleChange(e)}
                                                                defaultChecked={true}
                                                            />
                                                        </div> : <div>
                                                            <input type='checkbox' value={item.detailproduct} name={'typeDetail'}
                                                                id="typeDetail"
                                                                onChange={(e) => handleChange(e)}
                                                                defaultChecked={false}
                                                            />
                                                        </div>}

                                                    </div>
                                                    }

                                                    <label style={{ marginLeft: 5 }}>{item.detailproduct}</label>
                                                </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div style={{ flexDirection: 'row', display: 'flex', marginTop: 10, width: '100%' }} >
                                            <div style={{ width: 150 }}>
                                                <label style={{ width: 150, fontWeight: '800' }}>วัตถุประสงค์ </label>
                                            </div>
                                            <textarea className='textarea-box' value={dataHeader.Purpose}
                                                name='Purpose'
                                                onChange={(e) => handleChangeText(e)}
                                                placeholder='อธิบายคำร้อง (500 Digit)'
                                                style={{ width: '100%' }} maxLength={500} />

                                        </div>
                                        <div style={{ marginTop: 3 }} className='layout-flex-line'>
                                            <div style={{ width: 150 }}>
                                                <label style={{ width: 150, fontWeight: '800' }}>ผู้ร้องขอ</label>
                                            </div>
                                            <input type='text'
                                                name='UserIDRequest'
                                                value={dataHeader.UserIDRequest}
                                                onChange={(e) => handleChangeText(e)}
                                                placeholder='ชื่อ / สกุล' className='input-box' style={{ width: '100%' }} />
                                        </div>
                                    </div>

                                    <div style={{ width: '30%' }}>
                                        <div className='row-pace-w100-line'>
                                            <div style={{ width: 200 }}>
                                                <label style={{ fontWeight: '800' }}>วันที่สร้างเอกสาร</label>
                                            </div>
                                            <div style={{ width: '100%' }}>
                                                <label>{moment(dataHeader.TransDate).format('DD/MM/yyyy')}</label>
                                                {/* <input type='text'
                                                    name='TransDate'
                                                    value={dataHeader.TransDate}
                                                    onChange={(e) => handleChangeText(e)}
                                                    disabled style={{ marginTop: 3 }} /> */}
                                            </div>
                                        </div>

                                        <div className='row-pace-w100-line'>
                                            <div style={{ width: 200 }}>
                                                <label style={{ fontWeight: '800' }}>วันที่ Approved</label>
                                            </div>
                                            <div style={{ width: '100%' }}>
                                                <label>{moment(dataHeader.LastApprovedDate).format('DD/MM/yyyy')}</label>
                                                {/* <input type='text'
                                                    disabled style={{ marginTop: 3 }} value={dataHeader.LastApprovedDate}
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
                                        <div className='row-pace-w100-line' style={{ marginTop: 10 }}>
                                            <div style={{ width: 200, fontWeight: '800' }}>
                                                <label >ลำดับอนุมัติ</label>
                                            </div>
                                            <div style={{ width: '100%' }}>
                                                <select name="saleapproved" id="saleapproved" disabled
                                                    onChange={(e) => isChangflow(e.target.value)}
                                                    style={{ width: 150 }} >
                                                    <option value={dataHeader.FlowrunId}>{dataHeader.flowDetail}</option>
                                                    {flowrunList.map((item, index) => (
                                                        <option value={item.flowId}>{item.detail}</option>
                                                    ))}
                                                </select>
                                            </div>

                                        </div>
                                        <div className='row-pace-w100-line' style={{ marginTop: 10 }}>
                                            <div style={{ width: 200, fontWeight: '800' }}>
                                                <label >เปลี่ยน flow</label>
                                            </div>
                                            <div style={{ width: '100%' }}>
                                                <PopUpChangeFlow jourId={dataHeader.JournalID} />
                                            </div>
                                        </div>

                                    </div>
                                    <div style={{ width: '15%' }}>
                                        <div className='row-pace-w100-line'>
                                            <div style={{ width: '80%' }}>
                                                <label style={{ fontWeight: '800' }}>เลขที่เอกสาร (ECN) *</label>
                                                <input type='text'
                                                    value={dataHeader.RefECN}
                                                    onChange={(e) => setDataHeader({ ...dataHeader, RefECN: e.target.value })}
                                                    className='input-box' style={{ width: '100%' }} />
                                            </div>
                                        </div>

                                        <div style={{ marginTop: 3 }}>
                                            <Button variant="outlined"
                                                sx={{ height: 30 }}
                                                component="label"
                                                role={undefined}

                                                tabIndex={-1}
                                                startIcon={<CreateNewFolderIcon />}>
                                                Upload files
                                                <VisuallyHiddenInput
                                                    type="file" accept="image/*,.pdf" onChange={handleFile} id='loadfile'
                                                    multiple
                                                />
                                            </Button>
                                        </div>
                                        <div>
                                            <label style={{ fontWeight: '800' }}>ชื่อไฟล์ : {dataHeader.PartFileECN}</label>
                                        </div>
                                    </div>
                                </div>

                                {/* ส่วนข้อมูลลูกค้า1 */}
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                    <div style={{ width: '40%' }}>
                                        <div className='row-pace-w100-line' style={{ width: '100%' }}>
                                            <label style={{ width: 200, fontWeight: '800' }}>รหัสลูกค้า</label>
                                            <input type='text' className='input-box' style={{ width: '100%' }} value={dataHeader.CustID}
                                                onChange={(e) => setDataHeader({ ...dataHeader, CustID: e.target.value })} />

                                            <PopUpcustomers inDataCustomer={inDataCustomer} />
                                        </div>
                                        <div className='row-pace-w100-line' style={{ marginTop: 3 }}>
                                            <label style={{ width: 200, fontWeight: '800' }}>รหัสสินค้า</label>
                                            <input type='text' className='input-box'
                                                style={{ width: '100%' }}
                                                value={dataHeader.ItemID}
                                                name='ItemID'
                                                onChange={(e) => handleChangeText(e)}
                                            />

                                            <PopUpItemdetail inDataCustomerDetail={inDataCustomerDetail} />
                                        </div>
                                    </div>
                                    <div style={{ width: '100%', marginLeft: 10 }}>

                                        <div style={{flexDirection: 'row', display: 'flex', width: '100%', marginTop: 3 }}>
                                            <div style={{flexDirection: 'row', display: 'flex', width: '93%'}}>
                                                <div style={{ width: 100 }}>
                                                    <label style={{ fontWeight: '800' }} >ชื่อลูกค้า</label>
                                                </div>
                                                <input type='text'
                                                    name='CustName'
                                                    value={dataHeader.CustName}
                                                    onChange={(e) => handleChangeText(e)}
                                                    className='input-box'
                                                    style={{ width: '100%' }} />
                                            </div>
                                        </div>
                                        
                                        <div className='row-pace-w100-line-start'>
                                            <div style={{ flexDirection: 'row', display: 'flex', width: '100%', marginTop: 3 }}>
                                                <div style={{ width: 100 }}>
                                                    <label style={{ width: 100, fontWeight: '800' }}>ชื่อสินค้า</label>
                                                </div>
                                                <div style={{ width: '100%' }}>
                                                    <input type='text'
                                                        name='ItemName'
                                                        value={dataHeader.ItemName}
                                                        onChange={(e) => handleChangeText(e)}
                                                        className='input-box' style={{ width: 400 }} />
                                                </div>
                                            </div>

                                            <div className='row-pace-w100-line-start' style={{ marginTop: 3, marginLeft: 10 }}>
                                                <div style={{ width: 80 }}>
                                                    <label style={{ fontWeight: '800' }}>ตราสินค้า</label>
                                                </div>
                                                <div style={{ width: '80%', flexDirection: 'row', display: 'flex' }}>
                                                    <input type='text'
                                                        name='BrandID'
                                                        value={dataHeader.BrandID}
                                                        onChange={(e) => handleChangeText(e)}
                                                        className='input-box'
                                                        style={{ width: '75%' }}
                                                    />
                                                </div>

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
                                        <div style={{ flexDirection: 'row', display: 'flex', width: '100%' }}>
                                            <div style={{ flexDirection: 'row', display: 'flex', width: '100%' }}>
                                                <div style={{ width: 110 }}>
                                                    <label style={{ width: 110, fontWeight: '800' }}>การบรรจุงาน</label>
                                                </div>
                                                <input type='text'
                                                    name='PackagingDetails'
                                                    value={dataHeader.PackagingDetails}
                                                    onChange={(e) => handleChangeText(e)}
                                                    className='input-box' style={{ width: '50%' }} />

                                                <PopUpPackagingDetail isGetPacklist={isGetPacklist} />
                                                <div style={{ flexDirection: 'row', display: 'flex', width: '40%' }}>
                                                    <div style={{ width: 70, marginLeft: 10 }}>
                                                        <label style={{ fontWeight: '800' }}>Spec ID</label>
                                                    </div>
                                                    <div>
                                                        <input type='text'
                                                            name='SpecId'
                                                            value={dataHeader.SpecId}
                                                            onChange={(e) => handleChangeText(e)}
                                                            style={{ width: 300 }} className='input-box'
                                                        />
                                                    </div>
                                                    <PopUpdetailSpecId inDetailSpec={inDetailSpec} />
                                                </div>
                                            </div>
                                        </div>
                                          <div className='row-pace-w100-line' style={{ marginTop: 3 }}>
                                        <div style={{ flexDirection: 'row', display: 'flex', width: '100%' }}>
                                            <div style={{ width: 110 }}>
                                                <label style={{ width: 110, fontWeight: '800' }}>Spec Detail</label>
                                            </div>
                                            <input type='text'
                                                name='SpecName'
                                                value={dataHeader.SpecName}
                                                onChange={(e) => handleChangeText(e)}

                                                className='input-box' style={{ width: '50%' }} />
                                        </div>
                                    </div>

                                        <div className='row-pace-w100-line' style={{ marginTop: 3 }}>
                                            <div style={{ flexDirection: 'row', display: 'flex', width: '100%' }}>
                                                <div style={{ width: 110 }}>
                                                    <label style={{ width: 110, fontWeight: '800' }}>อธิบายเพิ่มเติม 1</label>
                                                </div>
                                                <input type='text'

                                                    name='Remark'
                                                    value={dataHeader.Remark}
                                                    onChange={(e) => handleChangeText(e)}
                                                    className='input-box' style={{ width: '50%' }} />
                                            </div>
                                        </div>
                                        <div className='row-pace-w100-line' style={{ marginTop: 3 }}>
                                            {/* <PupUPbomList ItemId={dataHeader.ItemID} /> */}
                                             {dataHeader.ItemID?<PupUPbomList ItemId={dataHeader.ItemID} />:<label style={{color:'red'}}>ข้อมูล BOM</label>}
                                            <div style={{ flexDirection: 'row', display: 'flex' }}>

                                                <div style={{ flexDirection: 'row', display: 'flex', marginRight: 10 }}>
                                                    <div style={{ width: 85 }}>
                                                        <label style={{ fontWeight: '800' }}>Confirm By :</label>
                                                    </div>
                                                    <div>
                                                        <label>{dataHeader.nameConfirme} {dataHeader.lastname}</label>
                                                    </div>
                                                </div>
                                                <div style={{ flexDirection: 'row', display: 'flex',marginRight:15 }}>
                                                    <div style={{ width: 70 }}>
                                                        <label style={{ fontWeight: '800' }}>วันที่สร้าง :</label>
                                                    </div>
                                                    <div>
                                                        <label>{moment(dataHeader.TransDate).format('DD/MM/yyyy')}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </Card>

                        </Box>}

                </Container>

            </React.Fragment>

            <div>
                {dataHeader.JournalID != "" &&
                    <EditDetaildocument
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

export default Editdocuments
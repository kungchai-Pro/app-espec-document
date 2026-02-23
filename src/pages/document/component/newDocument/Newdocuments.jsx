import React, { useState, useEffect, useRef } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import Card from '@mui/material/Card';
import PupUPbomList from './../popupbom/PupUPbomList';
import { styled } from '@mui/material/styles';
import './newdocument.scss';
import Detaildocument from './Detaildocument';
import PopUpdetailSpecId from './popupcomponent/popUpdetailSpecId';
import PopUpcustomers from './popupcomponent/popUpcustomers';
import PopUpItemdetail from './popupcomponent/popUpItemdetail';
import FetchApi from '../../../customhooks/Functionapi';
import { objectHearder, ItmeTypeID } from './objectdata/typeobject';
import { useSelector, useDispatch } from 'react-redux'
import { Container } from '@mui/material';
import { UploadFiles } from '../../../customhooks/FuctionUpload';
import PopUpPackagingDetail from './popupcomponent/popUpPackagingDetail';
import { runnumberDocument } from './../../../customhooks/FunctionRunnumber';
import Swal from 'sweetalert2';
import moment from 'moment/moment.js';
import { Route, Link, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

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

const Newdocuments = (props) => {
    const navigate = useNavigate();
    let { id } = useParams();
    const FetchApis = new FetchApi()
    const userId = sessionStorage.getItem("userId")

    const dataHead = useSelector((state) => state.documentHeader.valueHeader);

    const [addImages, setAddImages] = useState([]);
    const [dataHeader, setDataHeader] = useState(objectHearder);

    const [datatypeproduct, setDataTypeproduct] = useState([]);
    const [typeproductdetail, setTypeproductdetial] = useState([]);
    const [ischeck, setIscheck] = useState(false);


    const [saleapproved, setSaleapproved] = useState([]);
    const [flowrunList, setFlowrunList] = useState([]);

    useEffect(() => {
        // getJournalById(props.insertId)
        gettypePorduct()
        getsaleapproved();
        runjournalcode();

    }, [])

    const runjournalcode = () => {
        runnumberDocument(objectHearder.typeDocement).then(result => {

            if (result) {
                setDataHeader({ ...dataHeader, JournalCode: result })
            }

        })
    }


    // ส่วนเลือก ประเภท  new  and revise 
    const gettypePorduct = () => {

        FetchApis.FethcGet(`/typeproduct/typeProductgroup`).then(res => {
            if (res) {
                setDataTypeproduct(res.data)

            }
        })
    }

    const gettypedetailproduct = (code) => {

        setDataHeader({
            ...dataHeader, Typeproduct: code,
            PurposeDetail: []
        })

        setIscheck(false)

        setTimeout(() => {
            setIscheck(true)
        }, 500);

        FetchApis.FethcGet(`/typeproduct/typeProductByCode/${code}`).then(res => {

            if (res) {
                setTypeproductdetial(res.data);
            }
        })
    }

    const handleChange = (e) => {

        const { PurposeDetail } = dataHeader
        const ischecked = e.target.checked;
        const istext = e.target.value;

        if (ischecked == true) {
            if (e.target.name == 'typeDetail') {
                setDataHeader({ ...dataHeader, PurposeDetail: [...PurposeDetail, istext] })
            }
        }
        else if (ischecked == false) {
            setDataHeader({
                ...dataHeader,
                PurposeDetail: PurposeDetail.filter((e) => e !== istext),
            });
        }
    }

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
            ...dataHeader, 
            SaleAckUserID: val,
            UserIDRequest:"คุณ "+val

        })

        FetchApis.FethcGet(`/flowsystem/flowbyNamelist/${val}`).then(res => {
            if (res) {
                if (res) {
                    setFlowrunList(res.data);
                }

            }
        })

    };

    const handleFile = event => {
        var input = document.getElementById('loadfile');
        // console.log(input)
        if (input.files[0]) {
            const file = input.files[0]
            const size = file.size // it's in bytes
            const ext = file.name.split(".").pop();

            const newName = `${Date.now()}.` + ext;
            const renamedFile = new File([file], newName, {
                type: file.type,
            });

            if (size <= 5000000) {
                UploadFiles(renamedFile).then(res => {
                    //upload file ก่อน ค่อย insert 
                    if (res) {
                        setDataHeader({ ...dataHeader, PartFileECN: newName })
                    }
                })
            } else {
                
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

    props.getdataheader(dataHeader)

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

    const handleChangeText = e => {
        // var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
        // Allow only letters, numbers, and spaces
        // var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        // var dataclecking=format.test(e.target.value);
        var input = e.target.value;
        // const cleanInput = input.replace(/[^a-zA-Z0-9ก-๙\s()#/.%:";,=\-@$<>+*/?!]/g, "");
        const cleanInput = input.replace(/[^a-zA-Z0-9ก-๙\s()#/.%:";,=\-&@$<>+*/?!]/g, "");
        setDataHeader({ ...dataHeader, [e.target.name]: cleanInput });
    };

    const isGetPacklist = (datalist) => {
        setDataHeader({ ...dataHeader, PackagingDetails: datalist })
    }


    const inDetailSpec = (SPECID, SPECNAME) => {
        setDataHeader({
            ...dataHeader,
            SpecId: SPECID,
            SpecName: SPECNAME
        })
    }

    return (
        <div>
            <React.Fragment>
                <CssBaseline />
                <Container>
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
                                                {dataHead.ItemTypeID == val ?
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
                                                <input type='radio' name='typeproduct' value={item.typecode}
                                                    onClick={(e) => gettypedetailproduct(e.target.value)}
                                                /><label style={{ marginLeft: 5 }}>{item.typeproduct}</label>
                                            </div>)}
                                        </div>
                                        <div>
                                            {typeproductdetail.map((item, index) => (<div>
                                                {ischeck != false &&
                                                    <input type='checkbox' value={item.detailproduct} name={'typeDetail'}
                                                        id="typeDetail"
                                                        onChange={(e) => handleChange(e)}
                                                        defaultChecked={false}
                                                    />
                                                }


                                                <label style={{ marginLeft: 5 }}>{item.detailproduct}</label>
                                            </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ flexDirection: 'row', display: 'flex', marginTop: 10, width: 800 }}>
                                        <div style={{ width: 115 }}>
                                            <label style={{ width: 150, fontWeight: '800' }}>วัตถุประสงค์</label>
                                        </div>
                                        <textarea className='textarea-box'
                                            name='Purpose'
                                            value={dataHeader.Purpose}
                                            onChange={(e) => handleChangeText(e)}

                                            placeholder='อธิบายคำร้อง (500 Digit)'
                                            style={{ width: '50%', height: 50 }}
                                            maxLength={500}
                                        />

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
                                    <div className='row-pace-w100-line' style={{ marginTop: 10 }}>
                                        <div style={{ width: 200, fontWeight: '800' }}>
                                            <label >ชื่อผู้ร้องขอ</label>
                                        </div>
                                        <div style={{ width: '100%' }}>

                                            <select name="saleapproved" id="saleapproved"
                                                onChange={(e) => handleChangeSale(e)}
                                                style={{ width: 150 }}>
                                                <option value={''} >เลือกผู้อนุมัติ</option>
                                                {saleapproved.map((item, index) => (
                                                    <option value={item.flowName}>คุณ {item.flowName}</option>
                                                ))}
                                            </select>
                                        </div>

                                    </div>
                                    <div className='row-pace-w100-line' style={{ marginTop: 10 }}>
                                        <div style={{ width: 200, fontWeight: '800' }}>
                                            <label >ลำดับอนุมัติ</label>
                                        </div>
                                        <div style={{ width: '100%' }}>
                                            <select name="saleapproved" id="saleapproved"
                                                onChange={(e) => isChangflow(e.target.value)}
                                                style={{ width: 150 }} >
                                                <option value={''}>เลือก flow อนุมัติ</option>
                                                {flowrunList.map((item, index) => (
                                                    <option value={item.flowId}>{item.detail}</option>
                                                ))}

                                            </select>
                                        </div>

                                    </div>
                                </div>
                                <div style={{ width: '15%' }}>
                                    <div className='row-pace-w100-line'>
                                        <div style={{ width: '80%' }}>
                                            <label style={{ fontWeight: '800' }}>เลขที่เอกสาร (ECN) *</label>
                                            <input type='text'
                                                value={dataHeader.RefECN} onChange={(e) => setDataHeader({ ...dataHeader, RefECN: e.target.value })}
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
                                <div style={{ width: '45%' }}>
                                    <div className='row-pace-w100-line' style={{ width: '100%' }}>
                                        <label style={{ width: 200, fontWeight: '800' }}>รหัสลูกค้า</label>
                                        <input type='text' className='input-box'
                                            style={{ width: '100%' }}
                                            name='CustID'
                                            value={dataHeader.CustID}
                                            onChange={(e) => handleChangeText(e)}

                                        />

                                        <PopUpcustomers inDataCustomer={inDataCustomer} />
                                    </div>
                                    <div className='row-pace-w100-line' style={{ marginTop: 3 }}>
                                        <label style={{ width: 200, fontWeight: '800' }}>รหัสสินค้า</label>
                                        <input type='text' className='input-box' style={{ width: '100%' }}
                                            name='ItemID'
                                            value={dataHeader.ItemID}
                                            onChange={(e) => handleChangeText(e)}

                                        />

                                        <PopUpItemdetail inDataCustomerDetail={inDataCustomerDetail} />
                                    </div>
                                </div>

                                <div style={{ width: '100%', marginLeft: 10 }}>

                                    <div className='row-pace-w100-line-start'>
                                        <div className='row-pace-w100-line-start' style={{ width: '60%' }}>
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
                                            <div style={{ width: 80 }}>
                                                <label style={{ fontWeight: '800' }}>ชื่อสินค้า</label>
                                            </div>
                                            <input type='text'
                                                name='ItemName'
                                                value={dataHeader.ItemName}
                                                onChange={(e) => handleChangeText(e)}

                                                className='input-box' style={{ width: 400 }} />
                                        </div>

                                        <div className='row-pace-w100-line-start' style={{ marginTop: 3, marginLeft: 10 }}>
                                            <div style={{ width: 80 }}>
                                                <label style={{ fontWeight: '800' }}>ตราสินค้า</label>
                                            </div>
                                            <div style={{ width: '100%', flexDirection: 'row', display: 'flex' }}>
                                                <input type='text'
                                                    name='BrandID'
                                                    value={dataHeader.BrandID}
                                                    onChange={(e) => handleChangeText(e)}

                                                    className='input-box'
                                                    style={{ width: '90%' }}
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
                                justifyContent: 'flex-start',
                                marginBottom: 10,
                                width: '100%',
                                margin: 10
                            }}>
                                <div style={{ width: '100%' }}>
                                    <div style={{ flexDirection: 'row', display: 'flex', marginTop: 3, width: '100%' }}>

                                        <div style={{ flexDirection: 'row', display: 'flex', width: '100%' }}>

                                            <div style={{ width: 115 }}>
                                                <label style={{ width: 115, fontWeight: '800' }}>การบรรจุงาน</label>
                                            </div>
                                            <input type='text'
                                                name='PackagingDetails'
                                                value={dataHeader.PackagingDetails}
                                                onChange={(e) => handleChangeText(e)}

                                                className='input-box' style={{ width: '50%' }}
                                            />
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
                                            <div style={{ width: 115 }}>
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
                                            <div style={{ width: 115 }}>
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
                                        {dataHeader.ItemID?<PupUPbomList ItemId={dataHeader.ItemID} />:<label style={{color:'red'}}>ข้อมูล BOM</label>}
                                        {/* <PupUPbomList ItemId={dataHeader.ItemID} /> */}
                                        <div style={{ flexDirection: 'row', display: 'flex' }}>

                                            <div style={{ flexDirection: 'row', display: 'flex', marginRight: 10 }}>
                                                <div style={{ width: 85 }}>
                                                    <label style={{ fontWeight: '800' }}>Confirm By :</label>
                                                </div>
                                                <div>
                                                    <label>{dataHeader.nameConfirme} {dataHeader.lastname}</label>
                                                </div>
                                            </div>
                                            <div style={{ flexDirection: 'row', display: 'flex',marginRight:15}}>
                                                <div style={{ width: 70 }}>
                                                    <label style={{ fontWeight: '800' }}>วันที่/เวลา :</label>
                                                </div>
                                                <div>
                                                    <label>{moment(dataHeader.stamptimeUpdate).format('DD/MM/yyyy hh:mm:ss')}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </Card>
                    </Box>

                </Container>
            </React.Fragment>
            <div>
                {dataHeader.JournalCode != "" &&
                    <Detaildocument
                        getdatadetail={props.getdatadetail}
                        isRemoveImages={isRemoveImages}
                        getdataImages={props.getdataImages}
                        dataHeader={dataHeader}
                    />
                }

            </div>
        </div>
    )
}

export default Newdocuments
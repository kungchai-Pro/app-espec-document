
import React, { useState, useEffect } from 'react'
import { Button, Container } from '@mui/material';
import './searchjournal.scss';
import PopUpcuEditSlot from '../../component/newDocument/popupcomponent/popUpcuEditSlot';
import PopUpdetailitemSearch from '../../component/newDocument/popupcomponent/popUpdetailitemSearch';
// import PopUpdetailSpec from '../../component/newDocument/popupcomponent/popUpdetailSpec';
import FetchApi from '../../../customhooks/Functionapi';
// import { GetdataHeader } from '../../../customhooks/FunctionGroupItemid';
import { GetdataReviseAll, CreateNoteGroupById } from '../../../customhooks/FunctionReviseGroup';
import PopUpbatchversiongroup from '../newDocument/Editcomponent/popUpbatchversiongroup';
import { useSelector, useDispatch } from 'react-redux'
import { UploadFiles } from '../../../customhooks/FuctionUpload';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { ToastContainer, toast, Slide } from 'react-toastify';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { columns } from './columstableupload';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { AddHeader, AddDetail, AddImages, updateAddImages, ClearItem } from '../../../redux/features/document/documentreviseSlice';
import Swal from 'sweetalert2';
import { styled } from '@mui/material/styles';

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
} else {
    convertmonth = convertmonth
}
var timestampsnow = d.getFullYear() + "-" + convertmonth + "-" + convertdate + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
var timestampsDate = d.getFullYear() + "-" + convertmonth + "-" + convertdate;
const userId = sessionStorage.getItem("userId");




function UpdateJournal(props) {
    const FetchApis = new FetchApi();
    const dispatch = useDispatch();
    var rowdataList = props.RowData;
    var journalDatas = props.journalData;
    const documentHeader = useSelector((state) => state.documentrevise.valueHeader);
    const documentDetial = useSelector((state) => state.documentrevise.valueDetail);

    const [SaleList, setSaleList] = useState([]);
    const [flowrunList, setFlowrunList] = useState([]);

    const userId = sessionStorage.getItem('userId');
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataitem, setDataItem] = useState([]);
    const [databatchlist, setDatabatchlist] = useState([{
        batchId: "",
        TypeBatch: "",
        batchName1: "",
        batchName2: "",
        batchDetail1: "",
        batchDetail2: "",
        batchExample1: "",
        batchExample2: "",
        numbers: ""
    }]);
    const [dataJournal, setDataJouranl] = useState([]);
    const [saleApproved, setSaleApproved] = useState("");
    const [flowId, setFlowId] = useState("");
    const [typeEdit, setTypeEdit] = useState(props.typeEdit);
    let datalistall = [];

    const [headgroup, setHeadgroup] = useState({
        journalGroupID: "",
        purposer: "",
        userRequest: "",
        refECN: "",
        partfile: "",
        editType: "",
        createBy: userId,
        confirmDateTime: timestampsDate,
        createDatetime: timestampsnow
    })

    useEffect(() => {
        dispatch(ClearItem())

        getItemjournalList()
        getRunningGroupId()
        getsaleapproved();
        setDataItem({
            ...dataitem,
            ColabgroupId: journalDatas[0].ColabgroupId,
            PkDescription: journalDatas[0].PkDescription
        })

    }, [])

    // เรียก running groupId
    const getRunningGroupId = () => {
        FetchApis.FethcGet(`/runninggroupId/runningByYear`).then(res => {
            if (res) {
                var datalist = res.data[0];
                var dbrunning = Number(datalist.running) + 1
                var Gnumber = formatNumber(dbrunning);
                var runNumber = datalist.runningformate + '-' + Gnumber

                setHeadgroup({
                    ...headgroup, journalGroupID: runNumber,
                    editType: typeEdit
                })
            }
        })
    }
    const formatNumber = (num) => {
        return String(num).padStart(5, '0')
    }

    // นำข้อมูลที่เลือกมาแสดงใน grid
    async function getItemjournalList() {

        const newItems = [];
        for (let index = 0; index < rowdataList.length; index++) {
            var dataUpdate = journalDatas.find((row) => row.JournalID == rowdataList[index]);
            newItems.push(dataUpdate)

        }
        setDataItem(newItems[0]);
        setDataJouranl([...dataJournal, ...newItems])

    }


    // นำข้อมูลที่เลือกมาแสดงใน grid
    async function getItemdetailEdit() {

        for (let index = 0; index < dataJournal.length; index++) {
            setDataJouranl(prevItems =>
                prevItems.map((item, i) =>
                    i === index ? {
                        ...item,
                        ['Update']: '1',
                    } : item
                )
            );
            setOpenUpdate(true)

        }

        if (documentDetial.length == 0) {
            const newItems = [];
            for (let index = 0; index < rowdataList.length; index++) {
                var dataUpdate = journalDatas.find((row) => row.JournalID == rowdataList[index]);

                journalHeader(dataUpdate.JournalCode)
                jourdetiallistBycode(dataUpdate.JournalCode)

            }

        }

    }

    function journalHeader(idcode) {

        if (documentHeader.length == 0) {
            FetchApis.FethcGet(`/document/DocumentByCode/${idcode}`).then(res => {
                dispatch(AddHeader(res.data))
            })
        }

    }

    function jourdetiallistBycode(idcode) {

        if (documentDetial.length == 0) {
            FetchApis.FethcGet(`/document/DocumentDetailListByCode/${idcode}`).then(res => {
                if (res) {
                    dispatch(AddDetail(res.data))
                    datalistall.push(res.data)
                }
            })
        }

    }

    const isUpDateItem = (e) => {



        if (documentDetial.length == 0) {
            alert('คุณยังไม่ได้ กดปุ่ม อัพเดทข้อมูล')
        } else {

            if (flowId == "") {
                alert('คุณยังไม่ได้เลือกผู้ขออนุมัติ กำหนด sale ');
            } else {

                if (typeEdit == '1') {

                    if (dataitem.ItemID == "" || dataitem.ItemName == "") {
                        alert('คุณยังไม่ได้เลือกข้อมูล ITEM ที่ต้องการเปลี่ยน')
                    } else {

                        var datItemname=dataitem.ItemName.replace(/[^a-zA-Z0-9ก-๙\s()#/.%:"@$-]/g, "")
                        const updateddetail = documentDetial.map(innerArr =>
                            innerArr.map(obj =>
                                obj.ItemID === dataJournal[0].ItemID ? {
                                    ...obj, ItemID: dataitem.ItemID,
                                    ItemName:datItemname ,
                                    ColabgroupId: dataitem.ColabgroupId
                                } : obj
                            )
                        );

                        const updatedhdead = documentHeader.map(innerArr =>
                            innerArr.map((obj, index) =>
                                obj.JournalCode === dataJournal[0].JournalCode ?
                                    {
                                        ...obj,
                                        JournalGroupID: headgroup.journalGroupID,
                                        SaleAckUserID: saleApproved,
                                        FlowrunId: flowId,
                                        stamptimeUpdate: timestampsnow
                                    } : obj
                            )
                        );

                        if (updateddetail.length > 0) {
                            CreateNoteGroupById(dataJournal, dataitem, typeEdit, headgroup.journalGroupID);
                            GetdataReviseAll(updatedhdead, updateddetail, headgroup.journalGroupID, saleApproved, flowId, typeEdit);
                            isCreateHeateGroupId()
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
                            window.location.reload()
                        }, 3000);

                    }

                }
                else if (typeEdit == '2') {
                    if (databatchlist[0].batchName1 == "") {
                        alert('คุณยังไม่ได้เลือกข้อมูล batch ที่จะเปลี่ยน')
                    } else {
                        var dataarrey = [];
                        for (let index = 0; index < databatchlist.length; index++) {
                            const batchlist = databatchlist[index];

                            for (let i = 0; i < documentDetial.length; i++) {
                                for (let j = 0; j < documentDetial[i].length; j++) {
                                    if (documentDetial[i][j].TypeBatch === batchlist.TypeBatch) {
                                        var datat = {
                                            ...documentDetial[i][j],
                                            Batch1: batchlist.batchName1,
                                            BatchDetail1: batchlist.batchDetail1,
                                            BatchExample1: batchlist.batchExample1,
                                            Batch2: batchlist.batchName2,
                                            BatchDetail2: batchlist.batchDetail2,
                                            BatchExample2: batchlist.batchExample2,
                                            BatchNo: batchlist.numbers,
                                            ConfirmDateTime: timestampsnow
                                        };

                                        dataarrey.push(datat)

                                    }
                                }

                            }

                        }

                        const updatedhdead = documentHeader.map(innerArr =>
                            innerArr.map((obj, index) =>
                                obj.JournalCode === dataJournal[0].JournalCode ?
                                    {
                                        ...obj,
                                        JournalGroupID: headgroup.journalGroupID,
                                        SaleAckUserID: saleApproved,
                                        FlowrunId: flowId,
                                        stamptimeUpdate: timestampsnow
                                    } : obj
                            )
                        );

                        if (dataarrey.length > 0) {

                            CreateNoteGroupById(dataJournal, databatchlist, typeEdit, headgroup.journalGroupID);
                            GetdataReviseAll(updatedhdead, dataarrey, headgroup.journalGroupID, saleApproved, flowId, typeEdit);
                            isCreateHeateGroupId()
                        }
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
                        window.location.reload()
                    }, 3000);

                }


            }
        }




    }

     function isCreateHeateGroupId() {
        FetchApis.FethcPost(`/JournalBygroup/newGroupitemId`, headgroup).then(res => {
            if (res.status == 200) {
                UpdateNumber()
            }
        })
    }

    function UpdateNumber() {
        FetchApis.FethcUpdate(`/runninggroupId/updateNewRunning`).then(res => {
            if (res) {

            }
        })
    }

    function inDataAddsolt(PKDESCRIPTION, COLABGROUPID, index) {

        setDataItem({
            ...dataitem,
            ColabgroupId: COLABGROUPID,
            PkDescription: PKDESCRIPTION
        })
    }

    const inDetailItemId = (Itemid, ItemName) => {
        setDataItem({
            ...dataitem,
            ItemID: Itemid,
            ItemName: ItemName,
        })
    }

    const ishandleClickOpen = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    const ishandleClose = (e) => {

        setOpen(false);
    };

    const ishandleConfirm = () => {
        isUpDateItem()
        setOpen(false);
    };


    function getRowId(row) {
        return row.JournalID;
    }


    function PopUpAlert() {
        return (
            <React.Fragment>

                <Dialog
                    open={open}
                    onClose={() => ishandleClose()}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        แจ้งเตือน
                    </DialogTitle>
                    <DialogContent style={{ width: 400, height: 120 }}>
                        <DialogContentText>
                            <center>
                                <div>
                                    <CheckCircleOutlineIcon sx={{ width: 50, height: 50, color: 'green' }} />
                                </div>
                                <div>
                                    <label>
                                        คุณต้องการ อัพเดทข้อมูล ใช่หรือไม่
                                    </label>
                                </div>
                            </center>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => ishandleConfirm()} color='success' variant="contained">ตกลง</Button>
                        <Button onClick={() => ishandleClose()} color='warning' variant="contained">ยกเลิก</Button>

                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }


    function PopUpAlertUpDate() {
        return (
            <React.Fragment>

                <Dialog
                    open={openUpdate}
                    onClose={() => setOpenUpdate(false)}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        แจ้งเตือน
                    </DialogTitle>
                    <DialogContent style={{ width: 400, height: 120 }}>
                        <DialogContentText>
                            <center>
                                <div>
                                    <CheckCircleOutlineIcon sx={{ width: 50, height: 50, color: 'green' }} />
                                </div>
                                <div>
                                    <label>
                                        คุณอัพเดทข้อมูล เรียบร้อยแล้ว
                                    </label>
                                </div>
                            </center>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenUpdate(false)} color='success' variant="contained">ตกลง</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }


    /// selete flow running 
    //แสดงชื่อ flow หรือ ชื่อ sale
    const getsaleapproved = () => {

        FetchApis.FethcGet(`/flowsystem/flowgroupbyName`).then(res => {
            if (res) {
                setSaleList(res.data);
            }
        })
    }

    //  ส่วนกรเลือก sale เพิ่มแสดง flow running
    const isChangflow = (val) => {
        setFlowId(val);
    }

    const handleChangeSale = (e) => {
        var val = e.target.value;
        setSaleApproved(val)

        FetchApis.FethcGet(`/flowsystem/flowbyNamelist/${val}`).then(res => {
            if (res) {
                if (res) {
                    setFlowrunList(res.data);
                }

            }
        })

    };

    const getBatchproduct = (index, val) => {
        setDatabatchlist(val)

    }


    function handleChangeText(e) {

        var input = e.target.value;
        const cleanInput = input.replace(/[^a-zA-Z0-9ก-๙\s()#/.%:"@$-]/g, "");
        setDataItem({ ...dataitem, [e.target.name]: cleanInput });

    }

    function handleChangeHeader(e) {

        var input = e.target.value;
        const cleanInput = input.replace(/[^a-zA-Z0-9ก-๙\s()#/.%:"@$-]/g, "");
        setHeadgroup({ ...headgroup, [e.target.name]: cleanInput });

    }

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
                        setHeadgroup({ ...headgroup, partfile: newName });

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

    return (
        <div>

            <div style={{ fontSize: 14 }}>
                <form onSubmit={ishandleClickOpen}>
                    <PopUpAlert />
                    <PopUpAlertUpDate />
                    <Container >
                        <div style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>
                            <div>
                                <label style={{ color: '#2f90d3', padding: 10 }}>คำร้องขอแก้ไขเอกสาร</label>
                            </div>
                            <div style={{ margin: 3 }}>
                                <Button
                                    type='submit'
                                    variant="contained" >บันทึก</Button>
                            </div>
                        </div>
                        <div className='row-pace-w100-line' style={{ fontSize: 14 }}>
                            <div style={{ width: '70%', backgroundColor: '#dedfe1', padding: 10 }}>
                                <div className='layout-flex-line' style={{ width: '100%' }}>
                                    <div style={{ width: 200 }}>
                                        <label>วัตถุประสงค์ อธิบายคำร้อง</label>
                                    </div>
                                    <div style={{ width: '80%' }}>
                                        <textarea className='textarea-box' style={{ width: '70%', height: 40 }}
                                            name='purposer'
                                            placeholder='วัตถุประสงค์'
                                            value={headgroup.purposer}
                                            onChange={(e) => handleChangeHeader(e)}
                                            maxLength={450}
                                        />
                                    </div>
                                </div>
                                <div className='layout-flex-line' style={{ width: '100%' }}>
                                    <div style={{ width: 200 }}>
                                        <label>ผู้ร้องขอ</label>
                                    </div>
                                    <div style={{ width: '80%', marginTop: 2 }}>
                                        <input
                                            className='input-box'
                                            type='text'
                                            name='userRequest'
                                            value={headgroup.userRequest}
                                            onChange={(e) => handleChangeHeader(e)}
                                            placeholder='user request' style={{ width: '50%' }} required />
                                    </div>
                                </div>
                                <div className='layout-flex-line' style={{ width: '100%' }}>
                                    <div style={{ width: 200 }}>
                                        <label>ชื่อผู้ร้องขอ</label>
                                    </div>
                                    <div style={{ width: '80%', marginTop: 2 }}>
                                        <select
                                            name="saleapproved"
                                            id="saleapproved"
                                            onChange={(e) => handleChangeSale(e)}
                                            style={{ width: 150 }}>
                                            <option value={''} >เลือก ผู้รับผิดชอบ</option>
                                            {SaleList.map((item, index) => (
                                                <option value={item.flowName}>{item.flowName}</option>
                                            ))}
                                        </select>

                                    </div>
                                </div>

                                <div className='layout-flex-line' style={{ width: '100%' }}>
                                    <div style={{ width: 200 }}>
                                        <label>ลำดับอนุมัติ</label>
                                    </div>
                                    <div style={{ width: '80%', marginTop: 2 }}>

                                        <select name="saleapproved" id="saleapproved"
                                            onChange={(e) => isChangflow(e.target.value)}
                                            style={{ width: 150 }} >
                                            <option value={""}>เลือก ลำดับอนุมัติ</option>
                                            {flowrunList.map((item, index) => (
                                                <option value={item.flowId}>{item.detail}</option>
                                            ))}

                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '30%', backgroundColor: '#f9d4ae', padding: 10 }}>
                                <div className='layout-flex-line'>
                                    <div style={{ width: 150 }}>
                                        <label>วันที่สร้างเอกสาร</label>
                                    </div>
                                    <div>
                                        <label>{headgroup.createDatetime}</label>
                                    </div>
                                </div>
                                <div className='layout-flex-line'>
                                    <div style={{ width: 150 }}>
                                        <label>วันที่ Approved</label>
                                    </div>
                                    <div>
                                        <label>{headgroup.confirmDateTime}</label>
                                    </div>
                                </div>
                                <div className='layout-flex-line'>
                                    <div style={{ width: 150 }}>
                                        <label>เอกสารกลุ่ม (SDSS)</label>
                                    </div>
                                    <div>
                                        <label>{headgroup.journalGroupID}</label>
                                    </div>
                                </div>
                                <div className='layout-flex-line'>
                                    <div style={{ width: 150 }}>
                                        <label>เลขที่เอกสาร (ECN)</label>
                                    </div>
                                    <div>
                                        <input type='text'
                                            name='refECN'
                                            value={headgroup.refECN}
                                            onChange={(e) => handleChangeHeader(e)}
                                            placeholder='ref ECN'
                                            className='input-box'
                                        />
                                    </div>
                                </div>
                                <div className='layout-flex-line' style={{ marginTop: 3 }}>
                                    <div style={{ width: 150 }}>
                                        <label>เพิ่มไฟล์เอกสาร</label>
                                    </div>
                                    <div>
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
                                </div>
                                <div className='layout-flex-line' style={{ marginTop: 3 }}>
                                    <div style={{ width: 150 }}> <label>ชื่อไฟล์ :</label></div>
                                    <div>{headgroup.partfile}</div>
                                </div>


                            </div>
                        </div>

                        {dataJournal.length > 0 && <div style={{ padding: 10, marginTop: 1, backgroundColor: '#e6e7e8' }}>

                            <div style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', display: 'flex' }}>
                                <label style={{ color: '#2f90d3', padding: 10 }}>ข้อมูลที่ต้องการแก้ไข</label>
                            </div>

                            {/* แก้ไข item เท่านั้น  */}
                            {typeEdit == '1' &&
                                <div className='layout-flex-line'>
                                    <div className='layout-flex-line'>
                                        <div style={{ width: 150 }}>
                                            <label>ประเภทบรรจุภัณฑ์</label>
                                        </div>
                                        <div style={{ backgroundColor: '#D7D7D7', marginTop: 2 }}>
                                            <label>{dataJournal[0].PkDescription}</label>
                                        </div>

                                    </div>
                                    <div className='layout-flex-line'>
                                        <div style={{ width: 70 }}>
                                            <label>รหัสสินค้า</label>
                                        </div>
                                        <div style={{ backgroundColor: '#D7D7D7', marginTop: 2 }}>
                                            {dataJournal[0].ItemID}
                                        </div>
                                    </div>
                                    <div className='layout-flex-line'>
                                        <div style={{ width: 70 }}>
                                            <label>ชื่อสินค้า</label>
                                        </div>
                                        <div style={{ backgroundColor: '#D7D7D7', marginTop: 2 }}>
                                            <label>{dataJournal[0].ItemName}</label>
                                        </div>
                                    </div>
                                </div>}
                            {/* แก้ไข  batch เท่านั้น */}
                            {typeEdit == '2' &&
                                <div>
                                    <label>Batch รูปแบบที่ {journalDatas[0].BatchNo}</label>
                                    <div className='layout-flex-line'>
                                        <div style={{ width: 150 }}>
                                            {dataJournal[0].TypeBatch == '1' && <label> ยิงบนบรรจุภัณฑ์ :</label>}
                                            {dataJournal[0].TypeBatch == '2' && <label> ยิงบนกล่องนอก :</label>}

                                        </div>
                                        <div style={{ width: 150, backgroundColor: '#D7D7D7', marginTop: 2 }}>
                                            <label>{journalDatas[0].Batch1}</label>
                                        </div>
                                        <div style={{ width: 65, marginLeft: 10 }}>
                                            <label>อธิบาย 1</label>
                                        </div>
                                        <div style={{ width: 450, backgroundColor: '#D7D7D7', marginTop: 2 }}>
                                            <label>{journalDatas[0].BatchDetail1}</label>
                                        </div>
                                    </div>
                                    <div className='layout-flex-line'>
                                        <div style={{ width: 150 }}></div>
                                        <div style={{ width: 150, backgroundColor: '#D7D7D7', marginTop: 2 }}>
                                            <label>{journalDatas[0].Batch2}</label>
                                        </div>
                                        <div style={{ width: 65, marginLeft: 10 }}>
                                            <label>อธิบาย 2</label>
                                        </div>
                                        <div style={{ width: 450, backgroundColor: '#D7D7D7', marginTop: 2 }}>
                                            <label>{journalDatas[0].BatchDetail2}</label>
                                        </div>
                                    </div>
                                </div>}

                        </div>}


                        {/* // ส่วนข้อมูล New data ---------> */}

                        <div style={{ padding: 10, marginTop: 1, backgroundColor: '#e6e7e8' }}>
                            {typeEdit == '1' &&
                                <div className='layout-flex-line'>
                                    <div className='layout-flex-line'>
                                        <div style={{ width: 150 }}>
                                            <label>ประเภทบรรจุภัณฑ์</label>
                                        </div>
                                        <div>
                                            <input type='text' className='input-box'
                                                name='PkDescription'
                                                value={dataitem.PkDescription}
                                                onChange={(e) => handleChangeText(e)}

                                                style={{ marginRight: 0 }} required disabled={typeEdit == '1' ? false : true} />
                                        </div>
                                        {typeEdit == '1' ? <div style={{ marginRight: 10 }}>
                                            {dataitem.PkDescription != "" && <PopUpcuEditSlot inDataAddsolt={inDataAddsolt} index={1} />}
                                        </div> : <SearchIcon />}
                                    </div>
                                    <div className='layout-flex-line'>
                                        <div style={{ width: 60 }}>
                                            <label>รหัสสินค้า</label>
                                        </div>
                                        <div>
                                            <input type='text' className='input-box'
                                                name='ItemID'
                                                value={dataitem.ItemID}
                                                onChange={(e) => handleChangeText(e)}
                                                style={{ marginRight: 1 }} required disabled={typeEdit == '1' ? false : true} />
                                        </div>
                                        {typeEdit == '1' ?
                                            <div style={{ marginRight: 10 }}>
                                                {dataitem.ColabgroupId !== "" && <PopUpdetailitemSearch inDetailItemId={inDetailItemId} ColabgroupId={dataitem.ColabgroupId} index={1} />}
                                            </div> : <AddBoxIcon />}
                                    </div>
                                    <div className='layout-flex-line'>
                                        <div style={{ width: 60 }}>
                                            <label>ชื่อสินค้า</label>
                                        </div>
                                        <div >
                                            <input type='text'
                                                name='ItemName'
                                                value={dataitem.ItemName}
                                                onChange={(e) => handleChangeText(e)}
                                                className='input-box' style={{ marginRight: 10, width: 450 }} required disabled={typeEdit == '1' ? false : true} />
                                        </div>
                                    </div>
                                </div>}


                            {typeEdit == '2' &&
                                <div style={{ marginTop: 1 }}>
                                    <div style={{ width: 150 }}>
                                        <PopUpbatchversiongroup getBatchproduct={getBatchproduct} index={''} JournalCode={''} />
                                    </div>
                                    {databatchlist.map((item, index) => (
                                        <div>

                                            <div>
                                                <label>รูปแบบที่ {item.numbers}</label>
                                            </div>

                                            <div className='layout-flex-line'>
                                                <div style={{ width: 150 }}>
                                                    {item.TypeBatch == '1' && <label>( ยิงบนบรรจุภัณฑ์  )</label>}
                                                    {item.TypeBatch == '2' && <label>( ยิงบนกล่องนอก )</label>}
                                                </div>
                                                <div>
                                                    <textarea
                                                        name='Batch1'
                                                        value={item.batchName1}
                                                        onChange={(e) => handleChangeText(e)}
                                                        style={{ marginRight: 10, width: 200 }}
                                                        disabled
                                                    />

                                                </div>
                                                <div style={{ width: 65 }}>
                                                    <label>อธิบาย 1</label>
                                                </div>
                                                <div style={{ marginRight: 10 }}>
                                                    <textarea
                                                        name='BatchDetail1'
                                                        value={item.batchDetail1}
                                                        onChange={(e) => handleChangeText(e)}
                                                        style={{ width: 300 }}
                                                        disabled
                                                    />
                                                </div>
                                                <div style={{ marginRight: 10 }}>
                                                    <label>ตัวอย่าง</label>
                                                </div>
                                                <div >
                                                    <textarea
                                                        name='BatchExample1'
                                                        value={item.batchExample1}
                                                        onChange={(e) => handleChangeText(e)}
                                                        style={{ width: 300 }}
                                                        disabled
                                                    />
                                                </div>
                                            </div>

                                            <div className='layout-flex-line' style={{ marginTop: 1 }}>
                                                <div style={{ width: 150 }}></div>
                                                <div>
                                                    <textarea
                                                        name='Batch2'
                                                        value={item.Batch2}
                                                        onChange={(e) => handleChangeText(e)}
                                                        style={{ marginRight: 10, width: 200 }}
                                                        disabled
                                                    />
                                                </div>
                                                <div style={{ width: 65 }}>
                                                    <label>อธิบาย 2</label>
                                                </div>
                                                <div style={{ marginRight: 10 }}>
                                                    <textarea
                                                        name='BatchDetail2'
                                                        value={item.batchDetail2}
                                                        onChange={(e) => handleChangeText(e)}
                                                        disabled
                                                        style={{ width: 300 }}
                                                    />
                                                </div>
                                                <div style={{ marginRight: 10 }}>
                                                    <label>ตัวอย่าง</label>
                                                </div>
                                                <div >
                                                    <textarea
                                                        name='BatchExample2'
                                                        value={item.batchExample2}
                                                        onChange={(e) => handleChangeText(e)}
                                                        disabled
                                                        style={{ width: 300 }}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>

                            }

                            <div style={{ flexDirection: 'row', justifyContent: 'flex-end', display: 'flex', marginTop: 5 }}>
                                <Button
                                    onClick={() => getItemdetailEdit()}
                                    variant="contained" >อัพเดทข้อมูล</Button>
                            </div>
                        </div>
                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={dataJournal}
                                columns={columns}
                                getRowId={getRowId}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5]}
                                checkboxSelection
                                disableRowSelectionOnClick
                            />
                        </Box>

                    </Container>
                </form>
            </div>


        </div>
    )
}

export default UpdateJournal
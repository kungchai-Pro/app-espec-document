import React, { useState, useEffect } from 'react'

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import PopUpcuEditSlot from '../../component/newDocument/popupcomponent/popUpcuEditSlot';
import PopUpdetailitemSearch from '../../component/newDocument/popupcomponent/popUpdetailitemSearch';
import { DataGrid } from '@mui/x-data-grid';
import { UpdateItemById, NewNotereject } from './functionReject';
import { toast } from 'react-toastify';

import { ApprovedGroupSend } from '../../component/aprovedStatusAll/ApprovedFunction';

import FetchApi from '../../../customhooks/Functionapi';
import Swal from 'sweetalert2';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const PopUpEditjournalitem = (props) => {

    const useIds = sessionStorage.getItem('userId')
    const [open, setOpen] = useState(false);
    const [dataitem, setDataItem] = useState([]);
    const [datadetail, setDatadetail] = useState([]);

    const [itemlast, setItemlast] = useState([]);

    const [dataNote, setDataNote] = useState("");


    const FetchApis = new FetchApi();

    const handleClickOpen = () => {
        setOpen(true);
        getdetailList()
        setItemlast(props.noteallist[1].itemId)
    };

    const handleClose = () => {
        setOpen(false);
        setDatadetail([])
        window.location.reload()
    };

    function handleChangeText(e) {
        var input = e.target.value;
        const cleanInput = input.replace(/[^a-zA-Z0-9ก-๙\s()#/.%:"@$-]/g, "");
        setDataItem({ ...dataitem, [e.target.name]: cleanInput });

    }

    function getdetailList() {

        props.datajournal.forEach(datalist => {
            FetchApis.FethcGet(`/document/DocumentDetailByCode/${datalist.JournalCode}`).then(res => {
                if (res) {
                    var dataitemList = res.data.find((item) => item.ItemID == props.noteallist[1].itemId);
                    setDatadetail(prev => [...prev, dataitemList]);
                }
            })
        });

    }

    function isUpdateDetail() {

        props.noteallist[1].typeProduct = dataitem.PkDescription
        props.noteallist[1].itemId = dataitem.ItemID
        props.noteallist[1].itemName = dataitem.ItemName

        if (dataitem.length == 0) {
            window.alert('คุณยังไม่ได้เลือก item update ?')
        } else {
            props.datajournal.forEach(jourlist => {
                setDatadetail(prev =>
                    prev.map(datalist =>
                        datalist.JournalCode === jourlist.JournalCode ? {
                            ...datalist,
                            PkDescription: dataitem.PkDescription,
                            ItemID: dataitem.ItemID,
                            ItemName: dataitem.ItemName,
                            ItemGroupID: dataitem.ColabgroupId
                        } : datalist));
            })
        }

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

    const columns = [
        { field: 'JournalCode', headerName: 'Journal Code', width: 200 },
        { field: 'PkDescription', headerName: 'Description', width: 200 },
        { field: 'ItemID', headerName: 'Item Id', width: 250 },
        { field: 'ItemName', headerName: 'Item Name', width: 450 },
        { field: 'ConfirmDateTime', headerName: 'Confirm DateTime', width: 200 },
    ];


    function getRowId(row) {
        return row.JournalID;
    }

    function confirmSave() {
        if (window.confirm("คุณต้องการบันทึกแก้ไข ใช่หรือไม่ ")) {
            isSaveToJournal()
        } else {
            console.log('cancel');
            //Clicked cancel
        }
    }

    function isSaveToJournal() {

        if (itemlast == datadetail[0].ItemID) {
            window.alert('คุณยังไม่ได้ทำการ อัพเดทข้อมูลตัวล่าสุด กรุณาตรวจสอบอีกครั้ง ')
            return
        }

        if (dataNote == "") {
            window.alert('คุณยังไม่ได้เพิ่มคำอธิบายแก้ไข ?');
            return
        }

        if (dataitem.length == 0) {
            window.alert('คุณยังไม่ได้เลือกข้อมูลในการแก้ไข ?');
            return
        } else {
            var datanote = {
                groupId: props.noteallist[1].journalgroupId,
                notedetail: dataNote,
                rejectBy: useIds,
                stateflow: "1",
                jourstatus: "R1002",
            }

            FetchApis.FethcUpdate(`/notejournalgroup/updateItemlist/${props.noteallist[1].nodeId}`, props.noteallist[1]).then(res => {
                if (res) {

                    UpdateItemById(datadetail);
                    NewNotereject(datanote);

                    for (let index = 0; index < props.datajournal.length; index++) {
                        const element = props.datajournal[index];
                        getFlowstatus(element);
                    }
                }
            })

            setOpen(false);
            setTimeout(() => {
                window.location.href = '/approvedGroup';
            }, 1750);

            toast.success('รอสักครู่ กำลังโหลดข้อมูล!', {
                position: "top-right",
                autoClose: 1700,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                // transition: Bounce,
            });

        }

    }

    const getFlowstatus = async (data) => {

        await FetchApis.FethcPost(`/flowrunsystem/flowrunByUserId`, {
            journalId: data.JournalID,
            stateflow: data.stateflow,
            UserId: useIds
        }).then(res => {
            if (res.data.length > 0) {
                ApprovedGroupSend(data, useIds, res.data[0].statusType, res.data[0].stateEnd).then(res => { console.log(res) })
            }
        })

    }

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen} color='info'>
                Edit
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullScreen={true}

            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    แก้ไขข้อมูล item
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
                    <Typography>
                        <div style={{ padding: 10, backgroundColor: '#ffff' }}>

                            <div style={{ backgroundColor: '#F5F1ED', marginBottom: 10, width: '100%', padding: 10 }}>

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

                                                style={{ marginRight: 0 }} />
                                        </div>
                                        <div style={{ marginRight: 10 }}>
                                            {dataitem.PkDescription != "" && <PopUpcuEditSlot inDataAddsolt={inDataAddsolt} index={1} />}
                                        </div>
                                    </div>
                                    <div className='layout-flex-line'>
                                        <div style={{ width: 100 }}>
                                            <label>รหัสสินค้า</label>
                                        </div>
                                        <div>
                                            <input type='text' className='input-box'
                                                name='ItemID'
                                                value={dataitem.ItemID}
                                                onChange={(e) => handleChangeText(e)}
                                                style={{ marginRight: 1 }} />
                                        </div>
                                        <div style={{ marginRight: 10 }}>
                                            {dataitem.ColabgroupId && <PopUpdetailitemSearch inDetailItemId={inDetailItemId} ColabgroupId={dataitem.ColabgroupId} index={1} />}
                                        </div>
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
                                                className='input-box' style={{ marginRight: 10, width: 450 }} />
                                        </div>
                                    </div>
                                    <Button variant="contained" onClick={() => isUpdateDetail()}>อัพเดท</Button>
                                </div>
                                <div className='layout-flex-line'>
                                    <div style={{ width: 150 }}>
                                        <label>อธิบายแก้ไข</label>
                                    </div>
                                    <div >
                                        <textarea
                                            name='notedetail'
                                            value={dataNote}
                                            onChange={(e) => setDataNote(e.target.value)}
                                            className='input-box' style={{ marginRight: 10, width: 450, height: 50 }} />
                                    </div>
                                    {/* <textarea /> */}
                                </div>
                            </div>

                            {props.noteallist.length != 0 &&
                                <div style={{ width: '100%', backgroundColor: '#E3DEDA', fontSize: 12, padding: 10 }}>
                                    {props.noteallist.map((item, index) => (
                                        <div style={{ width: '100%' }} className='layout-flex-line'>
                                            {item.typenote == '1' ? <label style={{ width: 200, color: '#155DFC' }}>ข้อมูลเดิม</label> : <label style={{ width: 200, color: '#1F7A55' }}>ข้อมูลใหม่</label>}
                                            {item.typenote == '1' ?
                                                <div style={{ width: '100%' }} className='layout-flex-line'>
                                                    <div style={{ width: '20%' }}>
                                                        <label style={{ marginRight: 10 }}>ชื่อกลุ่ม :</label>
                                                        <label>{item.typeProduct} </label>
                                                    </div>
                                                    <div style={{ width: '20%' }}>
                                                        <label style={{ marginRight: 10 }}> Item Id :</label>
                                                        <label>{item.itemId} </label>
                                                    </div>
                                                    <div style={{ width: '50%' }}>
                                                        <label style={{ marginRight: 10 }}>Item Name :</label>
                                                        <label>{item.itemName}</label>
                                                    </div>
                                                </div> : <div style={{ width: '100%' }} className='layout-flex-line'>
                                                    <div style={{ width: '20%' }}>
                                                        <label style={{ marginRight: 10 }}>ชื่อกลุ่ม :</label>
                                                        <label>{item.typeProduct} </label>
                                                    </div>
                                                    <div style={{ width: '20%' }}>
                                                        <label style={{ marginRight: 10 }}> Item Id :</label>
                                                        <label>{item.itemId} </label>
                                                    </div>
                                                    <div style={{ width: '50%' }}>
                                                        <label style={{ marginRight: 10 }}>Item Name :</label>
                                                        <label>{item.itemName}</label>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    ))}
                                </div>
                            }
                            <div>
                                {datadetail.length >= 0 &&
                                    <DataGrid
                                        getRowId={getRowId}
                                        rows={datadetail}
                                        columns={columns}
                                    />
                                }
                            </div>
                        </div>

                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color='success' autoFocus onClick={() => confirmSave()} >
                        Save Chenge
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}

export default PopUpEditjournalitem

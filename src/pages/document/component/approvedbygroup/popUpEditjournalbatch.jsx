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
import { toast } from 'react-toastify';

import PopUpbatchversiongroup from '../newDocument/Editcomponent/popUpbatchversiongroup';
import { DataGrid } from '@mui/x-data-grid';
import { UpdateDetailBatch, NewNotereject } from './functionReject';

import { ApprovedGroupSend } from '../aprovedStatusAll/ApprovedFunction';

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

const PopUpEditjournalbatch = (props) => {

    const useIds = sessionStorage.getItem('userId')
    const [open, setOpen] = useState(false);
    const [dataitem, setDataItem] = useState([]);
    const [datadetail, setDatadetail] = useState([]);

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

    const [batchlast, setBatchlast] = useState([]);
    const [dataNote, setDataNote] = useState("");


    const FetchApis = new FetchApi();

    const handleClickOpen = () => {
        setOpen(true);
        getdetailList()
        console.log(props.noetelistbatch);
        setBatchlast(props.noetelistbatch[1].numbers)
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
                    console.log(res.data)
                    res.data.forEach(item => {
                        if (item.BatchNo == props.noetelistbatch[1].numbers) {
                            setDatadetail(prev => [...prev, item]);
                        }
                    });

                }
            })
        });

    }

    function isUpdateDetail() {


        if (databatchlist[0].numbers == "") {
            window.alert('คุณยังไม่ได้เลือก item update ?')
        } else {
            databatchlist.forEach(jourlist => {
                setDatadetail(prev =>
                    prev.map(datalist =>
                        datalist.TypeBatch == jourlist.TypeBatch ? {
                            ...datalist,
                            Batch1: jourlist.batchName1,
                            Batch2: jourlist.batchName2,
                            BatchDetail1: jourlist.batchDetail1,
                            BatchDetail2: jourlist.batchDetail2,
                            BatchExample1: jourlist.batchExample1,
                            BatchExample2: jourlist.batchExample2,
                            BatchNo: jourlist.numbers,
                            TypeBatch: jourlist.TypeBatch
                        } : datalist));

                if (jourlist.TypeBatch == '1') {
                    props.noetelistbatch[1].batchDetail1 = jourlist.batchDetail1
                    props.noetelistbatch[1].batchDetail2 = jourlist.batchDetail2
                    props.noetelistbatch[1].batchExample1 = jourlist.batchExample1
                    props.noetelistbatch[1].batchExample2 = jourlist.batchExample2
                    props.noetelistbatch[1].batchName1 = jourlist.batchName1
                    props.noetelistbatch[1].batchName2 = jourlist.batchName2
                    props.noetelistbatch[1].numbers = jourlist.numbers
                }
                else if (jourlist.TypeBatch == '2') {
                    props.noetelistbatch[2].batchDetail1 = jourlist.batchDetail1
                    props.noetelistbatch[2].batchDetail2 = jourlist.batchDetail2
                    props.noetelistbatch[2].batchExample1 = jourlist.batchExample1
                    props.noetelistbatch[2].batchExample2 = jourlist.batchExample2
                    props.noetelistbatch[2].batchName1 = jourlist.batchName1
                    props.noetelistbatch[2].batchName2 = jourlist.batchName2
                    props.noetelistbatch[2].numbers = jourlist.numbers
                }


            })





        }

    }

    const getBatchproduct = (index, val) => {
        setDatabatchlist(val)
    }


    const columns = [
        { field: 'JournalCode', headerName: 'Journal Code', width: 150 },
        { field: 'PkDescription', headerName: 'Description', width: 200 },
        { field: 'TypeBatch', headerName: 'TypeBatch', width: 100 },
        { field: 'Batch1', headerName: 'Batch1', width: 200 },
        { field: 'BatchExample1', headerName: 'BatchExample1', width: 200 },
        { field: 'Batch2', headerName: 'Batch2', width: 200 },
        { field: 'BatchExample2', headerName: 'BatchExample2', width: 200 },

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

        if (batchlast == databatchlist[1].numbers) {
            window.alert('คุณยังไม่ได้ทำการ อัพเดทข้อมูลตัวล่าสุด กรุณาตรวจสอบอีกครั้ง ')
            return
        }

        if (dataNote == "") {
            window.alert('คุณยังไม่ได้เพิ่มคำอธิบาย แก้ไข ?');
            return
        }

        if (datadetail.length == 0) {
            window.alert('คุณยังไม่ได้เลือกข้อมูลในการแก้ไข ?');
            return
        } else {
            var datanote = {
                groupId: props.noetelistbatch[1].journalgroupId,
                notedetail: dataNote,
                rejectBy: useIds,
                stateflow: "1",
                jourstatus: "R1002",
            }

            props.noetelistbatch.forEach(item => {
                console.log(item)
                FetchApis.FethcUpdate(`/notejournalgroup/updateNoteBatchById/${item.batchId}`, item).then(res => {
                    if (res) {
                        console.log(res);
                    }
                })
            });

            UpdateDetailBatch(datadetail)
            NewNotereject(datanote);

            for (let index = 0; index < props.datajournal.length; index++) {
                const element = props.datajournal[index];
                getFlowstatus(element);
            }

            setOpen(false);
            setTimeout(() => {
                window.location.href = '/approvedGroup';
            }, 1750);

            toast.success('รอสักครู่ กำลังโหลดข้อมูล !', {
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
                    แก้ไขข้อมูล Batch
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
                                <div style={{ marginTop: 1 }}>
                                    <div style={{ width: '100%', justifyContent: 'space-between', display: 'flex' }} className='layout-flex-line'>
                                        <PopUpbatchversiongroup getBatchproduct={getBatchproduct} index={''} JournalCode={''} />
                                        <Button variant="contained" onClick={() => isUpdateDetail()}>อัพเดท</Button>
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
                                                        value={item.batchName2}
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
                                </div>

                            </div>

                            {
                                props.noetelistbatch.length > 0 && <div style={{ fontSize: 12 }}>
                                    {props.noetelistbatch.map((item, index) => (
                                        <div style={{ width: '100%' }}>

                                            <div>
                                                <label style={{ marginRight: 10 }}>รูปแบบที่ {item.numbers}</label>
                                                {item.typenote == '1' ? <label style={{ width: 200, color: '#155DFC' }}>ข้อมูลเดิม</label> : <label style={{ width: 200, color: '#1F7A55' }}>ข้อมูลใหม่</label>}
                                            </div>

                                            <div className='layout-flex-line' style={{ width: '100%' }}>
                                                <div className='layout-flex-line' style={{ width: '35%' }}>
                                                    <div style={{ width: 150 }}>
                                                        {item.TypeBatch == '1' && <label>( ยิงบนบรรจุภัณฑ์  )</label>}
                                                        {item.TypeBatch == '2' && <label>( ยิงบนกล่องนอก )</label>}
                                                    </div>
                                                    <div>
                                                        <label style={{ marginRight: 10, width: 200 }}>{item.batchName1}</label>
                                                    </div>
                                                </div>
                                                <div className='layout-flex-line' style={{ width: '45%' }}>
                                                    <div style={{ width: 65 }}>
                                                        <label>อธิบาย 1</label>
                                                    </div>
                                                    <div style={{ marginRight: 10 }}>
                                                        <label style={{ marginRight: 10, width: 200 }}>{item.batchDetail1}</label>
                                                    </div>
                                                </div>
                                                <div className='layout-flex-line' style={{ width: '20%' }}>
                                                    <div style={{ marginRight: 10 }}>
                                                        <label>ตัวอย่าง</label>
                                                    </div>
                                                    <div >
                                                        <label style={{ marginRight: 10, width: 200 }}>{item.batchExample1}</label>
                                                    </div>
                                                </div>
                                            </div>
                                            {item.batchName2 !== '' &&
                                                <div className='layout-flex-line' style={{ marginTop: 1 }}>
                                                    <div className='layout-flex-line' style={{ width: '35%' }}>
                                                        <div style={{ width: 150 }}></div>
                                                        <div>
                                                            <label style={{ marginRight: 10, width: 200 }}>{item.batchName2}</label>
                                                        </div>
                                                    </div>

                                                    <div className='layout-flex-line' style={{ width: '45%' }}>
                                                        <div style={{ width: 65 }}>
                                                            <label>อธิบาย 2</label>
                                                        </div>
                                                        <div style={{ marginRight: 10 }}>
                                                            <label style={{ marginRight: 10, width: 200 }}>{item.batchDetail2}</label>
                                                        </div>
                                                    </div>
                                                    <div className='layout-flex-line' style={{ width: '20%' }}>
                                                        <div style={{ marginRight: 10 }}>
                                                            <label>ตัวอย่าง</label>
                                                        </div>
                                                        <div >
                                                            <label style={{ marginRight: 10, width: 200 }}>{item.batchExample2}</label>
                                                        </div>
                                                    </div>
                                                </div>}
                                            {item.typenote == '1' && <hr></hr>}
                                        </div>
                                    ))}
                                </div>
                            }


                            <div>
                                {props.noetelistbatch.length >= 0 &&
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

export default PopUpEditjournalbatch

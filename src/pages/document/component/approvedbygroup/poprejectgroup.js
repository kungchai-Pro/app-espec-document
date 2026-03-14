import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FetchApi from '../../../customhooks/Functionapi';
import { RejectGrouplist } from './functionReject';
import { toast } from 'react-toastify';

import Swal from 'sweetalert2';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Poprejectgroup = (props) => {
    const FetchApis = new FetchApi();
    const UserId = sessionStorage.getItem("userId");
    const [open, setOpen] = React.useState(false);
    const [inputText, setInputText] = useState("");

    const [listdata, setListdata] = useState([]);
    const [journallist, setJournallist] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
        getjournalgrouplist()
    };
    const handleClose = () => {
        setOpen(false);
    };

    function getjournalgrouplist() {
        FetchApis.FethcGet(`/JournalBygroup/journalgroupBycode/${props.jourId}`).then(res => {
            if (res) {
                var datacall = res.data[0];
                setListdata(datacall)
                setJournallist(res.data)
            }
        });
    }


    function saverejct() {

        var objectnote = {
            groupId: props.jourId,
            notedetail: inputText,
            rejectBy: UserId,
            stateflow: listdata.stateflow,
            jourstatus: "R1001"
        }

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
                console.log(objectnote);

                FetchApis.FethcPost(`/noterejectgroup/NoteRejectgroup`, objectnote).then(res => {
                    console.log(res)
                    if (res) {
                        RejectGrouplist(journallist, UserId)
                        setTimeout(() => {
                            setOpen(false);
                            window.location.href = '/approvelist'
                        }, 3500);
                    }
                })

                toast.success('รอสักครู่ กำลังโหลดข้อมูล!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    // transition: Bounce,
                });

            }
        });

        setOpen(false);

    }


    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen} style={{ marginLeft: 10 }} color='warning'>
                reject
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    อธิบายรายละเอียดการ Reject
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
                    <div style={{ width: 500, height: 150 }}>
                        <textarea style={{ width: 500, height: 150 }} maxLength={350} value={inputText}
                            onChange={(e) => setInputText(e.target.value)} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => saverejct()} variant="outlined" color='success'>
                        Save
                    </Button>
                    <Button autoFocus onClick={handleClose} variant="outlined" color='warning'>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    )
}

export default Poprejectgroup
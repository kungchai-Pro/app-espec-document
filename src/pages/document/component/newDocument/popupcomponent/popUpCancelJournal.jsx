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
import FetchApi from '../../../../customhooks/Functionapi';
import Swal from 'sweetalert2';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const PopUpCancelJournal = (props) => {

    const FetchApis = new FetchApi();
    const [open, setOpen] = React.useState(false);

    const [textNote, setTextNote] = useState("");


    const handleClickOpen = () => {
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);
        setTextNote("")
    };

    function handleCancelJournal() {

        const data = {
            documentId: props.jourId,
            detaillist: textNote,
            comfrimby: sessionStorage.getItem("userId")
        }
        setOpen(false);

        if (textNote === "") {
            alert("กรุณากรอกเหตุผลในการยกเลิกเอกสาร")
        } else {
            Swal.fire({
                title: "แจ้งการยกเลิกเอกสาร?",
                text: "คุณแน่ใจที่ยกเลิกเอกสาร ใช่หรือไม่ !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "ยกเลิกเอกสาร",
                cancelButtonText: 'ยกเลิก'
            }).then((result) => {
                if (result.isConfirmed) {
                    FetchApis.FethcPost(`/notecancel/createNoteCancel`, data).then((res) => {
                    console.log(res)
                        if (res.status === 200) {
                            console.log("ยกเลิกเอกสารสำเร็จ")
                            
                            updateActionJournal()
                            //  window.location.href = "/documents"
                        }
                    })
                }
            });
        }
    }

    const updateActionJournal = () => {
            const data = {
                StandardCode: props.StandardCode,
                Revise: props.Revise  
            }

        FetchApis.FethcUpdate(`/document/updateDacumentStatusCancel/${props.jourId}`, data).then((res) => {
            if (res.status === 200) {
                console.log("อัพเดทสถานะเอกสารสำเร็จ")
                // handleClose();
                setTimeout(() => {
                window.location.href = "/documents"
                handleClose();
                }, 500);
                
            }
        }
    );
    }

    const handleChangeText = e => {
        var input = e.target.value;
        const cleanInput = input.replace(/[^a-zA-Z0-9ก-๙\s()#/.%:";,=\-&@$<>+*/?!]/g, "");
        setTextNote(cleanInput);
    };

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen} color="error" style={{ marginRight: 5 }}>
                ยกเลิกเอกสาร
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    คุณต้องการยกเลิกเอกสารหรือไม่
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
                    <Typography gutterBottom>
                        
                        <textarea placeholder="กรุณากรอกเหตุผลในการยกเลิกเอกสาร"
                            onChange={(e) => handleChangeText(e)}
                            style={{ width: 450, height: "100px" }} />
                    </Typography>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => handleCancelJournal()} variant="contained" color="error">
                        ยกเลิกเอกสาร
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}

export default PopUpCancelJournal

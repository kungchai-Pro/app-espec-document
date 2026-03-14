import * as React from 'react';
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

 const PopViewCancelJournal = (props) => {
    const FetchApis = new FetchApi();
    const [open, setOpen] = React.useState(false);
    const [noteCancelList, setNoteCancelList] = React.useState([]);

    const handleClickOpen = () => {
        setOpen(true);
        getNoteCancellist()
    };

    const handleClose = () => {
        setOpen(false);
    };

    function getNoteCancellist() {
        FetchApis.FethcGet(`/notecancel/getNoteCancelByDocumentId/${props.jourId}`).then((res) => {
             console.log(res)
             if (res.status === 200) {
                 console.log("ดึงข้อมูลสำเร็จ")
                 // handleClose();
                 setNoteCancelList(res.data);
             }
             else {
                 console.log("ดึงข้อมูลไม่สำเร็จ")
             }
         }
     );
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                เหตุผลการยกเลิกเอกสาร
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    เหตุผลการยกเลิกเอกสาร
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
                    {/* {JSON.stringify(noteCancelList)} */}
                    <div style={{width:500}}>
                        {noteCancelList.map((item, index) => (
                            <div key={index}>
                                <Typography gutterBottom>
                                    รายละเอียด: {item.detaillist}
                                </Typography>
                                <Typography gutterBottom>
                                    ยืนยันโดย: {item.NameCancel}
                                </Typography>
                                <Typography gutterBottom>
                                    วันที่: {item.timestamp}
                                </Typography>
                            </div>
                        ))}
                    </div>  
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}

export default PopViewCancelJournal;
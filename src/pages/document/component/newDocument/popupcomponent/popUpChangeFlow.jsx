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
import Slide from '@mui/material/Slide';
import { objectHearder, ItmeTypeID } from '../../newDocument/objectdata/typeobject';
import FetchApi from '../../../../customhooks/Functionapi';

const d = new Date();
let  convertdate=""
let convertmonth=d.getMonth()+1;
if(d.getDate() <10){
  convertdate="0"+d.getDate();
}
else{
    convertdate=d.getDate();
}
if(d.getMonth()+1<10){
  convertmonth="0"+convertmonth
}else{
    convertmonth=convertmonth
}
var timestampsnow=d.getFullYear()+"-"+convertmonth+"-"+convertdate+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
var timestampsDate=d.getFullYear()+"-"+convertmonth+"-"+convertdate;


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function PopUpChangeFlow(props) {
    const FetchApis = new FetchApi()
    const [open, setOpen] = React.useState(false);
    const [dataHearder, setDataHearder] = React.useState(objectHearder)
    const [saleapproved, setSaleapproved] = React.useState([]);
    const [flowrunList, setFlowrunList] = React.useState([]);
    const [dataidFlwo, setDataidFlow] = React.useState("")

    React.useEffect(() => {
        getsaleapproved();
        getJournalById();

    }, [])

    const getJournalById = () => {
        FetchApis.FethcGet(`/document/DocumentById/${props.jourId}`).then(res => {
            if (res) {
                setDataHearder(res.data[0])
                setDataidFlow(res.data[0].FlowrunId)
            }

        })
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

        setDataHearder({ ...dataHearder, FlowrunId: val });
    }

    const handleChangeSale = (e) => {
        var val = e.target.value;
        setDataHearder({
            ...dataHearder, SaleAckUserID: val
        })

        FetchApis.FethcGet(`/flowsystem/flowbyNamelist/${val}`).then(res => {
            if (res) {
                if (res) {
                    setFlowrunList(res.data);
                }

            }
        })

    };

    // update 
    const isUpdateJournal = () => {
        // dataHearder.JournalID
        if (dataidFlwo == dataHearder.FlowrunId) {
            alert("ยังไม่ได้เลือก flow ใหม่")


        } else {
        //  console.log(dataHearder.JournalID+"3")
            var object={
                id:dataHearder.JournalID, 
                jourcode:dataHearder.JournalCode,
                flowid:dataHearder.FlowrunId,
                userchang:dataHearder.UserIDConfirm,
                salename:dataHearder.SaleAckUserID,
                stamptimeUpdate:timestampsnow
            }
            // console.log(object)
            FetchApis.FethcPost(`/document/updateDocumentChengeFlow`,object).then(res => {
                if (res.status == 200) {
                    setTimeout(() => {
                        window.location.href = '/documents'
                    }, 1000);
                    // console.log(res)    
                    setTimeout(() => {
                        setOpen(false);
                    }, 800);

                } else {
                    console.log(res)
                }

            })
        }

    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    const isSave=()=>{
         isUpdateJournal();
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Change flow
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                TransitionComponent={Transition}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} color='red' id="customized-dialog-title">
                    แจ้งเตือน คุณแน่ใจที่จะเปลี่ยน ผู้อนุมัติ
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
                    <div className='row-pace-w100-line' style={{ marginTop: 10 }}>
                        <div style={{ width: 200, fontWeight: '800' }}>
                            <label >ชื่อผู้ร้องขอ</label>
                        </div>
                        <div style={{ width: '100%' }}>
                            <select name="saleapproved" id="saleapproved"
                                onChange={(e) => handleChangeSale(e)}
                                style={{ width: 150 }}>

                                <option value={dataHearder.SaleAckUserID} >{dataHearder.SaleAckUserID == "" ? "เลือกผู้อนุมัติ" : dataHearder.SaleAckUserID}</option>
                                {saleapproved.map((item, index) => (
                                    <option value={item.flowName}>{item.flowName}</option>
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
                                <option value={dataHearder.FlowrunId}>{dataHearder.flowDetail}</option>
                                {flowrunList.map((item, index) => (
                                    <option value={item.flowId}>{item.detail}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={isSave}>
                        Save change
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
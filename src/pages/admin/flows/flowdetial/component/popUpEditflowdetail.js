import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import FetchApi from '../../../../customhooks/Functionapi';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PopUpEditflowdetail({Id}) {
    const FetchApis = new FetchApi();
    const [documentStatusType, setDocumentStatusType] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [open, setOpen] = React.useState(false);

    const [flowdata, setFlowdata] = useState({
        statusType: "", // darft ,view , approved
        departmentType: ""
    })

    const handleClickOpen = () => {
        setOpen(true);
        getStatusType()
        getDepartment()
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getStatusType = () => {
        FetchApis.FethcGet(`/typestatus/typestatusListall`).then(res => {
            if (res.status == 200) {
                setDocumentStatusType(res.data);
            }

        })
    }

    const getDepartment = () => {

        FetchApis.FethcGet(`/department/departmentListall`).then(res => {
            if (res.status == 200) {
                setDepartmentList(res.data)
            }
        })
    }

    const isClangeDepartment = (e) => {
        setFlowdata({ ...flowdata, departmentType: e })
        // getUserById(e)
    }


    const isSave = () => {

        if (flowdata.departmentType == "" || flowdata.statusType == "") {
            alert('ไม่สามารถลบได้เนื่องจากยังไม่ข้อมูล User')

        } else {

            FetchApis.FethcUpdate(`/flowdetail/updateflowdetailById/${Id}`, flowdata).then(res => {
                if (res.status == 200) {
                    alert('คุณได้อัพเดทเรียบร้อยแล้ว')
                    setTimeout(() => {
                        window.location.reload();
                    }, 1200);
                }

            })

        }
    }


    return (
        <React.Fragment>
            <Button variant="outlined" color='warning' onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog
                open={open}
                slots={{
                    transition: Transition,
                }}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"แก้ไขข้อมูล Flow detail "}</DialogTitle>
                <DialogContent>
                    <div className='top'>
                        <div style={{ width: '100%' }}>

                            <div style={{ display: 'flex', margin: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <label>กลุ่มสถานะ</label>
                                <select className='input-box' onChange={(e) => setFlowdata({ ...flowdata, statusType: e.target.value })}>
                                    <option value={""}>เลือกสถานะ ...</option>
                                    {documentStatusType.map((item, i) => (
                                        <option value={item.typecode}>{item.typename}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ display: 'flex', margin: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <label >แผนก</label>
                                <select className='input-box' onChange={(e) => isClangeDepartment(e.target.value)}>
                                    <option value={""}>เลือกแผนก ...</option>
                                    {departmentList.map((item, i) => (
                                        <option value={item.departmentcode}>{item.departmentname}</option>
                                    ))}
                                </select>
                            </div>
                            {/* <Button variant="contained" color="success" onClick={() => isSave()}>บันทึก</Button> */}
                        </div>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => isSave()}>บันทึก</Button>
                    <Button onClick={handleClose}>ยกเลิก</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
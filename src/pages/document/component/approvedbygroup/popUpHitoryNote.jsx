import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import FetchApi from '../../../customhooks/Functionapi';


const PopUpHitoryNote = (props) => {
    const [open, setOpen] = React.useState(false);
    const FetchApis = new FetchApi()
    const [datalist, setDatalist] = useState([])

    const handleClickOpen = () => {
        setOpen(true);
        getHitoryNotelist()
    };
    const handleClose = () => {
        setOpen(false);
    };

    function getHitoryNotelist() {
        console.log(props.jordata[0].journalGroupID)
        FetchApis.FethcGet(`/noterejectgroup/getnoteRejectIdgroup/${props.jordata[0].journalGroupID}`).then(res => {

            if (res) {
                setDatalist(res.data)
                // console.log(res)
            }
        })
    }

    return (
        <React.Fragment>
            <Button variant="contained" color='info' onClick={handleClickOpen}>
                ประวัติเอกสาร
            </Button>
            <Dialog
                fullWidth={'lg'}
                maxWidth={'lg'}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    <label style={{ padding: 10, backgroundColor: '#D5EDDA', borderRadius: 10 }}>ประวัติเอกสาร</label>
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <div>
                            {datalist.map((item, index) => (
                                <div>
                                    <div>
                                        {item.jourstatus == 'R1001' ?
                                            <div style={{ margin: 10 }}>
                                                <div>
                                                    <div>
                                                        <label style={{color:'#0C6BF0'}}>ผู้แจ้ง : {item.UserReject}</label>
                                                    </div>
                                                    <div style={{ marginLeft: 20 }}>
                                                        <label style={{fontSize:13}}>: {item.notedetail}</label>
                                                    </div>
                                                    <div style={{ marginLeft: 10 }}>
                                                        <label style={{fontSize:12}}>วันที่ : {item.datestamp}</label>
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>
                                            : <div>
                                                <div>
                                                    <div>
                                                        <label style={{color:'#057D50'}}>ผู้ตอบ : {item.UserReject}</label>
                                                    </div>
                                                    <div style={{ marginLeft: 20 }}>
                                                        <label style={{fontSize:13}}>: {item.notedetail}</label>
                                                    </div>
                                                    <div style={{ marginLeft: 10 }}>
                                                        <label style={{fontSize:12}}>วันที่ : {item.datestamp}</label>
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>
                                        }
                                    </div>
                                </div>
                            ))}
                            {/* {JSON.stringify(datalist)} */}
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default PopUpHitoryNote
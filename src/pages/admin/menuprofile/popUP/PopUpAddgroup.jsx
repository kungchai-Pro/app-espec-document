import React, { useState, useEffect } from "react";

import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { DataGrid } from "@mui/x-data-grid";
// import { Columns } from './columnmenulist';
import FetchApi from "../../../customhooks/Functionapi";
import PopUpMenuList from "./PopUpMenuList";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function PopUpAddgroup(props) {
    const FetchApis = new FetchApi()
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [datalist, setDatalist] = useState([])

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const descriptionElementRef = React.useRef(null);

    React.useEffect(() => {
        // console.log(props.Idgroup)
        getlistpromenuProfile()
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    function getlistpromenuProfile() {
        FetchApis.FethcGet(`/groupmenudetail/GroupmenudetaiByprofileId/${props.Idgroup}`).then(res => {
            if (res) {
                // console.log(res)
                setDatalist(res.data)
            }
        })
    }

    function getRowId(row) {
        return row.groupId;
    }

    function deleteMenuByid(id) {

        FetchApis.FethcDelete(`/groupmenudetail/deleteById/${id}`).then(res => {
            if (res) {
                getlistpromenuProfile();
                // setDatalist(res.data)
            }
        })

    }

    const Columns = [
        // { field: "userId", headerName: "userId", width: 70 },
        {
            field: "name",
            headerName: "ชื่อเมนู",
            width: 300,
        },
        {
            field: "Details",
            headerName: "Details",
            width: 300,
        },

        {
            field: "isActive",
            headerName: "Add Munu",
            width: 100,

            renderCell: (params) => {
                return (
                    <div style={{ flexDirection: 'row' }}>
                        <Button variant="contained" color="warning" onClick={() => deleteMenuByid(params.row.groupId)}>ลบ</Button>
                    </div>
                );
            },
        },

    ];


    return (
        <React.Fragment>
            <Button variant="outlined" color='success'
                onClick={handleClickOpen('paper')}
                style={{ marginRight: 10 }}>เพิ่มข้อมูล</Button>

            <Dialog
                fullScreen

                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                TransitionComponent={Transition}
            >
                <DialogTitle id="scroll-dialog-title">
                    <div style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>
                        <div>รายการเมนู Profile</div>
                        <div >
                            <Button onClick={handleClose}>Close</Button>
                        </div>
                    </div>

                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <div>
                        <div style={{
                            backgroundColor: '#f2f4f4', padding: 20, margin: 10,
                            justifyContent: 'space-between', width: '100%', display: 'flex', alignItems: 'center'
                        }}>
                            <div>
                                <label style={{ padding: 15, margin: 10, backgroundColor: '#2e86c1', color: '#ffff' }}>รายชื่อ เมนู</label>
                            </div>
                            <div style={{ marginRight: 20 }}>
                                <PopUpMenuList getlistpromenuProfile={getlistpromenuProfile} idprofile={props.Idgroup} />
                            </div>
                        </div>
                        <div>

                            <DataGrid
                                className="datagrid"
                                getRowId={getRowId}
                                rows={datalist}
                                columns={Columns}
                                pageSize={9}
                                rowsPerPageOptions={[9]}
                            />

                        </div>
                    </div>

                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions> */}
            </Dialog>
        </React.Fragment>
    )
}

import React, { useState, useEffect } from "react";

import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import FetchApi from "../../../customhooks/Functionapi";
import DataTable from 'react-data-table-component';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});




export default function PopUpMenuList(props) {
    const FetchApis = new FetchApi();
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const [datamenuAll, setDatamenuAll] = useState({ profileId: "", menuId: "", isupdate: "", isedit: "", isadd: "", isview: "" });
    const [menulist, setMenulist] = useState([])

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getlistmenu()
    }, [])

    function getlistmenu() {
        FetchApis.FethcGet(`/menuall/menuallListall`).then(res => {
            if (res) {

                setMenulist(res.data)
            }
        })
    }


    function inSave() {
        let index = 0;
        for (index = 0; index < datamenuAll.length; index++) {
            const element = datamenuAll[index];
            let dataall = {
                profileId: props.idprofile,
                menuId: element.menuId,
                isupdate: "",
                isedit: "",
                isadd: "",
                isview: ""
            }

            insertData(dataall)
        }

        if (datamenuAll.length == index) {
            props.getlistpromenuProfile();
            setOpen(false);
        }

    }

    async function insertData(data) {

        // console.log(data);

        await FetchApis.FethcPost(`/groupmenudetail/createGroupmenudetaillist`, data).then(res => {
            if (res) {
                // setOpen(false);
                console.log(res)
            }
        })
    }


    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);



    const columns = [
        {
            name: 'NAME',
            selector: row => row.name,
            sortable: true,
            grow: 0.5,
        },
        {
            name: 'Details',
            selector: row => row.details,
            sortable: true,
            grow: 0.5,
        }

    ];

    const handleRowSelected = React.useCallback(state => {
        setDatamenuAll(state.selectedRows)
    }, []);

    return (
        <React.Fragment>

            <Button variant="contained" color='success'
                onClick={handleClickOpen('paper')}
                style={{ marginRight: 10 }}>เพิ่มเมนู</Button>

            <Dialog
                // fullScreen
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                TransitionComponent={Transition}
            >
                <DialogTitle id="scroll-dialog-title">
                    <div style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>
                        <div>รายการเมนูทั้งหมด</div>
                        <div><Button onClick={handleClose}>Close</Button></div>
                    </div>
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <div style={{ width: 500, height: 500 }}>
                        <div style={{ width: 500 }}>
                            <DataTable
                                columns={columns}
                                data={menulist}
                                defaultSortFieldId={1} pagination
                                selectableRows
                                onSelectedRowsChange={handleRowSelected}
                            />
                        </div>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => inSave()}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

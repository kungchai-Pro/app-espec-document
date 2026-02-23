import React, { useState } from "react";

import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import FetchErp from "../../../customhooks/FunctionErp";
import './document.scss';
export default function PupUPbomList(props) {
    const FetchErps = new FetchErp();
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [bomlist, setBomlist] = useState([])

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);

        getbomlist(props.ItemId);
    };

    const getbomlist = (id) => {
        console.log(id)
        FetchErps.FethcGet(`erpstoreSpec/getbom/${id}`).then(res => {
            setBomlist(res.listall)
            console.log(res)
        })
    }


    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <React.Fragment>
            <Button variant="outlined" size="small"
               
                style={{ alignContent: 'center' }}
                onClick={handleClickOpen('paper')} >BOM</Button>

            <Dialog
                open={open}
                fullWidth={true}
                maxWidth={'xl'}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"

            >
                <DialogTitle id="scroll-dialog-title" style={{ backgroundColor: '#1278ea', color: '#ffff' }}>BOM DETAILS LIST ITEMID ({props.ItemId})</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    {bomlist.length == 0 ? <div style={{
                        flexDirection: 'row',
                        justifyContent: 'center', alignContent: 'center'
                    }}>
                        <label>ไม่พบข้อมูล BOM </label>
                    </div> : <div>
                        <table style={{ width: '100%',fontSize:12 }}>
                            <tr style={{ borderTopWidth: 1, borderColor: 'red' }}>
                                <th>NO</th>
                                <th>BOMID</th>
                                <th>NAME</th>
                                <th>ITEMBOM</th>
                                <th>ITEMNAME</th>
                                <th>INVENTLOCATIONID</th>
                                <th>BOMQTY</th>
                                <th>BOMQTYSERIE</th>
                                <th>UNITID</th>
                            </tr>
                            {bomlist.map((item, index) => (
                                <tr>
                                    <td><center>{index+1}</center></td>
                                    <td><center>{item.BOMID}</center></td>
                                    <td>{item.NAME}</td>
                                    <td> 
                                        {item.ITEMBOM}
                                        </td>
                                    <td>{item.ITEMNAME}</td>
                                    <td>{item.INVENTLOCATIONID}</td>
                                    <td><center>{item.BOMQTY}</center></td>
                                    <td><center>{item.BOMQTYSERIE}</center></td>
                                    <td><center>{item.UNITID}</center></td>
                                </tr>
                            ))}

                        </table>
                        
                    </div>}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

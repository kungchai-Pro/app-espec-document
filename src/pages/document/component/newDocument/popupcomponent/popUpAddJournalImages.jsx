import React,{useState,forwardRef} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import NewSpecJournalImage from '../NewSpecJournalImage';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { UpdateDetailList } from '../../../../customhooks/Functiondocument';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PopUpAddJournalImages(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {

        setOpen(true);
    };

    const handleClose = () => {
       UpdateDetailList(props.dataDetial)
        setTimeout(() => {
        props.getjourDetailList()
            window.location.reload();
            setOpen(false);
        }, 1000);
       
    };

    return (
        <React.Fragment>
       
            <div style={{ marginTop: 5, marginRight: 30,marginBottom:3, flexDirection: 'row', justifyContent: 'flex-end', display: 'flex' }}>
                <Button variant="outlined" size="small" startIcon={<AddBoxIcon />}  onClick={() => handleClickOpen()}>Add Image</Button>
            </div>
       
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }} >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            
                        </Typography>
                        <Button autoFocus color="inherit"  onClick={handleClose}>
                            ปิด
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <NewSpecJournalImage
                        HearderData={props.HearderData}
                        SlotNo={''}
                        ItemID={''}
                        ItemName={''}
                        JourId={''}
                        handleClose={handleClose}
                        getLoadingImages={props.getLoadingImages}
                        valDateail={props.dataDetial}
                    />
                </List>
            </Dialog>
        </React.Fragment>
    );
}
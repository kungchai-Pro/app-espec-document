import * as React from 'react';
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
import NewSpecImage from '../NewSpecImage';
import { UpdateDetailList } from '../../../../customhooks/Functiondocument';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PopUpAddImages(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log(props.valDateail)

            if (props.valDateail.length !=0) {
            
               UpdateDetailList(props.valDateail)
            }
       
        setTimeout(() => {
            props.getjourDetailList()
            setOpen(false);
        }, 1000);

    };

    return (
        <React.Fragment>
            <div style={{ marginTop: 5, marginRight: 30, marginBottom: 3, flexDirection: 'row', justifyContent: 'flex-end', display: 'flex' }}>
                <Button variant="outlined" size='small' onClick={() => handleClickOpen()}>Add Image</Button>
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
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            ปิด
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <NewSpecImage
                        HearderData={props.HearderData}
                        SlotNo={props.SlotNo}
                        ItemID={props.ItemID}
                        ItemName={props.ItemName}
                        JourId={props.JourId}
                        handleClose={handleClose}
                        getLoadingImages={props.getLoadingImages}
                        valDateail={props.valDateail}
                    />
                </List>
            </Dialog>
        </React.Fragment>
    );
}
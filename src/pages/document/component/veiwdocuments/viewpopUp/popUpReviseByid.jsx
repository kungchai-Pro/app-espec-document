import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import FetchApi from '../../../../customhooks/Functionapi';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PopUpReviseByid({ Id }) {
    const [open, setOpen] = React.useState(false);
    const [datanotelist, setDatanotelist] = React.useState([])
    const FetchApis = new FetchApi();

    React.useEffect(() => {
        getnoteByid()
    }, [])

    function getnoteByid() {
        FetchApis.FethcGet(`/document/DocumentById/${Id}`).then(res => {
            if (res) {
                // console.log(res.data[0])
                setDatanotelist(res.data[0].noteRevise);
            }
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button onClick={handleClickOpen} variant="outlined" style={{ marginRight: 5 }}>
                คำอธิบาย revise
            </Button>
            <Dialog
                fullWidth={'lg'}
                maxWidth={'md'}
                open={open}
                onClose={handleClose}
                slots={{
                    transition: Transition,
                }}
            >
                <AppBar sx={{ position: 'relative' }}>
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
                            คำอธิบาย
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            ปิด
                        </Button>
                    </Toolbar>
                </AppBar>
                <div style={{ width: '100%', height: 400 ,padding:10,backgroundColor:'#F0F3F5'}}>
                    <div style={{padding:10,backgroundColor:'#fff',height:'auto'}}> 
                        <label>{datanotelist}</label>
                    </div>
                    
                </div>
            </Dialog>
        </React.Fragment>
    );
}
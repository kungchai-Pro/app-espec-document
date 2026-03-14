import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import FetchApi from '../../../../customhooks/Functionapi';
import Stepflow from '../../document/stepflow';
import PopUpViewFlowstatus from '../../viewflowprocess/PopUpViewFlowstatus';
import PopUpChangeFlow from './popUpChangeFlow';
import { Container } from '@mui/material';
//  <PopUpViewFlowstatus jourId={params.row.JournalID} />
// import 


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const PopUpRecall = (props) => {

    const FetchApis = new FetchApi();
    const [datalist, setDatalist] = useState([])
    const[searhText,setSeahrText]=useState([])

    const { data, loading } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 10,
        maxColumns: 6,
    });

    useEffect(() => {
        getlistrecall(props.userId)
    }, [])

    function getlistrecall(Iduser) {
        FetchApis.FethcGet(`/document/DocumentApprovedlist/${Iduser}`).then(res => {

            if (res.status == 200) {
                setDatalist(res.data);
                setSeahrText(res.data)
               
            }

        })
    }


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function getRowId(row) {
        return row.JournalID;
    }


    const columns = [
        { field: 'num', headerName: 'NO', width: 90 },
        {
            field: 'JournalCode',
            headerName: 'Journal Code',
            width: 150,
            editable: true,
        },
        {
            field: 'TransDate',
            headerName: 'TransDate',
            width: 150,
            editable: true,
        },
        {
            field: 'ItemTypeID',
            headerName: 'ItemTypeID',
            // type: 'number',
            width: 150,
            editable: true,
        },
        // {
        //     field: 'CustID',
        //     headerName: 'CustID',
        //     // type: 'number',
        //     width: 150,
        //     editable: true,
        // },
        // {
        //     field: 'ItemID',
        //     headerName: 'ItemID',
        //     // type: 'number',
        //     width: 110,
        //     editable: true,
        // },
        {
            field: 'flowdetail',
            headerName: 'Flow detail',
            // type: 'number',
            width: 150,
            editable: true,
        },
        {
            field: 'Processflow',
            headerName: 'Process flow',
            sortable: false,
            width: 200,
            renderCell: (params) => {
                return (
                    <div style={{ flexDirection: 'row', alignContent: 'space-between', display: 'flex', width: 300 }}>
                        <Stepflow stateflow={params.row.stateflow} endstateflow={params.row.frstateflow}
                            statusflow={params.row.statusflow}
                            activerecieved={params.row.activerecieved}
                            activeapproved={params.row.activeapproved}
                        />
                    </div>
                )
            }

        },
        {
            field: 'Show',
            type: 'actions',
            headerName: 'flow',
            width: 200,
            cellClassName: 'actions',
            renderCell: (params) => {
                return (
                    <div> <PopUpViewFlowstatus jourId={params.row.JournalID} /></div>
                )
            }
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 200,
            cellClassName: 'actions',
            renderCell: (params) => {
                return (
                    <div style={{ flexDirection: 'row', alignContent: 'flex-start', display: 'flex' }}>
                       
                        <PopUpChangeFlow jourId={params.row.JournalID} />


                    </div>
                )
            }

        }
    ];

    const isSearchText=(e)=>{
        const query = e.target.value;

        const filteredData = searhText.filter(item => {
            return Object.values(item)
                .join('')
                .toLowerCase()
                .includes(query.toLowerCase());
        });

        setDatalist(filteredData);


    }


    return (
        <div>
            <React.Fragment>
                <div>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        change Flow
                    </Button>
                </div>

                <Dialog
                    fullScreen
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

                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleClose}>
                                ปิด
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <div style={{padding:20,margin:10}}>
                        <input type='text' name='textsearch' 
                        placeholder='ค้นหา'
                        onChange={(e)=>isSearchText(e)} style={{height:30,width:300}}/>
                        <DataGrid
                            rows={datalist}
                            getRowId={getRowId}
                            columns={columns}
                            loading={loading}
                            slots={{ toolbar: GridToolbar }}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            pageSizeOptions={[10]}
                        />
                    </div>
                </Dialog>
            </React.Fragment>
        </div>
    )
}

export default PopUpRecall

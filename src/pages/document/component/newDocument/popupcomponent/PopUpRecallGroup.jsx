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
import PopUpChangeGroupFlows from './popUpChangeGroupFlows';
import { Container } from '@mui/material';
//  <PopUpViewFlowstatus jourId={params.row.JournalID} />
// import 


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const PopUpRecallGroup = (props) => {

    const FetchApis = new FetchApi();
    const [datalist, setDatalist] = useState([])
    const [searhText, setSeahrText] = useState([])

    const { data, loading } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 10,
        maxColumns: 6,
    });

    useEffect(() => {
        getlistrecall(props.userId)
    }, [])


    function getlistrecall(Iduser) {
        FetchApis.FethcGet(`/JournalBygroup/journalGrouplistChangeByid/${Iduser}`).then(res => {

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
        // { field: 'num', headerName: 'NO', width: 90 },
        {
            field: 'journalGroupID',
            headerName: 'Group ID',
            width: 150,
            // editable: true,
        },
        {
            field: 'confirmDateTime',
            headerName: 'Confirm DateTime',
            // type: 'number',
            width: 150,
            // editable: true,
        },
        // {
        //     field: 'purposer',
        //     headerName: 'Purposer',
        //     width: 200,
        //     editable: true,
        // },
        // {
        //     field: 'userRequest',
        //     headerName: 'User Request',
        //     // type: 'number',
        //     width: 150,
        //     // editable: true,
        // },
        // {
        //     field: 'refECN',
        //     headerName: 'ref ECN',
        //     // type: 'number',
        //     width: 150,
        //     editable: true,
        // },
        {
            field: 'createName',
            headerName: 'Name Create',
            // type: 'number',
            width: 150,
            // editable: true,
        },
        {
            field: 'SaleApproved',
            headerName: 'Sale',
            // type: 'number',
            width: 150,
            // editable: true,
        },
        {
            field: 'flowdetail',
            headerName: 'flow detail',
            // type: 'number',
            width: 150,
            // editable: true,
        },
        {
            field: 'flow',
            headerName: 'Flow State',
            sortable: false,
            width: 250,
            renderCell: (params) => {
                return (
                    <div style={{ flexDirection: 'row', alignContent: 'flex-start', display: 'flex' }}>
                        <Stepflow
                            stateflow={params.row.stateflow}
                            endstateflow={params.row.endstateflow}
                            statusflow={params.row.statusflow}
                            activerecieved={params.row.activerecieved}
                            activeapproved={params.row.activeapproved}
                        />

                    </div>
                )
            }

        },
        {
            field: 'Flow',
            type: 'actions',
            headerName: 'Flow',
            width: 110,
            cellClassName: 'actions',
            renderCell: (params) => {
                return (<div>
                    <PopUpViewFlowstatus jourId={params.row.JournalID} />
                </div>)
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

                        <PopUpChangeGroupFlows jourId={params.row.journalGroupID} />


                    </div>
                )
            }

        }
    ];

    const isSearchText = (e) => {
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
                    <div style={{ padding: 20, margin: 10 }}>
                        <input type='text' name='textsearch'
                            placeholder='ค้นหา'
                            onChange={(e) => isSearchText(e)} style={{ height: 30, width: 300 }} />
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

export default PopUpRecallGroup

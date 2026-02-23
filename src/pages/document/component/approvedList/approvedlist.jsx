import React, { useState, useEffect } from 'react'
import Stepflow from './stepflow';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { IoReceiptSharp } from "react-icons/io5";
import SearchIcon from '@mui/icons-material/Search';
import PopUpViewFlowstatus from '../viewflowprocess/PopUpViewFlowstatus';
import Badge from '@mui/material/Badge';
import { BsSendCheckFill } from "react-icons/bs";
import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PageviewIcon from '@mui/icons-material/Pageview';
import Tooltip from '@mui/material/Tooltip';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FetchApi from '../../../customhooks/Functionapi';
import { Link } from 'react-router-dom';

const columns = [
    // { field: 'num', headerName: 'NO', width: 50 },
    {
        field: 'JournalCode',
        headerName: 'Journal code',
        width: 150,
        // editable: true,
    },
    {
        field: 'TransDate',
        headerName: 'TransDate',
        width: 120,
        // editable: true,
    },
    {
        field: 'ItemTypeID',
        headerName: 'ItemTypeID',
        // type: 'number',
        width: 100,
        // editable: true,
    },
    {
        field: 'CustID',
        headerName: 'CustID',
        // type: 'number',
        width: 100,
        // editable: true,
    },
    {
        field: 'ItemID',
        headerName: 'ItemID',
        // type: 'number',
        width: 110,
        // editable: true,
    },
        {
        field: 'ItemName',
        headerName: 'ItemName',
        // type: 'number',
        width: 250,
        // editable: true,
    },
    {
        field: 'statusName',
        headerName: 'status flow',
        // type: 'number',
        width: 150,
        // editable: true,
    },

    {
        field: 'Processflow',
        headerName: 'Process flow',
        sortable: false,
        width: 200,
        renderCell: (params) => {
            return (
                <div style={{ flexDirection: 'row', alignContent: 'flex-start', display: 'flex' }}>

                    <Stepflow 
                    stateflow={params.row.stateflow}
                        endstateflow={params.row.frstateflow}
                        statusflow={params.row.statusflow}
                        activerecieved={params.row.activerecieved}
                        activeapproved={params.row.activeapproved}
                    />

                </div>
            )
        }

    },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 150,
        cellClassName: 'actions',
        renderCell: (params) => {
            return (
                <div style={{ flexDirection: 'row', display: 'flex' }}>
                    {params.row.userFlowStatus == '101' && <div>
                        <Link to={`/draftAdddocuments/${params.row.JournalID}`}>
                            <Tooltip title="Add slot" placement="top-start">
                                <NoteAddIcon style={{ width: 25, height: 25 }} color='success'>Add</NoteAddIcon>
                            </Tooltip>
                        </Link>
                    </div>}
                    {params.row.statusActions == '111' && <div style={{flexDirection:'row',display:'flex'}}>
                        <Link to={`/viewdocument/${params.row.JournalID}/${params.row.statusflow}`}>
                            <Tooltip title="View" placement="top-start">
                                <PageviewIcon style={{ width: 25, height: 25 }} color="#1559D6">Veiw</PageviewIcon>
                            </Tooltip>
                        </Link>
                        <PopUpViewFlowstatus jourId={params.row.JournalID} />
                        </div>}
                    {params.row.statusActions == '101' && <div>
                        <Link to={`/viewdocument/${params.row.JournalID}/${params.row.statusActions}`}>
                            <Tooltip title="Approved" placement="top-start">
                                <BsSendCheckFill style={{ width: 25, height: 25 }} color="#1559D6">Veiw</BsSendCheckFill>
                            </Tooltip>
                        </Link>
                    </div>}

                    {params.row.statusActions== '112' && <div>
                        <Link to={`/viewdocument/${params.row.JournalID}/${params.row.statusActions}`}>
                            <Tooltip title="Recieve" placement="top-start">
                                <IoReceiptSharp style={{ width: 25, height: 25 }} color="#1559D6">Veiw</IoReceiptSharp>
                            </Tooltip>
                        </Link>
                    </div>}

                     {params.row.statusActions== '103' && <div>
                        <Link to={`/viewdocument/${params.row.JournalID}/${params.row.statusActions}`}>
                            <Tooltip title="Approved" placement="top-start">
                                <BsSendCheckFill style={{ width: 25, height: 25 }} color="#1559D6">Veiw</BsSendCheckFill>
                            </Tooltip>
                        </Link>
                    </div>}
                    {params.row.statusActions == '201' &&<div>
                        <Link to={`/editRejectdocument/${params.row.JournalID}/${params.row.statusActions}`}>
                            <Tooltip title="edit" placement="top-start">
                                <PageviewIcon style={{ width: 25, height: 25 }} color="#1559D6">Veiw</PageviewIcon>
                            </Tooltip>
                        </Link>
                        </div>}
                    {params.row.statusActions == '202' &&<div>
                        <Link to={`/editRejectdocument/${params.row.JournalID}/${params.row.statusActions}`}>
                            <Tooltip title="edit" placement="top-start">
                                <PageviewIcon style={{ width: 25, height: 25 }} color="#1559D6">Veiw</PageviewIcon>
                            </Tooltip>
                        </Link>
                        </div>}

                    {params.row.statusActions == '104' && <div style={{flexDirection:'row',display:'flex'}}>
                        <Link to={`/viewdocument/${params.row.JournalID}/${params.row.statusActions}`}>
                        <Tooltip title="veiw" placement="top-start">
                            <PageviewIcon style={{ width: 25, height: 25 }} color="#1559D6">Veiw</PageviewIcon>
                        </Tooltip>
                    </Link>
                     <PopUpViewFlowstatus jourId={params.row.JournalID} />
                    </div>
                    }


                </div>
            )
        }
    }
];


const Approvedlist = () => {

    const FetchApis = new FetchApi();
    const userId = sessionStorage.getItem('userId')
    const [journalList, setJournalList] = useState([])
    const [dataAll, setDataAll] = useState([])

    const [countInpreveiw, setCountInpreveiw] = useState(0)
    const [countPading, setCountPading] = useState(0)
    const [countReject, setCountReject] = useState(0)
    const [countRejectEdit, setCountRejectEid] = useState(0)
    const [countapproved, setCountApproved] = useState(0)

    const { data, loading } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 10,
        maxColumns: 6,
    });

    useEffect(() => {

        journalAll()
        getstatusAll()

    }, [])

    function getRowId(row) {
        return row.JournalID;
    }

    const journalAll = () => {

        FetchApis.FethcGet(`/document/DocumentByStateAll/${userId}`).then(res => {

            if (res.status == 200) {
                setJournalList(res.data);
                console.log(res.data);

                setDataAll(res.data);
            }

        })

    }

    const journalInpreview = () => {

        FetchApis.FethcGet(`/document/DocumentInpreview/${userId}`).then(res => {
            if (res.status == 200) {
                setJournalList(res.data);
                console.log(res.data);
            }

        })
    }

    const journalpanding = () => {
        FetchApis.FethcGet(`/document/DocumentPreRecieved/${userId}`).then(res => {
            if (res.status == 200) {
                setJournalList(res.data);
                console.log(res.data);
            }

        })

    }

    // ค้นหาจาก transition table
    const journalApproved = () => {
        FetchApis.FethcGet(`/document/DocumentApprovedlist/${userId}`).then(res => {

            if (res.status == 200) {
                setJournalList(res.data);

            }

        })
    }


    // ค้นหาจาก transition table
    const journalReject = () => {

        FetchApis.FethcGet(`/document/DocumentRejectlist/${userId}`).then(res => {
            if (res.status == 200) {
                setJournalList(res.data);
               

            }

        })

    }

    const journalRejectSuccess = () => {

        FetchApis.FethcGet(`/document/DocumentRejectlistsuccessful/${userId}`).then(res => {
            if (res.status == 200) {
            //    console.log(res.data);
               setJournalList(res.data);
            }
        })
    }

    async function getstatusAll() {
        await FetchApis.FethcGet(`/document/DocumentInpreview/${userId}`).then(res => { // รอ approved
            console.log(res)
            if (res.status == 200) {
                setCountInpreveiw(res.data.length)
            }

        })

        await FetchApis.FethcGet(`/document/DocumentPreRecieved/${userId}`).then(res => { // รอ recieved
            if (res.status == 200) {
                setCountPading(res.data.length)
                console.log(res.data);
            }

        })

        await FetchApis.FethcGet(`/document/DocumentApprovedlist/${userId}`).then(res => { // approved แล้ว
            console.log(res)
            if (res.status == 200) {
                setCountApproved(res.data.length)
            }

        })

        await FetchApis.FethcGet(`/document/DocumentRejectlist/${userId}`).then(res => { // รายการที่ reject กลับมา

            if (res.status == 200) {
                setCountReject(res.data.length)
                console.log(res.data);
            }
        })

        await FetchApis.FethcGet(`/document/DocumentRejectlistsuccessful/${userId}`).then(res => {
            if (res.status == 200) {
                setCountRejectEid(res.data.length);

            }

        })
    }

    const filterBySearch = (event) => {

        const query = event.target.value;
        const filteredData = dataAll.filter(item => {
            return Object.values(item)
                .join('')
                .toLowerCase()
                .includes(query.toLowerCase());
        });

        setJournalList(filteredData);
    };


    return (
        <div>
            <div style={{ width: '100%', marginTop: 50 }}>

                <div style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex', padding: 10 }}>

                    <div style={{ marginLeft: '2%', display: 'flex' }}>
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                        >
                            <IconButton sx={{ p: '10px' }} aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search Journal by Id"
                                inputProps={{ 'aria-label': 'search document' }}
                                onChange={(e) => filterBySearch(e)}

                            />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        </Paper>
                    </div>

                    <div style={{ marginRight: '5%', display: 'flex' }}>
                        <div style={{ marginRight: 5, padding: 5 }}>
                            <Button
                                onClick={() => journalAll()}
                                style={{ backgroundColor: '#272626', borderRadius: 10, padding: 5, color: '#fff' }}
                            >
                                ALL
                            </Button>
                        </div>

                        <div style={{ marginRight: 5, padding: 5 }}>
                            <Badge color="error" badgeContent={countInpreveiw} max={99}>
                                <Button
                                    onClick={() => journalInpreview()}
                                    style={{ backgroundColor: '#bfdcf5', borderRadius: 10, padding: 5, color: '#1c24a8' }}
                                >
                                    In preview
                                </Button>
                            </Badge>

                        </div>
                        <div style={{ marginRight: 5, padding: 5 }}>
                            <Badge color="error" badgeContent={countPading} max={99}>
                                <Button style={{ backgroundColor: '#f5d593', borderRadius: 10, padding: 5, color: '#ef8b1b' }}
                                    onClick={() => journalpanding()}>
                                    Pending</Button>
                            </Badge>
                        </div>
                        <div style={{ marginRight: 5, padding: 5 }}>
                            <Badge color="primary" badgeContent={countapproved} max={99}>
                                <Button
                                    onClick={() => journalApproved()}
                                    style={{ backgroundColor: '#abecdc', borderRadius: 10, padding: 5, color: '#398d27' }}>

                                    <lalbel >Approved</lalbel>
                                </Button>
                            </Badge>
                        </div>
                        <div style={{ marginRight: 5, padding: 5 }}>
                            <Badge color="error" badgeContent={countReject} max={99}>
                                <Button
                                    onClick={() => journalReject()}
                                    style={{ backgroundColor: '#f7a893', borderRadius: 10, padding: 5, color: '#f14c1f' }}>
                                    Reject
                                </Button>
                            </Badge>
                        </div>
                        <div style={{ marginRight: 5, padding: 5 }}>
                            <Badge color="error" badgeContent={countRejectEdit} max={99}>
                                <Button
                                    onClick={() => journalRejectSuccess()}
                                    style={{ backgroundColor: '#f7a893', borderRadius: 10, padding: 5, color: '#f14c1f' }}>
                                    Reject Successful
                                </Button>
                            </Badge>
                        </div>

                    </div>

                </div>
                <div>
                    <label style={{ fontSize: 18, color: '#807c7c' }}>Total list  ( {journalList.length} ) </label>
                </div>

                <div style={{ height: 'auto', width: '100%' }}>

                    <DataGrid
                        rows={journalList}
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
            </div>
        </div>
    )
}

export default Approvedlist
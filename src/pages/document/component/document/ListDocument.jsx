import React, { useState, useEffect } from 'react'

// import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Stepflow from './stepflow';
import PageviewIcon from '@mui/icons-material/Pageview';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { BsSendCheckFill } from "react-icons/bs";
import { HiClipboardDocumentList } from "react-icons/hi2";
import RateReviewIcon from '@mui/icons-material/RateReview';
import PopUpRecall from '../newDocument/popupcomponent/PopUpRecall';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import FetchApi from '../../../customhooks/Functionapi';
import { Link } from 'react-router-dom';
// import PopUpViewFlowstatus from '../viewflowprocess/PopUpViewFlowstatus';

const columns = [
    // { field: 'num', headerName: 'NO', width: 50 },
    {
        field: 'JournalCode',
        headerName: 'Journal Code',
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
        width: 150,
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
        headerName: 'status',
        // type: 'number',
        width: 100,
               renderCell: (params) => {
            return (<div style={{ flexDirection: 'row', width: '100%',
            alignContent: 'flex-start', display: 'flex',backgroundColor: params.row.statusName=='Cancel' ? '#ED765F' : '' }}>
                    <div style={{ 
                         color: params.row.statusName=='Cancel' ? 'white' : 'black', 
                         color: params.row.statusName=='Successful' ? 'green' : 'black', 
                         padding: '5px 10px', borderRadius: 5 }}>
                        {params.row.statusName}
                    </div>
                </div>
            )
        }
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
        width: 100,
        align: 'left',
        cellClassName: 'actions',
        renderCell: (params) => {
            return (
                <div style={{ flexDirection: 'row', alignContent: 'flex-start', display: 'flex' }}>

                    {params.row.statusActions == '104' &&
                        <div style={{ flexDirection: 'row', display: 'flex' }}>
                            <Link to={`/docmentViewAll/${params.row.JournalID}`}
                                style={{ textDecoration: 'non' }}>
                                <Tooltip title="View" placement="top-start">
                                    <PageviewIcon color="primary" style={{ width: 25, height: 25 }} />
                                </Tooltip>
                            </Link>
                            {/* {params.row.activeapproved != null ?
                                <PopUpViewFlowstatus jourId={params.row.JournalID} /> : <div>
                                    <Link to={`/editdocument/${params.row.JournalID}`} style={{ textDecoration: 'non' }}>
                                        <Tooltip title="Edit" placement="top-start">
                                            <ModeEditIcon color="warning" style={{ width: 25, height: 25 }} />
                                        </Tooltip>
                                    </Link>
                                </div>} */}
                            {
                                params.row.statusName == 'Successful'&& params.row.statusActions!='111'  &&
                                <Link to={`/revisedocuments/${params.row.JournalID}`} style={{ textDecoration: 'non' }}>
                                    <Tooltip title="Revise" placement="top-start">
                                        <HiClipboardDocumentList color='green' style={{ width: 25, height: 25 }} />
                                    </Tooltip>
                                </Link>
                            }


                        </div>}


                    {params.row.statusActions == '111' &&
                        <div style={{ flexDirection: 'row', display: 'flex' }}>
                             {/* <div style={{ flexDirection: 'row', display: 'flex' }}> */}
                            <Link to={`/docmentViewAll/${params.row.JournalID}`}
                                style={{ textDecoration: 'non' }}>
                                <Tooltip title="View" placement="top-start">
                                    <PageviewIcon color="primary" style={{ width: 25, height: 25 }} />
                                </Tooltip>
                            </Link>
                            {/* </div> */}
                            <Link to={`/revisedocuments/${params.row.JournalID}`} style={{ textDecoration: 'non' }}>
                                <Tooltip title="Revise" placement="top-start">
                                    <HiClipboardDocumentList color='green' style={{ width: 25, height: 25 }} />
                                </Tooltip>
                            </Link>
                        </div>
                    }
                    {params.row.statusActions == '103' && <div style={{ flexDirection: 'row', display: 'flex' }}>
                        <Link to={`/editdocument/${params.row.JournalID}`} style={{ textDecoration: 'non' }}>
                            <Tooltip title="Edit" placement="top-start">
                                <ModeEditIcon color="warning" style={{ width: 25, height: 25 }} />
                            </Tooltip>
                        </Link>
                        <div>
                            <Link to={`/sendStatus/${params.row.JournalID}`} >
                                <Tooltip title="Send" placement="top-start">
                                    <BsSendCheckFill color='green' style={{ width: 25, height: 25 }} />
                                </Tooltip>
                            </Link>
                        </div>
                    </div>}

                    {params.row.statusActions == '201' && <div>
                        <Link to={`/rejectdocuments/${params.row.JournalID}/201`} style={{ textDecoration: 'non' }}>
                            <Tooltip title="Edit" placement="top-start">
                                <ModeEditIcon color="warning" style={{ width: 25, height: 25 }} />
                            </Tooltip>
                        </Link>
                    </div>}
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

    const [countReject, setCountReject] = useState(0)

    const [countRejectEdit, setCountRejectEid] = useState(0)

    const [countapproved, setCountApproved] = useState(0)
    const [countdraft, setCountDraft] = useState(0)
    const [countsuccessfully, setCountsuccessfully] = useState(0)


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

        FetchApis.FethcGet(`/document/DocumentAllByUserId/${userId}`).then(res => {
            if (res.status == 200) {
                setJournalList(res.data);
                setDataAll(res.data);
            }
        })

    }
    const journalDraftAll = () => {

        FetchApis.FethcGet(`/document/DocumentDraftByUserId/${userId}`).then(res => {
            if (res.status == 200) {
                setJournalList(res.data);
                setDataAll(res.data);
            }

        })

    }

    // const journalInpreview = () => {

    //     FetchApis.FethcGet(`/document/DocumentInpreview/${userId}`).then(res => {
    //         if (res.status == 200) {
    //             setJournalList(res.data);
    //         }

    //     })
    // }

    // const journalpanding = () => {
    //     FetchApis.FethcGet(`/document/DocumentPreRecieved/${userId}`).then(res => {
    //         if (res.status == 200) {
    //             setJournalList(res.data);

    //         }

    //     })

    // }

    // ค้นหาจาก transition table
    const journalApproved = () => {
        FetchApis.FethcGet(`/document/DocumentApprovedlist/${userId}`).then(res => {

            if (res.status == 200) {
                setJournalList(res.data);
                console.log(res.data)
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

    // const journalRejectSuccess = () => {

    //     FetchApis.FethcGet(`/document/DocumentRejectlistsuccessful/${userId}`).then(res => {

    //         if (res.status == 200) {
    //             setJournalList(res.data);

    //         }

    //     })


    // }

    const journalSuccessfully = async () => {
        await FetchApis.FethcGet(`/document/DocumentSuccessfullylist/${userId}`).then(res => {
            if (res.status == 200) {

                setJournalList(res.data);

            }

        })
    }

    async function getstatusAll() {

        await FetchApis.FethcGet(`/document/DocumentDraftByUserId/${userId}`).then(res => { // approved แล้ว

            if (res.status == 200) {
                setCountDraft(res.data.length)
                console.log(res.data.length)
            }

        })

        await FetchApis.FethcGet(`/document/DocumentApprovedlist/${userId}`).then(res => { // approved แล้ว

            if (res.status == 200) {
                setCountApproved(res.data.length)
            }

        })

        await FetchApis.FethcGet(`/document/DocumentRejectlist/${userId}`).then(res => { // รายการที่ reject กลับมา

            if (res.status == 200) {
                setCountReject(res.data.length)
            }

        })

        await FetchApis.FethcGet(`/document/DocumentRejectlistsuccessful/${userId}`).then(res => {
            if (res.status == 200) {
                setCountRejectEid(res.data.length);

            }

        })

        //  const journalSuccessfully = async () => {
        await FetchApis.FethcGet(`/document/DocumentSuccessfullylist/${userId}`).then(res => {
            if (res.status == 200) {
                setCountsuccessfully(res.data.length);

            }

        })
        // }
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
                        <div style={{ flexDirection: 'column', display: 'flex', marginRight: 5, padding: 5 }}>
                            <Button
                                onClick={() => journalAll()}
                                style={{ backgroundColor: '#272626', borderRadius: 10, padding: 5, color: '#fff' }}
                            >
                                All
                            </Button>

                        </div>

                        <div style={{ marginRight: 5, padding: 5 }}>
                            <Badge color="error" badgeContent={countdraft} max={99}>
                                <Button
                                    onClick={() => journalDraftAll()}
                                    style={{ backgroundColor: '#c6c4c2', borderRadius: 10, padding: 5, color: '#fff' }}
                                >
                                    DRAFT
                                </Button>
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
                            <Badge color="primary" badgeContent={countsuccessfully} max={99}>
                                <Button
                                    onClick={() => journalSuccessfully()}
                                    style={{ backgroundColor: '#82baf9', borderRadius: 10, padding: 5, color: '#ffff' }}>

                                    <lalbel >Successfully</lalbel>
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
                            <PopUpRecall userId={userId} />
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
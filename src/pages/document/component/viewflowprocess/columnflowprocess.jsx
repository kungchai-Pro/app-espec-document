import PopUpViewProcess from "./PopUpViewProcess";
import Stepflow from "../workflow/stepflow";
import { IoReceiptSharp } from "react-icons/io5";

import PopUpViewFlowstatus from '../viewflowprocess/PopUpViewFlowstatus';
import { BsSendCheckFill } from "react-icons/bs";

import PageviewIcon from '@mui/icons-material/Pageview';
import Tooltip from '@mui/material/Tooltip';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

import { Link } from 'react-router-dom';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


export const columns = [
    { field: 'num', headerName: 'NO', width: 50 },
    {
        field: 'JournalCode',
        headerName: 'Journal Number',
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
        width: 120,
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

                    <Stepflow stateflow={params.row.stateflow}
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
                    {params.row.statusActions == '111' && <div style={{ flexDirection: 'row', display: 'flex' }}>
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

                    {params.row.statusActions == '112' && <div>
                        <Link to={`/viewdocument/${params.row.JournalID}/${params.row.statusActions}`}>
                            <Tooltip title="Recieve" placement="top-start">
                                <IoReceiptSharp style={{ width: 25, height: 25 }} color="#1559D6">Veiw</IoReceiptSharp>
                            </Tooltip>
                        </Link>

                    </div>}

                    {params.row.statusActions == '103' && <div style={{ flexDirection: 'row', display: 'flex' }}>
                        {params.row.stateflow ==1&&
                        <Link to={`/editdocument/${params.row.JournalID}`} style={{ textDecoration: 'non' }}>
                            <Tooltip title="Edit" placement="top-start">
                                <ModeEditIcon color="warning" style={{ width: 25, height: 25 }} />
                            </Tooltip>
                        </Link>}

                        <div>
                            <Link to={`/sendStatus/${params.row.JournalID}`} >
                                <Tooltip title="Send" placement="top-start">
                                    <BsSendCheckFill color='green' style={{ width: 25, height: 25 }} />
                                </Tooltip>
                            </Link>
                        </div>
                    </div>}

                    {params.row.statusActions == '201' && <div>
                        <Link to={`/editRejectdocument/${params.row.JournalID}/${params.row.statusActions}`}>
                            <Tooltip title="edit" placement="top-start">
                                <PageviewIcon style={{ width: 25, height: 25 }} color="#1559D6">Veiw</PageviewIcon>
                            </Tooltip>
                        </Link>
                    </div>}
                    {params.row.statusActions == '202' && <div>
                        <Link to={`/editRejectdocument/${params.row.JournalID}/${params.row.statusActions}`}>
                            <Tooltip title="edit" placement="top-start">
                                <PageviewIcon style={{ width: 25, height: 25 }} color="#1559D6">Veiw</PageviewIcon>
                            </Tooltip>
                        </Link>
                    </div>}

                    {params.row.statusActions == '104' && <div style={{ flexDirection: 'row', display: 'flex' }}>
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
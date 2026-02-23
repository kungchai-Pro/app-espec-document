import PopUpViewProcess from "../viewflowprocess/PopUpViewProcess";
import PopUpViewFlowstatus from "../viewflowprocess/PopUpViewFlowstatus";
import PageviewIcon from '@mui/icons-material/Pageview';
import Tooltip from '@mui/material/Tooltip';
import Stepflow from "../workflow/stepflow";
import { BsSendCheckFill } from "react-icons/bs";
import { RiFileEditFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import PopUpRecallGroup from "../newDocument/popupcomponent/PopUpRecallGroup";
// JournalCode
export const columns = [
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
    {
        field: 'userRequest',
        headerName: 'User Request',
        // type: 'number',
        width: 150,
        // editable: true,
    },
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
                    {params.row.actions == '102' &&
                        <Link to={`/approvejournalgroup/${params.row.journalGroupID}/${params.row.actions}`}>
                            <Tooltip title="approved" placement="top-start">
                                <BsSendCheckFill color="primary" style={{ width: 25, height: 25 }} />
                            </Tooltip>
                        </Link>}

                    {params.row.actions == '111' &&
                        <Link to={`/approvejournalgroup/${params.row.journalGroupID}/${params.row.actions}`}>
                            <Tooltip title="view" placement="top-start">
                                <PageviewIcon color="primary" style={{ width: 25, height: 25 }} />
                            </Tooltip>
                        </Link>}

                          {params.row.actions == '203' &&
                        <Link to={`/editjournalgroup/${params.row.journalGroupID}/${params.row.actions}`}>
                            <Tooltip title="edit" placement="top-start">
                                <RiFileEditFill color="primary" style={{ width: 25, height: 25 }} />
                            </Tooltip>
                        </Link>}

                </div> 
            )
        }
    }
];
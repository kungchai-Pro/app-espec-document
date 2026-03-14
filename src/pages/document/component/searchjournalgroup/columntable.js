import PageviewIcon from '@mui/icons-material/Pageview';
import ModeIcon from '@mui/icons-material/Mode';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import PopUpJournal from './PopUpJournal';
// import PopUpEditJour from './PopUpEditJour';

export const columns = [
    { field: 'num', headerName: 'NO', width: 90 },
    {
        field: 'JournalCode',
        headerName: 'Journal Number',
        width: 150,
        // editable: true,
    },
    {
        field: 'TransDate',
        headerName: 'TransDate',
        width: 150,
        // editable: true,
    },
    {
        field: 'CustID',
        headerName: 'CustID',
        // type: 'number',
        width: 150,
        // editable: true,
    },
    {
        field: 'CustName',
        headerName: 'CustName',
        // type: 'number',
        width: 110,
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
        width: 200,
        // editable: true,
    },
    {
        field: 'action',
        headerName: 'action',
        // type: 'number',
        width: 110,
        // editable: true,
        renderCell: (params) => {
            return (
                <div style={{ flexDirection: 'row', alignContent: 'center', display: 'flex' }}>
                    <div style={{ cursor: 'pointer' }}>
                            <PopUpJournal jourId={params.row.JournalHeadID}/>
                    </div>

                </div>
            )
        }
    }


];
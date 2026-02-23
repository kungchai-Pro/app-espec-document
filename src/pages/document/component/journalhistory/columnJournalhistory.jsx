import PopUpViewProcess from "../viewflowprocess/PopUpViewProcess";
import PopUpViewFlowstatus from "../viewflowprocess/PopUpViewFlowstatus";
import Stepflow from "../workflow/stepflow";
// JournalCode
export const columns = [
    // { field: 'num', headerName: 'NO', width: 50 },
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
        width: 200,
        cellClassName: 'actions',
        renderCell: (params) => {
            return (
                <div style={{ flexDirection: 'row', alignContent: 'flex-start', display: 'flex' }}>
                    <PopUpViewProcess jourId={params.row.JournalID}/>
                    <PopUpViewFlowstatus  jourId={params.row.JournalID}/>
                </div>
            )
        }
    }
];

import PageviewIcon from '@mui/icons-material/Pageview';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
export const columns = [
  {
    field: 'JournalCode',
    headerName: 'Journal Code',
    // type: 'number',
    width: 150,
    // editable: true,
  },
    {
    field: 'ItemTypeID',
    headerName: 'Item Type',
    width: 100,
    // editable: true,
  },
  {
    field: 'confirmDateTime',
    headerName: 'DateTime',
    width: 150,
    // editable: true,
  },
  {
    field: 'CustName',
    headerName: 'Cust Name',
    // type: 'number',
    width: 250,
    // editable: true,
  },
  {
    field: 'ItemName',
    headerName: 'Item Name',
    // type: 'number',
    width: 250,
    // editable: true,
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
                    <Link to={`/docmentViewAll/${params.row.JournalID}`}>
                    <Tooltip title="View" placement="top-start">
                        <PageviewIcon color="primary" style={{ width: 25, height: 25 }} />
                    </Tooltip>
                    </Link>
                </div>
            )
        }
    }
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    // },
];
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Slide from '@mui/material/Slide';
import FetchApi from '../../../../customhooks/Functionapi';
import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function PopUpPackagi(props) {
  const [open, setOpen] = React.useState(false);
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
    FetchApis.FethcGet(`/packagingDetail/PackagingDetail`).then(res => {

      if (res.status == 200) {
        setDatalist(res.data);
        setSeahrText(res.data)

      }

    })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getRowId(row) {
    return row.packId;
  }

  const isselectPack=(datalist)=>{
    props.isGetPacklist(datalist)
    setOpen(false);
  }

  const columns = [
    {
      field: 'packCode',
      headerName: 'หรัส',
      width: 50,
      editable: true,
    },
    {
      field: 'packDetaailList',
      headerName: 'PackDetaail List',
      width: 550,
      editable: true,
    },
    {
      field: 'Show',
      type: 'actions',
      headerName: 'flow',
      width: 100,
      cellClassName: 'actions',
      renderCell: (params) => {
        return (
          <div>
           <button onClick={()=>isselectPack(params.row.packDetaailList)}>เลือก</button>
            </div>
        )
      }
    },
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
    <React.Fragment>
      <div style={{ cursor: 'pointer' }} onClick={() => handleClickOpen()}>
        <AddBoxIcon />
      </div>
      <Dialog
        // fullWidth={'md'}
        maxWidth={'lg'}
        open={open}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}
      >
        <DialogTitle>
          <label>รายละเอียดบรรจุภัณฑ์ </label>
         <input type='text' name='textsearch' 
                        placeholder='ค้นหา'
                        onChange={(e)=>isSearchText(e)} style={{height:30,width:300}}/>
        </DialogTitle>
        <DialogContent>
          <div style={{ width: '100%' ,height:550}}>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
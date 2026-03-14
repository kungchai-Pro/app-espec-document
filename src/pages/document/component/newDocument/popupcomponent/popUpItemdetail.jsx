import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import FetchErp from '../../../../customhooks/FunctionErp';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function PopUpItemdetail(props) {
  const FetchErps = new FetchErp();
  const [dataItemdatail, setDataItemdatail] = useState([]);
  const [datasearch, setDatasearch] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);

  useEffect(() => {
    GetItemDetails()
  }, [])

  function GetItemDetails() {

    FetchErps.FethcGet(`/erpstoreSpec/getItemDetails/ALL`).then(res => {
      // console.log(res.listall)

      if (res.success == true) {
        setDataItemdatail(res.listall);
        setDatasearch(res.listall)
      }

    })

  }

  const filterBySearch = (event) => {

    const query = event.target.value;

    const filteredData = datasearch.filter(item => {
      return Object.values(item)
        .join('')
        .toLowerCase()
        .includes(query.toLowerCase());
    });

    setDataItemdatail(filteredData);
  };

  const onclickCustomerDetail = (BRANDCODE,ITEMID,ITEMNAME,SPECID,SPECNAME) => {

    props.inDataCustomerDetail(BRANDCODE,ITEMID,ITEMNAME,SPECID,SPECNAME);
    setOpen(false);
  }

  const columns = [
    {
      name: 'ITEMID',
      selector: row => row.ITEMID,
      sortable: true,
      grow: 1,
    },
    {
      name: 'ITEMID',
      selector: row => row.ITEMNAME,
      sortable: true,
      grow: 3,
    },

    {
      name: 'ACTION',
      selector: row =>
        <div>
          <button onClick={() => onclickCustomerDetail(row.BRANDCODE, row.ITEMID, row.ITEMNAME,row.SPECID,row.SPECNAME)}>เลือก</button>
        </div>,
      sortable: true,
      grow: 0.5,
    },

  ];

  return (
    <div>
      <React.Fragment>
        <AddBoxIcon onClick={handleClickOpen('paper')} style={{cursor:'pointer'}} />

        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          maxWidth={'lg'}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >

          <div style={{ flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: '#4160D9', alignContent: 'end', display: 'flex' }}>
            <HighlightOffIcon style={{ width: 30, height: 30, color: '#ffff', margin: 5 }} onClick={() => handleClose()} />
          </div>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div style={{ width: 850, height: 650 }}>
              <label style={{ padding: 5 }}>Product Name List</label>
              <div>
                <input type='text'
                  onChange={(e) => filterBySearch(e)}
                  placeholder='search customer list'
                  style={{ width: '70%', margin: 5, padding: 10, height: 30 }} />
              </div>
              <DataTable columns={columns} data={dataItemdatail} defaultSortFieldId={1} pagination />
            </div>
          </DialogContentText>
        </Dialog>
      </React.Fragment>
    </div>
  )
}

export default PopUpItemdetail
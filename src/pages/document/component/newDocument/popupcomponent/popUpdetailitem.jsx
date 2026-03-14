import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import FetchErp from '../../../../customhooks/FunctionErp';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import FetchApi from '../../../../customhooks/Functionapi';
function PopUpdetailitem(props) {
  const FetchErps = new FetchErp();
  const FetchApis =new FetchApi();

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
    
      FetchErps.FethcGet(`/erpstoreSpec/getItemDetails/${props.ColabgroupId}`).then(res => {
        if (res) {
          console.log(res)
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

  const onclickCustomerDetail = (ITEMID,ITEMNAME,SPECNAME,GROSSWIDTH,GROSSDEPTH,GROSSHEIGHT,NETWEIGHT,TARAWEIGHT,GROSSWEIGHT) => {

        const Dataitem = props.dataDetial.filter(item => {
      return Object.values(item)
        .join('')
        .toLowerCase()
        .includes(ITEMID.toLowerCase());
    });

      if(Dataitem.length==1){
        alert('แจ้งเตือน มีรายการนี้อยู่แล้วไม่สามารถเพิ่มได้')
      }else{
    props.inDetailItemId(ITEMID,ITEMNAME,SPECNAME,GROSSWIDTH,GROSSDEPTH,GROSSHEIGHT,NETWEIGHT,TARAWEIGHT,GROSSWEIGHT,props.index);
  
    setOpen(false);
      }

  }

  const columns = [
    {
      name: 'ITEMID',
      selector: row => row.ITEMID,
      sortable: true,
      grow: 0.5,
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
          <button onClick={() => onclickCustomerDetail(row.ITEMID,row.ITEMNAME,row.SPECID,row.GROSSWIDTH,row.GROSSDEPTH,
            row.GROSSHEIGHT,row.NETWEIGHT,row.TARAWEIGHT,row.GROSSWEIGHT)}>เลือก</button>
        </div>,
      sortable: true,
      grow: 0.5,
    },

  ];


  return (
    <div>
      <React.Fragment>
        <AddBoxIcon onClick={handleClickOpen('paper')} style={{cursor:'pointer'}}/>

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
            <div style={{ width:800, height: 650 }}>
              <label style={{ padding: 5 }}>Item Name List {props.ColabgroupId}</label>
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

export default PopUpdetailitem
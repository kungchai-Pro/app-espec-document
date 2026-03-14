import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import FetchErp from '../../../../customhooks/FunctionErp';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

function PopUpcuEditSlot({inDataAddsolt,index}) {
    const FetchErps = new FetchErp();
    const [customerlist, setCustomerlist] = useState([]);
    const [datasearch, setDatasearch] = useState([]);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClose = () => {
        
      //  setOpen(false);
        
    };
    const handleClickOpen=()=>{
       setOpen(true); 
    }
  
    const descriptionElementRef = React.useRef(null);
    
    useEffect(() => {
        GetCustomerlist() 
    }, [])

    function GetCustomerlist() {

        FetchErps.FethcGet(`/erpstoreSpec/getPkGroup`).then(res => {
            if (res.success == true) {
                // console.log(res.listall) 
                setCustomerlist(res.listall)
                
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

        setCustomerlist(filteredData);
    };

    const onclickCustomer = (PKDESCRIPTION, COLABGROUPID) => {
        inDataAddsolt(PKDESCRIPTION, COLABGROUPID,index);
       
       
        // props.isOpenmodel(false)

        setOpen(false);
    }

    const columns = [
        {
            name: 'COLABGROUPID',
            selector: row => row.PKGROUP,
            sortable: true,
            grow: 1,
        },
        {
            name: 'PKDESCRIPTION',
            selector: row => row.PKDESCRIPTION,
            sortable: true,
            grow: 1,
        },
        // {
        //     name: 'COLABGROUPID',
        //     selector: row => row.COLABGROUPID,
        //     sortable: true,
        //     grow: 2,
        // },

        {
            name: 'ACTION',
            selector: row =>
                <div>
                    <button onClick={() => onclickCustomer(row.PKDESCRIPTION, row.COLABGROUPID)}>เลือก</button>
                </div>,
            sortable: true,
            grow: 1,
        },

    ];

    return (
        <div>
            {/* <React.Fragment> */}

                <SearchIcon onClick={()=>handleClickOpen()} style={{cursor:'pointer'}}/>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullScreen={fullScreen}
                >

                    <div style={{ flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: '#4160D9', alignContent: 'end', display: 'flex' }}>
                        <HighlightOffIcon style={{ width: 30, height: 30, color: '#ffff', margin: 5 }} onClick={() => handleClose()} />
                    </div>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <div style={{ width: 600, height: 650 }}>
                            <label style={{ padding: 5 }}>Customer List</label>
                            <div>
                                <input type='text'
                                    onChange={(e) => filterBySearch(e)}
                                    placeholder='search customer list'
                                    style={{ width: '70%', margin: 5, padding: 10, height: 30 }} />
                            </div>
                            <DataTable columns={columns} data={customerlist} defaultSortFieldId={1} pagination />
                        </div>
                    </DialogContentText>
                </Dialog>
            {/* </React.Fragment> */}
        </div>
    )
}

export default PopUpcuEditSlot
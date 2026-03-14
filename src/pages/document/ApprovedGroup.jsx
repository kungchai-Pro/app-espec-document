import React, { useState, useEffect } from 'react'
import NavbarUser from '../../components/navbar/NavbarUser'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { columns } from './component/approvedbygroup/columnapprovelist';
import PopUpRecallGroup from './component/newDocument/popupcomponent/PopUpRecallGroup';
import FetchApi from '../customhooks/Functionapi';
import { useDemoData } from '@mui/x-data-grid-generator';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import Badge from '@mui/material/Badge';

const JournalHistory = () => {
  const userId = sessionStorage.getItem('userId');

  const { data, loading } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10,
    maxColumns: 6,
  });

  const FetchApis = new FetchApi();
  const [datalist, setDatalist] = useState([])
  const [dataAll, setDataAll] = useState([])
  const [datalisttotol, setDatalisttotal] = useState(0);

  const [totalreject, setTotalreject] = useState(0);
  const [checkTypeUser, setCheckTypeUser] = useState("");

  useEffect(() => {
    getCheckStatustApproved();
    getJournalHistorylist()
    getJournalReject();
  }, [])

  const getJournalHistorylist = async () => {
    await FetchApis.FethcGet(`/JournalBygroup/journalgroupByid/${userId}`).then(res => {

      if (res.status == 200) {


        setDatalisttotal(res.data.length)
        setDatalist(res.data);
        setDataAll(res.data);
      }

    })
  }


  const getJournalReject = async () => {
    await FetchApis.FethcGet(`/JournalBygroup/journalRejectGroupByid/${userId}`).then(res => {

      if (res.status == 200) {

        setTotalreject(res.data.length)
        setDatalist(res.data);
        setDataAll(res.data);
      }

    })
  }

  const getJournalAll = async () => {
    await FetchApis.FethcGet(`/JournalBygroup/journalgrouplistByid/${userId}`).then(res => {

      if (res.status == 200) {

        setDatalist(res.data);
        setDataAll(res.data);
      }

    })
  }

  const getCheckStatustApproved = async () => {
    await FetchApis.FethcGet(`/JournalBygroup/journalgrouplistByid/${userId}`).then(res => {
      if (res.status == 200) {
        console.log(res.data[0])
        if (res.data.length > 0) {
          setCheckTypeUser(res.data[0].usertypestatus)
        }

      }

    })
  }



  function getRowId(row) {
    return row.groupId;
  }

  const filterBySearch = (event) => {

    const query = event.target.value;

    const filteredData = dataAll.filter(item => {
      return Object.values(item)
        .join('')
        .toLowerCase()
        .includes(query.toLowerCase());
    });

    setDatalist(filteredData);
  };


  return (
    <div>
      <NavbarUser />
      <main className="container mx-auto px-4 py-8" style={{ padding: 10, backgroundColor: '#f7f7f7' }}>
        <div className="mb-8 animate-fade-in">
          <div className="flex justify-between items-center" style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Approved Group List All</h1>
              <p className="text-gray-600 mt-2"> manage document search journal list </p>
              <div style={{ marginTop: 10, flexDirection: 'row', display: 'flex' }}>
                <Button variant="contained" color='#636362' style={{ marginRight: 10 }} onClick={() => getJournalAll()}>เอกสารทั้งหมด</Button>
                <div>
                  <Button variant="contained" onClick={() => getJournalHistorylist()} style={{ marginRight: 10 }}>
                    <Badge color="error" badgeContent={datalisttotol} max={99}>รายการเอกสาร revise รออนุมัติ </Badge></Button>
                </div>
                <div>
                  <Button variant="contained" onClick={() => getJournalReject()} style={{ marginRight: 50 }}>
                    <Badge color="error" badgeContent={totalreject} max={99}> รายการเอกสาร reject </Badge></Button>
                </div>
                <div>
                  {checkTypeUser == '100' && <PopUpRecallGroup userId={userId} />}
                </div>
              </div>
            </div>
            <div style={{
              backgroundColor: '#94CFBA',
              justifyContent: 'center', alignContent: 'center', padding: 5, borderRadius: 5
            }}>
              <label>รายการทั้งหมด  ( {datalist.length} )</label>
            </div>
            <div style={{
              width: 400,
              flexDirection: 'column',
              justifyContent: 'center', display: 'flex'
            }}>
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
            </div>
          </div>
        </div>
        <div>

          <div style={{ marginTop: 20 }}>
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
          {/* </Container> */}
        </div>
      </main>
    </div>
  )
}

export default JournalHistory
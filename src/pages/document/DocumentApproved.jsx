import React, { useState, useEffect } from 'react'
import NavbarUser from '../../components/navbar/NavbarUser'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { columns } from './component/journalhistory/columnJournalhistory';
import FetchApi from '../customhooks/Functionapi';
import { useDemoData } from '@mui/x-data-grid-generator';


import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

function DocumentApproved() {

  const { data, loading } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10,
    maxColumns: 6,
  });

  const FetchApis = new FetchApi();
  const [datalist, setDatalist] = useState([])
  const [dataAll, setDataAll] = useState([])

  useEffect(() => {
    getJournalHistorylist()
  }, [])

  const getJournalHistorylist = async () => {

    await FetchApis.FethcGet(`/document/JournalSuccessfullylist`).then(res => {
      if (res.status == 200) {

        setDatalist(res.data);
        setDataAll(res.data);
      }


    })
 
  }

  function getRowId(row) {
    return row.JournalID;
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
              <h1 className="text-3xl font-bold text-gray-900">Approved Successfully All</h1>
              <p className="text-gray-600 mt-2"> manage document search journal Successfully list </p>
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
              sx={{ border: 0 }}
              pageSizeOptions={[10]}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default DocumentApproved
import React, { useState, useEffect } from 'react'
import NavbarUser from '../../components/navbar/NavbarUser'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { columns } from './component/viewflowprocess/columnflowprocess';
import FetchApi from '../customhooks/Functionapi';
import { useDemoData } from '@mui/x-data-grid-generator';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

import {
    useParams
} from "react-router-dom";



function ViewFlowProcess() {

    const { data, loading } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 10,
        maxColumns: 6,
    });


    let { id } = useParams();
    const userId = sessionStorage.getItem("userId")
    const FetchApis = new FetchApi();
    const [datalist, setDatalist] = useState([])
    const[textSearch,setTextSearch]=useState([])

    useEffect(() => {
        if (id == '1') {
            jouranlall()
        }
        else if (id == '2') {
            inpreviewlist()
        } else if (id == '3') {

            approvedlist()

        } else if (id == '4') {
            // successlist()

            PreRecieved()
        } else if (id == '5') {
            successlist()
        }
    }, [])

    async function jouranlall() {

        await FetchApis.FethcGet(`/document/DocumentByStateAll/${userId}`).then(res => {

            if (res.status == 200) {

                setDatalist(res.data);
                setTextSearch(res.data)
            }

        })
    }

    async function draftlist() {

        await FetchApis.FethcGet(`/document/DocumentDraftlist/${userId}`).then(res => {
            if (res.status == 200) {
                setDatalist(res.data);
                setTextSearch(res.data)

            }

        })
    }

    async function inpreviewlist() {
        await FetchApis.FethcGet(`/document/DocumentInpreview/${userId}`).then(res => { // รอ approved
            // console.log(res);
            if (res.status == 200) {
                setDatalist(res.data);
                setTextSearch(res.data)

            }

        })
    }

    async function approvedlist() {
        await FetchApis.FethcGet(`/document/DocumentApprovedlist/${userId}`).then(res => { // approved แล้ว

            if (res.status == 200) {
                setDatalist(res.data);
                setTextSearch(res.data)
            }

        })
    }

    async function successlist() {

        await FetchApis.FethcGet(`/document/DocumentSuccessfullylist/${userId}`).then(res => {
            if (res.status == 200) {
                setDatalist(res.data);
                setTextSearch(res.data)

            }

        })
    }

    async function PreRecieved() {

        await FetchApis.FethcGet(`/document/DocumentPreRecieved/${userId}`).then(res => { // รอ recieved

            if (res.status == 200) {

                // console.log(res.data[0].stateflow)
                if (res.data.length != 0) {
                    if (res.data[0].stateflow > 1) {
                        setDatalist(res.data)
                        setTextSearch(res.data)
                    }
                    else {
                        prerecieveJournal()
                    }
                } else {
                    setDatalist(res.data)
                    setTextSearch(res.data)
                }

            }

        })
    }

    async function prerecieveJournal() {

        await FetchApis.FethcGet(`/document/DocumentDraftByUserId/${userId}`).then(res => { // รอ recieved

            if (res.status == 200) {

                setDatalist(res.data)
                setTextSearch(res.data)

            }

        })
    }

    function getRowId(row) {
        return row.JournalID;
    }

    function getSearchJournal(ev){
                console.log(ev)
            const filteredData = textSearch.filter(item => {
              return Object.values(item)
                .join('')
                .toLowerCase()
                .includes(ev.toLowerCase());
            });

            setDatalist(filteredData);
    }

    return (
        <div>
            <NavbarUser />
            <div style={{ padding: 10 }}>
                {/* <div>
                    <NavbarUser />
                </div> */}
                <div>
                    {id == '1' && <div>
                        <div style={{ backgroundColor: '#ececec' }}>
                            <h1 className="text-3xl font-bold text-gray-900">Document List All</h1>
                            <p className="text-gray-600 mt-2">Manage document workflow</p>
                            <p className="text-gray-600 mt-2" style={{ padding: 10 }}>
                                <label style={{ backgroundColor: '#edbb99', padding: 5, borderRadius: 20 }}>Total {datalist.length}</label>
                            </p>
                        </div>
                    </div>}

                    {id == '2' && <div>
                        <div style={{ backgroundColor: '#ececec' }}>
                            <h1 className="text-3xl font-bold text-gray-900">Document List Pending</h1>
                            <p className="text-gray-600 mt-2">Manage document workflow</p>
                            <p className="text-gray-600 mt-2" style={{ padding: 10 }}>
                                <label style={{ backgroundColor: '#edbb99', padding: 5, borderRadius: 20 }}>Total {datalist.length}</label>
                            </p>
                        </div>
                    </div>}

                    {id == '3' && <div>
                        <div style={{ backgroundColor: '#ececec' }}>
                            <h1 className="text-3xl font-bold text-gray-900">Document List in Approved</h1>
                            <p className="text-gray-600 mt-2">Manage document workflow</p>
                            <p className="text-gray-600 mt-2" style={{ padding: 10 }}>
                                <label style={{ backgroundColor: '#edbb99', padding: 5, borderRadius: 20 }}>Total {datalist.length}</label>
                            </p>
                        </div>
                    </div>}

                    {id == '4' && <div>
                        <div style={{ backgroundColor: '#ececec' }}>
                            <h1 className="text-3xl font-bold text-gray-900">Document List Process</h1>
                            <p className="text-gray-600 mt-2">Manage document workflow</p>
                            <p className="text-gray-600 mt-2" style={{ padding: 10 }}>
                                <label style={{ backgroundColor: '#edbb99', padding: 5, borderRadius: 20 }}>Total {datalist.length}</label>
                            </p>
                        </div>
                    </div>}

                    <div>
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                        >
                            <IconButton sx={{ p: '10px' }} aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search "
                                // inputProps={{ 'aria-label': 'search' }}
                                onChange={(e)=>getSearchJournal(e.target.value)}
                                // onChange={(e) => filterBySearch(e)}

                            />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
                            {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                                <DirectionsIcon />
                            </IconButton> */}
                        </Paper>
                    </div>

                </div>
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
            </div>
        </div>
    )
}

export default ViewFlowProcess
import React, { useEffect, useState } from 'react'
import FetchApi from '../../customhooks/Functionapi'
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import './gruopprofile.scss';
import { Button } from '@mui/material';
import PopUpAddgroup from './popUP/PopUpAddgroup';


export const userColumns = [
    // { field: "userId", headerName: "userId", width: 70 },
    {
        field: "groupname",
        headerName: "ชื่อ Profile",
        width: 300,
    },

    {
        field: "isActive",
        headerName: "Add Munu",
        width: 400,
        renderCell: (params) => {
            return (
                <div style={{ flexDirection: 'row' }}>
                    <PopUpAddgroup Idgroup={params.row.groupId}/>
                    {/* <Button variant="outlined" color='success' style={{marginRight:10}}>เพิ่มข้อมูล</Button> */}
                    <Button variant="outlined" color='warning' >ลบ</Button>
                </div>
            );
        },
    },

];




const GroupProfileAll = () => {
    const FetchApis = new FetchApi();

    const [groupMenulist, setGroupMenulist] = useState({ groupname: '', groupcode: '' });
    const [menulistProfile, setMenulistProfile] = useState([])

    useEffect(() => {
        getGroupMenulist()
    }, {})

    function getGroupMenulist(params) {
        FetchApis.FethcGet(`/groupProfile/userGroupProfileList`).then(res => {
            if (res) {
                setMenulistProfile(res.data);
            }
        })
    }

    function isSave() {
       
        FetchApis.FethcPost(`/groupProfile/createUserGroupProfile`, groupMenulist).then(res => {
            if (res) {
                getGroupMenulist()
            }
        })
    }


    function isonChange(e) {
        const { name, value } = e.target;
        setGroupMenulist({ ...groupMenulist, groupname: value })

    }

    function isClear() {
        setGroupMenulist({
            groupname: '', groupcode: ''
        })
    }

    function getRowId(row) {
        return row.groupId;
    }

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div style={{ padding: 10 }}>
                    <div style={{ padding: 10, backgroundColor: '#2c82c6', color: '#ffff', margin: 10, fontSize: 18 }}>
                        <label> สร้างกลุ่มเมนู ผู้ใช้งาน </label>
                    </div>
                    <div className="top">
                        <input type='text'
                            name='groupname'
                            value={groupMenulist.groupname}
                            onChange={(e) => isonChange(e)}

                            className='input'
                            style={{ width: '40%', marginRight: 10 }} />
                        <Button variant="contained" color='success' onClick={() => isSave()} style={{ marginRight: 10 }}>บันทึก</Button>
                        <Button variant="contained" color='warning' onClick={() => isClear()}>ยกเลิก</Button>
                    </div>
                    <div style={{ width: '50%' }}>
                        {/* {JSON.stringify(menulistProfile)} */}
                        <DataGrid
                            className="datagrid"

                            getRowId={getRowId}
                            rows={menulistProfile}
                            columns={userColumns}
                            // columns={userColumns}
                            pageSize={9}
                            rowsPerPageOptions={[9]}
                        // checkboxSelection
                        />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default GroupProfileAll

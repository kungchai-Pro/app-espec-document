import React, { useState, useEffect } from 'react'
import './component/positions.scss';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';

import { PositionColumns } from './component/positionColumn';
import FetchApi from '../../customhooks/Functionapi';
import { Button } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";

function Positions() {
  const FetchApis = new FetchApi();
  const [Position, setPosition] = useState({ positionId: "", positionname:"", positioncode:"" })
  const [PositionList, setPositionList] = useState({positionId: "", positionname:"", positioncode:""})

  useEffect(() => {
    getPositionlist();
  }, [])


  const getPositionlist = () => {

    FetchApis.FethcGet(`/position/positionListall`).then(res => {

      if (res) {
        // console.log(res.data);
          setPositionList(res.data)
      }

    })
  }


  const isSavePosition = (e) => {
     e.preventDefault()
    FetchApis.FethcPost(`/position/createposition`, Position).then(res => {
      if (res) {
        getPositionlist();

      }
    })

  }

      function getRowId(row) {
        return row.positionId;
    }

  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <form onSubmit={(e)=>isSavePosition(e)}>
          <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop:10 }}>
          <label>เพิ่มข้อมูล Position List</label>
          </div>
          <div className='datatable'>

            <div style={{ backgroundColor: '#E9EDE9', padding: 10 }}>
              <div>
                <div>
                  <label>Position Name</label>
                </div>
                <div>
                  <input type='text' name='typename' value={Position.positionname}
                    onChange={(e) => setPosition({ ...Position, positionname: e.target.value })}
                  />
                </div>

              </div>
              <div>
                <div>
                  <label>Code number</label>
                </div>
                <div>
                  <input type='text' name='typedetail' value={Position.typedetail} style={{ width: '25%' }}
                    onChange={(e) => setPosition({ ...Position, positioncode: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E9EDE9' }}>
              <div style={{ marginRight: 10 }}>
                <Button variant="contained" color='success' type='submit'>บันทึก</Button>
              </div>
              <div>
                <Button variant="contained" color='warning'>ยกเลิก</Button>
              </div>
            </div>

            <div>
              <DataGrid
                className="datagrid"
                getRowId={getRowId}
                rows={PositionList}
                columns={PositionColumns}
                // columns={userColumns}
                pageSize={9}
                rowsPerPageOptions={[9]}
              // checkboxSelection
              />
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}

export default Positions
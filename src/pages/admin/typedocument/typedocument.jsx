import React, { useState, useEffect } from 'react'
import './component/typedocument.scss';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import Newtypedocumment from './newtypedocument';
import Edittypedocumment from './edittypedocument';
import { typedocumentColumns } from './component/typedocmentColumn';
import FetchApi from '../../customhooks/Functionapi';
import { Button } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";

function Typedocument() {
  const FetchApis = new FetchApi();
  const [typedocument, setTypedocument] = useState({ typeId: "", typename: "", typedetail: "" })
  const [TypeList, setTypeList] = useState({ typeId: "", typename: "", typedetail: "" })

  useEffect(() => {
    gettypedocumentlist();
  }, [])


  const gettypedocumentlist = () => {

    FetchApis.FethcGet(`/typedocument/typeDocumentListall`).then(res => {

      if (res) {
        // console.log(res.data);
          setTypeList(res.data)
      }

    })
  }


  const isSaveType = (e) => {
     e.preventDefault()
    FetchApis.FethcPost(`/typedocument/createtypeDocument`, typedocument).then(res => {
      if (res) {
        console.log(res)
        gettypedocumentlist();

      }
    })

  }

      function getRowId(row) {
        return row.typeId;
    }

  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <form onSubmit={(e)=>isSaveType(e)}>
          <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop:10 }}>
          <label>เพิ่มข้อมูล Type Document</label>
          </div>
          <div className='datatable'>

            <div style={{ backgroundColor: '#E9EDE9', padding: 10 }}>
              <div>
                <div>
                  <label>Type Name</label>
                </div>
                <div>
                  <input type='text' name='typename' value={typedocument.typename}
                    onChange={(e) => setTypedocument({ ...typedocument, typename: e.target.value })}
                  />
                </div>

              </div>
              <div>
                <div>
                  <label>Detail</label>
                </div>
                <div>
                  <textarea type='text' name='typedetail' value={typedocument.typedetail} style={{ width: '50%' }}
                    onChange={(e) => setTypedocument({ ...typedocument, typedetail: e.target.value })}
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
                rows={TypeList}
                columns={typedocumentColumns}
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

export default Typedocument
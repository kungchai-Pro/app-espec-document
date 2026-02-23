import React ,{useState,useEffect}from 'react'
import '../department/component/department.scss';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import FetchApi from '../../customhooks/Functionapi';
import { Button } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import {DepartmentColumns}from'../department/component/departmentColumn';

function Department() {

const FetchApis =new FetchApi();
 const [Departments, setDepartments] = useState({ departmentId:"", departmentname:"", departmentcode:"" })
 const [Departmentlist, setDepartmentlist] = useState({ departmentId:"", departmentname:"", departmentcode:"" })

 useEffect(() => {
    getDepartmentlist();
  }, [])


  const getDepartmentlist = () => {

    FetchApis.FethcGet(`/department/departmentListall`).then(res => {
      if (res) {
       
          setDepartmentlist(res.data)
      }

    })
  }

  const isSaveDepartment = (e) => {
     e.preventDefault()
    FetchApis.FethcPost(`/department/createdepartment`, Departments).then(res => {
      if (res) {
        getDepartmentlist();

      }
    })

  }

      function getRowId(row) {
        return row.departmentId;
    }


  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
      
      <form onSubmit={(e) => isSaveDepartment(e)}>
        <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
          <label>เพิ่มข้อมูล Department List</label>
        </div>
        <div className='datatable'>

          <div style={{ backgroundColor: '#E9EDE9', padding: 10 }}>
            <div>
              <div>
                <label>Department Name</label>
              </div>
              <div>
                <input type='text' name='typename' value={Departments.departmentname}
                  onChange={(e) => setDepartments({ ...Departments, departmentname: e.target.value })}
                />
              </div>

            </div>
            <div>
              <div>
                <label>Code Department</label>
              </div>
              <div>
                <input type='text' name='typedetail' value={Departments.departmentcode} style={{ width: '25%' }}
                  onChange={(e) => setDepartments({ ...Departments, departmentcode: e.target.value })}
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
              rows={Departmentlist}
              columns={DepartmentColumns} 
              pageSize={9}
              rowsPerPageOptions={[9]}
            />
          </div>

        </div>
      </form>
    </div>
    </div>
  )
}

export default Department
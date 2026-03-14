
import React, { useEffect, useState } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "./userColumn";
import { Link } from "react-router-dom";
import FetchApi from '../../pages/customhooks/Functionapi';
import Swal from 'sweetalert2';

const Datatable = () => {
  const FetchApis = new FetchApi();
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState([])
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setReload(false)
    FetchApis.FethcGet(`/user/userListall`).then(res => {
      if (res) {
        setReload(true)
        setTimeout(() => {
          setData(res.data)
          setSearchText(res.data)
        }, 150);

      }

    })
  }, [])


  const handleDelete = (id) => {

    Swal.fire({
      title: "แจ้งเตือน?",
      text: "คุณต้องการ ลบข้อมูล ใช่หรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: "ยกเลิก"
    }).then((result) => {
      if (result.isConfirmed) {
        FetchApis.FethcDelete(`/user/deleteUserById/${id}`).then(res => {
          if (res.status == 200) {
            Swal.fire({
              title: "คุณได้ทำแก้ไขรหัสเรียบร้อยแล้ว",
              icon: "success",
              draggable: true
            });
            setData(data.filter((item) => item.userId !== id));
            // setTimeout(() => {
            //   window.location.reload()
            // }, 1500);
          }
        })
      }
    });



  };

  function getRowId(row) {
    return row.userId;
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/admin/users/${params.row.userId}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.userId)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const handleTextSearch=(e)=>{

    var textsearch=e.target.value;

            const filteredData = searchText.filter(item => {
            return Object.values(item)
                .join('')
                .toLowerCase()
                .includes(textsearch.toLowerCase());
        });

        setData(filteredData);

  }

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <div>
          <label> Add New User</label>
        <input type="text" name="searchText" 
        placeholder="ค้นหาข้อมูล"
        onChange={(e)=>handleTextSearch(e)} className="input-box" style={{width:350}}/> 
        </div>
        <Link to="/admin/users/new" className="link">
          Add New
        </Link>
      </div>
      {reload != true ? <div>loading data</div> :
        <DataGrid
          className="datagrid"

          getRowId={getRowId}
          rows={data}
          columns={userColumns.concat(actionColumn)}
          // columns={userColumns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />}
    </div>
  );
};

export default Datatable;

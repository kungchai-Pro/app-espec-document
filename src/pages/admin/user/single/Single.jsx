import React, { useState, useEffect } from "react";
import "./single.scss";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Navbar from "../../../../components/navbar/Navbar";
import FetchApi from "../../../customhooks/Functionapi";
import Edit from "../edit/edit";
import Swal from 'sweetalert2';
import {
  useParams
} from "react-router-dom";
import { Button, Select } from "@mui/material";

const Single = () => {
  const FetchApis = new FetchApi();
  const [userlist, setUserlist] = useState([]);

  const [newPassword, setNewPassword] = useState("");
  const [username, setUsername] = useState("");
  const [usergroupproFile, setUsergroupFile] = useState([]);
  const [datagroupId, setDatagroupId] = useState({ menugroupId: "" })


  let { id } = useParams();

  useEffect(() => {
    getUserlistById()
    getgroupProfile()
  }, [])


  const getUserlistById = () => {
    FetchApis.FethcGet(`/user/userById/${id}`).then(res => {
      setUserlist(res.data[0]);
      setUsername(res.data[0].username)
    });
  }

  const isActiveChange = (e) => {

    var id = userlist.userId;
    userlist.isActive = e;

    FetchApis.FethcUpdate(`/user/updateuser/${id}`, userlist).then(res => {

      if (res.status == 200) {
        Swal.fire({
          title: "คุณได้ทำแก้ไขสถานะเรียบร้อยแล้ว",
          icon: "success",
          draggable: true
        });
        setTimeout(() => {
          window.location.reload()
        }, 1000);

      }
    })

  }

  function getgroupProfile() {

    FetchApis.FethcGet(`/groupProfile/userGroupProfileList`).then(res => {
      if (res) {
        setUsergroupFile(res.data)
      }
    })

  }

  const isChangePassword = () => {

    var id = userlist.userId;
    let dataUser = {
      username: username,
      password: newPassword
    }

    if (newPassword == "" || username == "") {
      Swal.fire({
        title: "แจ้งเตือน?",
        text: "คุณยังไม่ได้ป้อนข้อมูล รหัสใหม่ ?",
        icon: "warning",
        draggable: true
      });
    }
    else {

      Swal.fire({
        title: "แจ้งเตือน?",
        text: "คุณต้องการบันทึกแก้ไขรหัส ใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "บันทึก",
        cancelButtonText: "ยกเลิก"
      }).then((result) => {
        if (result.isConfirmed) {
          FetchApis.FethcUpdate(`/user/changepassword/${id}`, dataUser).then(res => {
            if (res.status == 200) {
              Swal.fire({
                title: "คุณได้ทำแก้ไขรหัสเรียบร้อยแล้ว",
                icon: "success",
                draggable: true
              });
              setTimeout(() => {
                window.location.reload()
              }, 1500);
            }
          })
        }
      });

    }

  }

  function handleSelect(e) {
    const { value } = e.target;
    setDatagroupId({ ...datagroupId, menugroupId: value });

    // console.log(value);
  }

  function isSaveGroupProfile() {

    FetchApis.FethcUpdate(`/user/userUpdateBymenugroupId/${userlist.userId}`, datagroupId).then(res => {
      if (res) {
         getUserlistById()
      }

    })
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{userlist.per} {userlist.name} {userlist.lastname}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email : </span>
                  <span className="itemValue">{userlist.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">รหัสพนักงาน : </span>
                  <span className="itemValue">{userlist.employeeId}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">แผนก : </span>
                  <span className="itemValue">
                    {userlist.departmentname}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">ตำแหน่งงาน : </span>
                  <span className="itemValue">{userlist.positionname}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">กลุ่มผู้ใช้ : </span>
                  <span className="itemValue">{userlist.roles}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">สถานะเปิดใช้งาน : </span>
                  <span className="itemValue">
                    {userlist.isActive == 1 ? <label style={{ color: "green" }}>เปิดใช้งาน</label> : <label style={{ color: 'red' }}>ปิดใช้งาน</label>}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">วันที่สร้าง : </span>
                  <span className="itemValue">{userlist.createdate}</span>
                </div>

                <div className="detailItem">
                  {userlist.isActive == 1 ? <span style={{ marginLeft: 20 }}>
                    <Button variant="outlined" color="error" onClick={() => isActiveChange(0)}>ปิดใช้งาน</Button>
                  </span> : <span style={{ marginLeft: 20 }}>
                    <Button variant="outlined" color="success" onClick={() => isActiveChange(1)}>เปิดใช้งาน</Button>
                  </span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom" style={{ flexDirection: 'row', display: 'flex' }}>
          <div style={{ width: '50%' }}>
            <h1 className="title">Chage password</h1>
            <div className="space-row-layer" style={{ marginBottom: 10 }}>
              <label style={{ width: 200 }}>ชื่อผู้ใช้งานระบบ (english)</label>
              <input className="input-box" type="text" placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: 300 }} required /></div>
            <div>
              <input className="input-box" type="password" placeholder="new password"
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ width: 300 }} />
            </div>

            <div style={{ marginTop: 20 }}>
              <Button variant="contained" color="success" onClick={() => isChangePassword()}>
                SAVE
              </Button>
            </div>
          </div>

          <div style={{ width: '50%' }}>
            <div>
              <label className="title">กลุ่มผู้ใช้ระบบ</label>
            </div>
            <div style={{ padding: 10, marginTop: 10, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
              <div>
                <select className="input-box" onChange={(e) => handleSelect(e)}>
                  <option value="">เลือกกลุ่มผู้ใช้งานระบบ ...</option>
                  {usergroupproFile.map((item, index) => (
                    <option value={item.groupId}>{item.groupname}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginLeft: 20 }}>
                <Button variant="contained" color="info" onClick={() => isSaveGroupProfile()}>บันทึก</Button>
              </div>
            </div>
            <div>
              <label style={{ marginRight: 10 }}>กลุ่มผู้ใช้ :</label>
              <label style={{color:"green"}}>{userlist.namegruolProfile}</label>
            </div>
          </div>

        </div>


        <div>
          <Edit UserId={id} title={'Edit new User'} />
        </div>
      </div>
    </div>
  );
};

export default Single;

import "./new.scss";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Navbar from "../../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import FetchApi from "../../../customhooks/Functionapi";
import { userObject } from './objectdata';
import Swal from 'sweetalert2';

const New = ({ inputs, title }) => {
  const FetchApis = new FetchApi();
  const [file, setFile] = useState("");

  const [userData, setUserData] = useState({ ...userObject });
  const [departments, setDepartmants] = useState([]);
  const [positions, setPositions] = useState([]);
  const [usergroupproFile, setUsergroupFile] = useState([]);

  useEffect(() => {

    getdepartment();
    getPosition();
    getgroupProfile();

  }, [])


  const getdepartment = () => {
    FetchApis.FethcGet(`/department/departmentListall`).then((res) => {
      if (res.status == 200) {
        setDepartmants(res.data)
      }
    })
  }

  const getPosition = () => {
    FetchApis.FethcGet(`/position/positionListall`).then((res) => {
      if (res.status == 200) {
        setPositions(res.data)
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

  function handleSelect(e) {
    const { value } = e.target;
    setUserData({ ...userData, menugroupId: value });

    // console.log(value);
  }

  const isSave = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "แจ้งเตือน",
      text: "คุณต้องการบันทึกข้อมูล ใช่หรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "บันทึก",
      cancelButtonText: "ยกเลิก"
    }).then((result) => {
      if (result.isConfirmed) {

        FetchApis.FethcPost(`/user/createuser`, userData).then(res => {
          if (res) {

            if (res.status == 200) {

              Swal.fire({
                title: "แจ้งการบันทึก",
                text: "คุณทำการบันทึกเรียบร้อยแล้ว",
                icon: "success"
              });

            } else if (res.status == 400) {
              Swal.fire({
                title: "แจ้งการบันทึก !",
                text: "ชื่อนี้มีผู้ใช้งานอยู่แล้วกรุณาใช้ชื่ออื่น",
                icon: "error"
              });

            }
          }
        })

      }

    });


  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            <div className="formInput" style={{ marginTop: 10 }}>
              <label htmlFor="file">
                Image: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div className="right">
            <form onSubmit={(e) => isSave(e)}>
              <div style={{ width: '100%' }}>
                <div >
                  <div className="space-row-layer">
                    <label style={{ width: 200 }}>ชื่อผู้ใช้งานระบบ (english)</label>
                    <input className="input-box" type="text" placeholder="username"
                      onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                      style={{ width: '70%' }} required /></div>
                  <div className="space-row-layer">
                    <label style={{ width: 200 }}>รหัสผู้ใช้งาน </label>
                    <input className="input-box" type="password"
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                      placeholder="password" style={{ width: '70%' }} required />
                  </div>
                </div>

                <div className="space-row-layer">
                  <div className="space-row-layer" style={{ width: '100%' }} >
                    <label style={{ width: 200 }}>คำนำหน้า</label>
                    <select className="input-box" name="per" id="per"
                      onChange={(e) => setUserData({ ...userData, per: e.target.value })} style={{ marginRight: 5 }}>
                      <option value="">เลือกคำหน้า  . . .</option>
                      <option value="นาย">นาย</option>
                      <option value="นาง">นาง</option>
                      <option value="นางสาว">นางสาว</option>
                    </select>
                    <input className="input-box" type="text" placeholder="ชื่อ"
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      style={{ width: 200 }} required />
                  </div>

                  <div className="space-row-layer" style={{ width: '100%' }}>
                    <input className="input-box" type="text" placeholder="นามสกุล"
                      onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
                      style={{ width: 200 }} />
                  </div>
                </div>
                <div className="space-row-layer">
                  <label style={{ width: 200 }}>รหัสพนักงาน</label>
                  <input className="input-box" type="text" placeholder="employee code "
                    onChange={(e) => setUserData({ ...userData, employeeId: e.target.value })}
                    style={{ width: 200 }} required />
                </div>
                <div className="space-row-layer">
                  <label style={{ width: 200 }}>E-mail</label>
                  <input className="input-box" type="text" placeholder="email"
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    style={{ width: 200 }} required />
                </div>
                <div className="space-row-layer">
                  <label style={{ width: 200 }}>แผนก</label>
                  <select className="input-box" name="departments"
                    onChange={(e) => setUserData({ ...userData, departmentId: e.target.value })}
                    id="departments" style={{ marginRight: 5 }} required>
                    <option value="">เลือกแผนก . . .</option>
                    {departments.map((item, i) => (<option value={item.departmentcode}>{item.departmentname}</option>))}
                  </select>
                </div>

                <div className="space-row-layer">
                  <label style={{ width: 200 }}>ตำแหน่งงาน</label>
                  <select className="input-box" name="positions" id="positions"
                    onChange={(e) => setUserData({ ...userData, positioncode: e.target.value })}
                    style={{ marginRight: 5 }} required>
                    <option value="">เลือกตำแหน่งงาน . . .</option>
                    {positions.map((item, i) => (
                      <option value={item.positioncode}>{item.positionname}</option>
                    ))}
                  </select>
                </div>

                <div className="space-row-layer">
                  <label style={{ width: 200 }}>กลุ่มผู้ใช้</label>
                  <select className="input-box" name="groupuser" id="groupuser"
                    onChange={(e) => setUserData({ ...userData, roles: e.target.value })}
                    style={{ marginRight: 5 }} required>
                    <option value="">เลือกกลุ่มผู้ใช้งานระบบ . . .</option>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>

                <div style={{ width: '50%' }} className="space-row-layer">
                    <label className="title" style={{ width: 200 }}>กลุ่มเมนูใช้งาน</label>
                      <select className="input-box" onChange={(e) => handleSelect(e)}>
                        <option value="">เลือกกลุ่มผู้ใช้งานระบบ ...</option>
                        {usergroupproFile.map((item, index) => (
                          <option value={item.groupId}>{item.groupname}</option>
                        ))}
                      </select>
                </div>

                <div className="space-row-layer">
                  <div style={{ marginRight: 10 }}>
                    <label style={{ marginRight: 10 }}>เปิดใช้งาน</label>
                    <input type="radio" name="active" value="1" onChange={(e) => setUserData({ ...userData, isActive: e.target.value })} defaultChecked />
                  </div>
                  <div style={{ marginRight: 10 }}>
                    <label style={{ marginRight: 10 }}>ปิดใช้งาน</label>
                    <input type="radio" name="active" value="0" onChange={(e) => setUserData({ ...userData, isActive: e.target.value })} />
                  </div>
                </div>

              </div>
              <div>
                <Button variant="contained" type="submit" color="success" style={{ margin: 10, width: 150 }}>บันทึก</Button>
                <Button variant="contained" color="warning" style={{ margin: 10, width: 150 }}>ยกเลิก</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;

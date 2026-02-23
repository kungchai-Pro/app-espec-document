import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import FetchApi from "../customhooks/Functionapi";
import "./login.scss"
import { Button } from "@mui/material";

const Login = (props) => {
  const FetchApis = new FetchApi();
  const [dataError, setDataError] = useState(false);

  let params = useParams();


  const { jourId, userId } = params;

  useEffect(() => {
    getloin()
  }, [])


  function getloin() {
    FetchApis.FethcGet(`/user/userloinbyuser/${userId}`).then(res => {
      if (res) {
        // console.log(res.data[0]);
        var resdata = res.data[0]
        sessionStorage.setItem("userId", resdata.userId)
        sessionStorage.setItem("userName", resdata.name)
        sessionStorage.setItem("roles", resdata.roles)

        if (resdata.roles == 'user') {
          window.location.href = '/workflow';
        }
        else if (resdata.roles == 'admin') {
          window.location.href = '/admin';
        } else {
          setDataError(true)
        }
      }
    })
  }

  function loginpage(){
    window.location.href = '/admin';
  }


  return (
    <div>
      {dataError == true && <div style={{ color: 'red' ,fontSize:14 }}>
        <label>เกิดความผิดพลาด กรุณา login เข้าใช้งานระบบ</label>
        <label>คลิกเพื่อไปยังหน่า  Loin</label>
        <Button onClick={()=>loginpage()}>ไปยังหน้า Login</Button>
      </div>}
    </div>
  )
}

export default Login
import React, { useState, useEffect } from 'react'
import './home.scss';
import iconHome from '../../images/253655499739.png';
// import iconlogin from '../../images/in-office-working.jpg';
// import { Button } from '@mui/material';
import FetchApi from '../customhooks/Functionapi';
import Swal from 'sweetalert2';
// import axios from 'axios';
import { host } from '../customhooks/Functionapi';

function Home() {
    const FetchApis = new FetchApi();
    const [isUserlogin, setIsUserlogin] = useState({ username: "", password: "" })

    const isLogin = (e) => {
        e.preventDefault();
        if (isUserlogin.username == "" || isUserlogin.password == "") {
            Swal.fire({
                title: "แจ้งเตือน!",
                text: "แจ้งเตือนเกิดการผิดพลาด กรุณาตรวจสอบ Username and Password",
                icon: "warning"
            });
        } else {

            fetch(host + '/user/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: isUserlogin.username, password: isUserlogin.password })
            }).then(function (res) { return res.json(); })
                .then(function (data) {
                    if (data.status == 200) {
                        // console.log(data.data[0].userId)
                        sessionStorage.setItem("userId", data.data[0].userId)
                        sessionStorage.setItem("userName", data.data[0].name)
                        sessionStorage.setItem("roles", data.data[0].roles)
                        if (data.data[0].roles == 'user') {
                            window.location.href = '/workflow';
                        }
                        else if (data.data[0].roles == 'admin') {
                            window.location.href = '/admin';
                        } else {
                            Swal.fire({
                                title: "แจ้งเตือน!",
                                text: "คุณยังไม่ได้กำหนดกลุ่ม ผู้ใช้งาน",
                                icon: "warning"
                            });
                        }

                    } else if (data.status == 400) {

                        Swal.fire({
                            title: "แจ้งเตือน!",
                            text: "แจ้งเตือนเกิดการผิดพลาด กรุณาตรวจสอบ Username and Password",
                            icon: "warning"
                        });

                    } else if (data.status == 401) {
                        Swal.fire({
                            title: "แจ้งเตือน!",
                            text: "แจ้งเตือนเกิดการผิดพลาด กรุณาตรวจสอบ Username and Password",
                            icon: "warning"
                        });
                    }

                })

        }
    }

    return (
        <div className='home'>
            <div className='homebody'>
                <div className='left-body'>
                    <div style={{ width: '100%', height: '30%' }}>
                        <img src={iconHome} width="40%" height="150" />
                        {/* <label>PERM POON PATANA INDUSTRY CO., LTD</label> */}
                    </div>
                    <div style={{justifyContent:'center',display:'flex',width:'100%'}}>

                        <div style={{ width: '40%',justifyContent:'center',padding:'3%',backgroundColor:'#f1f1f1'}}>

                            <div style={{ width: '100%', height: '20%', padding: 10, margin: 10 }}>
                                <div>
                                    <label className='lable'>Welcome to</label>
                                </div>
                                <div>
                                    <label className='H'>SYSTEM DOCUMENT SPEC</label>
                                </div>
                            </div>
                            
                            <div style={{ width: '100%', height: '40%',padding:1 }}>
                                <form onSubmit={(e) => isLogin(e)}>
                                    <div style={{ flexDirection: 'column', display: 'flex', padding: 10 ,width:'auto'}}>
                                        <label style={{ fontWeight: '200', fontSize: 14 }}>USER NAME</label>
                                        <input type='text' className='input-box' style={{width:"auto"}} onChange={(e) => setIsUserlogin({ ...isUserlogin, username: e.target.value })} />
                                    </div>
                                    <div style={{ flexDirection: 'column', display: 'flex', padding: 10,width:'auto' }}>
                                        <label style={{ fontWeight: '200', fontSize: 14 }}>PASSWORD</label>
                                        <input type='password' className='input-box' style={{width:"auto"}} onChange={(e) => setIsUserlogin({ ...isUserlogin, password: e.target.value })} />
                                    </div>

                                    {/* <div style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex', padding: 10, width:"auto" }}>
                                        <div style={{ flexDirection: 'row', display: 'flex' }}>
                                            <input type='checkbox' style={{ marginRight: 10, width: 20, height: 20 }} />
                                            <label>Remember me</label>
                                        </div>
                                        <div>
                                            <label>Forgot your password?</label>
                                        </div>
                                    </div> */}
                                    <div style={{ flexDirection: 'row', justifyContent: 'center', display: 'flex', padding: 10, width:"auto" }}>
                                        <button  className='customInfo-button'
                                        style={{ width: '90%', height: 35, marginTop: 10}} type='submit'>Sign in</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                    
                    <div>
                    </div>
                </div>
                {/* <div className='right-body'>
                    <img src={iconlogin} width={800} height={'100%'} />
                </div> */}
            </div>
        </div>
    )
}

export default Home
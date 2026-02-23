import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Button, colors } from '@mui/material';
import Container from '@mui/material/Container';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddBoxIcon from '@mui/icons-material/AddBox';
import '../newdocument.scss';

const Detailcomponent = () => {
  return (<React.Fragment>
      <Box sx={{ height: 'auto', marginTop: '10px', backgroundColor: '#faf8f8' }} >
        <div style={{ width: '100' }}>
          <div className='row-pace-w100-line'>
            <div style={{ width: '20%' }}>

              <div style={{
                with: '100%', height: 50,
                padding: 5,
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'start',
                display: 'flex'
              }}>
                <label style={{ alignContent:'start',
                  fontWeight:'500',
                  padding: 5,
                  borderRadius:5,
                  backgroundColor: '#f5dc9f' }}>ส่วนประเภทบรรจุภัณฑ์</label>
              </div>
              <div style={{ with: '100%', height: 70, padding: 5 }}>
                <textarea className='textarea-box' 
                value={'xxxxx'}
                style={{ width: '90%' }} disabled/>
              </div>
              <div style={{
                with: '100%', height: 50,
                padding: 5,
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                display: 'flex'
              }}>
              </div>

            </div>
            <div style={{ width: '70%' }}>
              <div className='layout-flex-line'>
                <div className='layout-margintop-5' style={{ width: '100%' }}>
                  <label style={{ width: 135 }}>รหัสสินค้า</label>
                  <input type='text' value={'xxxxx'} style={{ width: '50%' }} className='input-box' disabled/>
                  {/* <AddBoxIcon /> */}
                </div>
                <div className='layout-margintop-5' style={{ width: '100%' }}>
                  <label style={{ marginRight: 5 }}>สเปค</label>
                  <input type='text' value={'xxxxx'} style={{ width: '50%' }} className='input-box' disabled/>
                  {/* <AddBoxIcon /> */}
                </div>
              </div>

              <div className='layout-margintop-5'>
                <label style={{ width: 135 }}>ชื่อ / รายละเอียด</label>
                <input type='text' placeholder='' value={'xxxxx  xxxxx'} className='input-box' style={{ width: '70%' }} disabled/>
              </div>
              <div className='layout-margintop-5'>
                <label style={{ width: 135 }}>ขนาด</label>
                <div>
                  <input type='number' placeholder='กว้าง'  className='input-box' style={{ marginRight: 5, width: 70 }} disabled/>
                </div>
                <div>
                  <input type='number' placeholder='ยาว' className='input-box' style={{ marginRight: 5, width: 70 }} disabled/>
                </div>
               
                <div style={{marginRight:10}}>
                  <input type='number' placeholder='สูง' className='input-box' style={{ marginRight: 5, width: 70 }} disabled/>
                </div>
                  <div>
                  <label style={{marginRight:5}}>น้ำหนัก :</label>
                  </div>
                <div>
                  <input type='number' placeholder='Net W.' className='input-box' style={{ marginRight: 5, width: 70 }} disabled/>
                </div>
                <div>
                  <input type='number' placeholder='Tare W.' className='input-box' style={{ marginRight: 5, width: 70 }} disabled/>
                </div>
                <div>
                  <input type='tenumberxt' placeholder='Gross W.' className='input-box' style={{ marginRight: 5, width: 70 }} disabled/>
                </div>

              </div>
              <div className='layout-margintop-5'>
                <label style={{ width: 130 }}>ขนิด Sheet</label>
                <div style={{ width: '70%' }}>
                  <input type='text' value={'xxxxx'} className='input-box' style={{ width: '100%' }}  disabled/>
                </div>
              </div>
              <div className='layout-margintop-5'>
                <label style={{ width: 130 }}>Format Barcode</label>
                <div style={{ width: '70%' }}>
                  <input type='text' value={'xxxxx'} className='input-box' style={{ width: '100%' }} disabled/>
                </div>
              </div>

              <div className='layout-margintop-5'>
                <label style={{ width: 130 }}>อธิบายเพิ่มเติม</label>
                <div style={{ width: '70%' }}>
                  <textarea className='textarea-box' 
                  value={'xxxxx'}
                  style={{ width: '100%' }}  disabled/>
                </div>
              </div>

            </div>
            <div style={{ width: '15%' }}>
              
            </div>
          </div>

        </div>
      </Box>
  </React.Fragment>
  )
}

export default Detailcomponent
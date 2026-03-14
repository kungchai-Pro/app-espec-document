import React,{useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import Card from '@mui/material/Card';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddBoxIcon from '@mui/icons-material/AddBox';
// import PupUPbomList from './../popupbom/PupUPbomList';
import { styled } from '@mui/material/styles';
import '../newdocument.scss';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Headercomponent = () => {
     const [visible, setVisible] = useState(false);
  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        {/* <Container fixed> */}
          <Box sx={{ height: 'auto', marginTop: '10px' }} >
            <Card sx={{ minWidth: 275 }}>
              <div style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>
                <label style={{ padding: 5, backgroundColor: '#f5dc9f', borderRadius: 5, color: '#68684' }}>ส่วนของคำร้องขอ</label>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                <div >
                  <div className='row-pace-w100-line'>
                    <div style={{ width: 150 }}>
                      <label style={{ width: 200 }}>ประเภทสินค้า</label>
                    </div>
                    <div style={{ padding: 5, marginRight: 5 }}>
                      <input type='checkbox' /><label>  สำลีแผ่น</label>
                    </div>
                    <div style={{ padding: 5, marginRight: 5 }}>
                      <input type='checkbox' checked/><label> สำลีก้าน / ก้อน</label>
                    </div>
                    <div style={{ padding: 5, marginRight: 5 }}>
                      <input type='checkbox' /><label> สำลีม้วน</label>
                    </div>
                  </div>

                  <div className='row-pace-w100-line'>
                    <div style={{ width: 150 }}>
                      <label style={{ width: 200 }}>วัติถุประสงค์</label>
                    </div>
                    <textarea className='textarea-box'
                      placeholder='อธิบายคำร้อง'
                      value={'xxxxx'}
                      style={{ width: '95%' }} 
                      disabled/>
                  </div>
                  <div style={{ marginTop: 3 }} className='row-pace-w100-line'>
                    <div style={{ width: 150 }}>
                      <label style={{ width: 200 }}>ผู้ร้องขอ</label>
                    </div>
                    <input type='text' placeholder='ชื่อ / สกุล' value={'xxxxx  xxxxx'}
                    className='input-box' style={{ width: '95%' }} disabled/>

                  </div>
                </div>
                <div style={{ width: '25%' }}>
                  <div className='row-pace-w100-line'>
                    <label style={{ fontSize: 12 }}>วันที่สร้างเอกสาร</label>
                    <input type='text' disabled style={{ marginTop: 3 }} value={'xxxxx'}/>
                  </div>

                  <div className='row-pace-w100-line'>
                    <label style={{ fontSize: 12 }}>วันที่ Approved</label>
                    <input type='text' disabled style={{ marginTop: 3 }} value={'xxxxx'}/>
                  </div>
                  <div className='row-pace-w100-line'>
                    <label style={{ fontSize: 12 }}>เอกสารบรรจุ (SSD)</label>
                    <input type='text' disabled style={{ marginTop: 3 }} value={'xxxxx'}/>
                  </div>
                </div>
                <div style={{ width: '20%' }}>
                  <div className='row-pace-w100-line'>
                    <div style={{ width: '80%' }}>
                      <label style={{ fontSize: 12 }}>เอกสารบรรจุ (SSD) *</label>
                      <input type='text' className='input-box'  value={'FC0010424'}
                      style={{ width: '100%' }} disabled/>
                    </div>
                  </div>
                  <div style={{ marginTop: 3 }}>
                    <label style={{fontSize:13}}>File Name :xxxxxx</label>
                  </div>
                </div>
              </div>

              {/* ส่วนข้อมูลลูกค้า1 */}
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                <div style={{ width: '30%' }}>
                  <div className='row-pace-w100-line' style={{ width: '100%' }}>
                    <label style={{ width: 200 }}>รหัสลูกค้า</label>
                    <input type='text' value={'xxxxx'} className='input-box' style={{ width: '100%' }} disabled/>
                  
                  </div>
                  <div className='row-pace-w100-line' style={{marginTop:3}}>
                    <label style={{ width: 200 }}>รหัสสินค้า</label>
                    <input type='text' value={'xxxxx'} className='input-box' style={{ width: '100%' }} disabled/>
                 
                  </div>
                </div>
                <div style={{ width: '30%' }}>
                  <div className='row-pace-w100-line'>
                    <label style={{ width: 130 }}>ชื่อลูกค้า</label>
                    <input type='text' value={'xxxxx'} className='input-box' style={{ width: '80%' }} disabled/>
                  </div>
                  <div className='row-pace-w100-line' style={{ marginTop: 3 }}>
                    <label style={{ width: 130 }}>เลือกตราสินค้า</label>
                    <input type='text' value={'xxxxx'}  className='input-box' style={{ width: '80%' }} />
                    {/* <CreateNewFolderIcon  /> */}
                  </div>
                </div>
                <div style={{ width: '25%' }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center', justifyItems: 'center',
                    alignItems: 'center', backgroundColor: '#d0f9e0',
                    borderRadius: 5
                  }}>
                    <CheckCircleOutlineIcon sx={{ color: '#39995f' }} />
                    <label>
                      Confirmed
                    </label>
                  </div>
                  <div>
                    <label style={{ fontSize: 13 }}>
                      ชื่อ confirm ..xxxxxx
                    </label>
                  </div>
                  <div>
                    <label style={{ fontSize: 13 }}>
                      วันที่ / เวลา : ( 12-03-2025 23:09:39 )
                    </label>
                  </div>


                </div>
              </div>

              {/* ส่วนข้อมูลลูกค้า2 */}
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10
              }}>
                
                <div style={{ width: '60%' ,marginLeft:10}}>
                  <div className='row-pace-w100-line'>
                    <div style={{ flexDirection: 'row', display: 'flex', width: '100%' }}>
                      <label style={{ width: 130 }}>ชื่อสินค้า</label>
                      <input type='text' value={'xxxxx'} className='input-box' style={{ width: '75%' }} disabled/>
                    </div>
                  </div>
                  <div className='row-pace-w100-line' style={{ marginTop: 3 }}>
                    <div style={{ flexDirection: 'row', display: 'flex', width: '100%' }}>
                      <label style={{ width: 130 }}>การบรรจุงาน</label>
                      <input type='text' value={'xxxxx'} className='input-box' style={{ width: '75%' }} disabled/>
                    </div>
                  </div>
                  <div className='row-pace-w100-line' style={{ marginTop: 3 }}>
                    <div style={{ flexDirection: 'row', display: 'flex', width: '100%' }}>
                      <label style={{ width: 130 }}>อธิบายเพิ่มเติม</label>
                      <input type='text'value={'xxxxx'} className='input-box' style={{ width: '75%' }} disabled/>
                    </div>
                  </div>

                </div>
                <div style={{ width: '10%' }}>

                </div>
                <div style={{ width: '10%' }}>
                
                </div>
              </div>
            </Card>
          </Box>
        {/* </Container> */}
      </React.Fragment>
    </div>
  )
}

export default Headercomponent
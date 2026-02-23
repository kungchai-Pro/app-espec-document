import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import '../newdocument.scss';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const Imagescomponent = () => {
  return (
    <div>
      <React.Fragment>
        {/* <CssBaseline /> */}
        {/* <Container fixed> */}
          <Box sx={{ height: 'auto', marginTop: '10px' }} >
            <div className='row-pace-w100-line'
              style={{ backgroundColor: '#faf8f8', padding: 10 }}>
              {/* ส่วนที่1 */}
              <div style={{ width: '25%' }}>
                <div>
                  <div style={{ marginBottom: 5 }}>
                    <label>หัวข้อ</label>
                    <input type='text' value={'xxxxx'} className='input-box' disabled/>
                  </div>
                  <div>
                    <label>รายละเอียด</label>
                    <textarea value={'xxxxx'}  className='textarea-box' style={{ width: '100%' }} disabled/>
                  </div>
                </div>
              </div>
              {/* ส่วนที่2 */}
              <div style={{ width: '65%', padding: 10 }} className='row-pace-w100-line'>
                <div style={{width: '100%', height: 300,backgroundColor: "#d6d8d7"
                }}>

                </div>
                <div>
                  <div>
                    {/* <AddPhotoAlternateIcon style={{ width: 35, height: 35 }} /> */}
                  </div>
                  <div>
                    {/* <SearchIcon style={{ width: 35, height: 35 }} /> */}
                  </div>
                </div>
              </div>
              {/* ส่วนที่3 */}
              <div style={{ width: '15%' }}>
                <div style={{backgroundColor:'#e0fbeb',alignItems:'center',display:'flex',padding:10}}>
                  <CheckCircleOutlineIcon sx={{ color: '#39995f' }} />
                  <label style={{color: '#39995f'}}>Confirmed</label>
                </div>
                <div>
                  <label>Preared By xxxxxx</label>
                </div>
                <div>
                  <label>Confirm DateTime</label>
                </div>
                <div>
                  <label>LeadTime</label>
                </div>
              </div>
            </div>

          </Box>
        {/* </Container> */}
      </React.Fragment>
    </div>
  )
}

export default Imagescomponent
import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import './newdocument.scss';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { Button, colors } from '@mui/material';
import { objectImages } from '../newDocument/objectdata/typeobject';
import { useSelector, useDispatch } from 'react-redux'
import { styled } from '@mui/material/styles';
import FetchApi from '../../../customhooks/Functionapi';
import { UpdateDetailList } from '../../../customhooks/Functiondocument';
import { UploadFiles } from '../../../customhooks/FuctionUpload';
import {host}from '../../../customhooks/Functionapi';

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

const ReviseSpecImage = (props) => {
  // const dispatch = useDispatch();
  // const documentDetial = useSelector((state) => state.documentHeader.valueDetail);
  // const valueImages = useSelector((state) => state.documentHeader.valueImages);

  const FetchApis = new FetchApi();
  const mainRef = useRef(null);
  const [dataImgeList, setDataImageList] = useState(objectImages);

  useEffect(() => {
    getImageListById()

    var dataimage = {
      ...objectImages,
      JournalCode: props.valDateail.JournalCode,
      SlotNoSpec: props.SlotNo,
      ItemID: props.ItemID,
      ItemName: props.ItemName,
      JourId: props.JourId
    };
  
    setDataImageList(dataimage)
  }, [mainRef])



  const  EditImages = async () => {
    UpdateDetailList(props.valDateail)

    FetchApis.FethcUpdate(`/document/updateSpecification/${props.JournalID}`, dataImgeList).then(res => {
      if (res) {
        props.handleClose(false)

      }
    })
  }

  const handleChange = (e) => {

    const { name, value } = e.target
    setDataImageList({ ...dataImgeList, [name]: value })
  }

  const getImageListById=()=>{
    FetchApis.FethcGet(`/document/DocumentSpecificBydeatilId/${props.JournalID}`).then(res=>{
      setDataImageList(res.data[0])
    })  
  }

    const handleFile = () => {
      var input = document.getElementById('imgloadfile');
  
      if (input != null) {
        const file = input.files[0]
        const size = file.size // it's in bytes
  
        UploadFiles(file).then(res => { //upload file ก่อน ค่อย insert 
          if (res) {
            setDataImageList({ ...dataImgeList, LocationPic: res.filename })
          }
        })
    
      };
    }

  const cancleClos=()=>{
    props.handleClose(false)
  }

  return (
    <div>

      <React.Fragment>
        <Box sx={{ height: 'auto', marginTop: '10px' }}>
          <div className='row-pace-w100-line'
            style={{ backgroundColor: '#faf8f8', padding: 10 }}>
            {/* ส่วนที่1 */}
            <div style={{ width: '25%' }}>
              <div>No.{props.n}</div>
              <div>
                <div style={{ marginBottom: 5 }}>
                  <label>หัวข้อ</label>
                  <input type='text'
                    name='SubjectDetails'
                    value={dataImgeList.SubjectDetails}
                    onChange={(e) => handleChange(e)}
                    className='input-box' />
                </div>
                <div>
                  <label>รายละเอียด</label>
                  <textarea
                    name='SubjectExtend'
                    value={dataImgeList.SubjectExtend}
                    onChange={(e) => handleChange(e)}
                    className='textarea-box' style={{ width: '100%' }} />
                </div>
              </div>
            </div>
            {/* ส่วนที่2 */}
            <div style={{ width: '65%', padding: 10 }} className='row-pace-w100-line'>
              <div style={{
                width: '100%', height: 300, backgroundColor: "#d6d8d7"
              }}>
                  <img 
                  src={host+`/file/images/files/${dataImgeList.LocationPic}`}
                  style={{width: '100%', height: 300,padding:5}}
                    
                   alt="Logo" />
              </div>
              <div>
                <div>
                  <Button variant="outlined"
                    sx={{ height: 50 }}
                    component="label"
                    role={undefined}
                    // size="large"
                    tabIndex={-1}
                    startIcon={<AddPhotoAlternateIcon />}>
                    Upload files
                    <VisuallyHiddenInput
                      type="file"
                      name='LocationPic'
                      accept="image/png, image/jpg" onChange={(e) => handleFile()}

                      id={'imgloadfile'} multiple />
                  </Button>
                </div>
                <div>
                  {/* <SearchIcon style={{ width: 35, height: 35 }} /> */}
                </div>
              </div>
            </div>
            {/* ส่วนที่3 */}
            <div style={{ width: '15%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>

                <div>
                  <div style={{ backgroundColor: '#e0fbeb', alignItems: 'center', display: 'flex', padding: 10 }}>
                    <CheckCircleOutlineIcon sx={{ color: '#39995f' }} />
                    <label style={{ color: '#39995f' }}>Confirmed</label>
                  </div>
                  <div>
                    <label>Preared By xxxxxx</label>
                  </div>
                  <div>ConfirmDateTime</div>
                  <div>
                    <label> {dataImgeList.ConfirmDateTime}</label>
                  </div>
                  {/* <div>
                    <label>LeadTime</label>
                  </div> */}
                </div>

                <div ref={props.ref_imagse}>
                  <div>
                    <Button variant="contained" size="medium" color='success' onClick={()=>EditImages()}>บันทึก</Button>
                   {" "}
                    <Button variant="contained" size="medium" color='warning' onClick={()=>cancleClos()} >ยกเลิก</Button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </Box>



      </React.Fragment>

    </div>
  )
}

export default ReviseSpecImage
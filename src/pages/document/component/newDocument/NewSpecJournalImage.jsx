import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import './newdocument.scss';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { UploadFiles } from '../../../customhooks/FuctionUpload';
import { Button, colors } from '@mui/material';
import { objectImages } from './objectdata/typeobject';
import { useSelector, useDispatch } from 'react-redux'
import { AddImages, updateAddImages, removeItem, deleteImagesItem } from '../../../redux/features/document/documentHeaderSlice';
import { styled } from '@mui/material/styles';
import FetchApi from '../../../customhooks/Functionapi';
import { UpdateDetailList } from '../../../customhooks/Functiondocument';
import { host } from '../../../customhooks/Functionapi';
import { ToastContainer, toast, Slide } from 'react-toastify';
import Swal from 'sweetalert2';
import moment from 'moment/moment';

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

const NewJournalSpecImage = (props) => {
  const dispatch = useDispatch();

  const FetchApis = new FetchApi();
  const mainRef = useRef(null);
  const [dataImgeList, setDataImageList] = useState(objectImages);

  const d = new Date();
  let convertdate = ""
  let convertmonth = d.getMonth() + 1;
  if (d.getDate() < 10) {
    convertdate = "0" + d.getDate();
  }
  else {
    convertdate = d.getDate();
  }
  if (d.getMonth() + 1 < 10) {
    convertmonth = "0" + convertmonth
  } else {
    convertmonth = convertmonth
  }
  var timestampsnow = d.getFullYear() + "-" + convertmonth + "-" + convertdate + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  var timestampsDate = d.getFullYear() + "-" + convertmonth + "-" + convertdate;


  console.log(props.HearderData.JournalCode);
  console.log(props.HearderData.JournalID);
  useEffect(() => {


    var dataimage = {
      ...objectImages,
      JournalCode: props.HearderData.JournalCode,
      SlotNoSpec: props.SlotNo,
      ItemID: props.ItemID,
      ItemName: props.ItemName,
      JourId: props.HearderData.JournalID
    };
    setDataImageList(dataimage)

  }, [mainRef])



  const NewImages = async () => {

    FetchApis.FethcPost(`/journalImages/createJournalImages`, dataImgeList).then(res => {
      if (res) {

        toast.success('บันทึกเรียบร้อยแล้ว!', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });

        props.handleClose(false)

      }
    })
  }

  const isclose = () => {
    props.handleClose(false)
  }

  const handleChange = (e) => {

    const { name, value } = e.target
    var input = e.target.value;
    const cleanInput = input.replace(/[^a-zA-Z0-9ก-๙\s()#/.%:";,=\-&@$<>+*/?!]/g, "");
    setDataImageList({ ...dataImgeList, [name]: cleanInput })
  }


  const handleFile = () => {
    var input = document.getElementById('imgloadfile');
    if (input.files[0]) {
      // if (input != null) {
      const file = input.files[0]
      const size = file.size // it's in bytes

      const ext = file.name.split(".").pop();

      const newName = `${Date.now()}.` + ext;
      const renamedFile = new File([file], newName, {
        type: file.type,
      });


      if (size <= 5000000) {
        UploadFiles(renamedFile).then(res => { //upload file ก่อน ค่อย insert 
          if (res) {
            setDataImageList({ ...dataImgeList, LocationPic: newName })
          }
        })
      } else {

        Swal.fire({
          title: "แจ้งเตือน",
          text: "ขนาดไฟล์เกินกำหนด 5M ",
          icon: "warning"
        });
      }

    };
  }


  return (
    <div>

      <React.Fragment>
        <Box sx={{ height: 'auto', marginTop: '10px' }}>
          <div className='row-pace-w100-line'
            style={{ backgroundColor: '#faf8f8', padding: 10 }}>
            {/* ส่วนที่1 */}
            <div style={{ width: '25%' }}>

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
                {dataImgeList.LocationPic != "" &&
                  <img
                    src={host + `/file/images/files/${dataImgeList.LocationPic}`}
                    style={{ width: '100%', height: 300, padding: 5 }}

                    alt="Logo" />}
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
                    <label>Create DateTime</label>
                  </div>
                  <div>
                    <label>{moment(timestampsnow).format('DD/MM/yyyy hh:mm:ss')}</label>
                  </div>
                </div>

                <div ref={props.ref_imagse}>
                  <div>
                    <Button onClick={() => NewImages()} variant="outlined" color='success'>บันทึก</Button>
                    {" "}
                    <Button variant="outlined" color='warning' onClick={() => isclose()}>ยกเลิก</Button>
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

export default NewJournalSpecImage
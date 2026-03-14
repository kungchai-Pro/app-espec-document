import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import './newdocument.scss';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { Button, colors } from '@mui/material';
import { objectImages } from './objectdata/typeobject';
import { useSelector, useDispatch } from 'react-redux'
import {AddImages,updateAddImages,removeItem,deleteImagesItem}from'../../../redux/features/document/documentHeaderSlice';
import { styled } from '@mui/material/styles';
import FetchApi from '../../../customhooks/Functionapi';

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

const ImageList = (props) => {
  const dispatch = useDispatch();
  const documentDetial = useSelector((state) => state.documentHeader.valueDetail);
  const valueImages = useSelector((state) => state.documentHeader.valueImages);

  const FetchApis = new FetchApi();
  const mainRef = useRef(null);
  const [dataImgeList, setDataImageList] = useState(objectImages);

  useEffect(() => {
    getdataImages();

    var dataimage = {
      ...objectImages,
      JournalCode: props.HearderData.JournalCode,
      SlotNoSpec: props.SlotNo,
      ItemID: props.ItemID,
      ItemName: props.ItemName,
      JourId: props.JourId
    };
    // console.log(dataimage)
    setDataImageList(dataimage)
  }, [mainRef])



  const NewImages = async () => {

    var dataimage = {
      ...objectImages,
      JournalCode: props.HearderData.JournalCode,
      SlotNoSpec: props.SlotNo,
      ItemID: props.ItemID,
      ItemName: props.ItemName,
      JourId: props.JourId

    };


    // console.log(dataImgeList)
    if (dataImgeList.length > 0) {
      updateImages(dataImgeList)
    }



    FetchApis.FethcPost(`/document/createDocumentSpecification`, dataimage).then(res => {
      if (res) {
        // dispatch(AddImages(dataimage))
        
        getdataImages()
      }
    })
  }

  const getdataImages = () => {
    FetchApis.FethcGet(`/document/DocumentSpecificByCode/${props.HearderData.JournalCode}`).then(res => {

      if (res) {
        // console.log(res.data)
        setDataImageList(res.data)

      }

    })

    setTimeout(() => {
      mainRef.current?.scrollIntoView({ behavior: 'smooth' });

    }, 800);
  }

  const removeImage = (id) => {
    FetchApis.FethcDelete(`/document/specificdeleteById/${id}`).then(res => {
      if (res) {
      dispatch(deleteImagesItem(id))
        getdataImages()

      }
    })
  }

  const handleChange = (index, e) => {

    const { name, value } = e.target
    setDataImageList(prevItems =>
      prevItems.map((item, i) =>
        i === index ? {
          ...item, [name]: value,
          ['SlotNo']: index + 1,
          ['ItemName']: props.ItemName
        } : item
      )
    );

  }

  const updateImages = async (datalist) => {

    for (let index = 0; index < datalist.length; index++) {
      var result = datalist[index];

      if (result.JournalID != "") {

        FetchApis.FethcUpdate(`/document/updateSpecification/${result.JournalID}`, result).then(res => {
          if (res) {

          }
        })
      }

    }

  }

  const handleFile = (index, JourId) => {
    var input = document.getElementById('imgloadfile' + JourId);
    console.log(input);
    if (input != null) {
      const file = input.files[0]
      const size = file.size // it's in bytes
      setDataImageList(prevItems =>
        prevItems.map((item, i) =>
          i === index ? { ...item, ['LocationPic']: file.name, ['SlotNo']: index + 1 } : item
        )
      );
    }
var updataLiset=dataImgeList.filter((val)=>val.JournalID==JourId)
    console.log(updataLiset)
    updateImages(updataLiset)

  };

  // props.getdataImages(dataImgeList) 


  return (
    <div>
      
      <React.Fragment>
        <div style={{ marginTop: 5, marginRight: 30, flexDirection: 'row', justifyContent: 'flex-end', display: 'flex' }}>
          <Button variant="outlined" onClick={() => NewImages()}>Add Image</Button>
        </div>
        

        {dataImgeList.length > 0 && <div>
          {
            dataImgeList.map((val, index) => (
              
              <Box sx={{ height: 'auto', marginTop: '10px' }} key={index} ref={mainRef}>
                <div className='row-pace-w100-line'
                  style={{ backgroundColor: '#faf8f8', padding: 10 }}>
                  {/* ส่วนที่1 */}
                  <div style={{ width: '25%' }}>
                    <div>No.{index + 1}</div>
                    <div>
                      <div style={{ marginBottom: 5 }}>
                        <label>หัวข้อ</label>
                        <input type='text'
                          name='SubjectDetails'
                          value={val.SubjectDetails}
                          onChange={(e) => handleChange(index, e)}
                          className='input-box' />
                      </div>
                      <div>
                        <label>รายละเอียด</label>
                        <textarea
                          name='SubjectExtend'
                          value={val.SubjectExtend}
                          onChange={(e) => handleChange(index, e)}
                          className='textarea-box' style={{ width: '100%' }} />
                      </div>
                    </div>
                  </div>
                  {/* ส่วนที่2 */}
                  <div style={{ width: '65%', padding: 10 }} className='row-pace-w100-line'>
                    <div style={{
                      width: '100%', height: 300, backgroundColor: "#d6d8d7"
                    }}>
                    </div>
                    <div>
                      <div>
                        {/* <AddPhotoAlternateIcon style={{ width: 35, height: 35 }} /> */}
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
                            accept="image/png, image/jpg" onChange={(e) => handleFile(index, val.JournalID)}

                            id={'imgloadfile' + val.JournalID} multiple />
                        </Button>
                      </div>
                      <div>
                        <SearchIcon style={{ width: 35, height: 35 }} />
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
                        <div>
                          <label>Confirm DateTime</label>
                        </div>
                        <div>
                          <label>LeadTime</label>
                        </div>
                      </div>

                      <div ref={props.ref_imagse}>
                        <div>
                          <Button variant="text"
                            startIcon={<DoNotDisturbOnIcon />} style={{ color: 'red' }} onClick={() => removeImage(val.JournalID)}>
                            Delete
                          </Button>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </Box>
            ))
          }
        </div>}


      </React.Fragment>

    </div>
  )
}

export default ImageList
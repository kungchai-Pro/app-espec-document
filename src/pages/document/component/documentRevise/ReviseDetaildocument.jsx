import React, { useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box';
import { Button, colors, Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import PopUpcuAddSlot from './../../component/newDocument/popupcomponent/popUpcuAddSlot';

import FetchApi from '../../../customhooks/Functionapi';
import './newdocument.scss';
import { deletedetailById, NewDocumentDeatil, UpdateDetailList } from '../../../customhooks/Functiondocument';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { AddHeader, AddDetail, AddImages } from '../../../redux/features/document/documentHeaderSlice';
import { host } from '../../../customhooks/Functionapi';
import PopUpbatchversion from '../newDocument/Editcomponent/popUpbatchversion';
import ImageZoom from "react-image-zooom";
import moment from 'moment/moment.js';
import PopUpshowImages from '../newDocument/popupcomponent/popUpshowImages';

const ReviseDetaildocument = (props) => {
  const FetchApis = new FetchApi()
  const dispatch = useDispatch();
  const ref_detial = useRef(null);

  const [dataDetial, setDataDetial] = useState([])
  const [opentAddslot, setOpenAddslot] = useState(false);
  const [dataImageList, setDataImageList] = useState([]);
  const [reload, setReload] = useState(false)


  props.getdatadetail(dataDetial);

  useEffect(() => {
    getjourDetailList()
  }, [ref_detial])


  const getjourDetailList = async () => {

    if (dataDetial.JournalID == "") {
      UpdateDetailList(dataDetial)
    }

    await FetchApis.FethcGet(`/document/DocumentDetailByCode/${props.dataHeader.JournalCode}`).then(res => {
      if (res) {

        setDataDetial(res.data)
        dispatch(AddDetail(res.data));

        getrefreshdImage(res.data[0])


      }
    })

  }


  const getrefreshdImage = (id) => {
    if (dataDetial.JournalID == "") {
      UpdateDetailList(dataDetial)
    }

    FetchApis.FethcGet(`/document/DocumentSpecificByCode/${props.dataHeader.JournalCode}`).then(res => {

      if (res) {
        setDataImageList(res.data)
        dispatch(AddImages(res.data))
      }

    })
  }


  // show data images list from 
  function Retureimag({ idjornal, dataDetial }) {
    var result = dataImageList.filter(val => val.JourId == idjornal);
    return (<div style={{ width: '100%' }}>

      {result.map((val, index) =>
        <Box sx={{ height: 'auto', marginTop: '1', padding: 1, width: '100%', display: 'flex' }}>
          <div className='row-pace-w100-line'
            style={{ backgroundColor: '#faf8f8', padding: 10 }}>
            {/* ส่วนที่1 */}
            <div style={{ width: '25%' }}>
              <div style={{
                width: 50, height: 30, backgroundColor: '#2c82c6', color: '#ffff', flexDirection: 'row',
                alignItems: 'center', display: 'flex'
              }}>
                <label>No.{index + 1}</label>
              </div>
              <div>
                <div style={{ marginBottom: 5 }}>
                  <label>หัวข้อ</label>
                  <input type='text'
                    name='SubjectDetails'
                    value={val.SubjectDetails}
                    onChange={(e) => handleChange(e)}
                    className='input-box' disabled />
                </div>
                <div>
                  <label>รายละเอียด</label>
                    <label
                      style={{
                        display: "block",
                        whiteSpace: "pre-wrap", // ✅ เคารพการเคาะบรรทัด
                        border: "1px solid #ccc",
                        padding: "8px",
                        minHeight: "auto",
                        width: "100%",
                        // background: "#f9f9f9"
                      }}>{val.SubjectExtend}</label>
                
                </div>
              </div>
            </div>
            {/* ส่วนที่2 */}
            <div style={{ width: '65%', padding: 10 }} className='row-pace-w100-line'>
              <div style={{
                width: '100%', height: 340, backgroundColor: "#d6d8d7"
              }}>
              {/* <img src={host + `/file/images/files/${val.LocationPic}`} alt="My local" style={{ width: '100%', height: 300 }} /> */}
                <ImageZoom
                  src={host + `/file/images/files/${val.LocationPic}`}

                  width={610}
                  height={300}
                  alt="Logo"
                  zoom="200"
                />

              </div>
              <div>
                <div>
                 
                   <PopUpshowImages nameimage={val.LocationPic} PkDescription={val.PkDescription} ItemID={val.ItemID}/>
                </div>
              </div>
            </div>
            {/* ส่วนที่3 */}
            <div style={{ width: '20%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>

                <div>
                  <div style={{ backgroundColor: '#e0fbeb', alignItems: 'center', display: 'flex', padding: 10 }}>
                    <CheckCircleOutlineIcon sx={{ color: '#39995f' }} />
                    <label style={{ color: '#39995f' }}>Confirmed</label>
                  </div>
                  <center>
                    <div>
                      <label>Prepared By </label>
                      <div>
                        <label style={{ fontSize: 12 }}> {val.NameUserConfirm} {val.lastnameUserConfirm} </label>
                      </div>
                      <hr />
                    </div>
                    <div>
                      <label>create datetime</label>
                    </div>
                    <div>
                      <label style={{ fontSize: 12 }}>{moment(val.ConfirmDateTime).format('DD/MM/yyyy hh:mm:ss')}</label>
                    </div>
                  </center>
                </div>
                <div ref={props.ref_imagse}>
                  <div style={{ flexDirection: 'row', justifyContent: 'center', display: 'flex' }}>
                    <div style={{ marginTop: 5, marginRight: 30, flexDirection: 'row', justifyContent: 'flex-end', display: 'flex' }}>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </Box>)}

    </div>)
  }


  function inDataAddsolt(PKDESCRIPTION, COLABGROUPID, index) {
    setReload(true)
    setDataDetial(prevItems =>
      prevItems.map((item, i) =>
        i === index ? { ...item, ['PkDescription']: PKDESCRIPTION, ['ColabgroupId']: COLABGROUPID } : item
      )
    );

    setTimeout(() => {
      setReload(false)
    }, (800));

  }


  const handleChange = (index, e) => {

    const { name, value } = e.target
    setDataDetial(prevItems =>
      prevItems.map((item, i) =>
        i === index ? { ...item, [name]: value, ['SlotNo']: index + 1 } : item
      )
    );

  }

  

  return (<React.Fragment>
    <Container>
      {dataDetial.length > 0 &&
        dataDetial.map((item, index) => (
          <Box sx={{ height: 'auto', marginTop: '10px', marginBottom: 5, backgroundColor: '#faf8f8', fontSize: 14 }} ref={ref_detial} key={index}>
            <PopUpcuAddSlot opentAddslot={opentAddslot} inDataAddsolt={inDataAddsolt} index={index} />
            <div style={{ width: '100' }} >
              <div className='row-pace-w100-line'>
                <div style={{ width: '20%' }}>

                  <div style={{
                    with: '100%', height: 'auto',
                    padding: 5,
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'start',
                    display: 'flex'
                  }}>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                      <label style={{
                        alignContent: 'start',
                        fontWeight: '500',
                        padding: 5,
                        borderRadius: 5,
                        backgroundColor: '#f5dc9f',
                      }}>
                        ประเภทบรรจุภัณฑ์
                      </label>
                      <div>

                      </div>
                    </div>

                    <div style={{ padding: 10, backgroundColor: '#eaeded', width: '80%' }}>
                      {item.PkDescription}
                    </div>
                  </div>
                  <div style={{ with: '100%', height: 70, padding: 5 }}>
                     {item.GroupRemark != "" &&
                  <label
                    style={{
                      display: "block",
                      whiteSpace: "pre-wrap", // ✅ เคารพการเคาะบรรทัด
                      border: "1px solid #ccc",
                      padding: "8px",
                      minHeight: "auto",
                      width: "90%",
                      background: "#f9f9f9"
                    }}
                  >
                    {item.GroupRemark}
                  </label>}
                    {/* <textarea className='textarea-box'
                      name='GroupRemark'
                      placeholder='อธิบายเพิ่มเติม'
                      value={item.GroupRemark} onChange={(e) => handleChange(index, e)}
                      style={{ width: '90%' }} disabled /> */}
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

                      <input type='text' placeholder='' style={{ width: '50%' }} className='input-box'
                        name="ItemID"
                        value={item.ItemID}
                        onChange={(e) => handleChange(index, e)}
                        disabled
                      />

                    </div>
                    <div className='layout-margintop-5' style={{ width: '100%' }}>
                      <label style={{ marginRight: 5 }}>สเปค</label>
                      <input type='text' placeholder=''
                        name='SpecID'
                        value={item.SpecID}
                        onChange={(e) => handleChange(index, e)}
                        style={{ width: '50%' }} className='input-box' disabled />
                    </div>
                  </div>

                  <div className='layout-margintop-5'>
                    <label style={{ width: 135 }}>ชื่อ / รายละเอียด</label>
                    <input type='text'
                      name='ItemName'
                      value={item.ItemName}
                      onChange={(e) => handleChange(index, e)}
                      placeholder='' className='input-box' style={{ width: '70%' }} disabled />
                  </div>
                  <div className='layout-margintop-5'>
                    <label style={{ width: 135 }}>ขนาด</label>
                    <div>
                      <input type='number' placeholder='กว้าง'
                        name='Width'
                        value={item.Width}
                        onChange={(e) => handleChange(index, e)}
                        className='input-box' style={{ marginRight: 5, width: 70 }} disabled />
                    </div>
                    <div>
                      <input type='number'
                        name='Depth'
                        value={item.Depth}
                        onChange={(e) => handleChange(index, e)}
                        placeholder='ยาว' className='input-box' style={{ marginRight: 5, width: 70 }} disabled />
                    </div>

                    <div style={{ marginRight: 10 }}>
                      <input type='number'
                        name='Height'
                        value={item.Height}
                        onChange={(e) => handleChange(index, e)}
                        placeholder='สูง' className='input-box' style={{ marginRight: 5, width: 70 }} disabled />
                    </div>
                    <div>
                      <label style={{ marginRight: 5 }}>น้ำหนัก :</label>
                    </div>
                    <div>
                      <input type='number'
                        name='NetWeight'
                        value={item.NetWeight}
                        onChange={(e) => handleChange(index, e)}
                        placeholder='Net W.' className='input-box' style={{ marginRight: 5, width: 70 }} disabled />
                    </div>
                    <div>
                      <input type='number'
                        name='TareWeight'
                        value={item.TareWeight}
                        onChange={(e) => handleChange(index, e)}
                        placeholder='Tare W.' className='input-box' style={{ marginRight: 5, width: 70 }} disabled />
                    </div>
                    <div>
                      <input type='number'
                        name='GrossWeight'
                        value={item.GrossWeight}
                        onChange={(e) => handleChange(index, e)}
                        placeholder='Gross W.' className='input-box' style={{ marginRight: 5, width: 70 }} disabled />
                    </div>
                  </div>
                  <div className='layout-margintop-5'>
                    <label style={{ width: 130 }}>Size Details</label>
                    <div style={{ width: '40%' }}>
                      <input type='text'
                        name='SizeDetails'
                        value={item.SizeDetails}
                        onChange={(e) => handleChange(index, e)}
                        className='input-box' style={{ width: '100%' }} disabled />
                    </div>
                  </div>
                  <div className='layout-margintop-5'>
                    <label style={{ width: 130 }}>ขนิด Sheet</label>
                    <div style={{ width: '70%' }}>
                      <input type='text'
                        name='TypeSheet'
                        value={item.TypeSheet}
                        onChange={(e) => handleChange(index, e)}
                        className='input-box' style={{ width: '100%' }} disabled />
                    </div>
                  </div>
                  <div className='layout-margintop-5'>
                    <label style={{ width: 130 }}>Format Barcode</label>
                    <div style={{ width: '70%' }}>
                      <input type='text'
                        name='Barcode'
                        value={item.Barcode}
                        onChange={(e) => handleChange(index, e)}
                        className='input-box' style={{ width: '100%' }} disabled />
                    </div>
                  </div>
                  <div className='layout-margintop-5'>
                    <label style={{ width: 130 }}>อธิบายเพิ่มเติม</label>
                    <div style={{ width: '70%' }}>
                      <input
                        name='Remark'
                        value={item.Remark}
                        onChange={(e) => handleChange(index, e)}
                        className='input-box' style={{ width: '100%' }} disabled />
                    </div>
                  </div>
                </div>
                <div style={{ width: '15%', flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
                  <div >
                  </div>
                  <div>
                    <div style={{ backgroundColor: 'red', padding: 10, margin: 5, color: '#ffff' }}>
                      {index + 1}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {/* ส่วนของ batch*/}
                <div style={{ padding: 10, backgroundColor: '#EDF5F3' }}>
                  {/* <hr/> */}
                  <div>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                      <div><label style={{ width: 'auto', padding: 3, backgroundColor: '#A2BFF2' }}>Batch บรรจุภัณฑ์ {item.BatchNo != "" && <label>รูปแบบที่ {item.BatchNo}</label>}</label></div>
                      
                       {/* <PopUpbatchversion getBatchproduct={getBatchproduct} index={index} JournalCode={item.JournalCode}/> */}
                      
                    </div>
                    {/*batch1*/}
                    <div className='layout-margintop-5'>
                      <div style={{ width: 150 }}>
                        {/* <label> ยิงบนบรรจุภัณฑ์ :</label> */}
                      {item.TypeBatch == '1' && <label> ยิงบนบรรจุภัณฑ์ :</label>}
                      {item.TypeBatch == '2' && <label> ยิงบนกล่องนอก :</label>}

                      </div>
                      <div>
                        <textarea
                          name='Batch1'
                          value={item.Batch1}
                          // onChange={(e) => handleChange(index, e)}
                          style={{ marginRight: 10, width: 250 }}
                          className='textarea-box'
                          disabled
                        />
                      </div>
                      <div style={{ width: 65 }}>
                        <label>อธิบาย</label>
                      </div>
                      <div >
                        <textarea
                          name='BatchDetail1'
                          value={item.BatchDetail1}
                          // onChange={(e) => handleChange(index, e)}
                          style={{ width: 350, marginRight: 10 }}
                          className='textarea-box'
                           disabled
                        />

                      </div>
                      <div style={{ width: 65 }}>
                        <label>ตัวอย่าง</label>
                      </div>
                      <div>
                        <textarea
                          name='BatchExample1'
                          value={item.BatchExample1}
                          // onChange={(e) => handleChange(index, e)}
                          style={{ width: 250 }}
                          className='textarea-box'
                         disabled
                        />

                      </div>
                    </div>
                    {/*batch2*/}
                    <div className='layout-margintop-5'>
                      <div style={{ width: 150 }}></div>
                      <div>
                        <textarea
                          name='Batch2'
                          value={item.Batch2}
                          // onChange={(e) => handleChange(index, e)}
                          style={{ marginRight: 10, width: 250 }}
                          className='textarea-box'
                           disabled
                        />
                      </div>
                      <div style={{ width: 65 }}>
                        <label>อธิบาย </label>
                      </div>
                      <div>
                        <textarea
                          name='BatchDetail2'
                          value={item.BatchDetail2}
                          // onChange={(e) => handleChange(index, e)}
                          style={{ width: 350, marginRight: 10 }}
                          className='textarea-box'
                           disabled
                        />
                      </div>
                      <div style={{ width: 65 }}>
                        <label>ตัวอย่าง</label>
                      </div>
                      <div>
                        <textarea
                          name='BatchExample2'
                          value={item.BatchExample2}
                          // onChange={(e) => handleChange(index, e)}
                          style={{ width: 250 }}
                          className='textarea-box'
                           disabled
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div style={{ width: '100%' }}>

                {dataImageList.length > 0 && <div style={{ width: '100%' }}>
                  <Retureimag idjornal={item.JournalID} dataDetial={dataDetial[index]} />
                </div>
                }
              </div>

            </div>

          </Box>))}

    </Container>
  </React.Fragment>
  )
}

export default ReviseDetaildocument
import React, { useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box';
import { Button, colors, Container } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FetchApi from '../../../customhooks/Functionapi';
import './viewdocument.scss';
import { deletedetailById, NewDocumentDeatil, UpdateDetailList } from '../../../customhooks/Functiondocument';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { host } from '../../../customhooks/Functionapi';
import ImageZoom from "react-image-zooom";
import DownloadIcon from '@mui/icons-material/Download';
import moment from 'moment/moment.js';
import PopUpshowImages from '../newDocument/popupcomponent/popUpshowImages';
const ViewDocumentdetail = (props) => {
  const FetchApis = new FetchApi()

  const ref_detial = useRef(null);

  const [dataDetial, setDataDetial] = useState([])
  const [dataImageList, setDataImageList] = useState([])


  useEffect(() => {
    getjourDetailList()
  }, [ref_detial])


  const getjourDetailList = async () => {

    if (dataDetial.JournalID == "") {
      UpdateDetailList(dataDetial)
    }

    await FetchApis.FethcGet(`/document/DocumentdetailByCode/${props.dataHeader.JournalCode}`).then(res => {
      if (res) {

        setDataDetial(res.data)
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
      }

    })
  }

  const loadfile = (filenames) => {
    window.location.href = `${host}/file/images/files/${filenames}`
  }

  // show data images list from 
  function Retureimag({ idjornal, dataDetial }) {

    var result = dataImageList.filter(val => val.JourId == idjornal);
    return (<div>

      <React.Fragment>
        {result.map((val, index) =>
          <Box sx={{ height: 'auto', marginTop: '1px', padding: 1 }}>
            <hr />
            <div className='row-pace-w100-line'
              style={{ backgroundColor: '#faf8f8' }}>
              {/* ส่วนที่1 */}
              <div style={{ width: '25%' }}>
                <div style={{
                  margin: 5, padding: 3,
                  backgroundColor: '#0a74c6', color: '#ffff', width: 50,
                  flex: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <label> No.{index + 1}</label>
                </div>
                <div>
                  <div style={{ marginBottom: 5 }}>
                    <label>หัวข้อ</label>
                    <div style={{ backgroundColor: '#ebedef', padding: 5 }}>
                      <label>{val.SubjectDetails}</label>
                    </div>

                  </div>
                  <div>
                    <label>รายละเอียด</label>
                    <div style={{ width: '100%' }}>
                      <label
                        style={{
                          display: "block",
                          whiteSpace: "pre-wrap", // ✅ เคารพการเคาะบรรทัด
                          border: "1px solid #ccc",
                          padding: "8px",
                          minHeight: "auto",
                          width: "100%",
                          // background: "#f9f9f9"
                        }}
                      >
                        {val.SubjectExtend}</label>
                    </div>

                  </div>
                </div>
              </div>
              {/* ส่วนที่2 */}
              <div style={{ width: '75%', padding: 10 }} className='row-pace-w100-line'>
                <div style={{
                  width: '100%', height: 340
                }}>
                  <center>
                      <div>
                        <label>ภาพประกอบ : {val.PkDescription} {val.ItemID}</label>
                      </div>
                    <div style={{ flexDirection: 'row',display:'flex' }}>
                    
                      <ImageZoom
                        src={host + `/file/images/files/${val.LocationPic}`}
                        // style={{ width: '100%', height: 300 }}
                        width={'auto'}
                        height={300}
                        alt="Logo"
                        zoom="200"
                      />
                     
                        {/* <SearchIcon style={{ width: 35, height: 35, alignItems: 'flex-start' }} /> */}
                     
                      <PopUpshowImages nameimage={val.LocationPic} PkDescription={val.PkDescription} ItemID={val.ItemID}/>
                      <div>
                      {val.LocationPic != "" && <label style={{ fontSize: 11, cursor: 'pointer' }} onClick={() => loadfile(val.LocationPic)}><DownloadIcon />  ชื่อไฟล์ : {val.LocationPic}</label>}
                      </div>
                    </div>
                    <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'flex-end' }}>

                      <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <label style={{ marginRight: 10, fontWeight: '800' }}>Prepared By</label>
                          <label style={{ backgroundColor: '#ebedef', marginRight: 10 }}>{val.NameUserConfirm} {val.lastnameUserConfirm}</label>
                        </div>
                        <div>
                          <label style={{ marginRight: 10, fontWeight: '800' }}>create datetime</label>
                          <label style={{ backgroundColor: '#ebedef' }}>{moment(val.ConfirmDateTime).format('DD/MM/yyyy HH:mm:ss')}</label>
                        </div>
                      </div>
                    </div>

                  </center>
                </div>
              </div>
            </div>
          </Box>)}
      </React.Fragment>

    </div>)
  }


  return (<React.Fragment>
    <Container>


      {dataDetial.length > 0 &&
        dataDetial.map((item, index) => (
          <Box sx={{ height: 'auto', marginTop: '10px', marginBottom: 5, backgroundColor: '#faf8f8', fontSize: 14 }} ref={ref_detial} key={index}>

            <div style={{ width: '100' }} >
              <div className='row-pace-w100-line'>

                <div style={{ width: '30%' }}>

                  <div style={{
                    with: '100%', height: 50,
                    padding: 5,
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'start',
                    display: 'flex'
                  }}>

                    <div>
                      <label style={{ fontWeight: '800', }}>{item.PkDescription}</label>
                    </div>
                  </div>

                  {/* <div style={{ with: '100%', height: 70, padding: 5 }}>
                    <textarea className='textarea-box'
                      value={item.GroupRemark}
                      style={{ width: '90%', height: 'auto' }}
                      disabled />
                  </div> */}
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
                  {/* <div style={{
                    with: '100%', height: 50,
                    padding: 5,
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    display: 'flex'
                  }}>
                  </div> */}

                </div>

                <div style={{ width: '100%', fontSize: 14 }}>
                  <div className='layout-flex-line'>

                    <div className='layout-margintop-5' style={{ width: '100%' }}>
                      <div style={{ width: 140 }}>
                        <label style={{ fontWeight: '800' }}>รหัสสินค้า</label>
                      </div>
                      <div style={{ width: '70%', padding: 2, backgroundColor: '#ebedef' }}>
                        <label style={{ width: 200 }} >{item.ItemID}</label>
                      </div>

                    </div>

                    <div className='layout-margintop-5' style={{ width: '100%' }}>
                      <div>
                        <label style={{ marginRight: 5, marginLeft: 10, fontWeight: '800' }}>สเปค</label>
                      </div>
                      <div style={{ width: '70%', padding: 2, backgroundColor: '#ebedef' }}>
                        <label>{item.SpecID}</label>
                      </div>
                    </div>
                  </div>

                  <div className='layout-margintop-5'>
                    <div style={{ width: 140, fontWeight: '800' }}>
                      <label>ชื่อ / รายละเอียด</label>
                    </div>

                    <div style={{ width: '75%', padding: 2, backgroundColor: '#ebedef' }}>
                      <label>{item.ItemName}</label>
                    </div>

                  </div>
                  <div className='layout-margintop-5'>
                    <label style={{ width: 140, fontWeight: '800' }}>ขนาด</label>
                    <div>
                      <div style={{ marginRight: 5, width: 100, backgroundColor: '#ebedef' }}>
                        <label> Width : {item.Width}</label>
                      </div>

                    </div>
                    <div>
                      <div style={{ marginRight: 5, width: 100, backgroundColor: '#ebedef' }}>
                        <label>
                          Depth : {item.Depth}
                        </label>
                      </div>

                    </div>

                    <div style={{ marginRight: 10 }}>
                      <div style={{ marginRight: 5, width: 100, backgroundColor: '#ebedef' }} >
                        <label> Height : {item.Height}</label>
                      </div>
                    </div>

                  </div>


                  <div className='layout-margintop-5'>
                    <div style={{ width: 140 }}>
                      <label style={{ marginRight: 5, width: 140, fontWeight: '800' }}>น้ำหนัก :</label>
                    </div>
                    <div>
                      <div style={{ marginRight: 5, width: 'auto', backgroundColor: '#ebedef' }}>
                        <label>NetWeight : {item.NetWeight}</label>
                      </div>
                    </div>
                    <div>
                      <div style={{ marginRight: 5, width: 'auto', backgroundColor: '#ebedef' }}>
                        <label>TareWeight : {item.TareWeight}</label>
                      </div>

                    </div>
                    <div>
                      <div style={{ marginRight: 5, width: 'auto', backgroundColor: '#ebedef' }}>
                        <label>GrossWeight :{item.GrossWeight}</label>
                      </div>

                    </div>
                  </div>

                  <div className='layout-margintop-5'>
                    <label style={{ width: 140, fontWeight: '800' }}>Size Details</label>
                    <div style={{ width: '40%' }}>
                      <div style={{ width: '75%', backgroundColor: '#ebedef' }}>
                        <label>{item.SizeDetails}</label>
                      </div>
                    </div>
                  </div>
                  <div className='layout-margintop-5'>
                    <label style={{ width: 140, fontWeight: '800' }}>ขนิด Sheet</label>
                    <div style={{ width: '75%', backgroundColor: '#ebedef' }}>
                      <label>
                        {item.TypeSheet}
                      </label>
                    </div>
                  </div>
                  <div className='layout-margintop-5'>
                    <label style={{ width: 140, fontWeight: '800' }}>Format Barcode</label>
                    <div style={{ width: '75%', backgroundColor: '#ebedef' }}>
                      <label>{item.Barcode}</label>
                    </div>
                  </div>
                  <div className='layout-margintop-5'>
                    <div style={{ width: 140, fontWeight: '800' }}>
                      <label >อธิบายเพิ่มเติม 2 </label>
                    </div>
                    <div style={{ width: '75%', backgroundColor: '#ebedef' }}>
                      <label>{item.Remark} </label>

                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding: 10 }}>
                {item.TypeBatch != "" &&
                  <div>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                      <div><label style={{ width: 'auto', padding: 3, backgroundColor: '#A2BFF2' }}>Batch บรรจุภัณฑ์ {item.BatchNo != "" && <label>รูปแบบที่ {item.BatchNo}</label>}</label></div>
                    </div>
                    {/*batch1*/}
                    <div className='layout-margintop-5'>
                      <div style={{ width: 150 }}>
                        {item.TypeBatch == '1' && <label> ยิงบนบรรจุภัณฑ์ :</label>}
                        {item.TypeBatch == '2' && <label> ยิงบนกล่องนอก :</label>}
                        {/* <label style={{fontWeight: '800'}}> ยิงบนบรรจุภัณฑ์ :</label> */}

                      </div>
                      <div style={{ marginRight: 10, width: 250, backgroundColor: '#ebedef' }}>
                        <label>{item.Batch1}</label>
                      </div>
                      <div style={{ width: 65 }}>
                        <label style={{ fontWeight: '800' }}>อธิบาย</label>
                      </div>
                      <div style={{ width: 350, marginRight: 10, backgroundColor: '#ebedef' }}>
                        <label>{item.BatchDetail1}</label>
                      </div>
                      <div style={{ width: 65 }}>
                        <label style={{ fontWeight: '800' }}>ตัวอย่าง</label>
                      </div>
                      <div style={{ width: 250, backgroundColor: '#ebedef' }}>
                        <label>{item.BatchExample1}</label>
                      </div>
                    </div>
                    {/*batch2*/}
                    {item.Batch2 != "" &&
                      <div className='layout-margintop-5'>
                        <div style={{ width: 150, fontWeight: '800' }}></div>
                        <div style={{ marginRight: 10, width: 250, backgroundColor: '#ebedef' }}>
                          <label>{item.Batch2}</label>
                        </div>
                        <div style={{ width: 65 }}>
                          <label style={{ fontWeight: '800' }}>อธิบาย </label>
                        </div>
                        <div style={{ width: 350, marginRight: 10, backgroundColor: '#ebedef' }}>
                          <label>{item.BatchDetail2}</label>
                        </div>
                        <div style={{ width: 65 }}>
                          <label style={{ fontWeight: '800' }}>ตัวอย่าง</label>
                        </div>
                        <div style={{ width: 250, backgroundColor: '#ebedef' }}>
                          <label>{item.BatchExample2}</label>
                        </div>
                      </div>}
                  </div>}

              </div>
              <div className='layout-margintop-5' style={{ justifyContent: 'flex-end', marginRight: 10 }}>
                <div style={{ flexDirection: 'row', display: 'flex', marginRight: 10 }}>
                  <div style={{ width: 100, fontWeight: '800' }}>
                    <label >Prepared by</label>
                  </div>
                  <div>
                    <label style={{ backgroundColor: '#ebedef', padding: 2 }}>{item.NameUserConfirm} {item.lastnameUserConfirm}</label>
                  </div>
                </div>
                <div style={{ flexDirection: 'row', display: 'flex' }}>
                  <div style={{ width: 130, fontWeight: '800' }}>
                    <label>create datetime</label>
                  </div>
                  <div>
                    <label style={{ backgroundColor: '#ebedef', padding: 2 }}>
                      {moment(item.ConfirmDateTime).format('DD/MM/yyyy HH:mm:ss')}</label>
                  </div>
                </div>
              </div>
              <div>
                {dataImageList.length > 0 && <Retureimag idjornal={item.JournalID} dataDetial={dataDetial[index]} />}
              </div>

            </div>

          </Box>))}

    </Container>
  </React.Fragment>
  )
}

export default ViewDocumentdetail
import React, { useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box';
import { Button, colors, Container } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { MdOutlineDoNotDisturbOn } from "react-icons/md";
import PopUpcuAddSlot from '../../newDocument/popupcomponent/popUpcuAddSlot';
import PopUpcuEditSlot from '../popupcomponent/popUpcuEditSlot';
import ViewDocumentdetailbyid from '../../veiwdocuments/viewDocumentdetailbyid';
import PopUpdetailitem from '../../newDocument/popupcomponent/popUpdetailitem';
import PopUpdetailSpec from '../../newDocument/popupcomponent/popUpdetailSpec';
import FetchApi from '../../../../customhooks/Functionapi';
import '../newdocument.scss';
import { deletedetailById, NewDocumentDeatil, UpdateDetailList } from '../../../../customhooks/Functiondocument';
import PopUpAddImages from '../../newDocument/popupcomponent/popUpAddImages';
import PopUpAddJournalImages from '../popupcomponent/popUpAddJournalImages';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PopUpEditImages from '../../newDocument/popupcomponent/popUpEditImages';
import { host } from '../../../../customhooks/Functionapi';
import PopUpbatchversion from './popUpbatchversion';
import PopUpshowImages from '../popupcomponent/popUpshowImages';

import Swal from 'sweetalert2';
import moment from 'moment/moment.js';

const EditDetaildocument = (props) => {
  const FetchApis = new FetchApi()
  const userId = sessionStorage.getItem('userId');
  const ref_detial = useRef(null);

  const [dataDetial, setDataDetial] = useState([])
  const [opentAddslot, setOpenAddslot] = useState(false);
  const [dataImageList, setDataImageList] = useState([]);
  const [reload, setReload] = useState(false)


  function deletefrom(idkey) {

    Swal.fire({
      title: "แจ้งการลบ?",
      text: "คุณแน่ใจที่ลบข้อมูล ใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {

        deletedetailById(idkey).then(res => {

          if (res) {
            var data = dataDetial.filter((itime) => itime.JournalID !== idkey)

            if (data.length > 0) {
              setDataDetial(data);
            }
            else {
              setDataDetial([]);
            }

          }
        })
      }
    });

  }

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


  function RevoveImage(id) {
    UpdateDetailList(dataDetial)
    Swal.fire({
      title: "แจ้งการลบ?",
      text: "คุณแน่ใจที่ลบข้อมูล ใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ลบเอกสาร",
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {

        FetchApis.FethcDelete(`/document/specificdeleteById/${id}`).then(res => {
          if (res) {
            getjourDetailList();
          }
        })

      }
    });

  }


  // show data images list from 
  function Retureimag({ idjornal, dataDetial }) {
    var result = dataImageList.filter(val => val.JourId == idjornal);
    return (<div style={{ width: '100%' }}>

      {result.map((val, index) =>
        <Box sx={{ height: 'auto', marginTop: '1', padding: 1, width: '100%', display: 'flex', fontSize: 14 }}>
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
                    maxLength={350}
                    disabled
                    className='input-box' />
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
                      background: "#f9f9f9"
                    }}
                  >
                    {val.SubjectExtend}
                  </label>
                </div>
              </div>
            </div>
            {/* ส่วนที่2 */}
            <div style={{ width: '65%', padding: 10 }} className='row-pace-w100-line'>
              <div style={{
                width: '100%', height: 320, backgroundColor: "#d6d8d7"
              }}>
                {/* <Zoom > */}
                <div>ภาพประกอบ : {val.PkDescription} {val.ItemID}</div>
                <img src={host + `/file/images/files/${val.LocationPic}`} alt="My local" style={{ width: '100%', height: 300 }} />
              </div>
              <div>
                <div>

                  <PopUpshowImages nameimage={val.LocationPic} PkDescription={val.PkDescription} ItemID={val.ItemID} />
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
                      <Button variant="outlined" size="small" color='error' onClick={() => RevoveImage(val.JournalID)}>Remove</Button>
                    </div>
                    <PopUpEditImages
                      getdataImages={props.getdataImages}
                      valDateail={dataDetial}
                      SlotNo={val.SlotNo}
                      ItemName={dataDetial.ItemName}
                      ItemID={dataDetial.ItemID}
                      JourId={dataDetial.JournalID}
                      getjourDetailList={getjourDetailList}
                      JournalID={val.JournalID}
                    />
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
    var input = e.target.value;
    const cleanInput = input.replace(/[^a-zA-Z0-9ก-๙\s()#/.%:";,=\-&@$<>+*/?!]/g, "");
    // const cleanInput = input.replace(/[^a-zA-Z0-9ก-๙\s()#/.%:";,=\-@$<>+*/?!]/g, "");
    setDataDetial(prevItems =>
      prevItems.map((item, i) =>
        i === index ? {
          ...item, [name]: cleanInput,
          ['SlotNo']: index + 1
        } : item
      )
    );

  }

  const getBatchproduct = (index, val) => {

    setDataDetial(prevItems =>
      prevItems.map((item, i) =>
        i === index ? {
          ...item,
          ['Batch1']: val.batchName1,
          ['Batch2']: val.batchName2,
          ['BatchDetail1']: val.batchDetail1,
          ['BatchDetail2']: val.batchDetail2,
          ['BatchExample1']: val.batchExample1,
          ['BatchExample2']: val.batchExample2,
          ['BatchNo']: val.numbers,
          ['TypeBatch']: val.TypeBatch
        } : item
      )
    );
    UpdateDetailList(dataDetial)
  }


  const removeBatcporduct = (index, val) => {

    Swal.fire({
      title: "แจ้งการลบ?",
      text: "คุณแน่ใจที่ลบข้อมูล ใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {

        setDataDetial(prevItems =>
          prevItems.map((item, i) =>
            i === index ? {
              ...item,
              ['Batch1']: '',
              ['Batch2']: '',
              ['BatchDetail1']: '',
              ['BatchDetail2']: '',
              ['BatchExample1']: '',
              ['BatchExample2']: '',
              ['BatchNo']: '',
              ['TypeBatch']: ''
            } : item
          )
        );

      }
    });

    UpdateDetailList(dataDetial);
  }


  const isAddDetailList = (v) => {
    setOpenAddslot(v)
    if (dataDetial.JournalID !== "") {
      UpdateDetailList(dataDetial)
      NewDocumentDeatil(props.dataHeader.JournalCode).then(res => {
        if (res) {

          getjourDetailList()

        }
      })
    }

    setTimeout(() => {
      ref_detial.current?.scrollIntoView({ behavior: 'smooth' });

    }, 800);
  }

  const inDetailItemId = (Itemid, ItemName, SpecID, GrossWidth, Grossdepth, Grossheights, Netweight, Taraweight, GrossWeight, indexs) => {
    console.log(SpecID);
    setDataDetial(prevItems =>
      prevItems.map((item, i) =>
        i === indexs ? {
          ...item,
          ['ItemID']: Itemid,
          ['ItemName']: ItemName,
          ['SpecID']: SpecID,
          ['Width']: GrossWidth,
          ['Depth']: Grossdepth,
          ['Height']: Grossheights,
          ['NetWeight']: Netweight,
          ['TareWeight']: Taraweight,
          ['GrossWeight']: GrossWeight,
          ['SlotNo']: i + 1
        } : item,
      )
    );


    UpdateDetailList(dataDetial)
  }

  const inDetailSpec = (specId, index) => {
    setDataDetial(prevItems =>
      prevItems.map((item, i) =>
        i === index ? { ...item, ['SpecID']: specId } : item
      )
    );
    UpdateDetailList(dataDetial)
  }


  return (<React.Fragment>
    <Container>
      <div style={{ marginTop: 5, marginRight: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', display: 'flex' }}>
        <div style={{ marginRight: 10 }}>
          <Button variant="outlined" size="small" color='warning' startIcon={<AddBoxIcon />}
            onClick={() => isAddDetailList(true)}>Add Detail</Button>
        </div>
        <div>
          <PopUpAddJournalImages
            getdataImages={props.getdataImages}
            HearderData={props.dataHeader}
            valDateail={''}
            SlotNo={''}
            ItemName={''}
            ItemID={''}
            JourId={props.dataHeader.JournalID}
            dataDetial={dataDetial}
            getjourDetailList={getjourDetailList}
          />
        </div>
      </div>

      {dataDetial.length > 0 &&
        dataDetial.map((item, index) => (<div>
          {userId != item.UserIDConfirm ? <ViewDocumentdetailbyid idjour={item.JournalID} index={index} /> :
            <Box sx={{ height: 'auto', marginTop: '10px', marginBottom: 5, backgroundColor: '#faf8f8', fontSize: 14 }} ref={ref_detial} key={index}>
              <PopUpcuAddSlot opentAddslot={opentAddslot} inDataAddsolt={inDataAddsolt} index={index} />
              <div style={{ width: '100' }} >
                <div className='row-pace-w100-line'>
                  <div style={{ width: '25%' }}>

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
                          <PopUpcuEditSlot inDataAddsolt={inDataAddsolt} index={index} />
                        </div>
                      </div>

                      <div style={{ padding: 10, backgroundColor: '#eaeded', width: '80%' }}>
                        {item.PkDescription}
                      </div>
                    </div>
                    <div style={{ with: '100%', height: 70, padding: 5 }}>
                      <textarea className='textarea-box'
                        name='GroupRemark'
                        placeholder='อธิบายเพิ่มเติม'
                        value={item.GroupRemark} onChange={(e) => handleChange(index, e)}
                        style={{ width: '100%', height: 100 }} />
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
                  {/* // ส่วน  detail */}
                  <div style={{ width: '75%' }}>
                    <div className='layout-flex-line'>
                      <div className='layout-margintop-5' style={{ width: '100%' }}>
                        <label style={{ width: 135 }}>รหัสสินค้า</label>

                        <input type='text' placeholder='' style={{ width: '50%' }} className='input-box'
                          name="ItemID"
                          value={item.ItemID}
                          onChange={(e) => handleChange(index, e)}
                        />
                        {item.ColabgroupId != "" && reload == false && <PopUpdetailitem
                          inDetailItemId={inDetailItemId}
                          ColabgroupId={item.ColabgroupId}
                          dataDetial={dataDetial}
                          index={index} />}

                      </div>
                      <div className='layout-margintop-5' style={{ width: '100%' }}>
                        <label style={{ marginRight: 5 }}>สเปค</label>
                        <input type='text' placeholder=''
                          name='SpecID'
                          value={item.SpecID}
                          onChange={(e) => handleChange(index, e)}
                          style={{ width: '65%' }} className='input-box' />
                        {item.ColabgroupId != "" && reload == false && <PopUpdetailSpec
                          inDetailSpec={inDetailSpec}
                          dataDetial={dataDetial}
                          ColabgroupId={item.ColabgroupId} index={index} />}

                      </div>

                    </div>

                    <div className='layout-margintop-5'>
                      <label style={{ width: 135 }}>ชื่อ / รายละเอียด</label>
                      <input type='text'
                        name='ItemName'
                        value={item.ItemName}
                        onChange={(e) => handleChange(index, e)}
                        placeholder='' className='input-box' style={{ width: '75%' }} />
                    </div>
                    <div className='layout-margintop-5'>
                      <label style={{ width: 135 }}>ขนาด</label>
                      <div>
                        <label style={{ width: 135 }}>กว้าง</label>
                        <input type='number' placeholder='กว้าง'
                          name='Width'
                          value={item.Width}
                          onChange={(e) => handleChange(index, e)}
                          className='input-box' style={{ marginRight: 5, width: 80 }} />
                      </div>
                      <div>
                        <label style={{ width: 135 }}>ยาว</label>
                        <input type='number'
                          name='Depth'
                          value={item.Depth}
                          onChange={(e) => handleChange(index, e)}
                          placeholder='ยาว' className='input-box' style={{ marginRight: 5, width: 80 }} />
                      </div>

                      <div style={{ marginRight: 10 }}>
                        <label style={{ width: 135 }}>สูง</label>
                        <input type='number'
                          name='Height'
                          value={item.Height}
                          onChange={(e) => handleChange(index, e)}
                          placeholder='สูง' className='input-box' style={{ marginRight: 5, width: 80 }} />
                      </div>
                      <div>
                        <label style={{ width: 135 }}>NetWeight.</label>
                        <input type='number'
                          name='NetWeight'
                          value={item.NetWeight}
                          onChange={(e) => handleChange(index, e)}
                          placeholder='Net W.' className='input-box' style={{ marginRight: 5, width: 80 }} />
                      </div>
                      <div>
                        <label style={{ width: 135 }}>TareWeight.</label>
                        <input type='number'
                          name='TareWeight'
                          value={item.TareWeight}
                          onChange={(e) => handleChange(index, e)}
                          placeholder='Tare W.' className='input-box' style={{ marginRight: 5, width: 80 }} />
                      </div>
                      <div>
                        <label style={{ width: 135 }}>GrossWeight.</label>
                        <input type='number'
                          name='GrossWeight'
                          value={item.GrossWeight}
                          onChange={(e) => handleChange(index, e)}
                          placeholder='Gross W.' className='input-box' style={{ marginRight: 5, width: 80 }} />
                      </div>
                    </div>
                    <div className='layout-margintop-5'>
                      <label style={{ width: 130 }}>Size Details</label>
                      <div style={{ width: '70%' }}>
                        <input type='text'
                          name='SizeDetails'
                          value={item.SizeDetails}
                          onChange={(e) => handleChange(index, e)}
                          className='input-box' style={{ width: '100%' }} />
                      </div>
                    </div>
                    <div className='layout-margintop-5'>
                      <label style={{ width: 130 }}>ขนิด Sheet</label>
                      <div style={{ width: '70%' }}>
                        <input type='text'
                          name='TypeSheet'
                          value={item.TypeSheet}
                          onChange={(e) => handleChange(index, e)}
                          className='input-box' style={{ width: '100%' }} />
                      </div>
                    </div>
                    <div className='layout-margintop-5'>
                      <label style={{ width: 130 }}>Format Barcode</label>
                      <div style={{ width: '70%' }}>
                        <input type='text'
                          name='Barcode'
                          value={item.Barcode}
                          onChange={(e) => handleChange(index, e)}
                          className='input-box' style={{ width: '100%' }} />
                      </div>
                    </div>
                    <div className='layout-margintop-5'>
                      <label style={{ width: 130 }}>อธิบายเพิ่มเติม 2</label>
                      <div style={{ width: '70%' }}>
                        <input
                          name='Remark'
                          value={item.Remark}
                          onChange={(e) => handleChange(index, e)}
                          className='input-box' style={{ width: '100%' }} />
                      </div>
                    </div>

                  </div>
                  {/* // ส่วน delete  */}
                  <div style={{ width: '15%' }}>

                    <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        {dataDetial && <div>
                          <Button size="small"
                            onClick={() => deletefrom(item.JournalID)}
                            startIcon={<DoNotDisturbOnIcon sx={{ color: '#f63e24' }} />}>Delete</Button>
                        </div>
                        }
                      </div>
                      <div>
                        <div style={{ backgroundColor: 'red', padding: 10, margin: 5, color: '#ffff' }}>
                          {index + 1}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                {/* ส่วนของ batch*/}
                <div style={{ padding: 10, backgroundColor: '#EDF5F3' }}>
                  {/* <hr/> */}
                  <div>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                      <div><label style={{ width: 'auto', padding: 3, backgroundColor: '#A2BFF2' }}>Batch บรรจุภัณฑ์ {item.BatchNo != "" && <label>รูปแบบที่ {item.BatchNo}</label>}</label></div>
                      <PopUpbatchversion getBatchproduct={getBatchproduct} index={index} JournalCode={item.JournalCode} />
                      <div style={{
                        marginLeft: 10, backgroundColor: '#CF5008', padding: 3, alignItems: 'center', alignContent: 'center',
                        justifyContent: 'center', display: 'flex', borderRadius: 5, cursor: 'pointer'
                      }} onClick={(e) => removeBatcporduct(index, e)}>
                        <MdOutlineDoNotDisturbOn size={15} color='#fff' style={{ cursor: 'pointer' }} />  <label style={{ color: '#ffff', cursor: 'pointer' }}>ยกเลิก</label>
                      </div>
                    </div>
                    {/*batch1*/}
                    <div className='layout-margintop-5'>
                      <div style={{ width: 150 }}>
                        {item.TypeBatch == '1' && <label> ยิงบนบรรจุภัณฑ์ :</label>}
                        {item.TypeBatch == '2' && <label> ยิงบนกล่องนอก :</label>}
                      </div>
                      <div>
                        <textarea
                          name='Batch1'
                          value={item.Batch1}
                          onChange={(e) => handleChange(index, e)}
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
                          onChange={(e) => handleChange(index, e)}
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
                          onChange={(e) => handleChange(index, e)}
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
                          onChange={(e) => handleChange(index, e)}
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
                          onChange={(e) => handleChange(index, e)}
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
                          onChange={(e) => handleChange(index, e)}
                          style={{ width: 250 }}
                          className='textarea-box'
                          disabled
                        />
                      </div>
                    </div>

                  </div>
                </div>

                <div className='layout-margintop-5' style={{ justifyContent: 'flex-end', margin: 10 }}>
                </div>
                <div style={{ width: '100%' }} >
                  <div className='layout-margintop-5' style={{ justifyContent: 'space-between' }}>

                    <div style={{ marginRight: 10, marginLeft: 10, flexDirection: 'row', display: 'flex', width: '80%', justifyContent: 'flex-end' }}>
                      <div style={{ marginRight: 10, flexDirection: 'row', display: 'flex' }}>
                        <div style={{ marginRight: 10 }}>
                          <label style={{ fontWeight: '800' }}>Prepared By </label>
                        </div>
                        <div>
                          <label style={{ fontSize: 12 }}> {item.NameUserConfirm} {item.lastnameUserConfirm} </label>
                        </div>
                      </div>

                      <div style={{ marginRight: 10, flexDirection: 'row', display: 'flex' }}>
                        <div style={{ marginRight: 10 }}>
                          <label style={{ fontWeight: '800' }}>create datetime</label>
                        </div>
                        <div style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                          <label style={{ fontSize: 12 }}>{moment(item.ConfirmDateTime).format('DD/MM/yyy hh:mm:ss')}</label>
                        </div>
                        <div>
                          <CheckCircleOutlineIcon sx={{ color: '#39995f' }} />
                        </div>
                      </div>
                    </div>

                    {item.SlotNo > 0 && item.ItemID != "" &&
                      <PopUpAddImages
                        getdataImages={props.getdataImages}
                        HearderData={dataDetial[index]}
                        valDateail={dataDetial}
                        SlotNo={item.SlotNo}
                        ItemName={item.ItemName}
                        ItemID={item.ItemID}
                        JourId={item.JournalID}
                        getjourDetailList={getjourDetailList}

                      />

                    }
                  </div>
                  {dataImageList.length > 0 && <div style={{ width: '100%' }}>
                    <Retureimag idjornal={item.JournalID} dataDetial={dataDetial[index]} />
                  </div>
                  }
                </div>

              </div>

            </Box>}

        </div>
        ))}

    </Container>
  </React.Fragment>
  )
}

export default EditDetaildocument
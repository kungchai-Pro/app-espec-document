import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Newdocuments from './component/newDocument/Newdocuments';

import { Route, Link, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { AddHeader, AddDetail, AddImages } from '../redux/features/document/documentHeaderSlice';
import FetchApi from '../customhooks/Functionapi';
import { Button } from '@mui/material';
import { UpdateDetailList } from '../customhooks/Functiondocument';
import Swal from 'sweetalert2';


export default function NewDocument(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  const documentHeader = useSelector((state) => state.documentHeader.valueHeader);
  const documentDetial = useSelector((state) => state.documentHeader.valueDetail);


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
  }
  else {
    convertmonth = convertmonth
  }

  var datenow = d.getFullYear() + "-" + convertmonth + "-" + convertdate
  var datenowtime = d.getFullYear() + "-" + convertmonth + "-" + convertdate + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()

  const FetchApis = new FetchApi();

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function getdataheader(data) {
    dispatch(AddHeader(data))
  }

  function getdatadetail(data) {
    dispatch(AddDetail(data))
  }

  function getdataImages(data) {
    dispatch(AddImages(data))
  }


  // ข้อมูลก่อน save
  const isSaveClose = () => {

    const newObj = {
      ...documentHeader,
      stamptimeUpdate: datenowtime
    };


    if (documentHeader.FlowrunId != "") {
      isInsertData(newObj)
      UpdateDetailList(documentDetial)

      Swal.fire({
        title: "แจ้งเตือน!",
        text: "คุณได้ทำการสร้างเอกสารเรียบร้อยแล้ว!",
        icon: "success"
      });

      setTimeout(() => {
        window.location.href = '/documents'

      }, 700);

    } else {
      Swal.fire({
        title: "แจ้งเตือน",
        text: "คุณยังไม่ได้เลือกเป็น flow อนุมัติ",
        icon: "warning"
      });

    }

  };

  // insert header
  const isInsertData = (datainsert) => {
    FetchApis.FethcPost(`/document/createdocument`, datainsert).then(res => {
      if (res.status == 200) {
        // window.location.href=`/newducument/${res.insertId}`
      } else {
        console.log(res)
      }
    })

  }

  function refresh() {
    window.location.reload();
  }

  return (
    <div>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="ส่วนของคำร้อง" value="1" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div style={{ width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" color="success" onClick={() => isSaveClose()} style={{ marginRight: 10 }}>บันทึก</Button>
              <Button variant="contained" color='warning' onClick={() => refresh()}>ยกเลิก</Button>
            </div>
            <Newdocuments getdataheader={getdataheader}
              getdatadetail={getdatadetail}
              getdataImages={getdataImages}
              insertId={id}
            />
          </TabPanel>

        </TabContext>
      </Box>
    </div>
  );
}

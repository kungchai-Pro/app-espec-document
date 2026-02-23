import React, { useState, useEffect } from 'react';

import FetchApi from '../../../customhooks/Functionapi';
import { FaCheckCircle } from "react-icons/fa";
import imagestep from '../../../../images/arrow-alt-down.png';
import imageright from '../../../../images/minus.png';
import moment from 'moment/moment';
export default function StepFlowProcess(props) {
  const FetchApis = new FetchApi();
  const [datalist, setDatalist] = useState([]);

  React.useEffect(() => {
    flowlistStep()
  }, [])

  async function flowlistStep() {
    await FetchApis.FethcGet(`/flowrunsystem/flowSteplistByJourId/${props.jourID}`).then(res => {
      if (res) {
        setDatalist(res.data);
        console.log(res.data)
      }
    })

  }


  return (
    <div>

      {datalist.map((item, indix) => (<div style={{ flexDirection: 'column', alignItems: 'center', display: 'flex' }}>
        <div style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', display: 'flex', width: 600 }}>

          <div style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            {indix > 0 && <img src={imagestep} alt="Logo" height={25} width={20} />}
            <div style={{ margin: 5, padding: 5, backgroundColor: '#D3EBDA', borderRadius: 10, cursor: 'pointer' }}>
              <div style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                {item.activerecieved == 1 && <FaCheckCircle color={item.active == 1 ? 'green' : '#E07828'} />}
                <div style={{ fontSize: 13, marginLeft: 3, cursor: 'pointer' }}>คุณ {item.userbyflow} ( {item.nameStatus} )</div>
              </div>
            </div>
          </div>
          <div style={{ flexDirection:'row',display:'flex',width: 300, alignItems: 'center', fontSize: 10, marginTop: 15 }}>
            <img src={imageright} alt="Logo" height={25} width={50} />
            <div>
              <div style={{flexDirection:'row',display:'flex',}}>
                <div style={{width:100}}>
                  {item.statusType=='100'?<label>วันที่สร้าง</label> :<label>วันที่รับ</label> }
                  </div><label style={{color:'#E07828'}}>{item.Startdatetime!==null&& moment(item.Startdatetime).format('DD/MM/yyy HH:mm:ss')}</label>
              </div>
              <div style={{flexDirection:'row',display:'flex',}}>
                <div style={{width:100}}>วันที่อนุมัติ</div>
                {item.active == 1&&<label style={{color:'green'}}>{item.Enddatetime!==null&&moment(item.Enddatetime).format('DD/MM/yyyy HH:mm:ss')}</label>}
              </div>
            </div>
          </div>
        </div>
      </div>))}

    </div>
  );
}
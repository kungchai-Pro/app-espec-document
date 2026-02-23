import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import FetchApi from './../../../customhooks/Functionapi';

const steps = [
  'Select master blaster campaign settings',
  'Create an ad group',
  'Create an ad',
];

export default function StepViewProcess(props) {
      const FetchApis =new FetchApi();
    const [activeStep, setActiveStep] = useState(0);
    const [datalist, setDatalist] = useState([]);
    const [sumActiveall, setSumActiveall] = useState(0);

    useEffect(()=>{
      flowstatusListnow()
    },[])

   async function flowstatusListnow() {
    await FetchApis.FethcGet(`/flowrunsystem/flowtransationByJournalId/${props.jourID}`).then(res => {
      if (res) {
        setDatalist(res.data)
        // sumActive(res.data)
        // setSumActiveall(res.data0[0].activesum)
       setSumActiveall(res.data[0].activesum)
      }


    })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={sumActiveall} alternativeLabel>
        {datalist.map((item,index) => (
          <Step key={index}>
            <StepLabel>{item.nameUser}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
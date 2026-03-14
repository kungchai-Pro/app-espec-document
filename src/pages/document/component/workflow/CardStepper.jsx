import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import Stack from '@mui/material/Stack';
// import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { Card } from '@mui/material';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CardContent from '@mui/material';


// const steps = [
//     'Select master blaster campaign settings',
//     'Create an ad group',
//     'Create an ad',
//     'Create an ad',
//   ];


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme }) => ({
  backgroundColor: '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  // marginTop:-10,
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active, // color border
      style: {
        backgroundImage:
          'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed, //colro icon
      style: {
        backgroundImage:
          'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      },
    },
  ],
}));




function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <StickyNote2Icon />,
    2: <GroupAddIcon />,
    3: <ManageHistoryIcon />,
    4: <CheckCircleOutlineIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Draft', 'Review', 'Approval','Finalization'];
const stepsLable = [
    'Initial document creation',
    'Document under review',
    'Awaiting final approval',
    'Document finalized',
  ];
  // const documentAll=['1','0','5','12']

  const colorbox=['#eceeea','#def6fa','#fcf7da','#eefbe3']

const CardStepper = (props) => {

   const documentAll=[`${props.countInDraft}`,`${props.countInpreveiw}`,`${props.countapproved}`,`${props.countSuccessfully}`]
  return (
    <Box sx={{ width: '100%' }}>
      <Card style={{padding:10}}>
      <Stack sx={{ width: '100%' }} spacing={4}>
        <Stepper activeStep={4} alternativeLabel connector={<ColorlibConnector />}>
          {steps.map((label,i) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                <center>
                <div style={{
                  display:'flex',
                  width:200,height:100,
                  backgroundColor:colorbox[i],
                  marginTop:-15,borderRadius:10,
                  flexDirection:'column',
                  justifyContent:'center',
                  justifyItems:'center',
                  
                  }}>
                <label style={{alignItems:'center'}}>{label}</label>
                <label style={{fontSize:12,fontWeight:'200'}}>{stepsLable[i]}</label>
                <label style={{fontSize:12,fontWeight:'200'}}> {documentAll[i]} Documents</label>
                </div>
                </center>
                </StepLabel>
              
            </Step>
          ))}
        </Stepper>
      </Stack>
      </Card>
    </Box>
  )
}

export default CardStepper
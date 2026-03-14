import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FeedIcon from '@mui/icons-material/Feed';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TaskIcon from '@mui/icons-material/Task';
import { BsBookmarkCheckFill } from "react-icons/bs";
import { IoReceiptSharp } from "react-icons/io5";
import './stylecard.scss';
import { Link } from 'react-router-dom';

const CardWorkflow = (props) => {

  function calculatorJournal(a, b) {
    let result = (a / b) * 100;
    return result.toFixed(0);
  }
  return (
    <div style={{ flexDirection: 'row', justifyContent: 'space-around', display: 'flex', width: '100%', marginTop: 20 }}>
      <div className='card-workflow-document'>
        <Link to={`/ViewFlowProcess/${'1'}`} className='link-unline'>
          <Card sx={{ maxWidth: 300, maxHeight: 150 }} >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" style={{ display: 'flex', justifyItems: 'center', flexDirection: 'row', fontWeight: 500 }}>
                <FeedIcon style={{ width: 50, height: 30 }} /> <label>Total Documents</label>
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                All documents in workflow
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {props.countAll}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                100% completion rate
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className='card-workflow-inpreview'>
        <Link to={`/ViewFlowProcess/${'2'}`} className='link-unline'>
          <Card sx={{ maxWidth: 300, maxHeight: 150 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">

                <AccessTimeIcon style={{ width: 50, height: 30 }} sx={{ color: '#155DFC' }} /> <label>Preview</label>
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Documents awaiting review
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {props.countInpreveiw}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {/* {calculatorJournal(props.countPading, props.countAll)} % of total documents */}
                {props.countInpreveiw != 0 ? <label>{calculatorJournal(props.countInpreveiw, props.countAll)}</label> : <label>0</label>} % of total documents
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className='card-workflow-approved'>
        <Link to={`/ViewFlowProcess/${'3'}`} className='link-unline'>
          <Card sx={{ maxWidth: 300, maxHeight: 150 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">

                <TaskIcon style={{ width: 50, height: 30 }} sx={{ color: '#10a117' }} /> <label>Approved</label>
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Successfully approved
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {props.countapproved}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {/* {calculatorJournal(props.countapproved, props.countAll)} % of total documents */}
                {props.countapproved != 0 ? <label>{calculatorJournal(props.countapproved, props.countAll)} </label> : <label>0</label>} % of total documents
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className='card-workflow-pending'>
        <Link to={`/ViewFlowProcess/${'4'}`} className='link-unline'>
          <Card sx={{ maxWidth: 300, maxHeight: 150 }}>
            <CardContent>
              {/* <Typography gutterBottom variant="h5" component="div">
                <IoReceiptSharp />

                <TaskIcon style={{ width: 50, height: 30 }} sx={{ color: '#f9a010' }} /> <label>Perceived</label>
              </Typography> */}
              <Typography gutterBottom variant="h5" component="div">
                <IoReceiptSharp style={{ width: 45, height: 30 }} color='#f9a010' />
                {props.dataStateflow == 1 ? <label>Darft</label> : <label>Recieved</label>}

                {/* <TaskIcon style={{ width: 50, height: 30 }} sx={{ color: '#f9a010' }} /> <label>Perceived</label> */}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Documents awaiting  {props.dataStateflow > 1 ? "review" : "Darft"}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {props.countPading}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {/* {calculatorJournal(props.countInpreveiw, props.countAll)} % of total documents */}
                {props.countPading != 0 ? <label>{calculatorJournal(props.countPading, props.countAll)}</label> : <label>0 </label>} % of total documents
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className='card-workflow-approved'>
        <Link to={`/ViewFlowProcess/${'5'}`} className='link-unline'>
          <Card sx={{ maxWidth: 300, maxHeight: 150 }}>
            <CardContent>
              {/* <Typography gutterBottom variant="h5" component="div">
                <IoReceiptSharp />

                <TaskIcon style={{ width: 50, height: 30 }} sx={{ color: '#f9a010' }} /> <label>Perceived</label>
              </Typography> */}
              <Typography gutterBottom variant="h5" component="div">
                <BsBookmarkCheckFill style={{ width: 45, height: 30 }} color='#10a117' /> <label>Processed</label>

                {/* <TaskIcon style={{ width: 50, height: 30 }} sx={{ color: '#f9a010' }} /> <label>Perceived</label> */}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Documents fully processed
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {props.countSuccessfully}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {/* {calculatorJournal(props.countInpreveiw, props.countAll)} % of total documents */}
                {props.countSuccessfully != 0 ? <label>{calculatorJournal(props.countSuccessfully, props.countAll)}</label> : <label>0 </label>} % of total documents
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </div>

    </div>
  )
}

export default CardWorkflow
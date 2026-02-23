import React, { useState, useEffect } from 'react'
// import { ArrowRight, FileText, Plus, Settings } from 'lucide-react';
// import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import FetchApi from '../../../customhooks/Functionapi';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AnnouncementIcon from '@mui/icons-material/Announcement';

const CardPorcess = (props) => {
    console.log(props.dataStatusType)

    function isClicklink() {
        if (props.dataStatusType == '100') {
            window.location.href = '/documents'
        } else if (props.dataStatusType != '100') {
            if (props.dataStatusType == "") {
                window.location.reload()
            } else {
                window.location.href = '/approvelist'
            }

        }
    }
    return (
        <div>
            <Card sx={{ maxWidth: '100%' }}>
                <CardContent >
                    <div>
                        <div>
                            <div style={{ flexDirection: 'row', justifyContent: 'space-between', justifyItems: 'center', display: 'flex', width: '100%' }}>
                                <label style={{ fontSize: 20 }}>Document Reject Process</label>
                                <AnnouncementIcon style={{ color: 'red' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: 14 }}> Standard document approval workflow</label>
                            </div>
                        </div>
                        <div style={{ flexDirection: 'row', display: 'flex', alignContent: 'center', margin: 5 }}>

                            <div style={{ width: 150 }}>
                                <label style={{ fontSize: 16, fontWeight: 'bold' }}>Document Reject:</label>
                            </div>
                            <div style={{
                                width: 30, height: 30, borderRadius: 10,
                                backgroundColor: 'red', color: '#ffff',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                display: 'flex',
                                cursor: 'pointer'
                            }}
                                onClick={() => isClicklink()}
                            ><label style={{ fontSize: 16, fontWeight: 'bold' }}>{props.countReject} </label></div>
                        </div>
                        <div style={{ flexDirection: 'row', display: 'flex', alignContent: 'center', margin: 5 }}>
                            <div style={{ width: 150 }}>
                                <label style={{ fontSize: 16, fontWeight: 'bold' }}>Edit Reject:</label>
                            </div>
                            <div style={{
                                width: 30, height: 30, borderRadius: 10,
                                backgroundColor: 'red', color: '#ffff',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                display: 'flex',
                                cursor: 'pointer'
                            }}
                                onClick={() => isClicklink()}
                            ><label style={{ fontSize: 16, fontWeight: 'bold' }}>{props.countRejectEdit} </label></div>

                            {/* <label style={{ fontSize: 16, fontWeight: 'bold' }}>Edit Reject: {props.countRejectEdit} </label> */}
                        </div>
                    </div>
                </CardContent>

            </Card>
        </div>
    )
}

export default CardPorcess
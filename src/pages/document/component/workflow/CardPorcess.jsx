import React, { useState, useEffect } from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import FetchApi from '../../../customhooks/Functionapi';
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AnnouncementIcon from '@mui/icons-material/Announcement';

const CardPorcess = (props) => {

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

    function isClickToLink() {
        window.location.href = '/ViewOnProcess'
    }


    return (
        <Card style={{ padding: 10 }}>
            <div style={{ flexDirection: 'row', display: 'flex' }}>
                <Card sx={{ maxWidth: '50%' }}>
                    <CardContent onClick={() => isClicklink()} style={{ cursor: 'pointer' }}>
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
                                    width: 30, height: 30, borderRadius: 100,
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
                                    width: 30, height: 30, borderRadius: 100,
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
                <Card sx={{ maxWidth: '50%', marginLeft: 10, }} onClick={()=>isClickToLink()}>
                    <CardContent style={{ cursor: 'pointer' }}>
                        <div>
                            <div>
                                <div style={{ flexDirection: 'row', justifyContent: 'space-between', justifyItems: 'center', display: 'flex', width: '100%' }}>
                                    <label style={{ fontSize: 20 }}>Document On Process </label>
                                    <AnnouncementIcon style={{ color: '#282CDE' }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 14 }}> Standard document approval workflow</label>
                                </div>
                            </div>
                            <div style={{ flexDirection: 'column', display: 'flex', alignContent: 'center', margin: 5 }}>

                                <div style={{ width: 150 }}>
                                    <label style={{ fontSize: 16, fontWeight: 'bold' }}>Document Total All</label>
                                </div>
                                <div style={{
                                    width: 30, height: 30, borderRadius: 100,
                                    backgroundColor: '#282CDE', color: '#ffff',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    display: 'flex',
                                    cursor: 'pointer'
                                }}
                                    // onClick={() => isClicklink()}
                                    onClick={()=>isClickToLink()}
                                ><label style={{ fontSize: 16, fontWeight: 'bold' }}>{props.journalInPro.length} </label></div>
                            </div>
                            {/* <div style={{ flexDirection: 'row', display: 'flex', alignContent: 'center', margin: 5 }}>
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

                            <label style={{ fontSize: 16, fontWeight: 'bold' }}>Edit Reject: {props.countRejectEdit} </label>
                        </div> */}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Card>
    )
}

export default CardPorcess
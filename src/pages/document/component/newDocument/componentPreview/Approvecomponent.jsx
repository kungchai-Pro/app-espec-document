import React, { useEffect, useState } from 'react'
import '../newdocument.scss';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const Approvecomponent = () => {
    return (
        <div className='row-pace-w100-line' style={{ backgroundColor: '#b1b2b1', padding: 20 }}>
            <div style={{ width: '35%', fontSize: 13 }}>
                <div style={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
                    <div style={{ width: 120, marginLeft: 50 }}><label>โรงงาน</label></div>
                    <div>
                        <label>ผู้อนุมัติ : xxxxx</label>
                    </div>
                </div>
                <div style={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
                    <div style={{ width: 120, marginLeft: 50 }}><label>ฝ่ายขาย</label></div>
                    <div>
                        <label>ผู้อนุมัติ : xxxxx</label>
                    </div>
                </div>
                <div style={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
                    <div style={{ width: 120, marginLeft: 50 }}><label>ผู้จัดการฝ่ายขาย</label></div>
                    <div>
                        <label>ผู้อนุมัติ : xxxxx</label>
                    </div>
                </div>
            </div>

            <div style={{ width: '35%', fontSize: 13 }}>
                <div className='row-pace-w100-line'>
                    <div ><label>วันที่อนุมัติ(DateTime)</label></div>
                    <div>
                        <label>อนุมัติ : xxxxx</label>
                    </div>
                    <div>
                        <CheckCircleOutlineIcon sx={{ color: '#39995f' }}/>
                    </div>
                </div>
                <div className='row-pace-w100-line'>
                    <div ><label>วันที่อนุมัติ(DateTime)</label></div>
                    <div>
                        <label>อนุมัติ : xxxxx</label>
                    </div>
                    <div>
                        <CheckCircleOutlineIcon sx={{ color: '#39995f' }}/>
                    </div>
                </div>
                <div className='row-pace-w100-line'>
                    <div ><label>วันที่อนุมัติ(DateTime)</label></div>
                    <div>
                        <label>อนุมัติ : xxxxx</label>
                    </div>
                    <div>
                        <CheckCircleOutlineIcon sx={{ color: '#39995f' }}/>
                    </div>
                </div>
            </div>
                <div style={{ width: '35%' }}>
            </div>

        </div>
    )
}

export default Approvecomponent
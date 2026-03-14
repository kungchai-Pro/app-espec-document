import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NavbarUser from '../../components/navbar/NavbarUser';
import Approvedlist from './component/veiwdocuments/viewDocuments';
import ViewNotereject from './component/veiwdocuments/viewNotereject';
import DraftEditRejectdocuments from './component/approvedList/draftEditRejectdocuments';
import Approvedstatusall from './component/aprovedStatusAll/approvedstatusall'


import {
    useParams
} from "react-router-dom";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const EditRejectdocuments = () => {
    let { id, status } = useParams();
    const userId = sessionStorage.getItem("userId")
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <div>
                <NavbarUser />
            </div>
            <Container>
                 <Approvedstatusall Id={id} statusAction={status} userId={userId}/>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="ข้อมูลรายละเอียด" {...a11yProps(0)} />
                            <Tab label="ประวัติตีกลับ" {...a11yProps(1)} />
                            {status=='201'&&<Tab label="แก้ไขข้อมูล" {...a11yProps(2)} />}
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Approvedlist jourID={id}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                       <ViewNotereject Id={id} userId={userId}/>
                    </CustomTabPanel>
                    {status=='201'&&
                    <CustomTabPanel value={value} index={2}>
                       <DraftEditRejectdocuments documentId={id}/>
                    </CustomTabPanel>}

                </Box>
            </Container>
        </div>
    )
}

export default EditRejectdocuments
import React, { useState, useEffect } from 'react'
import NavbarUser from '../../components/navbar/NavbarUser'
// import CssBaseline from '@mui/material/CssBaseline';
// import { ClipboardCheck, ClockIcon, FileCheck, FileText } from 'lucide-react';
import CardWorkflow from './component/workflow/CardWorkflow';
import CardPorcess from './component/workflow/CardPorcess';
import CardStepper from './component/workflow/CardStepper';
import FetchApi from '../customhooks/Functionapi';


function WorkFlow() {

    const FetchApis = new FetchApi();
    const userId = sessionStorage.getItem('userId')
    const [countInDraft, setCountInDraft] = useState(0)
    const [countInpreveiw, setCountInpreveiw] = useState(0)
    const[dataStatusType,setDataStatusType]=useState('')

    const [countPading, setCountPading] = useState(0)

    const [countReject, setCountReject] = useState(0)
    const [countRejectEdit, setCountRejectEid] = useState(0)
    const [countapproved, setCountApproved] = useState(0)
    const [countSuccessfully, setCountSuccessfully] = useState(0)
    const [countAll, setCountAll] = useState(0)
    const [flowsateall, setFlowsateall] = useState(0)

    useEffect(() => {
        getstatusAll();
    }, [])

    async function getstatusAll() {
        await FetchApis.FethcGet(`/document/DocumentByStateAll/${userId}`).then(res => {

            if (res.status == 200) {
                setCountAll(res.data.length);
            }

        })

        await FetchApis.FethcGet(`/document/DocumentInpreview/${userId}`).then(res => { // รอ approved

            if (res.status == 200) {
                setCountInpreveiw(res.data.length)


            }

        })

        await FetchApis.FethcGet(`/document/DocumentPreRecieved/${userId}`).then(res => { // รอ recieved
            // console.log(res);
            if (res.status == 200) {
                setCountPading(res.data.length)
             
                if (res.data.length > 0) {
                  
                   setFlowsateall(res.data[0].stateflow)
                } 

            }

        })

        await FetchApis.FethcGet(`/document/DocumentApprovedlist/${userId}`).then(res => { // approved แล้ว

            if (res.status == 200) {
                setCountApproved(res.data.length)
            }

        })

        await FetchApis.FethcGet(`/document/DocumentRejectlist/${userId}`).then(res => { // รายการที่ reject กลับมา
           
            if (res.data.length > 0) {
                setDataStatusType(res.data[0].statusType)
                setCountReject(res.data.length)
            }else{
                setDataStatusType("")
            }

        })

        await FetchApis.FethcGet(`/document/DocumentRejectlistsuccessful/${userId}`).then(res => {
            // console.log(res)
            if (res.status == 200) {
                setCountRejectEid(res.data.length);
               
            }

        })

        await FetchApis.FethcGet(`/document/DocumentSuccessfullylist/${userId}`).then(res => {
            if (res.status == 200) {
                setCountSuccessfully(res.data.length);

            }

        })

        await FetchApis.FethcGet(`/document/DocumentDraftlist/${userId}`).then(res => {
            if (res.status == 200) {
                setCountInDraft(res.data.length);

            }

        })
    }

    return (
        <div>
            <NavbarUser />
            <main className="container mx-auto px-4 py-8" style={{ padding: 10, backgroundColor: '#f7f7f7' }}>
                <div className="mb-8 animate-fade-in">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Workflow Journal Spec</h1>
                            <p className="text-gray-600 mt-2">Manage document workflow</p>
                        </div>
                    </div>
                </div>
                <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-around' }}>
                       
                    <CardWorkflow
                        countInpreveiw={countInpreveiw}
                        countPading={countPading}
                        countapproved={countapproved}
                        countAll={countAll}
                        countSuccessfully={countSuccessfully}
                        dataStateflow={flowsateall}
                    />

                </div>
                <div style={{ margin: 10 }}>
                    <CardPorcess
                        countReject={countReject}
                        countRejectEdit={countRejectEdit}
                        dataStatusType={dataStatusType}
                    />
                </div>
                <div>
                    <CardStepper
                        countInDraft={countInDraft}
                        countInpreveiw={countInpreveiw}
                        countPading={countPading}
                        countapproved={countapproved}
                        countSuccessfully={countSuccessfully}
                    />
                </div>

            </main >
        </div>


    )
}

export default WorkFlow
import React, { useState, useEffect, use } from 'react'
import { PDFViewer, Document, Page, View, Text, Image } from '@react-pdf/renderer';
// import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
import { styles } from './pdfstyles.jsx';
import FetchApi, { host } from '../../../../customhooks/Functionapi.jsx';
import { objectHearder, ItmeTypeID } from '../../newDocument/objectdata/typeobject';
import iconunclecked from '../../../../../images/326558_blank_check_box_icon.png';
import iconclecked from '../../../../../images/326561_box_check_icon.png';
import Pdfdocumentdetail from './pdfdocumentdetail.jsx';
import moment from 'moment/moment.js';

function Pdfdocument(props) {
    const FetchApis = new FetchApi();
    const [jourHeader, setJourHeader] = useState({ ...objectHearder })
    const [dataImageList, setDataImageList] = useState([])
    const [journalImages, setJournalImages] = useState([]);
    const [datastepflow, setDatastepflow] = useState([]);
    const [isload, setIsload] = useState(false);

    useEffect(() => {
        getHeaderlist()
        flowlistStep()
    }, [])

    const getHeaderlist = () => {
        setIsload(true)
        FetchApis.FethcGet(`/document/DocumentById/${props.jourID}`).then(res => {
            if (res) {
                var dataItemTypeID = res.data[0]
                var datatpurposelist = dataItemTypeID.PurposeDetail.split(",");
                if (dataItemTypeID.ItemTypeID == "") {

                    setJourHeader({
                        ...res.data[0],
                        ItemTypeID: [],
                        PurposeDetail: datatpurposelist
                    })
                } else {
                    var itemtypeId = dataItemTypeID.ItemTypeID.split(',')
                    setJourHeader({
                        ...res.data[0],
                        ItemTypeID: itemtypeId,
                        PurposeDetail: datatpurposelist
                    })
                }

                getrefreshdImage(res.data[0].JournalCode)
                getjournalImagseList(res.data[0].JournalCode)
            }
        })
    }
    const getrefreshdImage = (JournalCode) => {

        FetchApis.FethcGet(`/document/DocumentSpecificByCode/${JournalCode}`).then(res => {

            if (res) {

                setDataImageList(res.data)
                setIsload(false)
            }

        })
    }

    //แสดงรูปที่ทำการบันทึก 
    const getjournalImagseList = (code) => {

        FetchApis.FethcGet(`/journalImages/JouranlImagesByCode/${code}`).then(res => {
            if (res) {

                setJournalImages(res.data);
                setIsload(false)
            }
        })
    }


    // ข้อมูล flow
    async function flowlistStep() {

        await FetchApis.FethcGet(`/flowrunsystem/flowSteplistByJourId/${props.jourID}`).then(res => {
            if (res) {
                setDatastepflow(res.data)
            }
        })

    }

    const ClickTypeItem = (key) => {
        var typeItem = jourHeader.ItemTypeID.find(val => val == key);
        return typeItem;
    }

    return (
        <div style={{ height: 750 }}>
            {isload == false && <PDFViewer width="100%" height="100%" >

                <Document>
                    <Page size="A4" >
                        <View style={[styles.page, styles.textBoldfonts13]}>
                            <View style={{ alignItems: 'flex-end', display: 'flex' }}>
                                <Text render={({ pageNumber, totalPages }) => (
                                    `${pageNumber} / ${totalPages}`
                                )} fixed />
                            </View>

                            <View style={[styles.textBoldfonts11, { margin: 1, padding: 3, borderWidth: 1, borderColor: '#dddede' }]}>
                                <View style={[styles.textBoldfonts10, {
                                    padding: 2,
                                    flexDirection: 'row', justifyContent: 'space-between'
                                }]}>
                                    <Text style={[styles.textBoldfonts14, { color: '#2980b9', fontWeight: '800' }]}>ส่วนของคำร้อง</Text>
                                    <View style={[styles.textBoldfonts14, { padding: 2 }]}>
                                        <Text style={{ color: '#2980b9', fontWeight: '800' }}>SPECFICATION SHEET</Text>
                                    </View>
                                </View>
                                <View style={[styles.header, styles.textBoldfonts11, {
                                    width: '100%',
                                    borderBottomWidth: 1, borderBottomColor: '#dddede'
                                }]}>
                                    <View style={{ width: '70%' }}>
                                        <View style={styles.body}>
                                            <Text style={{ width: 60, fontWeight: 800 }}>ประเภทสินค้า</Text>

                                            {ItmeTypeID.map((val, index) => (
                                                <View style={{ padding: 5, marginRight: 5 }} key={index}>
                                                    {ClickTypeItem(val) == val ?
                                                        <View style={{ flexDirection: 'row' }}><Image src={iconclecked} style={{ width: 10, height: 10 }} /><Text > {val}</Text></View> :
                                                        <View style={{ flexDirection: 'row' }}><Image src={iconunclecked} style={{ width: 10, height: 10 }} /><Text > {val}</Text></View>
                                                    }
                                                </View>
                                            ))}
                                        </View>
                                        <View style={styles.body}>
                                            <Text style={{ width: 60, fontWeight: 800 }}>ประเภทงาน</Text>
                                            <Text> {jourHeader.TypeproductName} </Text>

                                            <View style={[styles.body, { marginLeft: 100 }]}>
                                                <Text style={{ width: 40, fontWeight: 800 }}>ผู้ร้องขอ</Text>
                                                <Text>{jourHeader.UserIDRequest}</Text>
                                            </View>

                                        </View>

                                        <View style={styles.body}>
                                            <Text style={{ width: 60, fontWeight: 800 }}>วัตถุประสงค์</Text>

                                            {jourHeader.PurposeDetail[0] !== "" && <View style={{ width: '25%', padding: 2 }}>
                                                {jourHeader.PurposeDetail.map((item, index) => (
                                                    <View style={{ marginLeft: 25 }}>
                                                        <Text>{index + 1}.{item}</Text>
                                                    </View>
                                                ))}
                                            </View>}
                                            <View style={{ width: '100%', padding: 2 }}>
                                                <Text>{jourHeader.Purpose} </Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ width: '25%' }} >
                                        <View style={styles.body}>
                                            <Text style={{ width: 70, fontWeight: 800 }}>วันที่สร้างเอกสาร</Text>
                                            <Text>{moment(jourHeader.TransDate).format('DD/MM/yyyy')}</Text>
                                        </View>
                                        <View style={styles.body}>
                                            <Text style={{ width: 70, fontWeight: 800 }}>วันที่ Approved</Text>
                                            <Text>{moment(jourHeader.LastApprovedDate).format('DD/MM/yyyy')}</Text>
                                        </View>
                                        <View style={styles.body}>
                                            <Text style={{ width: 70, fontWeight: 800 }}>เอกสารบรรจุ(SSD)</Text>
                                            <Text>{jourHeader.JournalCode}</Text>
                                        </View>
                                        {jourHeader.JournalGroupID != "" &&
                                            <View style={styles.body}>
                                                <Text style={{ width: 70, fontWeight: 800 }}>กลุ่มเอกสาร Revise</Text>
                                                <Text>{jourHeader.JournalGroupID}</Text>
                                            </View>}
                                        <View style={styles.body}>
                                            <Text style={{ width: 70, fontWeight: 800 }}>เลขที่เอกสาร (ECN)</Text>
                                            <Text>{jourHeader.RefECN}</Text>
                                        </View>
                                    </View>

                                </View>

                                <View style={[styles.body, styles.textBoldfonts10, { width: '100%', marginTop: 5 }]}>
                                    <View style={{ width: '20%' }}>

                                        <View style={styles.body}>
                                            <Text style={{ width: 60, fontWeight: 800 }}>รหัสลูกค้า</Text>
                                            <Text>{jourHeader.CustID}</Text>
                                        </View>
                                        <View style={styles.body}>
                                            <Text style={{ width: 60, fontWeight: 800 }}>รหัสสินค้า</Text>
                                            <Text>{jourHeader.ItemID}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '60%' }}>
                                        <View style={styles.body}>
                                            <View style={[styles.body, { width: '65%' }]}>
                                                <Text style={{ width: 30, fontWeight: 800 }}>ชื่อลูกค้า</Text>
                                                <Text>{jourHeader.CustName}</Text>
                                            </View>
                                            <View style={{ width: '35%' }}>
                                                <View style={[styles.body]}>
                                                    <Text style={{ width: 30, fontWeight: 800 }}>ตราสินค้า</Text>
                                                    <Text>{jourHeader.BrandID}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={[styles.body]}>

                                            <View style={[styles.body, { width: '50%' }]}>
                                                <Text style={{ width: 30, fontWeight: 800 }}>ชื่อสินค้า</Text>
                                                <Text>{jourHeader.ItemName}</Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', display: 'flex' }}>
                                    <View style={{ marginRight: 20 }}>
                                        <View style={[styles.body, { width: '100%' }]}>
                                            <Text style={{ width: 60, fontWeight: 800 }}>การบรรจุงาน</Text>
                                            <Text>{jourHeader.PackagingDetails}</Text>
                                        </View>
                                        <View style={styles.body}>
                                            <Text style={{ width: 60, fontWeight: 800 }}>อธิบายเพิ่มเติม 1</Text>
                                            <Text>{jourHeader.Remark}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={[styles.body, { width: '100%' }]}>
                                            <Text style={{ width: 60, fontWeight: 800 }}>Spec Id</Text>
                                            <Text>{jourHeader.SpecId}</Text>
                                        </View>
                                        <View style={[styles.body, { width: '100%' }]}>
                                            <Text style={{ width: 60, fontWeight: 800 }}>Spec Name</Text>
                                            <Text>{jourHeader.SpecName}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <View style={{ width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'flex-end' }}>
                                        <Text style={{ marginRight: 10 }}>ผู้อนุมัติ : {jourHeader.nameConfirme} {jourHeader.lastname}</Text>
                                        <Text>วันที่สร้าง : {moment(jourHeader.TransDate).format('DD/MM/yyyy')}</Text>
                                    </View>
                                </View>

                            </View>

                            <View>
                                {jourHeader.JournalID != "" && <Pdfdocumentdetail dataHeader={jourHeader} />}
                            </View>

                        </View>
                    </Page>
                    {dataImageList.length > 0 &&
                        <Page >
                            <View style={[styles.page, styles.textBoldfonts13]}>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>
                                    <Text style={styles.textBoldfonts10}>เอกสาร :{jourHeader.JournalCode}</Text>
                                    <Text render={({ pageNumber, totalPages }) => (
                                        `${pageNumber} / ${totalPages}`
                                    )} fixed />
                                </View>
                                {dataImageList.map((item, index) => (
                                    <View key={index} style={[styles.textBoldfonts10, {
                                        flexDirection: 'row', margin: 1,
                                        borderWidth: 0.5, borderColor: '#dddede', padding: 5
                                    }]}>
                                        <View style={{ width: '30%' }}>
                                            <View>
                                                <Text style={{ marginRight: 5, fontWeight: 800 }}>หัวข้อ</Text>
                                                <Text style={{ marginLeft: 5 }}>{item.SubjectDetails}</Text>
                                            </View>
                                            <View>
                                                <Text style={{ marginRight: 5, padding: 5, fontWeight: 800, }}>อธิบายเพิ่มเติม</Text>
                                                <Text style={{ marginLeft: 5 }}>{item.SubjectExtend}</Text>
                                            </View>
                                            <View>
                                                <Text>ภาพ : {item.PkDescription}</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: '85%' }}>
                                            <View>
                                                <View style={styles.body}>
                                                    <Text style={{ fontWeight: 800 }}>itemId : </Text>
                                                    <Text>{item.ItemID}</Text>
                                                </View>
                                                <View style={styles.body}>
                                                    <Text style={{ fontWeight: 800 }}>item name : </Text>
                                                    <Text>{item.ItemName}</Text>
                                                </View>
                                            </View>
                                            <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', display: 'flex' }}>
                                                <Image src={`${host}/file/images/files/${item.LocationPic}`} style={styles.imagesbox} />
                                            </View>
                                        </View>
                                    </View>
                                ))}
                                {journalImages.map((item, index) => (
                                    <View key={index} style={[styles.textBoldfonts10, {
                                        flexDirection: 'row', margin: 1,
                                        borderWidth: 0.5, borderColor: '#dddede', padding: 5
                                    }]}>
                                        <View style={{ width: '30%' }}>
                                            <View>
                                                <Text style={{ marginRight: 5, fontWeight: 800 }}>หัวข้อ</Text>
                                                <Text style={{ marginLeft: 5 }}>{item.SubjectDetails}</Text>
                                            </View>
                                            <View>
                                                <Text style={{ marginRight: 5, fontWeight: 800 }}>อธิบายเพิ่มเติม</Text>
                                                <Text style={{ marginLeft: 5 }}>{item.SubjectExtend}</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: '85%' }}>
                                            <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', display: 'flex' }}>
                                                <Image src={`${host}/file/images/files/${item.LocationPic}`} style={styles.imagesbox} />
                                            </View>
                                        </View>
                                    </View>
                                ))}

                                <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>
                                    {datastepflow.map((item, index) => (
                                        <View style={[styles.textBoldfonts10, {
                                            padding: 10, margin: 10,
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            display: 'flex'
                                        }]}>

                                            <Text style={{ fontWeight: '800' }}>ผู้อนุมัติที่ {index + 1}</Text>
                                            <Text>คุณ {item.userbyflow}</Text>
                                            <Text>{moment(item.Enddatetime).format('DD/MM/yyyy')}</Text>
                                            {/* <Text>วันที่อนุมัติ {item.Enddatetime.substring(0, 10)}</Text> */}

                                        </View>
                                    ))}

                                </View>

                            </View>
                        </Page>
                    }

                </Document>
            </PDFViewer>}

        </div>
    )
}

export default Pdfdocument
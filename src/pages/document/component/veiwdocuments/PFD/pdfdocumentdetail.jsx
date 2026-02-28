import React, { useState, useEffect } from 'react'
import { PDFViewer, Document, Page, View, Text, Image } from '@react-pdf/renderer';
// import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
import { styles } from './pdfstyles.jsx';
import FetchApi, { host } from '../../../../customhooks/Functionapi.jsx';
import moment from 'moment/moment.js';

function Pdfdocumentdetail(props) {
    const FetchApis = new FetchApi()
    const [dataDetial, setDataDetial] = useState([])
    const [dataImageList, setDataImageList] = useState([])


    useEffect(() => {
        getjourDetailList()
    }, [])


    const getjourDetailList = async () => {

        await FetchApis.FethcGet(`/document/DocumentdetailByCode/${props.dataHeader.JournalCode}`).then(res => {
            if (res) {
                setDataDetial(res.data)
               
                getrefreshdImage(res.data[0])


            }
        })

    }

    const getrefreshdImage = (id) => {

        FetchApis.FethcGet(`/document/DocumentSpecificByCode/${props.dataHeader.JournalCode}`).then(res => {
            if (res) {
                setDataImageList(res.data)
            }
        })

    }

    return (
        <View>
            {dataDetial.map((item, index) => (
                <View style={[styles.textBoldfonts10, styles.bodyspace, { width: '100%', marginTop: 1, borderWidth: 0.5, borderColor: '#dddede' }]} key={index} break={index == 5}>
                    <View style={{ width: '25%', padding: 5 }}>
                        <View>
                            <Text style={{ fontWeight: 800 }}>{item.PkDescription}</Text>
                        </View>
                        <View style={{ width: '100%' }}>
                            <Text style={{ width: 80, fontWeight: 800 }}>อธิบายเพิ่มเติม</Text>
                            <Text style={{ marginLeft: 5 }}>{item.GroupRemark}</Text>
                        </View>
                    </View>
                    <View style={{ width: '75%', borderLeftWidth: 0.5, borderLeftColor: '#dddede', padding: 5 }}>
                        <View style={styles.body}>
                            <View style={[styles.body, { width: '30%' }]}>
                                <Text style={{ width: 50, fontWeight: 800 }}>รหัสสินค้า</Text>
                                <Text >{item.ItemID}</Text>
                            </View>
                            <View style={[styles.body, { width: '60%' }]}>
                                <View style={[styles.body, { width: '50%' }]}>
                                    <Text style={{ width: 30, fontWeight: 800 }}>สเปค</Text>
                                    <Text style={{ marginLeft: 5 }}>{item.SpecID}</Text>
                                </View>
                            </View>
                            <View style={[styles.body, { width: '20%', justifyContent: 'flex-end', alignContent: 'flex-end', display: 'flex' }]}>
                                <Text style={{ alignItems: 'flex-end', padding: 2, backgroundColor: '#dddede' }}>{index + 1}</Text>
                            </View>
                        </View>
                        <View style={[styles.body, { width: '100%' }]}>
                            <Text style={{ width: 50, fontWeight: 800 }}>ชื่อ / รายละเอียด</Text>
                            <Text style={{ marginLeft: 5 }}>{item.ItemName}</Text>
                        </View>
                        <View style={styles.body}>
                            <View>
                                <Text style={{ width: 50, fontWeight: 800 }}>ขนาด</Text>
                            </View>
                            <View style={[styles.body, { width: '80%',flexDirection:'row',display:'flex' }]}>
                                <Text>Width : {item.Width} Depth : {item.Depth} Height : {item.Height}</Text>
                                <Text style={{marginRight:10,marginLeft:10,fontWeight:'800'}}>น้ำหนัก</Text>
                                <Text>Net.w : {item.NetWeight} Tare.w : {item.TareWeight} Gross.w : {item.GrossWeight}</Text>
                            </View>
                        </View>
                        
                        {item.SizeDetails != "" && <View style={styles.body}>
                            <Text style={{ width: 50, fontWeight: 800 }}>Size Details </Text>
                            <Text style={{ marginLeft: 2 }}>{item.SizeDetails}</Text>
                        </View>}
                        <View style={styles.body}>
                            {item.TypeSheet != "" &&
                                <View style={[styles.body, { width: '50%' }]}>
                                    <Text style={{ width: 50, fontWeight: 800 }}>ชนิด Sheet </Text>
                                    <Text style={{ marginLeft: 2 }}>{item.TypeSheet}</Text>
                                </View>}
                            {item.Barcode != "" &&
                                <View style={[styles.body, { width: '50%' }]}>
                                    <Text style={{ width: 70, fontWeight: 800 }}>Format Barcode </Text>
                                    <Text style={{ marginLeft: 2 }}>{item.Barcode}</Text>
                                </View>}
                        </View>
                        {item.Remark != "" && <View style={styles.body}>
                            <Text style={{ width: 50, fontWeight: 800 }}>อธิบายเพิ่มเติม 2</Text>
                            <Text style={{ marginLeft: 2 }}>{item.Remark}</Text>
                        </View>}
                        {item.TypeBatch != "" &&<View style={[styles.body, { fontWeight: 800 }]}>
                            <Text style={{ width: 'auto' }}>Batch บรรจุภัณฑ์ {item.BatchNo != "" && <Text>รูปแบบที่ {item.BatchNo}</Text>}
                                {item.TypeBatch == '1' && <Text>( ยิงบนบรรจุภัณฑ์ )</Text>}
                                {item.TypeBatch == '2' && <Text>( ยิงบนกล่องนอก )</Text>}
                            </Text>

                        </View>}
                        <View>
                            {item.Batch1 != "" &&
                                <View style={[styles.body, {}]}>
                                    <View style={{ width: 100 }}>
                                        <Text>{item.Batch1}</Text>
                                    </View>
                                    <View style={{ width: 200, marginRight: 5 }}>
                                        <Text>ข้อกำหนด : {item.BatchDetail1}</Text>
                                    </View>
                                    <View style={{ width: 100 }}>
                                        <Text>ตัวอย่าง : {item.BatchExample1}</Text>
                                    </View>
                                </View>}

                            {item.Batch2 != "" && <View style={[styles.body, {}]}>
                                <View style={{ width: 100 }}>
                                    <Text>{item.Batch2}</Text>
                                </View>
                                <View style={{ width: 200, marginRight: 5 }}>
                                    <Text>ข้อกำหนด : {item.BatchDetail2}</Text>
                                </View>
                                <View style={{ width: 100 }}>
                                    <Text>ตัวอย่าง : {item.BatchExample2}</Text>
                                </View>
                            </View>}
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            display: 'flex'
                        }}>
                            <View style={[styles.body, { width: 180 }]}>
                                <View style={[styles.body]}>
                                    <Text style={{ fontWeight: 800 }}>ผู้อนุมัติ : </Text>
                                    <Text style={{ marginRight: 10, }}> {item.NameUserConfirm} {item.lastnameUserConfirm}</Text>
                                </View>
                                <View style={[styles.body]}>
                                    <Text style={{ fontWeight: 800 }}>วันที่สร้าง : </Text>
                                    <Text>{moment(item.Enddatetime).format('DD/MM/yyyy hh:mm:ss')}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            ))}

        </View>
    )
}

export default Pdfdocumentdetail
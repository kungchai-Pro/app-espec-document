import FetchApi from "./Functionapi";
import { objectDetial, objectHearder } from "../document/component/newDocument/objectdata/typeobject";
const FetchApis = new FetchApi();

export async function NewDocumentDeatil(jourCode) {

    let dataDetail = {
        ...objectDetial,
        JournalCode: jourCode
    }

    return await FetchApis.FethcPost(`/document/createDocumentdetail`, dataDetail).then(res => {
        if (res) {
            // console.log(res)
            return res.data;
        }
    })

}


export async function UpdateDetailList(val) {

    var datareturn = '';
    if (val.length == 0) {
        datareturn = true
    } else {
        for (let index = 0; index < val.length; index++) {
            const element = val[index];
            await FetchApis.FethcUpdate(`/document/updateDetail/${element.JournalID}`, element).then(res => {
                if (res.status == 200) {
                    // console.log(res)
                    return datareturn = true
                }
            })
        }
    }

    return datareturn;
}

export function deletedetailById(id) {
    return FetchApis.FethcDelete(`/document/detaildeleteById/${id}`).then(res => {
        return res
    })
}


export async function NewImagesInsert(data) {

    return await FetchApis.FethcPost(`/document/createDocumentSpecification`, data).then(res => {
        return res;
    })
}


// revise journal 

export function createJournalRevise(dataHeader, dataDetail, dataImages, datahearderImage) {


    const d = new Date();
    let convertdate = ""
    let convertmonth = d.getMonth() + 1;
    if (d.getDate() < 10) {
        convertdate = "0" + d.getDate();
    }
    else {
        convertdate = d.getDate();
    }
    if (d.getMonth() + 1 < 10) {
        convertmonth = "0" + convertmonth
    } else {
        convertmonth = convertmonth
    }
    var timestampsnow = d.getFullYear() + "-" + convertmonth + "-" + convertdate + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var timestampsDate = d.getFullYear() + "-" + convertmonth + "-" + convertdate;
    const userId = sessionStorage.getItem("userId")


    var versionnow = parseInt(dataHeader.Revise) + 1;
    let reviseCode = `${dataHeader.StandardCode}-` + versionnow;

    let objectHearder = {
        JournalID: dataHeader.JournalID,
        JournalCode: reviseCode,
        Revise: versionnow,
        TransDate: timestampsDate,//วันที่เอกสาร SDSS
        JournalGroupID: dataHeader.JournalGroupID,//อ้างอิงเอกสาร Group Revies //(เอกสารบรรจุ SSD)
        ItemTypeID: dataHeader.ItemTypeID,//ประเภทสินค้า(สำลีก้าน, ลำลีก้อน ,สำลีแผน ,สำลีม้วน)
        Purpose: dataHeader.Purpose,//วัตถุประสงค์
        LastApprovedDate: timestampsDate,//วันที่ Approved ล่าสุด
        RefECN: dataHeader.RefECN,//เลขที่ ECN อ้างอิง (เลขที่เอกสาร ECN)
        PartFileECN: dataHeader.PartFileECN,//จัดเก็บไฟล์เอกสาร ECN 
        UserIDRequest: dataHeader.UserIDRequest,//รหัสผู้ร้องขอเอกสาร
        CustID: dataHeader.CustID,//รหัสลูกค้า
        ItemID: dataHeader.ItemID,//รหัสสินค้า
        ItemName: dataHeader.ItemName,
        CustName: dataHeader.CustName,// ชื่อลูกค้า
        BrandID: dataHeader.BrandID,//รหัสตราสินค้า
        SpecId:dataHeader.SpecId,
        SpecName:dataHeader.SpecName,
        BOMVersion: dataHeader.BOMVersion,//อ้างอิงสูตร BOM
        PackagingDetails: dataHeader.PackagingDetails,//อธิบายการบรรจุงาน
        Remark: dataHeader.Remark,//อธิบายเพิ่มเติม
        UserIDConfirm: userId,//รหัสผู้ Confirm เอกสาร
        ConfirmDateTime: timestampsDate,//วันที่และเวลา Confirm
        Typeproduct: dataHeader.Typeproduct,
        PurposeDetail: dataHeader.PurposeDetail,
        SaleAckUserID: dataHeader.SaleAckUserID,
        FlowrunId: dataHeader.FlowrunId,
        typeDocement: dataHeader.typeDocement,
        statusflow: "101",
        stateflow: "1",
        rejectTo: "",
        recallTo: "",
        dedicatedTo: "",
        noteRevise:dataHeader.noteRevise,
        stamptimeUpdate: timestampsnow,
        updateBy: "",
        StandardCode: dataHeader.StandardCode,
        Actives: "1"
    }
    return FetchApis.FethcPost(`/document/createReviseDocument`, objectHearder).then(res => {
        if (res.status == 200) {
            for (let index = 0; index < dataDetail.length; index++) {
                const ListDetail = dataDetail[index];

                createDetailRevise(res.insertId, reviseCode, ListDetail, dataImages)

            }

            for (let index = 0; index < datahearderImage.length; index++) {
                const dataimagelist = datahearderImage[index];
                    journalImageslist(res.insertId, reviseCode,dataimagelist)
            }

            return res;
        } else {
            console.log(res)
        }
    })

}

 function journalImageslist(jourId,revisecode,dataimages) {

        const d = new Date();
    let convertdate = ""
    let convertmonth = d.getMonth() + 1;
    if (d.getDate() < 10) {
        convertdate = "0" + d.getDate();
    }
    else {
        convertdate = d.getDate();
    }
    if (d.getMonth() + 1 < 10) {
        convertmonth = "0" + convertmonth
    } else {
        convertmonth = convertmonth
    }
    var timestampsnow = d.getFullYear() + "-" + convertmonth + "-" + convertdate + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var timestampsDate = d.getFullYear() + "-" + convertmonth + "-" + convertdate;

    var object = {
        JournalID: "",//เลขที่ SDSS
        SlotNo: dataimages.SlotNo,//Slot No Details
        ItemID: dataimages.ItemID,//อ้างอิง Item Code Table Detail
        ItemName: dataimages.ItemName,//อ้างอิง Item Name Table Detail
        SlotNoSpec: dataimages.SlotNoSpec,//Slot No Specification
        SubjectDetails: dataimages.SubjectDetails,//พื้นที่พิมพ์หัวข้อ
        SubjectExtend:dataimages.SubjectExtend,//พื้นที่พิมพ์อธิบาย
        LocationPic: dataimages.LocationPic,//รูปภาพ
        UserIdConfirm: dataimages.UserIdConfirm,//Confirm by
        ConfirmDateTime: timestampsnow,//Confirm Date Time
        StatusFacConfirm: "1",//"Status Last confirm(โรงงาน)เพื่อส่ง Approved "
        JournalCode: revisecode,
        JourId: jourId
    }
    FetchApis.FethcPost(`/journalImages/createJournalImages`,object).then(res => {
        console.log(res)
    })
}

async function createDetailRevise(insertId, reviseCode, ListDetail, dataImages) {

    const d = new Date();
    let convertdate = ""
    let convertmonth = d.getMonth() + 1;
    if (d.getDate() < 10) {
        convertdate = "0" + d.getDate();
    }
    else {
        convertdate = d.getDate();
    }
    if (d.getMonth() + 1 < 10) {
        convertmonth = "0" + convertmonth
    } else {
        convertmonth = convertmonth
    }
    var timestampsnow = d.getFullYear() + "-" + convertmonth + "-" + convertdate + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var timestampsDate = d.getFullYear() + "-" + convertmonth + "-" + convertdate;
    const userId = sessionStorage.getItem("userId")

    var dataDeatilall = {
        JournalID: "",
        SlotNo: ListDetail.SlotNo,
        ItemID: ListDetail.ItemID,
        ItemName: ListDetail.ItemName,
        ItemGroupID: ListDetail.ItemGroupID,
        GroupRemark: ListDetail.GroupRemark,
        PkDescription: ListDetail.PkDescription,
        SpecID: ListDetail.SpecID,
        Width: ListDetail.Width,
        Depth: ListDetail.Depth,
        Height: ListDetail.Height,
        NetWeight: ListDetail.NetWeight,
        TareWeight: ListDetail.TareWeight,
        GrossWeight: ListDetail.GrossWeight,
        SizeDetails: ListDetail.SizeDetails,
        TypeSheet: ListDetail.TypeSheet,
        Barcode: ListDetail.Barcode,
        Batch1: ListDetail.Batch1,
        BatchDetail1: ListDetail.BatchDetail1,
        BatchExample1:ListDetail.BatchExample1,
        Batch2: ListDetail.Batch2,
        BatchDetail2: ListDetail.BatchDetail2,
        BatchExample2:ListDetail.BatchExample2,
        BatchNo:ListDetail.BatchNo,
        TypeBatch:ListDetail.TypeBatch,
        Remark: ListDetail.Remark,
        ColabgroupId: ListDetail.ColabgroupId,
        UserIDConfirm: ListDetail.UserIDConfirm,
        ConfirmDateTime: timestampsnow,
        JournalCode: reviseCode,

    }


    return await FetchApis.FethcPost(`/document/createDocumentdetail`, dataDeatilall).then(res => {
        if (res) {
            for (let index = 0; index < dataImages.length; index++) {
                const imageList = dataImages[index];

                if (imageList.ItemID == res.data[0].ItemID) {
                    careteImagesRevise(res.data[0].JournalID, imageList, reviseCode);
                }

            }

        }
    })



}


async function careteImagesRevise(detailID, imageList, reviseCode) {

    const d = new Date();
    let convertdate = ""
    let convertmonth = d.getMonth() + 1;
    if (d.getDate() < 10) {
        convertdate = "0" + d.getDate();
    }
    else {
        convertdate = d.getDate();
    }
    if (d.getMonth() + 1 < 10) {
        convertmonth = "0" + convertmonth
    } else {
        convertmonth = convertmonth
    }
    var timestampsnow = d.getFullYear() + "-" + convertmonth + "-" + convertdate + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var timestampsDate = d.getFullYear() + "-" + convertmonth + "-" + convertdate;
    const userId = sessionStorage.getItem("userId")

    var objectImages = {
        JournalID: "",//เลขที่ SDSS
        SlotNo: imageList.SlotNo,//Slot No Details
        ItemID: imageList.ItemID,//อ้างอิง Item Code Table Detail
        ItemName: imageList.ItemName,//อ้างอิง Item Name Table Detail
        SlotNoSpec: imageList.SlotNoSpec,//Slot No Specification
        SubjectDetails: imageList.SubjectDetails,//พื้นที่พิมพ์หัวข้อ
        SubjectExtend: imageList.SubjectExtend,//พื้นที่พิมพ์อธิบาย
        LocationPic: imageList.LocationPic,//รูปภาพ
        UserIdConfirm: imageList.UserIdConfirm,//Confirm by
        ConfirmDateTime: timestampsnow,//Confirm Date Time
        StatusFacConfirm: "1",//"Status Last confirm(โรงงาน)เพื่อส่ง Approved "
        JournalCode: reviseCode,
        JourId: detailID
    }

    return await FetchApis.FethcPost(`/document/createDocumentSpecification`, objectImages).then(res => {

        return res;
    });

}
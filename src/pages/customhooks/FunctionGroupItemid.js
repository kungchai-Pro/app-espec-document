import FetchApi from "./Functionapi";
const FetchApis = new FetchApi();


export function GetdataHeader(id,namesale,flowid, dataitem) {
    FetchApis.FethcGet(`/document/DocumentById/${id}`).then(res => {

        if (res) {
            checkInserdata(res.data[0],namesale,flowid, dataitem)
        }
    })

}

function checkInserdata(dataHeader,namesale,flowid, Newdataitem){

    var versionnow = parseInt(dataHeader.Revise) + 1;
    let reviseCode = `${dataHeader.StandardCode}-` + versionnow;

        FetchApis.FethcGet(`/document/DocumentByCode/${reviseCode}`).then(res => {

        if (res) {
            if(res.data.length==0){
                 ReviseVersion(dataHeader,namesale,flowid, Newdataitem)
            }
        }
    })
}

export function ReviseVersion(dataHeader,namesale,flowid, Newdataitem) {

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
        JournalGroupID: Newdataitem.ItemGroupID,//อ้างอิงเอกสาร Group Revies //(เอกสารบรรจุ SSD)
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
        BOMVersion: dataHeader.BOMVersion,//อ้างอิงสูตร BOM
        PackagingDetails: dataHeader.PackagingDetails,//อธิบายการบรรจุงาน
        Remark: dataHeader.Remark,//อธิบายเพิ่มเติม
        UserIDConfirm: userId,//รหัสผู้ Confirm เอกสาร
        ConfirmDateTime: timestampsDate,//วันที่และเวลา Confirm
        Typeproduct: dataHeader.Typeproduct,
        PurposeDetail: dataHeader.PurposeDetail,
        SaleAckUserID: namesale,
        FlowrunId: flowid,
        typeDocement: dataHeader.typeDocement,
        statusflow: "101",
        stateflow: "1",
        rejectTo: "",
        recallTo: "",
        dedicatedTo: "",
        stamptimeUpdate: timestampsnow,
        updateBy: "",
        StandardCode: dataHeader.StandardCode,
        Actives: "1"
    }

    // console.log(objectHearder)
    return FetchApis.FethcPost(`/document/createReviseDocument`, objectHearder).then(res => {
        if (res.status == 200) {
            // for (let index = 0; index < res.data.length; index++) {

            GetdataDetail(dataHeader.JournalCode, reviseCode, Newdataitem);
            // }
            ListJournalImages(dataHeader.JournalCode,reviseCode,res.insertId)

            return res;
        } else {
            console.log(res)
        }
    })

}

    function ListJournalImages(jourcode,newcode,insertId){

        FetchApis.FethcGet(`/journalImages/JouranlImagesByCode/${jourcode}`).then(res=>{
            if(res){
                    for (let index = 0; index < res.data.length; index++) {
                        const imageslist = res.data[index];
                        addreviseJournalImages(imageslist,newcode,insertId)
                        
                    }
                 
            }
           
        })
    }

    function addreviseJournalImages(imageslist,newcode,insertId){
        var objectdata={
            JournalID:imageslist.JournalID, 
            SlotNo:imageslist.SlotNo, 
            ItemID:imageslist.ItemID, 
            ItemName:imageslist.ItemName, 
            SlotNoSpec:imageslist.SlotNoSpec, 
            SubjectDetails:imageslist.SubjectDetails,
            SubjectExtend:imageslist.SubjectExtend, 
            LocationPic:imageslist.LocationPic, 
            UserIdConfirm:imageslist.UserIdConfirm, 
            ConfirmDateTime:imageslist.ConfirmDateTime, 
            StatusFacConfirm:'1', 
            JournalCode:newcode, 
            JourId:insertId
        }
                FetchApis.FethcPost(`/journalImages/createJournalImages`,objectdata).then(res=>{
                    if(res){
                        console.log(res)
                    }

        })
    }



async function GetdataDetail(jourcode, reviseCode, Newdataitem) {

    await FetchApis.FethcGet(`/document/DocumentDetailByCode/${jourcode}`).then(res => {

        if (res) {

            for (let index = 0; index < res.data.length; index++) {
                const datadetailList = res.data[index];

                createDetailRevise(datadetailList, reviseCode, Newdataitem);
            }
        }
    })
}

async function createDetailRevise(datadetailList, reviseCode, Newdataitem) {

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
    // const userId = sessionStorage.getItem("userId")
    if (Newdataitem.JournalID == datadetailList.JournalID) {
        var dataDeatilall = {
            JournalID: datadetailList.JournalID,
            PkDescription:Newdataitem.PkDescription,
            GroupRemark:Newdataitem.GroupRemark,
            SlotNo: datadetailList.SlotNo,
            ItemID: Newdataitem.ItemID,
            ItemName: Newdataitem.ItemName,
            ItemGroupID: Newdataitem.ItemGroupID,
            PkDescription: Newdataitem.PkDescription,
            SpecID: Newdataitem.SpecID,
            Width: Newdataitem.Width,
            Depth: Newdataitem.Depth,
            Height: Newdataitem.Height,
            NetWeight: Newdataitem.NetWeight,
            TareWeight: Newdataitem.TareWeight,
            GrossWeight: Newdataitem.GrossWeight,
            SizeDetails: Newdataitem.SizeDetails,
            TypeSheet: Newdataitem.TypeSheet,
            Barcode: Newdataitem.Barcode,
            Batch1: Newdataitem.Batch1,
            BatchDetail1: Newdataitem.BatchDetail1,
            BatchExample1:Newdataitem.BatchExample1,
            Batch2: Newdataitem.Batch2,
            BatchDetail2: Newdataitem.BatchDetail2,
            BatchExample2:Newdataitem.BatchExample2,
            BatchNo:Newdataitem.BatchNo,
            TypeBatch:Newdataitem.TypeBatch,
            Remark: Newdataitem.Remark,
            ColabgroupId: Newdataitem.ColabgroupId,
            UserIDConfirm: datadetailList.UserIDConfirm,
            ConfirmDateTime: timestampsnow,
            JournalCode: reviseCode,
        }

        UpdateDetailNew(dataDeatilall, reviseCode)
    } else {

        var dataDeatilall = {
            JournalID: datadetailList.JournalID,
            PkDescription:datadetailList.PkDescription,
            GroupRemark:datadetailList.GroupRemark,
            SlotNo: datadetailList.SlotNo,
            ItemID: datadetailList.ItemID,
            ItemName: datadetailList.ItemName,
            ItemGroupID: Newdataitem.ItemGroupID,
            PkDescription: datadetailList.PkDescription,
            SpecID: datadetailList.SpecID,
            Width: datadetailList.Width,
            Depth: datadetailList.Depth,
            Height: datadetailList.Height,
            NetWeight: datadetailList.NetWeight,
            TareWeight: datadetailList.TareWeight,
            GrossWeight: datadetailList.GrossWeight,
            SizeDetails: datadetailList.SizeDetails,
            TypeSheet: datadetailList.TypeSheet,
            Barcode: datadetailList.Barcode,
            Batch1: datadetailList.Batch1,
            BatchDetail1: datadetailList.BatchDetail1,
            BatchExample1:datadetailList.BatchExample1,
            Batch2: datadetailList.Batch2,
            BatchDetail2: datadetailList.BatchDetail2,
            BatchExample2:datadetailList.BatchExample2,
            BatchNo:datadetailList.BatchNo,
            TypeBatch:Newdataitem.TypeBatch,
            Remark: datadetailList.Remark,
            ColabgroupId: datadetailList.ColabgroupId,
            UserIDConfirm: datadetailList.UserIDConfirm,
            ConfirmDateTime: timestampsnow,
            JournalCode: reviseCode,

        }
        UpdateDetailNew(dataDeatilall, reviseCode)
    }

}



async function UpdateDetailNew(dataDeatilall, reviseCode) {
    return await FetchApis.FethcPost(`/document/createDocumentdetail`, dataDeatilall).then(res => {
        if (res) {

            getImageDetail(res.data[0], dataDeatilall, reviseCode)
        }
    })
}


function getImageDetail(detailAll, dataDeatilall, reviseCode) {

    FetchApis.FethcGet(`/document/DocumentSpecificBydetailId/${dataDeatilall.JournalID}`).then(res => {

        if (res) {

            for (let index = 0; index < res.data.length; index++) {
                const imagesList = res.data[index];
                careteImagesRevise(detailAll.JournalID, imagesList, reviseCode);
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
    // var timestampsDate = d.getFullYear() + "-" + convertmonth + "-" + convertdate;
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
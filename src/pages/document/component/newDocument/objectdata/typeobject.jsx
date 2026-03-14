
//   var timestampsnow=d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
const d = new Date();
let  convertdate=""
let convertmonth=d.getMonth()+1;
if(d.getDate() <10){
  convertdate="0"+d.getDate();
}
else{
    convertdate=d.getDate();
}
if(d.getMonth()+1<10){
  convertmonth="0"+convertmonth
}else{
    convertmonth=convertmonth
}
var timestampsnow=d.getFullYear()+"-"+convertmonth+"-"+convertdate+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
var timestampsDate=d.getFullYear()+"-"+convertmonth+"-"+convertdate;

const userId = sessionStorage.getItem("userId")

export const ItmeTypeID=['สำลีแผ่น', 'สำลีก้าน/ก้อน','สำลีม้วน']

export const objectHearder={
    JournalID:"",
    JournalCode:"",
    Revise:"0",
    TransDate:timestampsDate,//วันที่เอกสาร SDSS
    JournalGroupID:"",//อ้างอิงเอกสาร Group Revies //(เอกสารบรรจุ SSD)
    ItemTypeID:[],//ประเภทสินค้า(สำลีก้าน, ลำลีก้อน ,สำลีแผน ,สำลีม้วน)
    Purpose:"",//วัตถุประสงค์
    LastApprovedDate:timestampsDate,//วันที่ Approved ล่าสุด
    RefECN:"",//เลขที่ ECN อ้างอิง (เลขที่เอกสาร ECN)
    PartFileECN:"",//จัดเก็บไฟล์เอกสาร ECN 
    UserIDRequest:"",//รหัสผู้ร้องขอเอกสาร
    CustID:"",//รหัสลูกค้า
    ItemID:"",//รหัสสินค้า
    ItemName:"",
    CustName:"",// ชื่อลูกค้า
    BrandID:"",//รหัสตราสินค้า
    SpecId:"",
    SpecName:"",
    BOMVersion:"",//อ้างอิงสูตร BOM
    PackagingDetails:"",//อธิบายการบรรจุงาน
    Remark:"",//อธิบายเพิ่มเติม
    UserIDConfirm:userId,//รหัสผู้ Confirm เอกสาร
    ConfirmDateTime:"",//วันที่และเวลา Confirm
    Typeproduct:"",
    PurposeDetail:[],
    SaleAckUserID:"",
    FlowrunId:"",
    // SaleMgrUserID:"",
    // SaleMgrDateTime:"",
    typeDocement:"2", /// รหัส flow Id  เป็น key เอาไว้ runflow
    statusflow:"101",
    stateflow:"1",
    rejectTo:"",
    recallTo:"",
    dedicatedTo:"",
    stamptimeUpdate:timestampsnow,
    updateBy:"",
    Actives:"1"
}

export const objectDetial={
    JournalID:"",//เลขที่เอกสาร SDSS
    SlotNo:"1",//Slot No
    ItemGroupID:"",//"รหัสประเภทบรรจุภัณฑ์ ประเภทบรรจุภัณฑ์ (รหัส + Name)"
    PkDescription:"",
    GroupRemark:"",//พิมพ์อธิบายเพิ่ม
    ItemID:"",//รหัสสินค้า
    ItemName:"",
    SpecID:"",//รหัส Spec
    Width:"",//ขนาด Dimension (กว้าง)
    Depth:"",//ขนาด Dimension (ยาว)
    Height:"",//ขนาด Dimension (สูง)
    NetWeight:"",//น้ำหนัก Net Weight
    TareWeight:"",//น้ำหนัก Tare Weight
    GrossWeight:"",//น้ำหนัก Goss Weight
    SizeDetails:"",
    Barcode:"",//Format Barcode
    Batch1:"",
    BatchDetail1:"",
    BatchExample1:"",
    Batch2:"",
    BatchDetail2:"",
    BatchExample2:"",
    BatchNo:"",
    TypeBatch:"",
    Remark:"",//อธิบายเพิ่มเติม
    TypeSheet:"",
    ColabgroupId:"",
    UserIDConfirm:userId,//รหัสผู้ Confirm เอกสาร
    ConfirmDateTime:timestampsnow,//วันที่และเวลา Confirm
    JournalCode:""
    
}
export const objectImages={
    JournalID:"",//เลขที่ SDSS
    SlotNo:"1",//Slot No Details
    ItemID:"",//อ้างอิง Item Code Table Detail
    ItemName:"",//อ้างอิง Item Name Table Detail
    SlotNoSpec:"",//Slot No Specification
    SubjectDetails:"",//พื้นที่พิมพ์หัวข้อ
    SubjectExtend:"",//พื้นที่พิมพ์อธิบาย
    LocationPic:"",//รูปภาพ
    UserIdConfirm:userId,//Confirm by
    ConfirmDateTime:timestampsnow,//Confirm Date Time
    StatusFacConfirm:"1",//"Status Last confirm(โรงงาน)เพื่อส่ง Approved "
    JournalCode:""
}
import { idID } from "@mui/material/locale";
import FetchApi from "./Functionapi";
const FetchApis = new FetchApi();

export function GetdataReviseAll(datahearder, datadetail, journalGroupID, saleApproved, flowId, typeEdit) {

    if (typeEdit == '1') {

        for (let index = 0; index < datahearder.length; index++) {
            var dataHearder = datahearder[index];
            InsertJournalHearder(dataHearder[0], datadetail[index])
        }

    } else if (typeEdit == '2') {

        for (let index = 0; index < datahearder.length; index++) {
            var dataHearder = datahearder[index];
             InsertJournalHearderBatch(dataHearder[0], datadetail)

        }

    }

    // แบบ item
    function InsertJournalHearder(dataheadlist, datadetails) {
        var datadetailslist = datadetails;

        var datahearderlist = dataheadlist;

        var versionnow = parseInt(datahearderlist.Revise) + 1;
        var reviseCode = `${datahearderlist.StandardCode}-` + versionnow;

        var objectheader = {
            ...datahearderlist,
            JournalCode: reviseCode,
            JournalGroupID: journalGroupID,
            SaleAckUserID: saleApproved,
            FlowrunId: flowId,
            Revise: versionnow,
            statusflow: "101",
            stateflow: "1",
        }
        try {
            
            datadetailslist.forEach(item => {
                var datalistnew = {
                    ...item,
                    JournalCode: reviseCode
                }
                // console.log(datalistnew)
                CreatedateDetailNew(datalistnew)
            })

            FetchApis.FethcPost(`/document/createReviseGroupDocument`, objectheader).then(res => {
                if (res.status == 200) {
                    ListJournalImages(datahearderlist.JournalCode, reviseCode, res.insertId)

                } else {
                    console.log(res)
                }
            })

        } catch (err) {
            console.log(err)
        }



    }


    function InsertJournalHearderBatch(dataheadlist, datadetails) {
        var datahearderlist = dataheadlist;

        var versionnow = parseInt(datahearderlist.Revise) + 1;
        var reviseCode = `${datahearderlist.StandardCode}-` + versionnow;

        var objectheader = {
            ...datahearderlist,
            JournalCode: reviseCode,
            JournalGroupID: journalGroupID,
            SaleAckUserID: saleApproved,
            FlowrunId: flowId,
            Revise: versionnow,
            statusflow: "101",
            stateflow: "1",
        }

        FetchApis.FethcPost(`/document/createReviseGroupDocument`, objectheader).then(res => {
            if (res.status == 200) {

                // console.log(res.data) แบบ  batch
                for (let index = 0; index < datadetails.length; index++) {

                    const datadetailnew = datadetails[index];

                    if (datadetailnew.JournalCode == datahearderlist.JournalCode) {
                        var datalist = {
                            ...datadetailnew,
                            JournalCode: reviseCode
                        }

                        CreatedateDetailNew(datalist)
                    }

                }

                ListJournalImages(datahearderlist.JournalCode, reviseCode, res.insertId)

            } else {
                console.log(res)
            }
        })

    }

    function ListJournalImages(jourcode, newcode, insertId) {

        FetchApis.FethcGet(`/journalImages/JouranlImagesByCode/${jourcode}`).then(res => {
            if (res) {
                for (let index = 0; index < res.data.length; index++) {
                    const imageslist = res.data[index];
                    addreviseJournalImages(imageslist, newcode, insertId)

                }

            }

        })
    }

    function addreviseJournalImages(imageslist, newcode, insertId) {
        var objectdata = {
            JournalID: imageslist.JournalID,
            SlotNo: imageslist.SlotNo,
            ItemID: imageslist.ItemID,
            ItemName: imageslist.ItemName,
            SlotNoSpec: imageslist.SlotNoSpec,
            SubjectDetails: imageslist.SubjectDetails,
            SubjectExtend: imageslist.SubjectExtend,
            LocationPic: imageslist.LocationPic,
            UserIdConfirm: imageslist.UserIdConfirm,
            ConfirmDateTime: imageslist.ConfirmDateTime,
            StatusFacConfirm: '1',
            JournalCode: newcode,
            JourId: insertId
        }
        FetchApis.FethcPost(`/journalImages/createJournalImages`, objectdata).then(res => {
            if (res) {
                console.log(res)
            }

        })
    }


    function CreatedateDetailNew(dataDeatilall) {
        // console.log(dataDeatilall)
        try {


            FetchApis.FethcPost(`/document/createDocumentdetail`, dataDeatilall).then(res => {
                if (res) {
                    console.log(res)

                    getImageDetail(res.data[0], dataDeatilall, dataDeatilall.JournalCode)
                }
            })
        } catch (err) {
            console.log(err)
        }

    }

    function getImageDetail(detailAll, dataDeatilall, JournalCode) {
        try {
            FetchApis.FethcGet(`/document/DocumentSpecificBydetailId/${dataDeatilall.JournalID}`).then(res => {

                if (res) {

                    for (let index = 0; index < res.data.length; index++) {
                        const imagesList = res.data[index];
                        careteImagesRevise(detailAll.JournalID, imagesList, JournalCode);
                    }
                }
            })
        } catch (err) {
            console.log(err)
        }
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
        FetchApis.FethcPost(`/document/createDocumentSpecification`, objectImages).then(res => {
            return res;
        });

    }

}

export function CreateNoteGroupById(datalist, newdatalist, typeEdit, groupdcode) {


    if (typeEdit == '1') {


        var datalistnow = {
            typeProduct: datalist[0].PkDescription,
            itemId: datalist[0].ItemID,
            itemName: datalist[0].ItemName,
            typenote: '1',
            journalgroupId: groupdcode
        }

        var datalistnew = {
            typeProduct: newdatalist.PkDescription,
            itemId: newdatalist.ItemID,
            itemName: newdatalist.ItemName,
            typenote: '2',
            journalgroupId: groupdcode
        }

        FetchApis.FethcPost(`/notejournalgroup/createnoteitem`, datalistnow).then(res => {
            if (res) {
                console.log(res)
            }
        })

        FetchApis.FethcPost(`/notejournalgroup/createnoteitem`, datalistnew).then(res => {
            if (res) {
                console.log(res)
            }
        })
    }
    else if (typeEdit == '2') {
        console.log(datalist)
        var datatlist = {
            TypeBatch: datalist[0].TypeBatch,
            batchName1: datalist[0].Batch1,
            batchName2: datalist[0].Batch2,
            batchDetail1: datalist[0].BatchDetail1,
            batchDetail2: datalist[0].BatchDetail2,
            batchExample1: datalist[0].BatchExample1,
            batchExample2: datalist[0].BatchExample2,
            numbers: datalist[0].BatchNo,
            typenote: '1',
            journalgroupId: groupdcode
        }

        FetchApis.FethcPost(`/notejournalgroup/creatnotebatch`, datatlist).then(res => {
            if (res) {
                console.log(res)
            }
        })

        newdatalist.forEach(element => {

            var datatnew = {
                TypeBatch: element.TypeBatch,
                batchName1: element.batchName1,
                batchName2: element.batchName2,
                batchDetail1: element.batchDetail1,
                batchDetail2: element.batchDetail2,
                batchExample1: element.batchExample1,
                batchExample2: element.batchExample2,
                numbers: element.numbers,
                typenote: '2',
                journalgroupId: groupdcode
            }

            FetchApis.FethcPost(`/notejournalgroup/creatnotebatch`, datatnew).then(res => {
                if (res) {
                    console.log(res)
                }
            })

        });

    }

}



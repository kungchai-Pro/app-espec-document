import FetchApi from "../../../customhooks/Functionapi";
const FetchApis =new FetchApi();

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


export async function ApprovedById(data,userId,flowStatus,flowStateEnd,stamptimeUpdate) {
var res_data=null

 var ob={
    journalId:data[0].JournalID,
    stateflow:data[0].stateflow,
    statusType:flowStatus,
    UserId:userId,
    StateEnd:flowStateEnd,
    stamptimeUpdate:stamptimeUpdate
 }

   await FetchApis.FethcPost(`/flowrunsystem/updateFlowrunByState`,ob).then(res=>{
    res_data=res
    })

    return res_data;
}


export async function ApprovedSend(data,userId,flowStatus,flowStateEnd,stamptimeUpdate) {
    var res_data=null
    
     var ob={
        journalId:data[0].JournalID,
        stateflow:data[0].stateflow,
        statusType:flowStatus,
        UserId:userId,
        StateEnd:flowStateEnd,
        stamptimeUpdate:stamptimeUpdate
     }
    // console.log(ob)
       await FetchApis.FethcPost(`/flowrunsystem/updateFlowrunByState`,ob).then(res=>{
        res_data=res
        })
    
        return res_data;
    }

    
// การอัพเดท แบบกลุ่ม 
export async function ApprovedGroupSend(data,userId,flowStatus,flowStateEnd) {
    var res_data=null
    
     var ob={
        journalId:data.JournalID,
        stateflow:data.stateflow,
        statusType:flowStatus,
        UserId:userId,
        StateEnd:flowStateEnd,
        stamptimeUpdate:timestampsnow
     }
    // console.log(ob)
       await FetchApis.FethcPost(`/flowrunsystem/updateFlowrunGroupByState`,ob).then(res=>{
        res_data=res
        })
    
        return res_data;
    }


export async function RecievedById(data,userId,flowStatus,flowStateEnd,timestampsnow) {
var res_data=null

    var ob={
        journalId:data[0].JournalID,
        stateflow:data[0].stateflow,
        UserId:userId,
        stamptimeUpdate:timestampsnow
     }

     await FetchApis.FethcPost(`/flowrunsystem/updateFlowrunrecieved`,ob).then(res=>{
        console.log(res)
        res_data=res
    })
    return res_data;
}

export async function rejectById(data) {
    var res_data=null
    await FetchApis.FethcPost(`/flowrunsystem/updateFlowrunreject`,data).then(res=>{
        res_data=res
    })
    return res_data;
}


export async function EditReject(data) {
    var res_data=null
        console.log(data)
    await FetchApis.FethcPost(`/flowrunsystem/updateFlowruneditreject`,data).then(res=>{
           res_data=res
           console.log(res)
    })
    
    return res_data;
}



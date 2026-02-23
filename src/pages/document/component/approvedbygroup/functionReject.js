import FetchApi from "../../../customhooks/Functionapi";
const FetchApis = new FetchApi();

export function RejectGrouplist(datalist, uId) {

    for (let index = 0; index < datalist.length; index++) {
        const jourdatalist = datalist[index];
        try {
            var datarejec = {
                journalId: jourdatalist.JournalID,
                UserId: uId,
                reject_stateflow: '1',
                rejectToId: jourdatalist.createBy
            }
            FetchApis.FethcPost(`/flowrunsystem/updateReJectgroupflow`, datarejec).then(res => {
                console.log(res)
            });

        } catch (err) {
            console.log(err)
        }
    }
}

export function UpdateItemById(dataList) {

    dataList.forEach(item => {
        var dataitem = {
            PkDescription: item.PkDescription,
            ItemID: item.ItemID,
            ItemName: item.ItemName,
            ItemGroupID: item.ItemGroupID
        }

        FetchApis.FethcUpdate(`/document/updateDetailByItem/${item.JournalID}`, dataitem).then(res => {
            console.log(res)
        })

    });

}

export function UpdateDetailBatch(dataList) {
    
    dataList.forEach(item => {
        let dataobjec = {
            Batch1:item.Batch1, 
            BatchDetail1:item.BatchDetail1, 
            BatchExample1:item.BatchExample1, 
            Batch2:item.Batch2, 
            BatchDetail2:item.BatchDetail2, 
            BatchExample2:item.BatchExample2, 
            BatchNo:item.BatchNo, 
            TypeBatch:item.TypeBatch
        }
        FetchApis.FethcUpdate(`/document/updateDetailBatch/${item.JournalID}`, dataobjec).then(res => {
            console.log(res)
        })
    })

}


export function NewNotereject(datalist) {
    FetchApis.FethcPost(`/noterejectgroup/NoteRejectgroup`, datalist).then(res => {
        console.log(res)
    })
}
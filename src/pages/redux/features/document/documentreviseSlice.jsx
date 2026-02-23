import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  valueHeader: [],
  valueDetail: [],
  valueImages: []
}
export const documentreviseSlice = createSlice({
  name: 'documentdetail',
  initialState,
  reducers: {
    AddHeader: (state, action) => {
      state.valueHeader.push(action.payload)
    },
    AddDetail: (state, action) => {
      state.valueDetail.push(action.payload)
    },
    AddImages: (state, action) => {
      // state.valueImages = action.payload
      state.valueImages = action.payload
    },
    ClearItem: (state, action) => {
      state.valueHeader = []
      state.valueDetail = []
    },
    updateAddImages: (state, action) => {
      const {
        indexid,
        BatchNo,
        newBatchNo,
        Batch1,
        BatchDetail1,
        BatchExample1,
        Batch2,
        BatchDetail2,
        BatchExample2 } = action.payload;
      console.log(indexid)
      // console.log(state.valueDetail[indexid]);

      //const Itemulist = state.valueDetail[index].find((data) => data.BatchNo === BatchNo);

      // if (Itemulist) {
      //   Itemulist.BatchNo = newBatchNo; 
      //   Itemulist.Batch1 = newBatchNo;
      //   Itemulist.BatchDetail1 = Batch1;
      //   Itemulist.BatchExample1 = BatchDetail1;
      //   // ← Redux Toolkit ใช้ Immer ทำให้แก้ state โดยตรงได้
      // }

      //  const { index, field, value } = action.payload;
      // state.valueImages[index][field] = value;
    },
    removeItem: (state, action) => {
      state.valueImages.splice(action.payload, 1);
    },
    // updateHeader: (state, action) => {
    //   console.log(action.payload)
    //   const item = state.valueHeader.find((item) => item.JournalCode == action.payload.JournalCode
    //   )
    //   if (item) {
    //     item.JournalCode = action.payload.journalNew;

    //   }
    // },
    deleteImagesItem: (state, action) => {
      // console.log(action.payload)
      state.valueImages = state.valueImages.filter((arrow) => arrow.JournalID !== action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { AddHeader, AddDetail, AddImages, updateHeader, updateAddImages, removeItem, deleteImagesItem ,ClearItem} = documentreviseSlice.actions

export default documentreviseSlice.reducer
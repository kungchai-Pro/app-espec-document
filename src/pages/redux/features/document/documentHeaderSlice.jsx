import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  valueHeader: [],
  valueDetail: [],
  valueImages: []
}
export const documentHeaderSlice = createSlice({
  name: 'documentHeader',
  initialState,
  reducers: {
    AddHeader: (state, action) => {
      state.valueHeader = action.payload
    },
    AddDetail: (state, action) => {
      state.valueDetail = action.payload
    },
    AddImages: (state, action) => {
      // state.valueImages = action.payload
      state.valueImages=action.payload
    },
    updateAddImages: (state, action) => {
      const { index, field, value } = action.payload;
      state.valueImages[index][field] = value;
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
    deleteImagesItem:(state,action)=>{
       // console.log(action.payload)
       state.valueImages = state.valueImages.filter((arrow) => arrow.JournalID !== action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { AddHeader, AddDetail, AddImages,updateHeader ,updateAddImages,removeItem,deleteImagesItem} = documentHeaderSlice.actions

export default documentHeaderSlice.reducer
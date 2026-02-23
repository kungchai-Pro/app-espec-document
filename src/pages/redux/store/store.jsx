import { configureStore } from '@reduxjs/toolkit'
import counterReducer from'../features/counterSlice';
import documentHeader from'../features/document/documentHeaderSlice';
import documentrevise from'../features/document/documentreviseSlice';

export const store = configureStore({
  reducer: {
     counter:counterReducer,
     documentHeader:documentHeader,
     documentrevise:documentrevise
  },
})
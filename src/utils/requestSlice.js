import { createSlice } from "@reduxjs/toolkit";

const requestSlice=createSlice({
    name:"request",
    initialState:null,
    reducers:{
      addrequests:(state,action)=>action.payload,
      removerequests:()=>null,
    },
});
export const {addConnections,removeConnections}=requestSlice.actions;
export default requestSlice.reducer;
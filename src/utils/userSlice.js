import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload; // whatever data is being returned it will be set to the state user.
    },
    removeUser: ()=>{
        return null;
    }
  },
});
export const {addUser,removeUser}= userSlice.actions; // Action creators are generated for each case reducer function
export default userSlice.reducer;

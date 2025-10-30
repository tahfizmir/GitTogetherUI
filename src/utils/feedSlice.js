import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => action.payload,
    removeCardFromFeed: (state, action) => {
      const newArray = state.filter((card) => card._id !== action.payload);
      return newArray;
    },
  },
});
export const { addFeed, removeCardFromFeed } = feedSlice.actions;
export default feedSlice.reducer;

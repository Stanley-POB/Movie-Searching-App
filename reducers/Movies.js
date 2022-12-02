import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const moviesSlice = createSlice({
  name: "movies",

  initialState,
  reducers: {
    addMovieToStore: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { addMovieToStore } = moviesSlice.actions;
export default moviesSlice.reducer;

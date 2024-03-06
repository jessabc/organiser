import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: [],
}

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setAllBoards: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAllBoards } = boardsSlice.actions

export default boardsSlice.reducer 
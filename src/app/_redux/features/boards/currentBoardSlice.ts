import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: { 
    id: 0,
    name: "",
    columns: [],
  },
}

export const currentBoardSlice = createSlice({
  name: "currentBoard",
  initialState,
  reducers: {
    setCurrentBoard: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentBoard } = currentBoardSlice.actions

export default currentBoardSlice.reducer 
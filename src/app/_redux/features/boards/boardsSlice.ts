import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { boards } from '@/app/_lib/projectsData'


// export interface ProductsState {
//   value: IProduct[]
// }

const initialState = {
  value: boards,

}

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setAllBoards: (state, action: PayloadAction<[]>) => {
      state.value = action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { setAllBoards  } = boardsSlice.actions

export default boardsSlice.reducer 
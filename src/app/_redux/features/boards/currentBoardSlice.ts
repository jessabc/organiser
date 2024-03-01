import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { boards } from '@/app/_lib/projectsData'


// export interface ProductsState {
//   value: IProduct[]
// }

const initialState = {
  value: boards[0],
}

export const currentBoardSlice = createSlice({
  name: 'currentBoard',
  initialState,
  reducers: {
    setCurrentBoard: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentBoard  } = currentBoardSlice.actions

export default currentBoardSlice.reducer 
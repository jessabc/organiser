import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: {
    amount: 0,
    categories: [],
    transactions: [],
  },
}

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setCard: (state, action) => {
      state.value = {...action.payload}
    },
    updateAmount: (state, action) => {
      state.value = {...state.value, amount: action.payload}
    },
    updateCategories: (state, action) => {
      state.value = {...state.value, categories: action.payload}
    },
    setAllTransactions: (state, action) => {
      state.value = {...state.value, transactions: action.payload}
    },
  },
})
 
// Action creators are generated for each case reducer function
export const { setCard, updateAmount, updateCategories, setAllTransactions } = cardSlice.actions

export default cardSlice.reducer
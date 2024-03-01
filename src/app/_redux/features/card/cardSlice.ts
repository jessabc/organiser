import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { transactions } from '@/app/_lib/transactionsData'


// export interface ProductsState {
//   value: IProduct[]
// }

interface Transaction {
    id: number,
    type: string,
    amount: number,
    category: number,
    notes: number,
}


interface CardState {
  amount: number,
  categories: string[],
  transactions: Transaction[]
}

const initialState = {
  value: {
    amount: 900,
    categories: ['add', 'groceries', 'rent', 'salary'],
    transactions: transactions,
  },
}

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCard: (state, action: PayloadAction<CardState>) => {
      state.value = action.payload
    },
    updateAmount: (state, action: PayloadAction<number>) => {
      state.value = {...state.value, amount: action.payload}
    },
    updateCategories: (state, action: PayloadAction<string[]>) => {
      state.value = {...state.value, categories: action.payload}
    },
    setAllTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.value = {...state.value, transactions: action.payload}
    },
  },
})
 
// Action creators are generated for each case reducer function
export const { setCard, updateAmount, updateCategories, setAllTransactions } = cardSlice.actions

export default cardSlice.reducer
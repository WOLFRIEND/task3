import { configureStore } from '@reduxjs/toolkit'
import { ordersSlice } from 'store/orders'

export const store = configureStore({
  reducer: {
    orders: ordersSlice.reducer,
  },
})

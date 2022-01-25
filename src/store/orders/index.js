import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API } from 'api'

const INITIAL_STATE = {
  data: [],
  error: false,
  message: null,
  loading: false,
}

export const getOrdersList = createAsyncThunk('orders/list', async (params) => {
  const data = await API.orders.getOrdersList(params)
  return data.data
})

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOrdersList.pending, (state) => {
        state.loading = true
        return state
      })
      .addCase(getOrdersList.fulfilled, (state, { payload }) => {
        state.data = payload
        state.loading = false
        return state
      })
      .addCase(getOrdersList.rejected, (state, { payload }) => {
        state.data = []
        state.error = true
        state.message = payload
        state.loading = false
        return state
      })
  },
})

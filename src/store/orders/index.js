import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API } from 'api'
import { generateUuid } from '../../helpers/uuid-helper'
import { mapKeys } from 'lodash/object'
import { STATUSES } from 'const/statuses'

const INITIAL_STATE = {
  orders: {},
  order: {},
  error: false,
  message: null,
  loading: false,
}

export const getOrdersList = createAsyncThunk('orders/list', async (params) => {
  try {
    const { data } = await API.orders.getOrdersList(params)
    return data
  } catch (e) {
    console.error(e)
    return e
  }
})

export const getOrderById = createAsyncThunk('orders/:id', async (id) => {
  try {
    const { data } = await API.orders.getOrderById(id)
    return data
  } catch (e) {
    console.error(e)
    return e
  }
})

export const creteOrder = createAsyncThunk('orders/create', async (payload) => {
  try {
    const { data } = await API.orders.createOrder({
      id: generateUuid(),
      dateCreated: new Date(),
      createdBy: payload.createdBy,
      title: payload.title,
      description: payload.description,
      status: STATUSES.pending,
    })
    return data
  } catch (e) {
    console.error(e)
    return e
  }
})

export const updateOrder = createAsyncThunk(
  'orders/update',
  async (payload) => {
    try {
      const { data } = await API.orders.updateOrder(payload.id, {
        createdBy: payload.createdBy,
        title: payload.title,
        description: payload.description,
        status: payload.status,
      })
      return data
    } catch (e) {
      console.error(e)
      return e
    }
  },
)

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
        // state.orders = payload
        state.orders = { ...mapKeys(payload, 'id') }
        state.loading = false
        return state
      })
      .addCase(getOrdersList.rejected, (state, { payload }) => {
        state.orders = {}
        state.error = true
        state.message = payload
        state.loading = false
        return state
      })

    builder
      .addCase(getOrderById.pending, (state) => {
        state.loading = true
        return state
      })
      .addCase(getOrderById.fulfilled, (state, { payload }) => {
        state.order = payload
        state.loading = false
        return state
      })
      .addCase(getOrderById.rejected, (state, { payload }) => {
        state.order = {}
        state.error = true
        state.message = payload
        state.loading = false
        return state
      })

    builder
      .addCase(creteOrder.pending, (state) => {
        state.loading = true
        return state
      })
      .addCase(creteOrder.fulfilled, (state, { payload }) => {
        state.orders[payload.id] = payload
        state.loading = false
        return state
      })
      .addCase(creteOrder.rejected, (state, { payload }) => {
        state.error = true
        state.message = payload
        state.loading = false
        return state
      })

    builder
      .addCase(updateOrder.pending, (state) => {
        state.loading = true
        return state
      })
      .addCase(updateOrder.fulfilled, (state, { payload }) => {
        state.orders[payload.id] = payload
        state.order = payload
        state.loading = false
        return state
      })
      .addCase(updateOrder.rejected, (state, { payload }) => {
        state.error = true
        state.message = payload
        state.loading = false
        return state
      })
  },
})

import axios from 'axios'
import { orders } from 'api/orders'

export const $axios = axios.create({
  baseURL: 'http://localhost:3001',
})

export const API = Object.freeze({
  orders: orders($axios),
})

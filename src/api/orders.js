import { buildQueryString } from 'helpers/api-helpers'

export const orders = ($axios) => ({
  getOrdersList(params) {
    return $axios.get(`/orders?${buildQueryString(params)}`)
  },
  getOrderById(id) {
    return $axios.get(`/orders/${id}`)
  },
  createOrder(payload) {
    return $axios.post(`/orders`, payload)
  },
  updateOrder(id, payload) {
    return $axios.patch(`/orders/${id}`, payload)
  },
})

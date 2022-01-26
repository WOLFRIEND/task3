// export const orderByIdSelector = (state) => (id) => {
//   return state.orders.data[id]
// }

export const ordersListSelector = (state) => {
  return Object.values(state.orders.orders)
}

export const orderSelector = (state) => {
  return state.orders.order
}

// export const orderByIdSelector = (state) => (id) => {
//   return state.orders.data[id]
// }

export const ordersListSelector = (state) => {
  return state.orders.data
}

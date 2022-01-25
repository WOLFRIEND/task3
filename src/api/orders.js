import { $axios } from 'api'

import { buildQueryString } from 'helpers/api-helpers'

export default ($axios) => ({
  getOrdersList(params) {
    return $axios.get(`/orders?${buildQueryString(params)}`)
  },
})

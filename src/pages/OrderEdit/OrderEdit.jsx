import { useNavigate, useParams } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
import { getOrderById } from 'store/orders'
import { orderSelector } from 'store/selectors/orders'
import { useDispatch, useSelector } from 'react-redux'
import { OrderForm } from 'components/OrderForm/OrderForm'
import { updateOrder } from 'store/orders'

export const OrderEdit = () => {
  const { id: orderId } = useParams()
  const dispatch = useDispatch()
  const order = useSelector(orderSelector)
  let navigate = useNavigate()

  useEffect(() => {
    dispatch(getOrderById(orderId))
  }, [orderId])

  const onFormSubmit = useCallback(async (form) => {
    await dispatch(updateOrder(form))
    navigate('/orders')
  }, [])

  return (
    <div>
      <h1>Edit Order</h1>
      <OrderForm onFormSubmit={onFormSubmit} order={order} />
    </div>
  )
}

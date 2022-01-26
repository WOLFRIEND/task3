import { useCallback, useState } from 'react'
import { OrderForm } from 'components/OrderForm/OrderForm'
import { useDispatch } from 'react-redux'
import { creteOrder } from 'store/orders'
import { useNavigate } from 'react-router-dom'

export const OrderNew = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFormSubmit = useCallback(async (form) => {
    await dispatch(creteOrder(form))
    navigate('/orders')
  }, [])

  return (
    <div className="orders">
      <h1>New Order</h1>
      <OrderForm onFormSubmit={onFormSubmit} />
    </div>
  )
}

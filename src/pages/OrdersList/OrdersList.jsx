// Styles.

import { getOrdersList } from 'store/orders'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ordersListSelector } from 'store/selectors/orders'
import moment from 'moment'
import { Table } from 'react-bootstrap'
import { Pagination } from 'react-bootstrap'

export const OrdersList = () => {
  const dispatch = useDispatch()
  const ordersList = useSelector(ordersListSelector)
  // const [currentPage, setCurrentPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    dispatch(
      getOrdersList({
        _limit: 20,
        _page: currentPage,
      }),
    )
  }, [dispatch, currentPage])

  // const changePage = (page) => {
  //   setCurrentPage(page)
  // }
  const renderOrdersTable = () => {
    if (!ordersList.length) return <p>Loading...</p>
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date Created</th>
            <th>Created By</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {ordersList.map((order) => {
            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{moment(order.dateCreated).format('YYYY-MM-DD')}</td>
                <td>{order.createdBy}</td>
                <td>{order.title}</td>
                <td>{order.description}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }

  return (
    <div className="">
      <h1>Orders List</h1>
      <div className="">{renderOrdersTable()}</div>

      <Pagination size="lg">
        <Pagination.Prev>Prev</Pagination.Prev>
        <Pagination.Next>Next</Pagination.Next>
      </Pagination>
    </div>
  )
}

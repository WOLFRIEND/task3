import { getOrdersList } from 'store/orders'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ordersListSelector } from 'store/selectors/orders'
import { Table } from 'react-bootstrap'
import { Pagination } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { OrderCard } from 'components/OrderCard/OrderCard'
import { Dropdown } from 'react-bootstrap'
import { STATUSES } from 'const/statuses'
import { updateOrder } from 'store/orders'

export const OrdersList = () => {
  const dispatch = useDispatch()
  const ordersList = useSelector(ordersListSelector)
  const [currentPage, setCurrentPage] = useState(0)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState({})

  useEffect(() => {
    dispatch(
      getOrdersList({
        _limit: 20,
        _page: currentPage,
      }),
    )
  }, [dispatch, currentPage])

  const changeOrderStatus = (status) => () => {
    setSelectedOrder({ ...selectedOrder, status: STATUSES[status] })
  }

  const handleOrderUpdate = async () => {
    await dispatch(updateOrder(selectedOrder))
    hideModal()
  }

  const showModal = (order) => () => {
    setSelectedOrder(order)
    setShowStatusModal(true)
  }

  const hideModal = () => {
    setSelectedOrder({})
    setShowStatusModal(false)
  }

  const changePage = useCallback(
    (page) => () => {
      setCurrentPage(page)
    },
    [],
  )

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
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {ordersList.map((order) => {
            return (
              <OrderCard key={order.id} order={order} showModal={showModal} />
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

      <Modal show={showStatusModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropdown className="d-inline mx-2">
            <Dropdown.Toggle id="dropdown-autoclose-true">
              {selectedOrder.status}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {Object.keys(STATUSES).map((statusKey) => (
                <Dropdown.Item
                  key={statusKey}
                  onClick={changeOrderStatus(statusKey)}
                >
                  {STATUSES[statusKey]}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOrderUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Pagination size="lg">
        <Pagination.Prev onClick={changePage(currentPage - 1)}>
          Prev
        </Pagination.Prev>
        <Pagination.Next onClick={changePage(currentPage + 1)}>
          Next
        </Pagination.Next>
      </Pagination>
    </div>
  )
}

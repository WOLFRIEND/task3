import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Button } from 'react-bootstrap'
import { STATUSES } from 'const/statuses'

export const OrderCard = ({ order, showModal }) => {
  const statusStyle = useMemo(() => {
    switch (order.status) {
      case STATUSES.pending:
        return 'warning'
      case STATUSES.completed:
        return 'success'
      case STATUSES.rejected:
        return 'danger'
      default:
        return 'warning'
    }
  }, [order.status])

  return (
    <tr>
      <td>{order.id}</td>
      <td>{moment(order.dateCreated).format('YYYY-MM-DD')}</td>
      <td>{order.createdBy}</td>
      <td>{order.title}</td>
      <td>{order.description}</td>
      <td>
        <Button variant={statusStyle} onClick={showModal(order)}>
          {order.status}
        </Button>
      </td>
      <td>
        <Link to={`/orders/edit/${order.id}`} className="ui button primary">
          Edit
        </Link>
      </td>
    </tr>
  )
}

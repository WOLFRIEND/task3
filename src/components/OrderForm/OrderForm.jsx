import { useCallback, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Dropdown, Form } from 'react-bootstrap'
import { STATUSES } from 'const/statuses'

export const OrderForm = ({ onFormSubmit, order }) => {
  const [form, setForm] = useState({
    createdBy: '',
    title: '',
    description: '',
    status: '',
  })

  const { id: orderId } = useParams()

  useEffect(() => {
    // setForm({ ...form, ...order })
    setForm((prevState) => ({ ...prevState, ...order }))
  }, [order])

  const handleUserInput = useCallback(
    (e) => {
      const { name, value } = e.target
      setForm({ ...form, [name]: value })
    },
    [form],
  )

  const setOrderStatus = useCallback(
    (status) => () => {
      setForm({ ...form, status: STATUSES[status] })
    },
    [form],
  )

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault()
      onFormSubmit(form)
    },
    [form, onFormSubmit],
  )
  return (
    <div>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            onInput={handleUserInput}
            type="text"
            placeholder="User Name"
            name="createdBy"
            value={form.createdBy}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>Order Title</Form.Label>
          <Form.Control
            onInput={handleUserInput}
            type="text"
            placeholder="Order Title"
            name="title"
            value={form.title}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>Order Description</Form.Label>
          <Form.Control
            onInput={handleUserInput}
            type="text"
            placeholder="Order Description"
            name="description"
            value={form.description}
          />
        </Form.Group>

        {orderId && (
          <Form.Group className="mb-3" controlId="status">
            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle id="dropdown-autoclose-true" variant={'info'}>
                {form.status}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {Object.keys(STATUSES).map((statusKey) => (
                  <Dropdown.Item
                    key={statusKey}
                    onClick={setOrderStatus(statusKey)}
                  >
                    {STATUSES[statusKey]}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        )}

        <Button variant="primary" type="submit" onClick={handleFormSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

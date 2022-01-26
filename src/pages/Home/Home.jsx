import { Outlet, Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import { Container } from 'react-bootstrap'

export const Home = () => {
  return (
    <div className="home">
      <Nav fill variant="tabs" activeKey="/">
        <Nav.Item>
          <Link to="/">
            <Nav.Link as="div">Welcome</Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/orders">
            <Nav.Link as="div">Orders</Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="orders/new">
            <Nav.Link as="div">New Order</Nav.Link>
          </Link>
        </Nav.Item>
      </Nav>
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}

// Dependencies.
import { Outlet, Link } from 'react-router-dom'

// Components.
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { Nav } from 'react-bootstrap'
import { Container } from 'react-bootstrap'

const TABS = Object.freeze({
  welcome: {
    name: 'welcome',
    translationId: 'Welcome',
  },
  ordersList: {
    name: 'ordersList',
    translationId: 'Orders',
  },
  ordersNew: {
    name: 'ordersNew',
    translationId: 'New Order',
  },
})

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

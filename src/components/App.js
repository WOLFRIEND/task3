// Dependencies.
import { Routes, Route } from 'react-router-dom'

// Styles.
import './App.scss'

// Pages.
import { NotFound } from 'pages/NotFound/NotFound'
import { Home } from 'pages/Home/Home'
import { Welcome } from 'pages/Welcome/Welcome'
import { OrdersList } from 'pages/OrdersList/OrdersList'
import { OrderNew } from 'pages/OrderNew/OrderNew'
import { OrderEdit } from 'pages/OrderEdit/OrderEdit'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />}>
          <Route index element={<Welcome />} />
          {/*<Route path="welcome" element={<Welcome />} />*/}
          <Route path="orders" element={<OrdersList />} />
          <Route path="orders/new" element={<OrderNew />} />
          <Route path="orders/edit/:id" element={<OrderEdit />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from './pages/homepage'
import ProductDetails from './pages/productDetails'
import NavBar from './components/navBar'
import Cart from './pages/cart'

function App() {

  return (
    <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />}/>
        </Routes>
    </Router>
  )
}

export default App

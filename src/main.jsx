import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProductProvider } from './contexts/productContext.jsx'
import { CartProvider } from './contexts/cartContext.jsx';
import { AuthProvider } from './contexts/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductProvider> 
    </AuthProvider>
  </StrictMode>,
)

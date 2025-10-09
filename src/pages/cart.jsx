import { useContext } from 'react';

import { CartContext } from '../contexts/cartContext';
import CartProdCard from '../components/cartProdCard';

export default function Cart() {
    const { cartProducts } = useContext(CartContext);
    console.log(cartProducts);

    return (
        <div className='content' 
            style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '0 5%',
            }}
        >
            <h2 style={{textAlign: 'left'}}>Shopping Cart</h2>
            {cartProducts.length === 0 ? (
                <div>Your cart is empty.</div>
            ) : (
                <div className='cart-items' 
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    {cartProducts.map((cartProd) => (
                        <CartProdCard key={cartProd.id} cartProd={cartProd}/>
                    ))}
                </div>
            )}
        </div>
    )
}
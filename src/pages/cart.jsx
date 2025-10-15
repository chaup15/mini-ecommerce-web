import { use, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../contexts/cartContext';
import CartProdCard from '../components/cartProdCard';
import { Card, Button } from 'antd';
import { AuthContext } from '../contexts/authContext';

export default function Cart() {
    const { cartProducts } = useContext(CartContext);
    const total = cartProducts.reduce((sum, prod) => sum + (prod.price * prod.quantity), 0);
    console.log(cartProducts);

    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const onClickCheckout = () => {
        console.log(token);
        if(token) {
            navigate('/checkout');
        }
        else {
            navigate('/signin');
        }
    }

    return (
        <div className='content' 
            style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '0 5%',
            }}
        >
            <h2 style={{textAlign: 'left'}}>Shopping Cart</h2>
            <div className='cart-content'
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between'
                }}
            >
            {cartProducts.length === 0 ? (
                <div style={{width: '70%', alignSelf: 'center'}}>Your cart is empty.</div>
            ) : (
                <div className='cart-items' 
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        width: '68%'
                    }}
                >
                    {cartProducts.map((cartProd) => (
                        <CartProdCard key={cartProd.id} cartProd={cartProd}/>
                    ))}
                </div>
            )}
                <div className='cart-summary'
                    style={{
                        width: '30%',
                    }}    
                >
                    <Card>
                        <div className='total-price-container'
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <h3>Total:</h3>
                            <h3>${total.toFixed(2)}</h3>
                        </div>
                    </Card>
                    <Button 
                        block 
                        variant='solid' 
                        color='default'
                        onClick={onClickCheckout}
                        style={{
                            marginTop: 20,
                            height: 50
                        }}
                    >Proceed to Checkout</Button>
                </div>
            </div>
        </div>
    )
}
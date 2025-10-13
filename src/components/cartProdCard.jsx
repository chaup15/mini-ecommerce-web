import { Card, InputNumber, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';

import { CartContext } from '../contexts/cartContext'

export default function CartProdCard({cartProd}) {
    const { updateQuantity, removeFromCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(cartProd.quantity);
    const totalProductPrice =  cartProd.price * quantity;

    const handleUpdateQuantity = (id, newQuantity) => {
        if(newQuantity == 0) {
            alert('The minimum quantity allowed for purchase is 1');
            return;
        }
        setQuantity(newQuantity);
        updateQuantity(id, newQuantity);
    }

    // Makes sure quantity displayed reflect quantity in database
    useEffect(() => {
        setQuantity(cartProd.quantity);
      }, [cartProd.quantity]);

    return (
        // Individual cart item card with image, title, price, and quantity
        <Card>
            <div className="cart-item-card" style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '4%',
            }}>
                <div className="image-container" 
                    style={{
                        width: '100px',
                        height: '100px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                    }}>
                    <img src={cartProd.image} alt={cartProd.title} 
                        style={{
                            width: '100%', 
                            height: '100%',
                            objectFit: 'contain'
                        }}/>
                </div>
                <div className="cart-item-content" 
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <div className='product-title-and-quantity'>
                        <Link to={`/products/${cartProd.id}`} style={{ color: 'inherit' }}>
                            <h4 className="title"
                                style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',   
                                    textAlign: 'left', 
                                }}>
                            {cartProd.title}</h4>
                        </Link>
                        <div className='buttons' style={{
                            display: 'flex',
                            gap: 20,
                            alignItems: 'center'
                        }}>
                            <div className='quantity-button'
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                }}
                            >
                                <Button
                                    size="middle"
                                    disabled={quantity <= 1} //disable button when quantity is 1
                                    onClick={() => handleUpdateQuantity(cartProd.id, quantity - 1)}
                                >-</Button>
                                <InputNumber 
                                    min={1} 
                                    value={quantity}
                                    onKeyDown={(e) => {
                                        // Prevent non-digit keys from being pressed
                                        // Allow backspace to delete input and arrow keys to change value more easily
                                        if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                                        e.preventDefault();
                                        }
                                    }}
                                    onPressEnter={(e) => handleUpdateQuantity(cartProd.id, parseInt(e.target.value))} 
                                    controls={false} 
                                    style={{ width: '40px', textAlign: 'center', display: 'flex', alignItems: 'center' }}
                                />
                                <Button
                                    size="middle"
                                    onClick={() => handleUpdateQuantity(cartProd.id, quantity + 1)}
                                >+</Button>
                            </div>
                            <div className='remove-button'>
                                <button 
                                    style={{
                                        backgroundColor: 'white',
                                        color: 'black',
                                        textDecoration: 'underline',
                                        padding: 0
                                    }}
                                    onClick={() => removeFromCart(cartProd.id)}
                                >Remove</button>
                            </div>
                    </div>    
                    </div>
                    <div className='price-container'
                        style={{
                            alignSelf: 'center'
                        }}
                    >
                        <h3 className="price">${totalProductPrice.toFixed(2)}</h3>
                    </div>
                </div>
            </div>
        </Card>
    )   
}
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';

import Rating from 'react-rating';
import starLogo from '../assets/star.svg';
import { InputNumber, Button } from 'antd';
import { CartContext } from '../contexts/cartContext';
import { useNavigate } from 'react-router-dom';

export default function ProductDetails() {
    const { id } = useParams();
    const [ productDetails, setProductDetails] = useState({});
    const [ quantity, setQuantity ] = useState(1);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleAddToCart = (id, quantity) => {
        addToCart(id, quantity);
        navigate('/cart');
    }

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                if(!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                else{
                    const data = await response.json();
                    console.log(data);
                    setProductDetails(data);
                }
            } catch (err) {
                throw new Error('Failed to fetch product details');
            }
        }

        fetchProductDetails();

    }, [id]);

    if(!productDetails.id) {
        return <div>Loading...</div>;
    }

    const starStyle = {
        width: '16px',
        height: '16px',
        marginRight: '2px',
    };

    return (
        <div className='content' 
            style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '0 5%',
            }}
        >
            <div className='product-image' 
                style={{
                    minWidth: '25%',
                    maxHeight: '400px',
                    marginRight: '10%'
                }}>
               <img src={productDetails.image} alt={productDetails.title} 
                    style={{
                        maxWidth: '100%',
                    }}
                /> 
            </div>
            <div className='product-details'
                style={{
                    textAlign: 'left',
                }}>
                <h3>{productDetails.title}</h3>
                <p>{productDetails.description}</p>
                <h4>${productDetails.price.toFixed(2)}</h4>
                <p>
                <Rating
                    readonly
                    initialRating={productDetails.rating?.rate || 0}
                    emptySymbol={<img src={starLogo} style={{...starStyle, filter: 'grayscale(100%)'}} />}
                    fullSymbol={<img src={starLogo} style={{...starStyle}} />}
                    fractions={2}
                />  {productDetails.rating?.rate || 0} | {productDetails.rating?.count || 0} reviews
                </p>
                <div className='button-container'
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 20
                    }}
                >
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
                            onClick={() => setQuantity(quantity - 1)}
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
                            onPressEnter={(e) => setQuantity(parseInt(e.target.value))} 
                            controls={false} 
                            style={{ width: '40px', textAlign: 'center', display: 'flex', alignItems: 'center' }}
                        />
                        <Button
                            size="middle"
                            onClick={() => setQuantity(quantity + 1)}
                        >+</Button>
                    </div>
                    <div className='add-to-cart-button'>
                        <Button
                            color="default" 
                            variant="solid"
                            style={{
                                width: 200,
                                height: 50
                            }}
                            onClick={() => handleAddToCart(productDetails.id, quantity)}
                        >Add to Cart</Button>
                    </div>
                </div>
                
            </div>    
        </div>
        
    )
}
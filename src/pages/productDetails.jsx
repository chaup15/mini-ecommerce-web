import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Rating from 'react-rating';
import starLogo from '../assets/star.svg';

export default function ProductDetails() {
    const { id } = useParams();
    const [ productDetails, setProductDetails] = useState({});

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
            </div>    
        </div>
        
    )
}
import { useContext } from 'react';
import { ProductContext } from '../contexts/productContext';
import ProductCard from '../components/productCard';

export default function Homepage() {
    const { products } = useContext(ProductContext);

    return (
        <div className='homepage'>
            <h1>Our Products</h1>
            <div 
                className='product-grid'
                style={{
                    display: 'flex', 
                    flexWrap: 'wrap',
                    gap: '16px',
                    justifyContent: 'center'
                }}>
                {products.map(product => (
                    <ProductCard key={product.id} product={product}/>        
                ))}
            </div>
        </div>
    )
}
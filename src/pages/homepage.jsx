import { useContext, useState } from 'react';
import { ProductContext } from '../contexts/productContext';
import ProductCard from '../components/productCard';

import { Checkbox } from "antd";
export default function Homepage() {
    const { products, category } = useContext(ProductContext);
    const [ categoryChecked, setCategoryChecked] = useState([]);
    
    // Handles category filter change
    const onChange = (e) => {
        setCategoryChecked(e);
    };

    return (
        <div className='homepage'>
            <h1>Our Products</h1>
            <div style={{
                display: 'flex',
                gap: '30px',
                justifyContent: 'space-between'
            }}>
                <div className='categoryFilter'>
                    <Checkbox.Group options={category} value={categoryChecked} onChange={onChange} 
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}/>
                </div>
                <div 
                    className='product-grid'
                    style={{
                        display: 'flex', 
                        flexWrap: 'wrap',
                        gap: '16px',
                        justifyContent: 'center'
                    }}>
                    {products.filter(product => 
                        categoryChecked.length === 0 || categoryChecked.includes(product.category)
                    ).map(product => (
                        <ProductCard key={product.id} product={product}/>        
                    ))}
                </div>
            </div>
            
        </div>
    )
}
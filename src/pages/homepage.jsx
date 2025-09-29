import { useContext, useState } from 'react';
import { ProductContext } from '../contexts/productContext';
import ProductCard from '../components/productCard';

import { Select, Checkbox } from "antd";
export default function Homepage() {
    const { products, error, category, setProducts } = useContext(ProductContext);
    const [ categoryChecked, setCategoryChecked] = useState([]);
    
    if(error) {
        return <div>Error: {error}</div>;
    };

    if(products.length === 0) {
        return <div>Loading...</div>;
    };

    // Handles category filter change
    const categoryFilter = (e) => {
        setCategoryChecked(e);
    };

    // Sort products by price
    const sortPrice = (sortVal) => {
        let sortedProducts = [...products];
        if(sortVal === 'asc') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if(sortVal === 'desc') {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else {
            sortedProducts.sort((a, b) => a.id - b.id); //default by id
        }
        setProducts(sortedProducts);
    };
    
    return (
        <div className='homepage'>
            <h1>Our Products</h1>
            <div className='sort-container' 
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: '20px'
                }}>
                <Select
                    defaultValue="Default"
                    style={{
                        width: 100,
                    }}
                    onChange={sortPrice}
                    options={[
                        { value: 'default', label: 'Default' },
                        { value: 'asc', label: 'Price Low to High' },
                        { value: 'desc', label: 'Price High to Low' },
                    ]}
                />
            </div>
            
            <div style={{
                display: 'flex',
                gap: '30px',
                justifyContent: 'space-between'
            }}>
                <div className='categoryFilter'>
                    <Checkbox.Group options={category} value={categoryChecked} onChange={categoryFilter} 
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
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../contexts/productContext';
import ProductCard from '../components/productCard';

import { Select, Checkbox, AutoComplete, Pagination } from "antd";
export default function Homepage() {
    const { products, error, category, setProducts } = useContext(ProductContext);
    const [ categoryChecked, setCategoryChecked] = useState([]);
    const [ searchValue, setSearchValue ] = useState("");
    const [ currentPage, setCurrentPage] = useState(1);

    const productTitles = products.map(product => product.title);
    const pageSize = 8;

    const filteredProducts = products
    .filter(product => product.title.toLowerCase().includes(searchValue.toLowerCase()) || searchValue === "")
    .filter(product => categoryChecked.length === 0 || categoryChecked.includes(product.category));

    useEffect(() => {
        // Reset to first page when filter or search changes
        setCurrentPage(1); 
    }, [searchValue, categoryChecked]);

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

    // Handles product search
    const searchProduct = (searchVal) => {
        setSearchValue(searchVal);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    
    return (
        <div className='homepage' 
            style={{
                width: '100%',
                height: '100%'
            }}>
            <div className='header'
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                <h1>Our Products</h1>
                <AutoComplete
                    style={{ 
                        width: 500, 
                        height: 40,
                        textAlign: 'left',
                        justifySelf: 'center',
                        alignSelf: 'center',
                        margin: '0 0 0 60px'
                    }}
                    options={productTitles.map(title => ({ value: title }))}
                    onChange={searchProduct}
                    placeholder="Search for a product"
                    filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
            </div>
            <div className='sort-container' 
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: '20px'
                }}>
                <Select
                    defaultValue="Default"
                    style={{
                        width: 150,
                    }}
                    onChange={sortPrice}
                    options={[
                        { value: 'default', label: 'Default' },
                        { value: 'asc', label: 'Price Low to High' },
                        { value: 'desc', label: 'Price High to Low' },
                    ]}
                />
            </div>
            
            <div className='main' style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
            }}>
                <div className='category-filter'>
                    <Checkbox.Group options={category} value={categoryChecked} onChange={categoryFilter} 
                        style={{
                            display: 'flex',
                            width: '150px',
                            flexDirection: 'column',
                        }}/>
                </div>
                <div 
                    className='product-grid'
                    style={{
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gridGap: '15px',
                        flex: 1, // fill available space
                        width: '100%',
                    }}>

                    {filteredProducts.slice(
                        (currentPage - 1) * pageSize, currentPage * pageSize
                    ).map(product => (
                        <Link to={`/products/${product.id}`}><ProductCard key={product.id} product={product}/></Link>     
                    ))}
                </div>
            </div>
            <div className='pagination'
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px'
                }}>
                <Pagination 
                    current={currentPage} 
                    total={filteredProducts.length} 
                    pageSize={pageSize} 
                    onChange={handlePageChange}
                />
            </div>
        </div>
    )
}
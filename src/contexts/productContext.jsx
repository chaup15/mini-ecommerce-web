import { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch products by making API call to FakeStore API
                const response = await fetch('https://fakestoreapi.com/products');
                if(!response.ok) {
                    setError('Failed to fetch product');
                }
                else{
                    const data = await response.json();
                    // console.log(data);
                    setProducts(data);
                    /*  Example product structure:
                        category: "men's clothing"
                        description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
                        id: 1
                        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png"
                        price: 109.95
                        rating: {rate: 3.9, count: 120}
                        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
                    */
                }
            } catch (err) {
                setError('Failed to fetch products');
            }
        };

        fetchProducts();

        const fetchCategory = async () => {
            try {
                // Fetch product categories
                const response = await fetch('https://fakestoreapi.com/products/categories');
                if(!response.ok) {
                    setError('Failed to fetch categories');
                }
                else{
                    const data = await response.json();
                    setCategory(data);
                }
            } catch (err) {
                setError('Failed to fetch categories');
            }
        };

        fetchCategory();

    }, []);

    return (
        <ProductContext.Provider value={{ products, error, category, searchValue, setProducts, setError, setCategory, setSearchValue }}>
            {children}
        </ProductContext.Provider>
    );
}
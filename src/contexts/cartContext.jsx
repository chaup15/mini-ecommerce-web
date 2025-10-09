import { createContext, useState, useEffect, useContext } from 'react';
import { ProductContext } from './productContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const { products } = useContext(ProductContext);
    const [cart, setCart] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);

    const fetchCart = async () => {
        try {
            //Fetch single cart using userId 1 as example
            const response = await fetch(`https://fakestoreapi.com/carts/1`);
            if(!response.ok) {
                throw new Error('Failed to fetch cart');
            } else {
                const data = await response.json();
                /*  Cart structure example
                    date: "2020-03-02T00:00:00.000Z"
                    id: 1
                    products: Array(3)
                        0: {productId: 1, quantity: 4}
                        1: {productId: 2, quantity: 1}
                        2: {productId: 3, quantity: 6}
                        length: 3
                    userId: 1
                */
                setCart(data);
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    // Get product details from products data using product id  
    // since cart only contain product id and quantity
    // Function copies product details and add quantity info
    const getProdInCart = () => {
        if(cart.products && products.length > 0 ) {
            const cartProducts = cart.products.map(item => {
                const productDetails = products.find(product => product.id === item.productId);
                return {
                    ...productDetails,
                    quantity: item.quantity
                };
            });
            setCartProducts(cartProducts);
        }
    }

    const updateQuantity = async (id, newQuantity) => {
        try{
            const updatedCart = {
                ...cart,
                products: cart.products.map(item => 
                    item.productId === id ? {...item, quantity: newQuantity} : item 
                )
            }
            const response = await fetch(`https://fakestoreapi.com/carts/1`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCart)
            })

            if(!response.ok) {
                throw new Error ('Failed to update cart quantity');
            }
            else {
                const data = await response.json();
                setCart(data);
            }
        } catch(err) {
            throw new Error (err);
        }
    }

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        getProdInCart();
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, cartProducts, setCart, setCartProducts, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
}
import { createContext, useState, useEffect, useContext } from 'react';
import { ProductContext } from './productContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const { products } = useContext(ProductContext);
    const [cart, setCart] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);

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

    const updateQuantity = (id, newQuantity) => {
        const updatedCart = {
            ...cart,
            products: cart.products.map(item => 
                item.productId === id ? {...item, quantity: newQuantity} : item 
            )
        }
        setCart(updatedCart);
    }

    // Add new item to cart if product does not already exist in cart
    // Otherwise, update quantity in cart if product already added to cart
    const addToCart = (id, quantity) => {
        if(cart.length === 0) {
            const newCart = {
                products: [{productId: id, quantity: quantity}],
            }
            setCart(newCart);
        }
        else{
            const existingProduct = cart?.products ? cart.products.findIndex(item => item.productId === id) : -1;
        
            let updatedCart;
            if(existingProduct !== -1){ //if product exists, add old and new quantity
                updatedCart = {
                    ...cart,
                    products: cart.products.map(item => 
                        item.productId === id ? {...item, quantity: item.quantity + quantity} : item 
                    )
                }
            }
            else{
                updatedCart = {
                    ...cart,
                    products: [...cart.products, { productId: id, quantity: quantity }]
                }
            }
            setCart(updatedCart);
        }
    }

    const removeFromCart = (id) => {
        const updatedCart = {
            ...cart,
            products: cart.products.filter(item => item.productId !== id)
        }

        setCart(updatedCart);
    }

    useEffect(() => {
        const localCart = localStorage.getItem('cart');
        if(localCart !== 'undefined') {
            setCart(JSON.parse(localCart));
        }
    }, []);

    useEffect(() => {
        if(cart?.products){
            localStorage.setItem('cart', JSON.stringify(cart));
            getProdInCart();
        }
    }, [cart, products]);

    return (
        <CartContext.Provider value={{ cart, cartProducts, setCart, setCartProducts, addToCart, updateQuantity, removeFromCart  }}>
            {children}
        </CartContext.Provider>
    );
}
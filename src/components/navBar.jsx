import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { ProductContext } from '../contexts/productContext'
import { CartContext } from '../contexts/cartContext';
import { Input, Badge, Avatar } from 'antd';
import cartLogo from '../assets/cart.svg';


export default function NavBar() {
    const { setSearchValue } = useContext(ProductContext);
    const { cartProducts } = useContext(CartContext);
    const [ searchInput, setSearchInput ] = useState("");
    const navigate = useNavigate();

    return (
        <div className='navbar' style = {{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 5%',
            justifyContent: 'space-between'
        }}>
            <div className='left'
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
            <Link to={`/`} reloadDocument><h1>Our Products</h1></Link>
            <Input.Search 
                placeholder="Search for a product..." 
                value={searchInput}
                allowClear 
                style={{ width: 400 , margin: '0 0 0 60px'}} 
                onChange={(e) => setSearchInput(e.target.value)}
                onSearch={(searchValue) => {
                    if(searchValue === "") {
                        return; // Prevent function from being triggered when click the clear button
                    }

                    setSearchValue(searchValue);
                    setSearchInput(""); // Clear input after search
                    navigate('/'); // Navigate to homepage to show search results
                }}
            />
            </div>
            <div className='buttons'>
                <Link to={`cart`} reloadDocument>
                    <Badge count={cartProducts.length}>
                        <Avatar src={cartLogo} shape="round" size="middle" />
                    </Badge>
                </Link>
            </div>
            
        </div>
    )
}
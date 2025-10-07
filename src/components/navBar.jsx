import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { ProductContext } from '../contexts/productContext'
import { Input } from 'antd';


export default function NavBar() {
    const { setSearchValue } = useContext(ProductContext);
    const [ searchInput, setSearchInput ] = useState("");
    const navigate = useNavigate();

    return (
        <div className='navbar' style = {{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 5%',
            
        }}>
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
    )
}
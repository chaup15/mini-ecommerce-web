import { Card } from "antd";

function ProductCard({product}) {
    return (
        // Individual product card with image, title, category, and price
        <Card style={{width: '20%', maxHeight: '400px'}}>
            <div className="product-card">
                <img src={product.image} alt={product.title} 
                style={{
                    width: '100%', 
                    height: '200px',
                    objectFit: 'contain'
                }}/>
                <div>
                    <h4 className="title"
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',    
                        }}>
                    {product.title}</h4>
                    <p className="category">{product.category}</p>
                    <p className="price">${product.price}</p>
                </div>
            </div>
        </Card>
    )   
}

export default ProductCard;
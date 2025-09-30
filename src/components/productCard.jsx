import { Card } from "antd";

function ProductCard({product}) {
    return (
        // Individual product card with image, title, category, and price
        <Card style={{
            flex: '1 1 250px', // card grow and shrink according to window size
            width: 'auto',
            height: 'auto'
        }}>
            <div className="product-card">
                <div className="image-container" 
                    style={{
                        height: '300px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                    }}>
                    <img src={product.image} alt={product.title} 
                        style={{
                            width: '100%', 
                            height: '100%',
                            objectFit: 'contain'
                        }}/>
                </div>
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
                    <p className="price">${product.price.toFixed(2)}</p>
                </div>
            </div>
        </Card>
    )   
}

export default ProductCard;
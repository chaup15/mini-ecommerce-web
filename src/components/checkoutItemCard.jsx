import { Card } from 'antd';

export default function CheckoutItemCard({cartProd}) {
    return (
        <Card variant="borderless">
            <div className="item-card" style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '4%',
                alignItems: 'center'
            }}>
                <div className="image-container" 
                    style={{
                        width: '100px',
                        height: '100px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                    }}>
                    <img src={cartProd.image} alt={cartProd.title} 
                        style={{
                            width: '100%', 
                            height: '100%',
                            objectFit: 'contain'
                        }}/>
                </div>
                <div className="item-content" 
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'left'
                    }}
                >
                    <h4 className="title"
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',   
                            textAlign: 'left', 
                            margin: 0
                        }}>
                    {cartProd.title}</h4>

                    <div className='quantity'
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}
                    >Quantity: {cartProd.quantity}</div>
                    <h3 className="price" 
                        style={{
                            margin: '7px 0px 0px 0px'
                        }}
                    >${(cartProd.quantity*cartProd.price).toFixed(2)}</h3>
                </div>
            </div>
        </Card>
    )
}
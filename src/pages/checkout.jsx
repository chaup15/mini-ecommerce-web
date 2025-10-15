import { Button, Form, Input, Card, Modal } from "antd";
import { useState, useContext, useEffect } from "react";
import { CartContext } from '../contexts/cartContext';
import CheckoutItemCard from "../components/checkoutItemCard";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const [canCheckout, setCanCheckout] = useState(false); // Flag to enable and disable checkout button
    const [checkoutComplete, setCheckoutComplete] = useState(false); 
    const { cartProducts, cartCheckout } = useContext(CartContext);
    const total = cartProducts.reduce((sum, prod) => sum + (prod.price * prod.quantity), 0);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpenModal(false);
        navigate('/');
    };

    const handleCheckout = async () => {
        const cartId = await cartCheckout();
        if(cartId !== null) {
            setOpenModal(true);
            setCheckoutComplete(true);
            setCanCheckout(false);
        }
    }

    useEffect(() => {
        // In case user refreshes page after successfully checking out
        // Still redirect to homepage since cart is empty
        if(cartProducts.length === 0 && !checkoutComplete) {
            navigate('/');
        }
    }, [cartProducts, checkoutComplete])

    return (
        <div className='content' 
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: '0 5%',
            }}
        >   
            <div className="checkout-form" style={{width: '60%'}}
            > 
                <Card>
                    <h2 style={{textAlign: 'left'}}>Delivery Address</h2>
                    <Form
                        name="delivery-info"
                        initialValues={{ remember: true }}
                        validateMessages={{ required: 'Required', types: { email: 'Invalid email' } }}
                        onFinish={() => setCanCheckout(true)} //Allow checkout button only after required info are filled
                    >   
                        <Form.Item name={['user', 'firstname']} rules={[{ required: true }]}>
                            <Input placeholder="First Name*"/>
                        </Form.Item>
                        <Form.Item name={['user', 'lastname']} rules={[{ required: true }]}>
                            <Input placeholder="Last Name*"/>
                        </Form.Item>
                        <Form.Item name={['user', 'email']} rules={[{ type: 'email', required: true  }]} validateTrigger="onSubmit">
                            <Input placeholder="Email*"/>
                        </Form.Item>
                        <Form.Item name={['address', 'street']} rules={[{ required: true }]}>
                            <Input placeholder="Street*" />
                        </Form.Item>
                        <Form.Item name={['address', 'city']} rules={[{ required: true }]}>
                            <Input  placeholder="City*" />
                        </Form.Item>
                        <Form.Item name={['address', 'country']} rules={[{ required: true }]}>
                            <Input  placeholder="Country*" />
                        </Form.Item>
                        <Form.Item>
                            <Button block type="primary" htmlType="submit" style={{ height: 50 }}>
                                Continue to Payment
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
            <div className='checkout-summary' style={{ width: '38%', textAlign: 'left' }}>
                <h2>Order Summary ({cartProducts.length})</h2>
                {cartProducts.map((cartProd) => (
                    <CheckoutItemCard key={cartProd.id} cartProd={cartProd}/>
                ))}
                <div className='total-price-container'
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <h2>Total:</h2>
                    <h2>${total.toFixed(2)}</h2>
                </div>
                <Button 
                    block
                    style={{height: 50}}
                    disabled={!canCheckout}
                    onClick={handleCheckout}
                >Check Out</Button>
            </div>
            <Modal
                closable={false}
                maskClosable={false}
                open={openModal}
                afterClose={handleClose}
                centered={true}
                style={{textAlign: 'center'}}
                footer={[
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button key="submit" type="primary" onClick={handleClose} style={{textAlign: 'center'}}>
                            Return Home
                        </Button>
                    </div>
                ]}
            >
                <p>Thank you! Your order has been successfully placed. 🎉</p>   
            </Modal>
        </div>
    );
}
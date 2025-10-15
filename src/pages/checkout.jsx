import { Button, Form, Input, Card } from "antd";

export default function Checkout() {
    
    return (
        <div className='content' 
            style={{
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
                        validateMessages={{ required: 'Required' }}
                    >   
                        <Form.Item name={['user', 'firstname']} rules={[{ required: true }]}>
                            <Input placeholder="First Name*"/>
                        </Form.Item>
                        <Form.Item name={['user', 'lastname']} rules={[{ required: true }]}>
                            <Input placeholder="Last Name*"/>
                        </Form.Item>
                        <Form.Item name={['user', 'email']} rules={[{ type: 'email', required: true  }]}>
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
                            <Button block type="primary" htmlType="submit">
                                Continue to Payment
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
            <div className="summary">

            </div>
        </div>
    );
}
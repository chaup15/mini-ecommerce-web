import { Button, Checkbox, Form, Input, Flex } from 'antd';

export default function SignIn() {
    const onFinish = values => {
        console.log('Received values of form: ', values);
    }

    return (
        <div className='signin-form'
            style={{ 
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <h2>Sign In</h2>
            <Form
                name="signin"
                initialValues={{ remember: true }}
                style={{ width: 360, alignSelf: 'center' }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please enter your username' }]}
                >
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password' }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Flex>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Flex>
                </Form.Item>
                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Sign In
                    </Button>
                </Form.Item>
            </Form>
        </div>
        
    );
}
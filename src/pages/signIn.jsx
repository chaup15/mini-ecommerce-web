import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { AuthContext } from '../contexts/authContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    // Demo account to test
    const demoData = { username: 'donero', password: 'ewedon' };
    
    const handleSignIn = async(values) => {
        console.log('Received values of form: ', values);
        
        try{
            const response = await fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username: values.username, password: values.password})
            })
            if(!response.ok) {
                alert('Failed to sign in');
            }
            else {
                const data = await response.json();
                setToken(data);
                localStorage.setItem('token', JSON.stringify(data));
                navigate('/');
            }
        } catch(err) {
            console.error('Failed to sign in');
        }
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
                onFinish={handleSignIn}
            >
                <Form.Item
                    initialValue={demoData.username}
                    name="username"
                    rules={[{ required: true, message: 'Please enter your username' }]}
                >
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item
                    initialValue={demoData.password}
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
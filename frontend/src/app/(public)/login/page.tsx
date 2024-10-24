"use client"
import { useAuth } from '@/components/hooks/useContext';
import type { FormProps } from 'antd';
import { Button, Form, Input, Layout, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type FieldType = {
  email?: string;
  password?: string;
};

const Login: React.FC = () => {
  const route = useRouter();
  const {login} = useAuth();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try{
      const response = await axios.post('http://localhost:3001/auth',values)

      const token = response.data.accessToken;
      const userInfo = {  accountType : response.data.accountType }; 
      login(token);
      message.success('Đăng nhập thành công!');
      switch (userInfo.accountType) {
        case 'client':
          route.push('/client');
          break;
        case 'provider':
          route.push('/provider');
          break;
        case 'admin':
          route.push('/admin');
          break;
        default:
          route.push('/');
      }
    }catch(error){
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          message.error('Tên đăng nhập hoặc mật khẩu không chính xác!');
        } else {
          message.error('Có lỗi xảy ra. Vui lòng thử lại!');
        }
      } else {
        message.error('Có lỗi xảy ra. Vui lòng thử lại!');
      }
      console.log("Error", error);
    }
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return(
    <Layout  style={{ minHeight: '100vh', backgroundColor: '#f0f2f5',justifyContent:'center', alignItems:'center' }}>
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 , alignItems:'center',justifyContent:'center'}}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
      
    </Form.Item>
  </Form>
  </Layout>
  )
};

export default Login;
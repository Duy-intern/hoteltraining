"use client"
import Register from '@/app/components/auth/Register';
import { Layout } from 'antd';

const { Content } = Layout;

const RegisterPage = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Register />
      </Content>
    </Layout>
  );
};

export default RegisterPage;

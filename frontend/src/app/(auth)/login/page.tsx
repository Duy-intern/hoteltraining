import Login from '@/app/components/auth/Login';
import Layout, { Content } from 'antd/es/layout/layout';

const LoginPage = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Login />
      </Content>
    </Layout>
  );
};

export default LoginPage;

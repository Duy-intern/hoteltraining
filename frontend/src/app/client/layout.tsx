'use client'
import React, { ReactNode } from 'react'; 
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { AuthProvider } from '@/components/hooks/useContext';

const { Header, Sider, Content, Footer } = Layout;

interface MyLayoutProps {
  children: ReactNode; 
}

const items = [
    { key: '1', label: <Link href="/client">Hotel</Link> },
    { key: '2', label: <Link href="/client">Hotel List</Link> },
    { key: '3', label: <Link href="/client">Booked Hotel</Link> },
  ];
const MyLayout: React.FC<MyLayoutProps> = ({ children }) => {
  return (
    
    <Layout style={{ minHeight: '100vh' }}>
         <AuthProvider>
      
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
          items={items}
        >
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-background" style={{ padding: 0 }}>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            {children} 
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Bản Quyền © 2024</Footer>
      </Layout>
      
    </AuthProvider>
    </Layout>
  );
};

export default MyLayout;

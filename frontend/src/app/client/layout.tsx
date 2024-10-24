'use client'
import React, { ReactNode } from 'react'; 
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { AuthProvider } from '@/components/hooks/useContext';

const {  Sider, Content } = Layout;

interface MyLayoutProps {
  children: ReactNode; 
}

const items = [
    { key: '1', label: <Link href="/client">Hotel List</Link> },
    { key: '2', label: <Link href="/client/booking">Booked Hotel</Link> },
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
      <Content>{children}</Content>
      
    </AuthProvider>
    </Layout>
  );
};

export default MyLayout;

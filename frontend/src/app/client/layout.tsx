'use client'
import React, { ReactNode } from 'react'; 
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { AuthProvider } from '@/components/hooks/useContext';
import { usePathname } from 'next/navigation';

const {  Sider, Content } = Layout;

interface MyLayoutProps {
  children: ReactNode; 
}

const items = [
    { key: '/client', label: <Link href="/client">Hotel List</Link> },
    { key: '/client/booking', label: <Link href="/client/booking">Booked Hotel</Link> },
  ];
const MyLayout: React.FC<MyLayoutProps> = ({ children }) => {
  const pathname = usePathname(); 

   return (
    
    <Layout style={{ minHeight: '100vh' }}>
         <AuthProvider>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
         selectedKeys={[pathname]}
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

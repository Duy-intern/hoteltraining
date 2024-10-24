'use client'
import React, { ReactNode } from 'react'; 
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Sider, Content } = Layout;

interface MyLayoutProps {
  children: ReactNode; 
}

const items = [
  { key: '/provider', label: <Link href="/provider">Hotel List</Link> },
  { key: '/provider/booked-hotel', label: <Link href="/provider/booked-hotel">Booked Hotel</Link> },
];
const MyLayout: React.FC<MyLayoutProps> = ({ children }) => {
  const pathname = usePathname(); 
  return (
    
    <Layout style={{ minHeight: '100vh' }}> 
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          style={{ height: '100%', borderRight: 0 }}
          items={items}
        >
        </Menu>
      </Sider>
    <Content style={{padding: '5px'}}>{children}</Content>
    </Layout>
  );
};

export default MyLayout;


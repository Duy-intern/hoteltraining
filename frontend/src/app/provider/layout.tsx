'use client'
import React, { ReactNode } from 'react'; 
import { Layout, Menu } from 'antd';
import Link from 'next/link';

const { Sider, Content } = Layout;

interface MyLayoutProps {
  children: ReactNode; 
}

const items = [
  { key: '1', label: <Link href="/provider">Create Hotel</Link> },
  { key: '2', label: <Link href="/provider/list-hotel">Hotel List</Link> },
  { key: '3', label: <Link href="/provider/booked-hotel">Booked Hotel</Link> },
];
const MyLayout: React.FC<MyLayoutProps> = ({ children }) => {
  return (
    
    <Layout style={{ minHeight: '100vh' }}> 
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
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


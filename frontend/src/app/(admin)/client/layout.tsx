'use client'
import React, { ReactNode } from 'react'; 
import { Layout, Menu } from 'antd';
import Link from 'next/link';
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
    <Layout > 
      <Sider style={{top:'64px',bottom: '0px' ,position:'fixed'}}>
        <Menu
          mode="inline"
         selectedKeys={[pathname]}
          style={{ height: '100%'}}
          items={items}
        >
        </Menu>
      </Sider>
      <Content style={{marginTop:'64px', marginLeft:'200px', padding:'5px',height:'calc(100vh - 64px)',overflowY:'auto'}}>
        {children}</Content>
    </Layout>
  );
};

export default MyLayout;

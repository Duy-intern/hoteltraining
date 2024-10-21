"use client"
import React from 'react';
import { Breadcrumb, Image, Layout, Menu, theme } from 'antd';

import LoginButton from './components/loginbutton';
import RegisterButton from './components/registerbutton';
import Link from 'antd/es/typography/Link';



const { Header, Content, Footer } = Layout;

const items = [
  { key: '1', label: <Link href="/">Home</Link> },
  { key: '2', label: <Link href="/about">About Us</Link> },
  { key: '3', label: <Link href="/hotel">Hotel</Link> },
  { key: '4', label: <Link href="/contact">Contact</Link> },
  { key: '5', label: <Link href="/support">Support</Link> },
];

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
        <LoginButton/>
        <RegisterButton/>     
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{ 
            background: colorBgContainer,
          
            padding: 30,
            borderRadius: borderRadiusLG,
          }}
        >
           <Image 
           alt="example"
           src="https://images7.alphacoders.com/362/thumb-1920-362619.jpg"
           style={{ width: '100%', height: 'auto', objectFit: 'contain' }}/>
           
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
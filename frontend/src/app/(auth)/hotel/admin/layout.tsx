// /app/provider/layout.tsx
"use client";
import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Link from 'next/link';

const { Header, Content, Footer, Sider } = Layout;

const items2 = [
  { key: '1', label: <Link href="/hotel/provider">Admin</Link> },
  { key: '2', label: <Link href="/hotel/provider/create-hotel">Create Hotel</Link> },
  { key: '3', label: <Link href="/hotel/provider/list-hotel">Hotel List</Link> },
  { key: '4', label: <Link href="/hotel/provider/booked-hotel">Booked Hotel</Link> },
];

const ProviderLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu theme="dark" mode="horizontal" style={{ flex: 1, minWidth: 0 }} />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Hotel</Breadcrumb.Item>
          <Breadcrumb.Item>Provider</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={items2}
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>{children}</Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default ProviderLayout;

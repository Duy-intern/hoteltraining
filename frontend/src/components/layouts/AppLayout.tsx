"use client"; 
import React from "react";
import { Layout, Menu, Button } from "antd";

import Link from "next/link";
import {  useAuth } from "../hooks/useContext";

const { Header, Content, Footer } = Layout;
const items = [
    { key: '1', label: <Link href="/">Home</Link> },
    { key: '2', label: <Link href="/about">About Us</Link> },
    { key: '3', label: <Link href="/hotel">Hotel</Link> },
    { key: '4', label: <Link href="/contact">Contact</Link> },
    { key: '5', label: <Link href="/support">Support</Link> },
  ];

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { token, user, logout } = useAuth(); 
  return (
    <Layout>
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: '#fff' }}>My App</div>
            <Menu
              theme="dark"
              mode="horizontal"
              items={items}
              style={{ flex: 1, minWidth: 0 }}
            />
        {!token ? (
            <div>
              <Link href="/login"><Button>Login</Button></Link>
              <Link href="/register"><Button>Register</Button></Link>
            </div>
          ) : (
            <div>
              <span style={{ color: '#fff', marginRight: '1rem' }}>{user?.email}</span>
              <Button type="primary" onClick={logout}>Logout</Button> 
            </div>
          )}
          </Header>
          <Content style={{ padding: '0 50px', marginTop: '20px' }}>
            {children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design Layout ©2024 Created by You
          </Footer>
    </Layout>
  );
};

export default AppLayout;

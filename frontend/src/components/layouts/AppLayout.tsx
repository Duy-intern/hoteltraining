"use client"; 
import React from "react";
import dynamic from 'next/dynamic';
const Button = dynamic(() => import('antd/lib/button'), { ssr: false });
const Layout = dynamic(() => import('antd/lib/layout'), { ssr: false });

import Link from "next/link";
import {  useAuth } from "../hooks/useContext";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import { Image } from "antd";



const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { token, logout } = useAuth(); 


  return (
    <Layout>
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background:'#ffffff'}}>
             <Link href={'/'}>
             <Image alt="logo" preview={false}
              src="https://i.pinimg.com/564x/c2/93/1e/c2931ef5993486e270736b38e7fe5088.jpg"
              width={70}
              style={{paddingTop:'15px'}}
              /></Link>
            
        {token ? (
            <div>
              <Button type="primary" danger onClick={logout}>Logout</Button> 
            </div>
          ) : (
            <div style={{ display:'flex',gap:'4px'}}>
              <Link href="/login"><Button>Login</Button></Link>
              <Link href="/register"><Button>Register</Button></Link>
            </div>
          )}
          
          </Header>
          <Content>
            {children}
          </Content>
          <Footer style={{ textAlign: 'center', background:'#efefef' }}>
            Ant Design Layout ©2024 Created by You
          </Footer>
    </Layout>
  );  
};

export default AppLayout;

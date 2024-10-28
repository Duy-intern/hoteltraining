"use client"; 
import React from "react";
import dynamic from 'next/dynamic';
const Button = dynamic(() => import('antd/lib/button'), { ssr: false });
const Layout = dynamic(() => import('antd/lib/layout'), { ssr: false });
const Image = dynamic(() => import('antd/lib/image'), { ssr: false });

import Link from "next/link";
import {  useAuth } from "../hooks/useContext";
import { Content, Header } from "antd/lib/layout/layout";



const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { token, logout } = useAuth(); 

  return (
    <Layout  style={{ height:'100vh',overflow:'hidden'}}>
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background:'#ffffff' ,height:'64px', position:'fixed', top:'0', left:'0', right:'0'}}>
             <Link href={'/'}>
             <Image alt="logo" preview={false}
              src="https://i.pinimg.com/564x/c2/93/1e/c2931ef5993486e270736b38e7fe5088.jpg"
              width={70}
              style={{paddingTop:'15px'}}
              /></Link>
            
        {!token ? (
          <div>
              <Link href="/login"><Button>Login</Button></Link>
              <Link href="/register"><Button>Register</Button></Link>
            </div>
          ) : (
            <div style={{ display:'flex',gap:'4px'}}>
              <Button type="primary" danger onClick={logout}>Logout</Button> 
            </div>
          )}
          
          </Header>
          <Content>
            {children}
          </Content>
     
    </Layout>
  );  
};

export default AppLayout;

"use client"
import React from 'react';
import {  Image, Layout } from 'antd';

const {  Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout>
    <Content>
           <Image 
           alt="example"
           src="https://images7.alphacoders.com/362/thumb-1920-362619.jpg"
           style={{ width: '100%', height: 'auto', objectFit: 'contain' }}/>   
      </Content>
      
    </Layout>
  );
};

export default App;
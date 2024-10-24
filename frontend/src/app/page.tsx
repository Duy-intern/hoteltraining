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
           src="https://wallpapercave.com/wp/wp1846066.jpg"
           style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>   
      </Content>
      
    </Layout>
  );
};

export default App;
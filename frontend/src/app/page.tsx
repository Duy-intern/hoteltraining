"use client"
import React from 'react';
import {  Image, Layout } from 'antd';

const {  Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout>
    <Content>
      <div style={{ display: 'flex',justifyContent:'center' }}>
      <Image 
           alt="example"
           src="https://wallpapercave.com/wp/wp1846066.jpg"
           width={'70%'}

           preview={false}
           
            />
      </div>
      </Content>
      
    </Layout>
  );
};

export default App;
"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import { Content } from 'antd/lib/layout/layout';

const Image = dynamic(() => import('antd/lib/image'), { ssr: false });
const Layout = dynamic(() => import('antd/lib/layout'), { ssr: false });



const App: React.FC = () => {
  return (
    <Layout style={{ height:'100vh',overflow:'hidden'}}>
    <Content>
      <div style={{ display: 'flex',justifyContent:'center',marginTop: '64px' }}>
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
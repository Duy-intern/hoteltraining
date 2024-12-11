"use client"; 
import React from 'react';
import dynamic from 'next/dynamic';
import Link from "next/link";
import { useAuth } from "../hooks/useContext";
import { Header } from "antd/lib/layout/layout";
import Image from "next/image";
import { Menu, MenuProps } from 'antd';
import styles from "./styles.module.scss"
import { usePathname } from 'next/navigation';


const Button = dynamic(() => import('antd/lib/button'), { ssr: false });
const Layout = dynamic(() => import('antd/lib/layout'), { ssr: false });


type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: <Link href={"/"}>Home</Link>,
    key: 'home',
  },
  {
    label: <Link href={"/room"}>Phòng</Link>,
    key: 'room',
  },  
  {
    label: 'Liên hệ',
    key: 'contact',
  },
    {
    label: 'Booking',
    key: 'bookingcart',
  },
];
const AdminLayout= () => {
  const { token, logout } = useAuth(); 
  const pathname = usePathname()

 
    return (
        <Layout style={{  height: '100vh', overflow: 'hidden', position: 'relative' }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height:'100%',
                zIndex: 0
            }}>
                <Image
                    alt="example"
                    src="/images/ImageHome.png"
                    fill
                    style={{ objectFit: 'cover', zIndex: -10 }}
                />
            </div>
            <Header style={{
                display: 'flex',
                justifyContent: 'center',
                background: 'transparent',
                height: '64px',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 10,
                gap:'500px'
            }}>
                <Link href={'/'}>
                <Image 
                src="/images/logo.png"
                alt=""
                width={256}
                height={149}/>
                </Link>
                <div style={{paddingTop:'5px', display:"flex"}}>
                  <div className={styles.customMenu}>
                <Menu className='w-full  gap-3 font-semibold text-xl '  selectedKeys={[pathname]} mode="horizontal" items={items} />
                  </div>
                     {!token ? (
                    <div style={{ display: 'flex', gap: '4px'  }}>
                        <Link href="/login"><Button style={{background:"none", border:"none",color:'white',fontSize:'20px',fontWeight:500}}>Login</Button></Link>
                        <Link href="/register"><Button style={{background:"none", border:"none",color:'white',fontSize:'20px',fontWeight:500}}>Register</Button></Link>
                    </div>
                ) : (
                    <div>
                        <Button style={{background:"none", border:"none",color:'white',fontSize:'20px',fontWeight:500}} type="primary" danger onClick={logout}>Logout</Button> 
                    </div>
                )}
                </div>
            </Header>
            <div className='w-[700px] h-[300px] mt-[316px] absolute text-white ml-[147px]'>
              <p className='text-3xl'>WELCOME TO</p>
              <p className='text-8xl'>LUXURY</p>
              <p className='text-3xl'>HOTELS</p>
              <p className='text-xl'>Book your stay and enjoy Luxury redefined at the most affordable rates.</p>
            </div>
               
        </Layout>
    
    );  
};

export default AdminLayout;

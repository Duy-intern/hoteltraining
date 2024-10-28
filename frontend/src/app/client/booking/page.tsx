  "use client";
  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import {  Layout, Table } from 'antd';

  import { useAuth } from '@/components/hooks/useContext';
import Link from 'next/link';


  interface Hotel {
    _id: string;
    hotel:{_id :string , name : string};
    user: {email: string};
    rooms: number;
    price: number;
    alreadyPaid: boolean;
  }

  const HotelList: React.FC = () => {
    const [hotels,setHotels] = useState<Hotel[]>([]);

  const {token} = useAuth();
  useEffect (() => {
      const fecthHotels = async () =>{
          if(!token) return;
        try{
          const response = await axios.get('http://localhost:3001/booking/client',{
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          })
          setHotels(response.data)
        }catch(error){
          console.log('Không lấy đc dữ liệu',error)
        }
      }
      fecthHotels();
    },[token])


  

    const columns = [
      {
        title: "Tên Khách Sạn",
        dataIndex: ["hotel", "name"], 
        key: "hotelName",
        render: (text: string) => <Link href="#">{text}</Link>,
      },
     
      {
        title: "Số Phòng",
        dataIndex: "rooms", 
        key: "rooms",
      },
      {
        title: "Giá",
        dataIndex: "price",
        key: "price",
        render: (text: number) => `${text} USD`,
      },
      {
        title: "Đã Thanh Toán",
        dataIndex: "alreadyPaid", 
        key: "alreadyPaid",
        render: (text: boolean) => (text ? "Có" : "Không"), 
      },
    
    ];
    


    return (
      <Layout >
      <Table
        dataSource={hotels}
        columns={columns}
        rowKey="_id"
        scroll={{y:530,x:'auto'}}
      />
    </Layout>

    );
  };

  export default HotelList;

"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Layout, Table } from 'antd';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/hooks/useContext';

interface Hotel {
  _id: string;
  name: string;
  ratings: number;
  address: string;
  city: string;
  price: number;
  submitStatus: string;
}

const HotelList: React.FC = () => {
  const [hotels,setHotels] = useState<Hotel[]>([]);
const route = useRouter();
const {token} = useAuth();

  useEffect (() => {
    const fecthHotels = async () =>{
        if(!token) return;
      try{
        const response = await axios.get('http://localhost:3001/hotel/client',{
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        })
        setHotels(response.data)
        console.log(HotelList)
      }catch(error){
        console.log('Không lấy đc dữ liệu',error)
      }
    }
    fecthHotels();
  },[token])

  const handleDetails = (_id : string) =>{
    route.push(`/client/${_id}`)
  }

  const columns = [
    {
      title: "Tên Khách Sạn",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a href="#">{text}</a>,
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Thành Phố",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text: number) => `${text} USD`,
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_: unknown, record: Hotel) => (
        <>
          <Button type="primary" onClick={() => handleDetails(record._id)}>Update</Button>
        </>
      ),
    },
  ];

  return (
    <Layout>

      <Table
        dataSource={hotels}
        columns={columns}
        rowKey="_id"
      />
  
    </Layout>

  );
};

export default HotelList;
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Layout, Table } from 'antd';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/hooks/useContext';
import Link from 'next/link';

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
        const response = await axios.get('http://localhost:3001/hotel/admin',{
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

  const handleEdit = (_id : string) =>{
    route.push(`/admin/${_id}`)
  }

  const handleUpdate = (_id : string) =>{
    route.push(`/admin/${_id}/details`)
  }

  const columns = [
    {
      title: "Tên Khách Sạn",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Link href="#">{text}</Link>,
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
        <div style={{display:'flex', gap:'4px'}}> 
        {record.submitStatus === 'submitted' && (
            <Button key={record._id} type="primary" onClick={() => handleEdit(record._id)}>
              Update
            </Button>
          )}
          <Button  key={record._id} type="default" onClick={() => handleUpdate(record._id)}> Details</Button>
        </div>
      ),
    },
  ];


  return (
    <Layout >
    <Table
      dataSource={hotels}
      columns={columns}
      rowKey="_id"
      scroll={{ y: 500, x: 'auto' }} 
    />
  </Layout>
  );
};

export default HotelList;

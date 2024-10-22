"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Layout, List } from 'antd';
import { useRouter } from 'next/navigation';

interface Hotel {
  _id: string;
  name: string;
  ratings: number;
  address: string;
  city: string;
  price: number;
  status: string;
}

const HotelList: React.FC = () => {
  const [hotels,setHotels] = useState<Hotel[]>([]);
const route = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  useEffect (() => {
    const fecthHotels = async () =>{
        if(!token) return;
      try{
        const response = await axios.get('http://localhost:3001/hotel/provider',{
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
    route.push(`/provider/${_id}`)
  }

  const handleUpdate = (_id : string) =>{
    route.push(`/provider/${_id}/status`)
  }


  return (
    <Layout>
    <List
    itemLayout="horizontal"
    dataSource={hotels}
    renderItem={(item) => (
      <List.Item  
       actions={[
        <Button key={item._id} type="primary" onClick={() => handleEdit(item._id)}>
          Update
        </Button>,
        <Button  key={item._id} type="primary" onClick={() => handleUpdate(item._id)}> Details</Button>
      ]}
    >
        <List.Item.Meta
          title={<a href="#">{item.name}</a>}
          description={`Địa chỉ: ${item.address}, Thành phố: ${item.city}, Giá: ${item.price} USD`} 
          />
      </List.Item>
    )}
    
  />
    </Layout>

  );
};

export default HotelList;

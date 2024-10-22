"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List } from 'antd';

interface Hotel {
  id: string;
  name: string;
  ratings: number;
  address: string;
  city: string;
  price: number;
  status: string;
}

const HotelList: React.FC = () => {
  const [hotels,setHotels] = useState<Hotel[]>([]);

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  useEffect (() => {
    const fecthHotels = async   () =>{
        if(!token) return;
      try{
        const response = await axios.get('http://localhost:3001/hotel/provider',{
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

  return (
    <List
    itemLayout="horizontal"
    dataSource={hotels}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          title={<a href="#">{item.name}</a>}
          description={`Địa chỉ: ${item.address}, Thành phố: ${item.city}, Giá: ${item.price} USD`} 
          />
      </List.Item>
    )}
  />
  );
};

export default HotelList;

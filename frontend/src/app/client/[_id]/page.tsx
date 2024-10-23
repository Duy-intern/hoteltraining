"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Layout, Typography,  } from "antd";
import {  useParams, useRouter } from "next/navigation";
import { useAuth } from "@/components/hooks/useContext";

interface Hotel {
    _id:string;
  name: string;
  ratings: number;
  address: string;
  city: string;
  price: number;
  submitStatus: string;
}

const EditHotel: React.FC = () => {
const [hotel,setHotel] = useState<Hotel | null>(null)
const route = useRouter();
  const { _id } = useParams();
const {token} = useAuth();
     useEffect(() => {
     const fetchHotel = async () => {
      if (!_id ||!token) return;
      try {
        const response = await axios.get(`http://localhost:3001/hotel/admin/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response.data)
        setHotel(response.data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchHotel();
  }, [_id,token]);


  const handleUpdate = (_id : string) =>{
    route.push(`/client/${_id}/booking`)
  }


  if (!hotel) {
    return <div>Loading</div>
  }
  return (
    <Layout>
    <h1>Chỉnh sửa khách sạn</h1>
    <Typography.Title>Chi Tiết Khách Sạn</Typography.Title>
      <Typography.Text>Tên Khách Sạn: {hotel.name}</Typography.Text>
      <Typography.Text>Đánh giá: {hotel.ratings}</Typography.Text>
      <Typography.Text>Địa chỉ: {hotel.address}</Typography.Text>
      <Typography.Text>Thành Phố: {hotel.city}</Typography.Text>
      <Typography.Text>Giá: {hotel.price}</Typography.Text>
    
        <Button style={{width:'120px'}}   key={hotel._id} type="primary" onClick={() => handleUpdate(hotel._id)}> 
          Book Hotel
        </Button>
    
        <Button style={{width:'120px'}} type="default" href="/admin" >
          Quay Lại
        </Button>
    
  </Layout>
);
};

export default EditHotel;

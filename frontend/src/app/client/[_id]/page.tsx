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
const router = useRouter();
  const { _id } = useParams();
const {token} = useAuth();
     useEffect(() => {
     const fetchHotel = async () => {
      if (!_id ||!token) return;
      try {
        const response = await axios.get(`http://localhost:3001/hotel/client/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data)
        setHotel(response.data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchHotel();
  }, [_id,token]);

const handelBack = () =>{
  router.push('/client')
}

const handelBook = async (_id :string , price:number) =>{
  try{
    const response = await axios.post(`http://localhost:3001/hotel/client/${_id}/booking`,
    {
      hotel: _id,    
      rooms : 1,   
      price: price,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data)
  router.push('/client/booking')
  }catch(error){
    console.log(error)
  }
 
}

  if (!hotel) {
    return <div>Loading</div>
  }
  return (
    <Layout style={{background: '#ffffff', padding: '5px'}} >
    <Typography.Title>Chi Tiết Khách Sạn</Typography.Title>
      <Typography.Text>Tên Khách Sạn: {hotel.name}</Typography.Text>
      <Typography.Text>Đánh giá: {hotel.ratings}</Typography.Text>
      <Typography.Text>Địa chỉ: {hotel.address}</Typography.Text>
      <Typography.Text>Thành Phố: {hotel.city}</Typography.Text>
      <Typography.Text>Giá: {hotel.price}</Typography.Text>
      <Button style={{width:'120px'}} type="primary" onClick={() => handelBook(hotel._id,hotel.price)} >
          Book Hotel
        </Button>
        <Button style={{width:'120px'}} type="default" onClick={handelBack} >
          Quay Lại
        </Button>
    
  </Layout>
);
};

export default EditHotel;

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Layout, Typography,  } from "antd";
import {  useParams, useRouter } from "next/navigation";

interface Hotel {
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
 
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchHotel = async () => {
      if (!_id ||!token) return;
      try {
        const response = await axios.get(`http://localhost:3001/hotel/provider/${_id}`, {
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

  const handleSubmit = async () => {
    if (!hotel || !token) return;
    
    try {
      await axios.patch(`http://localhost:3001/hotel/provider/${_id}`, 
        { ...hotel, submitStatus: "submitted" }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHotel({ ...hotel, submitStatus: "submitted" });
    } catch (error) {
      console.log(error);
      console.log(error)
    }
  };

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
      {hotel.submitStatus !== "submitted" && (
        <Button style={{width:'120px'}} type="primary" onClick={handleSubmit} >
          Submit Hotel
        </Button>
      )}
        <Button style={{width:'120px'}} type="default" href="/hotel/provider/list-hotel" >
          Quay Lại
        </Button>
    
  </Layout>
);
};

export default EditHotel;

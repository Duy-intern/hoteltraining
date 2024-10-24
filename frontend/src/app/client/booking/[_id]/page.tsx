"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Layout, Descriptions } from 'antd';
import { useAuth } from '@/components/hooks/useContext';
import dayjs from 'dayjs'; // Thư viện để định dạng ngày tháng

interface HotelDetails {
  _id: string;
  hotel: {
    _id: string;
    name: string;
    owner: string;
  };
  user: {
    email: string;
  };    
  rooms: number;
  price: number;
  createAt: string;
  alreadyPaid: boolean;
}

const BookingDetails: React.FC = () => {
  const [hotelDetails, setHotelDetails] = useState<HotelDetails | null>(null);
  const { token } = useAuth();
  const { _id } = useParams(); 

  useEffect(() => {
    const fetchHotelDetails = async () => {
      if (!token || !_id) return;
      try {
        const response = await axios.get(`http://localhost:3001/booking/client/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHotelDetails(response.data);
      } catch (error) {
        console.log('Không lấy được chi tiết khách sạn', error);
      }
    };

    fetchHotelDetails();
  }, [token, _id]);

  if (!hotelDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Layout style={{ padding: '2px' }}>
      <Descriptions title="Chi Tiết Đặt Phòng">
        <Descriptions.Item label="Tên Khách Sạn">{hotelDetails.hotel.name}</Descriptions.Item>
        <Descriptions.Item label="Email Khách Hàng">{hotelDetails.user.email}</Descriptions.Item>
        <Descriptions.Item label="Số Phòng">{hotelDetails.rooms}</Descriptions.Item>
        <Descriptions.Item label="Giá">{hotelDetails.price} USD</Descriptions.Item>
        <Descriptions.Item label="Ngày Tạo">{dayjs(hotelDetails.createAt).format('DD/MM/YYYY')}</Descriptions.Item>
        <Descriptions.Item label="Đã Thanh Toán">{hotelDetails.alreadyPaid ? 'Có' : 'Không'}</Descriptions.Item>
      </Descriptions>
    </Layout>
  );
};

export default BookingDetails;

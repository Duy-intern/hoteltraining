"use client";

import { Table, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Hotel {
  id: number;
  name: string;
  ratings: number;
  address: string;
  city: string;
  price: number;
  status: string;
}

const HotelList = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);



  useEffect(() => {
  

    const fetchHotels = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/hotel/provider/');
        setHotels(response.data.filter((hotel: Hotel) => hotel.status === 'SUBMITTED'));
      } catch {
        message.error('Không thể lấy danh sách khách sạn');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);


  const columns = [
    { title: 'Tên khách sạn', dataIndex: 'name', key: 'name' },
    { title: 'Đánh giá', dataIndex: 'ratings', key: 'ratings' },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
    { title: 'Thành phố', dataIndex: 'city', key: 'city' },
    { title: 'Giá', dataIndex: 'price', key: 'price' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: unknown, record: Hotel) => (
        <Button
          type="primary"
          disabled={record.status !== 'SUBMITTED'} 
        >
          Chỉnh sửa
        </Button>
      ),
    },
  ];

 

  return (
    <div>
      <h2>Danh sách khách sạn (Chờ duyệt)</h2>
      <Table
        columns={columns}
        dataSource={hotels}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default HotelList;

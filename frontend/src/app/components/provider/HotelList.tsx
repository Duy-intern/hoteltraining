"use client"
import React, { useEffect, useState } from 'react';
import { Table, Button, Space } from 'antd';
import axios from 'axios';

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
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = () => {
    setLoading(true);
    axios.get('/hotel/provider', { params: { submitStatus: 'submitted' } })
      .then((response) => {
        const rawData = response.data;
        
    
        if (Array.isArray(rawData)) {
          setHotels(rawData); 
        } else {
          console.error('Expected an array but got:', rawData);
        }
      })
      .catch((error) => {
        console.error('Error fetching hotels:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns = [
    {
      title: 'Hotel Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ratings',
      dataIndex: 'ratings',
      key: 'ratings',
      render: (text: number) => <span>{text}</span>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: number) => <span>{text} USD</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Hotel) => (
        <Space size="middle">
          {record.status === 'DRAFT' && (
            <Button
              type="primary"
              onClick={() => handleEdit(record.id)}
            >
              Edit
            </Button>
          )}
          {record.status !== 'SUBMITTED' && (
            <Button
              type="primary"
              onClick={() => handleSubmit(record.id)}
            >
              Submit
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const handleEdit = (id: string) => {
    console.log('Editing hotel with id:', id);
  };

  const handleSubmit = (id: string) => {
    axios.patch(`/hotel/provider/${id}/status`, { status: 'SUBMITTED' })
      .then(() => {
      
        setHotels(hotels.map((hotel) => hotel.id === id ? { ...hotel, status: 'SUBMITTED' } : hotel));
      })
      .catch((error) => {
        console.error('Error submitting hotel:', error);
      });
  };

  return (
    <div>
      <Button type="primary" onClick={fetchHotels} loading={loading}>
        Refresh Submitted Hotels
      </Button>
      <Table
        columns={columns}
        dataSource={hotels}
        rowKey="id"
        pagination={false} 
        loading={loading}
      />
    </div>
  );
};

export default HotelList;

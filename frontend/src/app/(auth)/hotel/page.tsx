"use client"
import React, { useState, useEffect } from 'react';
import { Table, Input } from 'antd';
import axios from 'axios';


interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
}

const ApprovedHotels: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]); 
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchApprovedHotels();
  }, []);

  const fetchApprovedHotels = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/hotel/client?ratings[gte]=4.5&price[lt]=1000');
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching approved hotels', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Input.Search
        placeholder="Search hotels"
        enterButton
        onSearch={handleSearch}
        style={{ marginBottom: 20 }}
      />
      <Table
        dataSource={filteredHotels}
        loading={loading}
        columns={[
          { title: 'Hotel Name', dataIndex: 'name', key: 'name' },
          { title: 'Location', dataIndex: 'location', key: 'location' },
          { title: 'Price', dataIndex: 'price', key: 'price' },
        ]}
        rowKey="id"
      />
    </div>
  );
};

export default ApprovedHotels;

"use client";

import React from 'react';
import { Form, Input, Button, InputNumber, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface HotelFormValues {
  name: string;
  ratings: number;
  address: string;
  city: string;
  price: number;
}

const CreateHotelForm: React.FC = () => {
    const route= useRouter();
  const onFinish = async (values: HotelFormValues) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post('http://localhost:3001/hotel/provider', values,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          }
        }
      )
      console.log('Hotel created:', response.data);
      route.push('/hotel/provider/list-hotel')
    } catch (error) {
      message.error('Có lỗi xảy ra khi tạo khách sạn.');
      console.error('Error creating hotel:', error);
    }
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item
        name="name"
        label="Tên khách sạn"
        rules={[{ required: true, message: 'Vui lòng nhập tên khách sạn' }]}
      >
        <Input placeholder="Nhập tên khách sạn" />
      </Form.Item>

      <Form.Item
        name="ratings"
        label="Đánh giá"
        rules={[
          { required: true, type: 'number', min: 1, max: 5, message: 'Đánh giá từ 1 đến 5' }
        ]}
      >
        <InputNumber placeholder="Nhập đánh giá khách sạn (0-5)" step={1} />
      </Form.Item>

      <Form.Item
        name="address"
        label="Địa chỉ"
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ khách sạn' }]}
      >
        <Input placeholder="Nhập địa chỉ khách sạn" />
      </Form.Item>

      <Form.Item
        name="city"
        label="Thành phố"
        rules={[{ required: true, message: 'Vui lòng nhập thành phố' }]}
      >
        <Input placeholder="Nhập thành phố" />
      </Form.Item>

      <Form.Item
        name="price"
        label="Giá"
        rules={[{ required: true, type: 'number', min: 0, message: 'Vui lòng nhập giá hợp lệ' }]}
      >
        <InputNumber placeholder="Nhập giá mỗi đêm" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Tạo khách sạn</Button>
      </Form.Item>
    </Form>
  );
};

export default CreateHotelForm;

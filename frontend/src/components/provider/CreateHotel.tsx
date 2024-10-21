"use client"
import React from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import axios from 'axios';

interface HotelFormValues {
  name: string;
  ratings: number;
  address: string;
  city: string;
  price: number;
}

const CreateHotelForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: HotelFormValues) => {
    axios.post('http://localhost:3000/hotel/provider/create-hotel', values)
      .then((response) => {
        console.log('Hotel created:', response.data);
      })
      .catch((error) => {
        console.error('Error creating hotel:', error);
      });
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="name"
        label="Hotel Name"
        rules={[{ required: true, message: 'Please enter the hotel name' }]}
      >
        <Input placeholder="Enter hotel name" />
      </Form.Item>

      <Form.Item
        name="ratings"
        label="Ratings"
        rules={[
          { required: true, type: 'number', min: 0, max: 5, message: 'Ratings should be between 0 and 5' }
        ]}
      >
        <InputNumber placeholder="Enter hotel rating (0-5)" step={0.1} />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: 'Please enter the hotel address' }]}
      >
        <Input placeholder="Enter hotel address" />
      </Form.Item>

      <Form.Item
        name="city"
        label="City"
        rules={[{ required: true, message: 'Please enter the city' }]}
      >
        <Input placeholder="Enter hotel city" />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, type: 'number', min: 0, message: 'Please enter a valid price' }]}
      >
        <InputNumber placeholder="Enter price per night" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Create Hotel</Button>
      </Form.Item>
    </Form>
  );
};

export default CreateHotelForm;

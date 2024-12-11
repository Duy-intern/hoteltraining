"use client";

import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, message } from 'antd';
import axios from 'axios';
import { useAuth } from '@/components/hooks/useContext';
import {  CldUploadWidget } from 'next-cloudinary';

interface HotelFormValues {
  name: string;
  ratings: number;
  address: string;
  city: string;
  price: number;
  image: string;
}

interface CreateHotelFormProps {
  onSuccess: () => Promise<void>;
  onClose: () => void;
}

import { CloudinaryUploadWidgetResults } from 'next-cloudinary';

const CreateHotelForm: React.FC<CreateHotelFormProps> = ({ onSuccess, onClose }) => {
  const { token } = useAuth();
  const [imageUrl, setImageUrl] = useState<string>('');

  const onFinish = async (values: HotelFormValues) => {
    try {
      if (!imageUrl) {
        message.error('Vui lòng tải lên hình ảnh khách sạn');
        return; 
      }
      values.image = imageUrl;

      const response = await axios.post('http://localhost:3001/hotel/provider', values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Hotel created:', response.data);
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Có lỗi xảy ra khi tạo khách sạn.');
      console.error('Error creating hotel:', error);
    }
  };

  const handleImageUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    const info = result?.info;

    if (typeof info !== 'string' && info?.secure_url) {
      const uploadedImageUrl = info.secure_url;
      setImageUrl(uploadedImageUrl);
      message.success('Hình ảnh đã được tải lên thành công.');
    } else {
      message.error('Lỗi khi tải lên hình ảnh.');
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
          { required: true, type: 'number', min: 1, max: 5, message: 'Đánh giá từ 1 đến 5' },
        ]}
      >
        <InputNumber placeholder="Nhập đánh giá khách sạn (1-5)" />
      </Form.Item>

      <Form.Item
        name="address"
        label="Địa chỉ"
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ khách sạn' }]}
      >
        <Input placeholder="Nhập địa chỉ khách sạn" />
      </Form.Item>

      <Form.Item
        label="Hình ảnh khách sạn"
        rules={[{ required: true, message: 'Vui lòng tải lên hình ảnh khách sạn' }]}
      > 
<CldUploadWidget uploadPreset="ImageHotel" 
onSuccess={handleImageUploadSuccess}>
  {({ open }) => {
    return (
      <button onClick={() => open()}>
        Upload an Image
      </button>
    );
  }}
</CldUploadWidget>
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
        <Button type="primary" htmlType="submit">
          Tạo khách sạn
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateHotelForm;

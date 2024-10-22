"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, InputNumber, Button, message, Layout } from "antd";
import { useParams, useRouter } from "next/navigation";

interface Hotel {
  name: string;
  ratings: number;
  address: string;
  city: string;
  price: number;
  status: string;
}

const EditHotel: React.FC = () => {
  const [form] = Form.useForm(); 

  const router = useRouter();
  const { _id  } = useParams();

  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const fetchHotel = async () => {
      if (!_id || !token) return;
      try {
        const response = await axios.get(`http://localhost:3001/hotel/provider/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data)
        form.setFieldsValue(response.data); 
      } catch (error) {
        console.log(error)
      }
    };
    fetchHotel();
  }, [_id, token,form]);

  const onFinish = async (values: Hotel) => {
    
    try {
      await axios.patch(`http://localhost:3001/hotel/provider/${_id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Khách sạn đã được cập nhật thành công.");
      router.push("/hotel/provider/list-hotel"); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
    <h1>Chỉnh sửa khách sạn</h1>
    <Form form={form} onFinish={onFinish} layout="vertical">
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
          { required: true, type: 'number', min: 1, max: 5, message: 'Đánh giá từ 0 đến 5' }
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
        <Button type="primary" htmlType="submit">Update Hotel</Button>

      </Form.Item>
    </Form>
    
  </Layout>
);
};

export default EditHotel;

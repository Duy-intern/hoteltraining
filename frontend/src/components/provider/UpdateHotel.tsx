"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { Form, Input, InputNumber, Button, message, Layout } from "antd";
import { useAuth } from "@/components/hooks/useContext";

interface Hotel {
  name: string;
  ratings: number;
  address: string;
  city: string;
  price: number;
  submitStatus: string;
}
interface CreateHotelFormProps {
  _id: string; 
  onSuccess: () => void; 
  onClose: () => void;  
}


const UpdateHotel: React.FC<CreateHotelFormProps> = ({_id,  onClose , onSuccess}) => {
  const [form] = Form.useForm(); 
  const {token} = useAuth();
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
    onSuccess(); // Làm mới danh sách khách sạn
    onClose(); // Đóng modal
  } catch (error) {
    console.log(error);
    message.error("Không thể cập nhật khách sạn.");
  }
};

const handleDelete = async () => {
  try {
    await axios.delete(`http://localhost:3001/hotel/provider/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    message.success("Khách sạn đã được xóa.");
    onSuccess(); 
    onClose(); 
  } catch (error) {
    console.log(error);
    message.error("Không thể xóa khách sạn.");
  }
};


  return (
    <Layout  style={{background:'white'}}>
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
          { required: true, type: 'number', min: 1, max: 5, message: 'Đánh giá từ 1 đến 5' }
        ]}
      >
        <InputNumber placeholder="Nhập đánh giá khách sạn (1-5)"/>
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
         <Button type="primary" onClick={handleDelete} style={{ marginLeft: "10px" }}>
            Delete Hotel
          </Button>
      </Form.Item>
    </Form>
  </Layout>
);
};

export default UpdateHotel;

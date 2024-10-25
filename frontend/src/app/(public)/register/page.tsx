"use client"
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Layout, Select } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type FieldType = {
  email?: string;
  passwordNonEncrypt?: string;
  accountType?: string;
};


const Login: React.FC = () => {
  const route = useRouter()
  
const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
  try{
    const response = await axios.post('http://localhost:3001/user',values)
    console.log("suscess: ",response.data)
    route.push('/login')
  }catch(error){
    console.log("Error",error)
  }
};


  return(
  <Layout  style={{ minHeight: '100vh', backgroundColor: '#f0f2f5',justifyContent:'center', alignItems:'center' }}>
    <Form 
  labelCol={{ span: 8 }}
  wrapperCol={{ span: 16 }}
  initialValues={{ remember: true }}
  onFinish={onFinish}
>
  <Form.Item<FieldType>
    label="Email"
    name="email"
    rules={[{ required: true, message: 'Please input your username!' }]}
  >
    <Input />
  </Form.Item>
  <Form.Item<FieldType>
    label="Password"
    name="passwordNonEncrypt"
    rules={[{ required: true, message: 'Please input your password!' }]}
  >
    <Input.Password />
  </Form.Item>
  <Form.Item<FieldType>
      label="Role"
      name="accountType"
      rules={[{ required: true, message: 'Please select your role!' }]}
    >
      <Select placeholder="Chọn vai trò">
        <Select.Option value="client">Client</Select.Option>
        <Select.Option value="provider">Provider</Select.Option>
        <Select.Option value="admin">Admin</Select.Option>
      </Select>
    </Form.Item>
  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    <Button type="primary" htmlType="submit">
     Đăng ký
    </Button>
  </Form.Item>
</Form>
</Layout>
  )
  
};

export default Login;
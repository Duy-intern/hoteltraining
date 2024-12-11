"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout, Table, Typography, message, Button } from "antd";
import { useAuth } from "@/components/hooks/useContext";
import Link from "next/link";

const { Text } = Typography;

interface Hotel {
  _id: string;
  hotel: { _id: string; name: string };
  user: { email: string };
  rooms: number;
  price: number;
  alreadyPaid: boolean;
}

const HotelList: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchHotels = async () => {
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:3001/booking/client", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const filteredHotels = response.data.filter((hotel: Hotel) => hotel.hotel?.name);
        setHotels(filteredHotels);
      } catch (error) {
        console.error("Không thể lấy dữ liệu:", error);
        message.error("Không thể tải danh sách khách sạn. Vui lòng thử lại sau.");
      }
    };

    fetchHotels();
  }, [token]);

   const handleDelete = async (id: string) => {
    if (!token) return;

    try {
      await axios.delete(`http://localhost:3001/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Xóa khách sạn thành công.");
      setHotels(hotels.filter((hotel) => hotel._id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa khách sạn:", error);
      message.error("Không thể xóa khách sạn. Vui lòng thử lại.");
    }
  };

  const columns = [
    {
      title: "Tên Khách Sạn",
      dataIndex: ["hotel", "name"],
      key: "hotelName",
      render: (text: string, record: Hotel) => (
        <Link href={`/hotel/${record.hotel._id}`}>
          {text}
        </Link>
      ),
    },
    {
      title: "Số Phòng",
      dataIndex: "rooms",
      key: "rooms",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text: number) => `${text} USD`,
    },
    {
      title: "Đã Thanh Toán",
      dataIndex: "alreadyPaid",
      key: "alreadyPaid",
      render: (text: boolean) =>
        text ? (
          <Text type="success">Đã thanh toán</Text>
        ) : (
          <Text type="danger">Chưa thanh toán</Text>
        ),
    },
       {
      title: "Hành Động",
      key: "actions",
      render: ( record: Hotel) => (
        <>
        <Button type="primary" >Thanh Toán</Button>
          <Button type="primary" danger  onClick={() => handleDelete(record._id)}>
            Xóa
          </Button>
        </>
   
      ),
    },
  ];

  return (
    <Layout style={{ padding: "20px", background: "#fff" }}>
        <Table
          dataSource={hotels}
          columns={columns}
          rowKey="_id"
          scroll={{ y: 530, x: "auto" }}
          pagination={{ pageSize: 10 }}
        />
    </Layout>
  );
};

export default HotelList;

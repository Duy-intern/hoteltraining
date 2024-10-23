"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Drawer, Layout, Table } from "antd";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/hooks/useContext";
import CreateHotelForm from "@/components/provider/CreateHotel";
import UpdateHotel from "@/components/provider/UpdateHotel";

interface Hotel {
  _id: string;
  name: string;
  ratings: number;
  address: string;
  city: string;
  price: number;
  submitStatus: string;
}

const HotelList: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const route = useRouter();
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);


  const fetchHotels = async () => {
    if (!token) return;
    try {
      const response = await axios.get("http://localhost:3001/hotel/provider", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHotels(response.data);
    } catch (error) {
      console.log("Không lấy được dữ liệu", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [token]);

  const handleEdit = (_id: string) => {
    setOpen1(true)
  };

  const handleUpdate = (_id: string) => route.push(`/provider/${_id}/details`);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const onClose1 = () => {
    setOpen1(false);
  };

  const columns = [
    {
      title: "Tên Khách Sạn",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a href="#">{text}</a>,
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Thành Phố",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text: number) => `${text} USD`,
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_: unknown, record: Hotel) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record._id)}>
            Update
          </Button>
          <Button type="default" onClick={() => handleUpdate(record._id)}>
            Details
          </Button>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <Table dataSource={hotels} columns={columns} rowKey="_id" />
      <>
        <Button style={{ width: "120px" }} type="primary" onClick={showDrawer}>
          Create Hotel
        </Button>
        <Drawer title="Create Hotel" onClose={onClose} open={open}>
          <CreateHotelForm onSuccess={fetchHotels} onClose={onClose} />
        </Drawer>
        <Drawer title="Update Hotel" onClose={onClose1} open={open1}>
          <UpdateHotel onSuccess={fetchHotels} onClose={onClose1} />
        </Drawer>
        
      </>
    </Layout>
  );
};

export default HotelList;

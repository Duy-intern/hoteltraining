"use client";
import React, { useCallback, useEffect, useState } from "react";
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
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);



  const fetchHotels = useCallback (async () => {
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
  },[token]);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  // const handleUpdate = (_id: string) => route.push(`/provider/${_id}`);

  const handleDetails = (_id: string) => route.push(`/provider/${_id}/details`);

  const showDrawer = () => {
    setOpen(true);
  };

  const handleUpdate = (_id: string) => {
    setSelectedHotelId(_id);
    setOpenUpdate(true); 
  };


  const onClose = () => {
    setOpen(false);
  };



  const onCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedHotelId(null); 
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
          <Button type="primary" onClick={() => handleUpdate(record._id)}>
            Update
          </Button>
          <Button type="default" onClick={() => handleDetails(record._id)}>
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
        <Drawer  width={720} title="Create Hotel" onClose={onClose} open={open}>
          <CreateHotelForm onSuccess={fetchHotels} onClose={onClose} />
        </Drawer>
        <Drawer title="Update Hotel"  onClose={onCloseUpdate} open={openUpdate} width={720}>
          {selectedHotelId && (
            <UpdateHotel _id={selectedHotelId} onClose={onCloseUpdate} onSuccess={fetchHotels}    />
          )}
        </Drawer>
        
      </>
    </Layout>
  );
};

export default HotelList;

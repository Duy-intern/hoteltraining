"use client";

import { useAuth } from "@/components/hooks/useContext";
import { Button } from "antd";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Hotel {
  _id: string;
  name: string;
  ratings: number;
  address: string;
  city: string;
  price: number;
  submitStatus: string;
  image: string;
  rooms: number;
}

const Page = () => {
  const { _id } = useParams();
  const { token } = useAuth();
  const router = useRouter();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [selectedRooms, setSelectedRooms] = useState<number>(1);


  useEffect(() => {
    const fetchHotel = async () => {
      if (!_id || !token) return;

      try {
        const response = await axios.get(`http://localhost:3001/hotel/client/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHotel(response.data);
      } catch (error) {
        console.error("Error fetching hotel:", error);
      }
    };

    fetchHotel();
  }, [_id, token]);

 const handleBook = async () => {
  if (!hotel?._id || !hotel.price) {
    console.error("Hotel data is missing");
    return;
  }

  try {
    const response = await axios.post(
      `http://localhost:3001/hotel/client/${hotel._id}/booking`,
      { hotel: hotel._id, rooms: selectedRooms, price: hotel.price * selectedRooms },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Booking response:", response.data);
    router.push(`booking/${hotel._id}`);
  } catch (error) {
    console.error("Error booking hotel:", error);
  }
};


  return (
    <div className="flex justify-center gap-4 pt-4">
      <div className="h-[450px] border p-4 shadow-md rounded">
        {hotel?.image && (
          <Image
            src={hotel.image}
            alt={hotel.name}
            width={1000}
            height={300}
            className="w-full h-full object-cover rounded mb-4"
          />
        )}
      </div>
      <div className="flex flex-col w-[300px] justify-between items-center border p-4 shadow-md rounded">
        <div>
          <h2 className="text-lg font-bold">{hotel?.name}</h2>
          <p className="text-sm text-gray-600">{hotel?.address}</p>
          <p className="text-sm text-gray-600">{hotel?.city}</p>
          <p className="text-sm">Price: ${hotel?.price}</p>
          <p className="text-sm flex items-center">
            Ratings:
            <span className="flex ml-2">
              {Array.from({ length: Math.floor(hotel?.ratings || 0) }, (_, index) => (
                <span key={index} className="text-yellow-500">
                  ★
                </span>
              ))}
            </span>
          </p>
          <div className="mb-4">
            <p className="text-sm">Chọn số lượng phòng:</p>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setSelectedRooms((prev) => Math.max(1, prev - 1))}
              >
                -
              </Button>
              <span className="text-lg">{selectedRooms}</span>
              <Button
                onClick={() => setSelectedRooms((prev) => Math.min( prev + 1))}
              >
                +
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Button type="primary" onClick={handleBook}>
            ĐẶT PHÒNG
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;

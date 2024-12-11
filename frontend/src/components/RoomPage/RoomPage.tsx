import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useContext';
import axios from 'axios';

interface Hotel {
  _id: string;
  name: string;
  ratings: number;
  address: string;
  city: string;
  price: number;
  image:string;
}


const RoomPage: React.FC = () => {
  const [hotels,setHotels] = useState<Hotel[]>([]);
    const {token} = useAuth();

    useEffect(()=>{
        const fetchHotel = async()=>{
             if(!token) return;
             try{
            const response = await axios.get("http://localhost:3001/hotel/client",{
                headers:{
                 Authorization: `Bearer ${token}`, 
                }
            })
            setHotels(response.data)
             }catch(error){
                console.log("Khong lay duoc du lieu", error)
             }
        }
        fetchHotel()
    },[token])

    
    // const {push} = useRouter();
    return (
        <div className='flex flex-col'>
            <div className='flex flex-col items-center mt-[80px] text-[#14274A] '>
                <p className='font-bold text-5xl'>ROOMS AND RATES</p>
                <p className='font-medium text-2xl w-[1300px] text-center mt-[29px]'>Each of our bright, light-flooded rooms come with everything you could possibly need for a comfortable stay. And yes, comfort isn’t our only objective, we also value good design, sleek contemporary furnishing complemented by the rich tones of nature’s palette as visible from our rooms’ sea-view windows and terraces.</p>
            </div>
            {hotels?.map((items,index)=>(
  <div key={index} className='mx-[159px] mt-[50px] border-2 border-black rounded-xl border-t-0'>
                <Image 
                src={items.image}
                alt=''
                width={10000}
                height={10000}
                className='w-full h-[900px]'/>
                <div className='w-full h-[141px] bg-[#14274A] text-white text-center content-center text-5xl font-bold'>DOUBLE ROOM</div>
                <div className='py-[79px] px-[130px] flex justify-between'>
                    <p className='text-4xl font-semibolds text-[#14274A]'>Địa chỉ:{items.address},{items.city}</p>
                     <Link href={`room/${items._id}`}><Button className='bg-[#E0B973] text-white'>{items.price}$</Button></Link>
                </div>
            </div>
            ))}
          
            
        </div>
    );
}

export default RoomPage;

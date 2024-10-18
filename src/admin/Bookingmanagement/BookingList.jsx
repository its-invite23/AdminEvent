import React from 'react'
import { BsThreeDots } from "react-icons/bs";
import Header from '../compontents/Header';

export default function BookingList() {
  return (
    <div className='w-full max-w-[100%]'>
      <Header title={"All Booking"} />
    <div className="w-full  bg-[#1B1B1B] p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
      <h2 className="font-manrope font-[600] text-white text-[18px] md:text-[24px] mb-[15px]">All Bookings</h2>
      <div className="overflow-auto">
        <table className="w-full table-auto whitespace-nowrap">
          <thead className="mb-[15px]">
            <tr>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px]">S. No.</th>

              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px] text-center">Booking Id</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px] text-center">Event Type</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] text-center">Client Name</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] text-center">No.of Attendees</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] text-center">Location</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] text-center">Booking Status</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] text-center">Actions</th>
            </tr>
          </thead>
          <tr>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a]   ">1</td>

            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">JK345</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Casual party</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Jhon Dev</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">10</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Paris, 75th distric</td>
            <td className=" font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
            <button className='min-w-[110px] m-auto border border-[#B8A955] bg-[#B8A9551A] font-[manrope] font-[600] text-[16] text-[#B8A955] text-center px-[15px] py-[6px] rounded-[60px]'>
            Pending</button>
              
            </td>
            <td className=" font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
              <button className='text-center'>
                <BsThreeDots size={24} />
              </button>
            </td>
          </tr>

          <tr>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a]   ">1</td>

            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">JK345</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Casual party</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Jhon Dev</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">10</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Paris, 75th distric</td>
            <td className=" font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
            <button className='min-w-[110px] m-auto border border-[#B8A955] bg-[#B8A9551A] font-[manrope] font-[600] text-[16] text-[#B8A955] text-center px-[15px] py-[6px] rounded-[60px]'>
            Pending</button>
              
            </td>
            <td className=" font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
              <button className='text-center'>
                <BsThreeDots size={24} />
              </button>
            </td>
          </tr>

          <tr>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a]   ">1</td>

            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">JK345</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Casual party</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Jhon Dev</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">10</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Paris, 75th distric</td>
            <td className=" font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
            <button className='min-w-[110px] m-auto border border-[#B8A955] bg-[#B8A9551A] font-[manrope] font-[600] text-[16] text-[#B8A955] text-center px-[15px] py-[6px] rounded-[60px]'>
            Pending</button>
              
            </td>
            <td className=" font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
              <button className='text-center'>
                <BsThreeDots size={24} />
              </button>
            </td>
          </tr>

        </table>
      </div>

    </div>
    </div>
  )
}

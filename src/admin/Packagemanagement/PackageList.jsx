import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import AddPackage from './AddPackage';
import Header from '../compontents/Header';

export default function PackageList() {
  return (
    <div className='w-full max-w-[100%]'>
      <Header title={"All Packages"} />
    <div className="w-full  bg-[#1B1B1B] p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
      <AddPackage />
      <div className="overflow-auto">
        <table className="w-full table-auto whitespace-nowrap">
          <thead className="mb-[15px]">
            <tr>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px]">S. No.</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">Package Id</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">Package Name</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">Event Type</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">Attendees</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">Budget Range</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">Status</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">Created At</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">Availability</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">Actions</th>

            </tr>
          </thead>
          <tr>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-left  ">1</td>

            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">JK345</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Casual party</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Jhon Dev</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">10</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">$200- $300</td>
            <td className=" font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
              <button className='min-w-[110px] m-auto border border-[#B8A955] bg-[#B8A9551A] font-[manrope] font-[600] text-[16] text-[#B8A955] text-center px-[15px] py-[6px] rounded-[60px]'>
                Pending</button>
            </td>

            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">6 Sep 2024</td>

            <td className="font-manrope font-[600] text-[#4CAF50] text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Available</td>


            <td className=" font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
              <button className='text-center'>
                <BsThreeDots size={24} />
              </button>
            </td>
          </tr>

          <tr>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-left  ">1</td>

            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">JK345</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Casual party</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Jhon Dev</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">10</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">$200- $300</td>
            <td className=" font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
              <button className='min-w-[110px] m-auto border border-[#B8A955] bg-[#B8A9551A] font-[manrope] font-[600] text-[16] text-[#B8A955] text-center px-[15px] py-[6px] rounded-[60px]'>
                Pending</button>
            </td>

            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">6 Sep 2024</td>

            <td className="font-manrope font-[600] text-[#D95858] text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Out of stock</td>


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

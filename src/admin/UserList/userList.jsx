import React from 'react'
import { FaAngleDown } from "react-icons/fa6";
import { IoFilterSharp } from "react-icons/io5";
import Header from '../compontents/Header';

export default function userList() {
  return (
    <div className='w-full max-w-[100%]'>
      <Header title={"All Users"} />
    <div className="w-full  bg-[#1B1B1B] p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
      <div className='flex items-center justify-between mb-[20px]'>
        <h2 className=" font-manrope font-[600] text-white text-[18px] md:text-[24px] mb-[0]">All Users</h2>
        <button className='flex items-center gap-[10px] px-[20px] py-[8px] border border-[#ffffff1a] rounded-[8px] font-[manrope] font-[600] text-white text-[18px]'><IoFilterSharp /> Filter</button>
      </div>
      <div className="overflow-auto">
        <table className="w-full table-auto whitespace-nowrap">
          <thead className="mb-[15px]">
            <tr>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px]">S.No.</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px] text-center ">Username</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Email</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">city</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Address</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Contact</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Action</th>
            </tr>
          </thead>
          <tr>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a]   ">1</td>

            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center   ">John Doe</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">John@example.com</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Jaipur</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Bani Park</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">+1234567890</td>
            <td className=" font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
              <button className='min-w-[110px] m-auto flex items-center justify-between border border-[#ffffff33] text-[#4CAF50] px-[15px] py-[6px] rounded-[60px]'>
              Active <FaAngleDown size={10} /></button>
            </td>
          </tr>

          <tr>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a]   ">1</td>

            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">John Doe</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">John@example.com</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Jaipur</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Bani Park</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">+1234567890</td>
            <td className=" font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
            <button className='min-w-[120px] m-auto flex items-center justify-between border border-[#ffffff33] text-[#D95858] px-[15px] py-[6px] rounded-[60px]'>
            Deactive <FaAngleDown size={10} className='text-[#D95858]' /></button>
            </td>
          </tr>

          <tr>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a]   ">1</td>

            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">John Doe</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">John@example.com</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Jaipur</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Bani Park</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">+1234567890</td>
            <td className=" font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
            <button className='min-w-[120px] m-auto flex items-center justify-between border border-[#ffffff33] text-[#D95858] px-[15px] py-[6px] rounded-[60px]'>
            Deactive <FaAngleDown size={10} className='text-[#D95858]' /></button>
            </td>
          </tr>

        </table>
      </div>

    </div>
    </div>
  )
}

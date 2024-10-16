import React from 'react'
import { BsThreeDots } from 'react-icons/bs'

export default function PackageList() {
  return (
    <div className="w-full  bg-[#1B1B1B] p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
    <h2 className="font-manrope font-[600] text-white text-[18px] md:text-[24px] mb-[15px]">All Users</h2>
    <div className="overflow-auto">
      <table className="w-full table-auto whitespace-nowrap">
        <thead className="mb-[15px]">
          <tr>
            <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px]">S. No.</th>

            <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px]">Booking Id</th>
            <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px]">Event Type</th>
            <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Client Name</th>
            <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">No.of Attendees</th>
            <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Location</th>
            <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Booking Status</th>
            <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Actions</th>
          </tr>
        </thead>
        <tr>
          <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[5px]  ">1</td>

          <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[5px]  ">JK345</td>
          <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">Casual party</td>
          <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">Jhon Dev</td>
          <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">10</td>
          <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">Paris, 75th distric</td>
          <td className=" font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">
            Pending
          </td>
          <td className=" font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">
            <BsThreeDots size={24} />
          </td>
        </tr>

        <tr>
          <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[5px]  ">1</td>

          <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[5px]  ">JK345</td>
          <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">Casual party</td>
          <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">Jhon Dev</td>
          <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">10</td>
          <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">Paris, 75th distric</td>
          <td className=" font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">
            Pending
          </td>
          <td className=" font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">
            <BsThreeDots size={24} />
          </td>
        </tr>

        <tr>
          <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[5px]  ">1</td>

          <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[5px]  ">JK345</td>
          <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">Casual party</td>
          <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">Jhon Dev</td>
          <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">10</td>
          <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">Paris, 75th distric</td>
          <td className=" font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">
            Pending
          </td>
          <td className=" font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">
            <BsThreeDots size={24} />
          </td>
        </tr>

      </table>
    </div>

  </div>
  )
}

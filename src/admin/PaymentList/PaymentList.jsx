import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Header from '../compontents/Header'

export default function PaymentList() {
  return (
    <div className='w-full max-w-[100%]'>
      <Header title={"All Payment"} />
    <div className="w-full  bg-[#1B1B1B] p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
      <h2 className="font-manrope font-[600] text-white text-[18px] md:text-[24px] mb-[15px]">All Payments</h2>
      <div className="overflow-auto">
        <table className="w-full table-auto whitespace-nowrap">
          <thead className="mb-[15px]">
            <tr>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px]">S. No.</th>

              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">Payment Id</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">Booking ID</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Client Name</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Amount</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Payment Method</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Status</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Transaction Date</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Actions</th>


            </tr>
          </thead>
          <tr>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-left  ">1</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">JK345</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Casual party</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Jhon Dev</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">10</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Card </td>
            <td className=" font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
            <button className='min-w-[110px] m-auto border border-[#4CAF50] bg-[#4CAF501A] font-[manrope] font-[600] text-[16] text-[#4CAF50] text-center px-[15px] py-[6px] rounded-[60px]'>
            Successful</button>
            </td>
            <td className=" font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
              23- Oct-2024
            </td>
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
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Card </td>
            <td className=" font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
            <button className='min-w-[110px] m-auto border border-[#B8A955] bg-[#B8A9551A] font-[manrope] font-[600] text-[16] text-[#B8A955] text-center px-[15px] py-[6px] rounded-[60px]'>
            Pending</button>
            </td>
            <td className=" font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
              23- Oct-2024
            </td>
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
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">Card </td>
            <td className=" font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
            <button className='min-w-[110px] m-auto border border-[#EB3465] bg-[#EB34651A] font-[manrope] font-[600] text-[16] text-[#EB3465] text-center px-[15px] py-[6px] rounded-[60px]'>
            cancelled</button>
            </td>
            <td className=" font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
              23- Oct-2024
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

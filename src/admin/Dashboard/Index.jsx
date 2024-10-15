import React from 'react'
import Enquiry from './Enquiry'
import Chart from './Chart'
import logo from '../compontents/SideBar'
import { FaUsers } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
import Header from '../compontents/Header';
export default function Index() {
  return (
    <div className='w-full max-w-[100%]'>
      
      <div className='w-full'>
        <div className='w-full flex gap-[15px] mb-[20px]'>
          <div className='flex items-center gap-[15px] bg-[#1B1B1B] rounded-[20px] p-[25px] w-4/12'>
            <div className='flex items-center justify-center bg-[#302F2F] w-[80px] h-[80px] rounded-[8px]'>
              <FaUsers className='text-[#EB3465] text-[30px]' />
            </div>
            <div className='pl-[15px]'>
              <h3 className='font-manrope text-white text-[14px] leading-[15px] mb-[8px] '>Total Users</h3>
              <h2 className='font-manrope text-white text-[48px] leading-[48px]'>357</h2>
            </div>
          </div>

          <div className='flex items-center gap-[15px] bg-[#1B1B1B] rounded-[20px] p-[25px] w-4/12'>
            <div className='flex items-center justify-center bg-[#302F2F] w-[80px] h-[80px] rounded-[8px]'>
              <FaListAlt className='text-[#EB3465] text-[30px]' />
            </div>
            <div className='pl-[15px]'>
              <h3 className='font-manrope text-white text-[14px] leading-[15px] mb-[8px] '>Total booking</h3>
              <h2 className='font-manrope text-white text-[48px] leading-[48px]'>879</h2>
            </div>
          </div>

          <div className='flex items-center gap-[15px] bg-[#1B1B1B] rounded-[20px] p-[25px] w-4/12'>
            <div className='flex items-center justify-center bg-[#302F2F] w-[80px] h-[80px] rounded-[8px]'>
              <FaUsers className='text-[#EB3465] text-[30px]' />
            </div>
            <div className='pl-[15px]'>
              <h3 className='font-manrope text-white text-[14px] leading-[15px] mb-[8px] '>Recent inquiries</h3>
              <h2 className='font-manrope text-white text-[48px] leading-[48px]'>456</h2>
            </div>
          </div>
        </div>

        <div className='w-full flex '>
          <div className='w-[66.66%] flex bg-[#1B1B1B] p-[25px] rounded-[20px] '>
            <Chart />
          </div>
        </div>
      </div>
    </div>

  )
}

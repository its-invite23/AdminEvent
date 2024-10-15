import React from 'react'
import { IoMdSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    
    <div className='sticky top-0 mb-[20px] flex justify-between gap-[20px]  w-full bg-[#1B1B1B] p-[20px] rounded-[15px]'>
      <div className='flex w-full  gap-[20px]'>
        <h2 className='text-white font-manrope font-[400] text-[32px] pr-[70px] '>Dashboard</h2>
        <div className='relative w-full max-w-[370px]'>
          <IoMdSearch className='absolute top-[15px] left-[15px] text-white' />
          <input className='w-full bg-[#1B1B1B] border border-[#37474F] p-[10px] pl-[40px] rounded-[50px] text-white text-[15px]' type="text" placeholder='Search.....' />
        </div>
      </div>
      <div className=''>
          <Link className='flex items-center justify-center w-[50px] h-[50px] bg-[#ffffff0d] rounded-[80px]'>
            <FaUser className='text-white text-[15px]' />
          </Link>
        </div>
    </div>
  )
}

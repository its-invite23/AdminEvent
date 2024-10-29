import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import SideBar from './SideBar';

export default function Header({ title }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive); // Toggle the state between true and false
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className='sticky z-[1] top-0 mb-[20px] flex items-center justify-between gap-[5px] md:gap-[20px]  w-full bg-[#1B1B1B] p-[10px] md:p-[20px]  rounded-[10px] md:rounded-[15px] border border-[#2b2b2b]'>
        <div className='flex items-center w-full gap-[5px] md:gap-[20px]'>
          <button
            onClick={toggleSidebar}
            className="text-white xl:hidden"
          >
            <HiOutlineMenu size={32} />
          </button>
          <h2 className='text-white font-manrope font-[500] md:text-[20px] lg:text-[25px] xl:text-[32px] pr-[70px] hidden md:block'>{title ? title : "Dashboard"}</h2>
          <div className='relative w-full max-w-[370px]'>
            <IoMdSearch className='absolute top-[15px] left-[15px] text-white' />
            <input className='w-full bg-[#1B1B1B] border border-[#37474F] p-[10px] pl-[40px] pr-[20px] rounded-[50px] text-white text-[15px] hover:outline-none focus:outline-none' type="text" placeholder='Search.....' />
          </div>
        </div>
        <div className='relative'>
          <button onClick={handleToggle} className='flex items-center justify-center w-[40px] h-[40px] sm:w-[45px] sm:h-[45px]  md:w-[50px] md:h-[50px] bg-[#ffffff0d] rounded-[80px]'>
            <FaUser className='text-white text-[13px] sm:text-[15px]' />
          </button>

          {/* <div className={`absolute top-[50px] md:top-[55px] right-[0] min-w-[160px] bg-[#1b1b1b] border border-[#2b2b2b] p-[15px] rounded-[6px] hidden ${isActive ? '!flex !flex-col' : ''}`}>
      <Link to={'/'} className='py-[8px] px-[8px] border-b border-b-[#2b2b2b] text-[15px] text-right text-[#fff] hover:bg-[#272727e8] hover-text-[#fff]'>Profile</Link>
      <Link to={'/'} className='py-[8px] px-[8px] border-b border-b-[#2b2b2b] text-[15px] text-right text-[#fff] hover:bg-[#272727e8] hover-text-[#fff]'>Setting</Link>
      <Link to={'/'} className='py-[8px] px-[8px]  text-[15px] text-right text-[#fff] hover:bg-[#272727e8] hover-text-[#fff]'>Logout</Link>
    </div> */}

        </div>



        <div>

        </div>






      </div>

      <SideBar toggleSidebar={toggleSidebar} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>

  )
}

import React from 'react'
import loginbanner from "../../asstes/loginbanner.jpg"
import logo from "../../asstes/logo.png"
import { Link } from 'react-router-dom'
import { IoEye } from "react-icons/io5";

export default function Login() {
  return (
    <div className='bg-black lg:h-screen h-full'>
      <div className="flex flex-wrap flex-col-reverse lg:flex-row  max-w-[1200px] m-auto p-6 h-full">
        <div className="lg:w-2/4 w-full">
          <img className='rounded-md w-full' src={loginbanner} alt="Login Banner "/>
        </div>

        <div className='lg:w-2/4 w-full pl-0 lg:pl-10 xl:pl-16 pr-0 lx:pr-2 py-10'>
          <div className='logo'>
            <img src={logo} alt="logo" />
          </div>
          <h2 className='font-[600] font-manrope text-white text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[48px] mt-11 mb-4'>Login to your account</h2>
          {/* <div className='text-slate-300 text-base  mb-4'>Don’t have an account? <a href='#' className='text-pink-500'>Sign up</a></div> */}
          <div className='mb-5'>
            <input type="email" placeholder='Enter your email..' className='bg-zinc-900 w-full px-4 py-4 rounded-lg text-base  text-white' />
          </div>
          <div className='mb-5 relative'>
            <input type="email" placeholder='Enter password..' className='bg-zinc-900 w-full px-4 py-4 pe-14 rounded-lg text-base text-white' />
            <button className='absolute top-4 right-5 '>
              
              <IoEye size={24} className='text-white' />
            </button>
          </div>
          <div className='mb-8 text-white text-base text-center'>
            <Link to="/forget-password" >
              Forgot password?
              </Link>
          </div>
          <div className='mb-5 text-center'>
            <button className='bg-[#FF5482] hover:bg-[#F7517E] bg-rose-500 px-5 py-4 min-w-52 text-white text-base text-center rounded-md'>
              Login
            </button>
          </div>
        </div>

        
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import Enquiry from './Enquiry'
import Chart from './Chart'
import { FaUsers } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
import Header from '../compontents/Header';
import Package from '../Dashboard/Package';
import Listing from '../../Api/Listing';
import LoadingSpinner from '../compontents/LoadingSpinner';
import { Link } from 'react-router-dom';
// import Enquiry from '../Dashboard/Enquiry';
export default function Index() {
  const [listing, setLisitng] = useState("");
  const [Loading, setLoading] = useState(false);
  const DashboardData = () => {
    setLoading(true);
    const main = new Listing();
    main
      .Dashboard()
      .then((r) => {
        setLoading(false);
        setLisitng(r?.data);
      })
      .catch((err) => {
        setLoading(false);
        setLisitng([]);
        console.log("error", err);
      });
  };

  useEffect(() => {
    DashboardData();
  }, []);

  return (
    <div className='w-full max-w-[100%]'>
      <Header title={"Dashboard"} />
      <div className='w-full max-w-[100%]'>
        {Loading ? (
          <LoadingSpinner />
        ) : (
          <div className='w-full'>
            <div className='w-full flex flex-wrap md:flex-nowrap gap-[15px] mb-[20px]'>
              < Link to="/access-admin/user" className='flex items-center gap-[5px] xl:gap-[8px] lg:gap-[10px] xl:gap-[15px] bg-[#1B1B1B] rounded-[10px] md:rounded-[10px] lg:rounded-[20px] p-[10px] md:p-[10px] lg:p-[25px] w-full md:w-4/12'>
                <div className='flex items-center justify-center bg-[#302F2F] w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] rounded-[8px]'>
                  <FaUsers className='text-[#EB3465] text-[30px]' />
                </div>
                <div className='pl-[2px] lg:pl-[10px] xl:pl-[15px]'>
                  <h3 className='capitalize font-manrope text-white text-[14px] leading-[15px] mb-[2px] lg:mb-[5px] lg:mb-[8px] '>Total Users</h3>
                  <h2 className='font-manrope text-white text-[25px] md:text-[28px] lg:text-[35px] xl:text-[48px] leading-[48px]'>{listing?.userCount}</h2>
                </div>
              </Link>

              <Link to="/access-admin/booking" className='flex items-center gap-[5px] xl:gap-[8px] lg:gap-[10px] xl:gap-[15px] bg-[#1B1B1B] rounded-[10px] md:rounded-[10px] lg:rounded-[20px] p-[10px] md:p-[10px] lg:p-[25px] w-full md:w-4/12'>
                <div className='flex items-center justify-center bg-[#302F2F] w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] rounded-[8px]'>
                  <FaListAlt className='text-[#EB3465] text-[30px]' />
                </div>
                <div className='pl-[2px] lg:pl-[10px] xl:pl-[15px]'>
                  <h3 className='capitalize font-manrope text-white text-[14px] leading-[15px] mb-[2px] lg:mb-[5px] lg:mb-[8px]  '>Total booking</h3>
                  <h2 className='font-manrope text-white text-[25px] md:text-[28px] lg:text-[35px] xl:text-[48px] leading-[48px]'>{listing?.bookingCount}</h2>
                </div>
              </Link>

              <Link to="/access-admin/enquiry" className='flex items-center gap-[5px] xl:gap-[8px] lg:gap-[10px] xl:gap-[15px] bg-[#1B1B1B] rounded-[10px] md:rounded-[10px] lg:rounded-[20px] p-[10px] md:p-[10px] lg:p-[25px] w-full md:w-4/12'>
                <div className='flex items-center justify-center bg-[#302F2F] w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] rounded-[8px]'>
                  <FaUsers className='text-[#EB3465] text-[30px]' />
                </div>
                <div className='pl-[2px] lg:pl-[10px] xl:pl-[15px]'>
                  <h3 className='capitalize font-manrope text-white text-[14px] leading-[15px] mb-[2px] lg:mb-[5px] lg:mb-[8px]  '>Recent inquiries</h3>
                  <h2 className='font-manrope text-white text-[25px] md:text-[28px] lg:text-[35px] xl:text-[48px] leading-[48px]'>{listing?.EnquiryCount}</h2>
                </div>
              </Link>
            </div>

            <div className='w-full flex flex-wrap xl:flex-nowrap gap-[15px] '>
              <div className='w-[100%] lg:w-[65.38%] xl:w-[66%] flex bg-[#1B1B1B] p-[10px] relative z-[0] md:p-[25px] rounded-[5px] md:rounded-[10px] lg:rounded-[20px] '>
                <Chart />
              </div>
              <div className='w-[100%] lg:w-[33%] xl:w-[33%] flex bg-[#1B1B1B] p-[10px] md:p-[25px] rounded-[5px] md:rounded-[10px] lg:rounded-[20px] '>
                <Package packages={listing?.packages
                } />
              </div>
            </div>

            <div className='w-full'>
              <Enquiry EnquiryData={listing?.EnquiryData} />
            </div>
          </div>
        )}

      </div>
    </div>

  )
}

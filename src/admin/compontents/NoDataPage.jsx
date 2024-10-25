import React from 'react';
import Nodata from '../../asstes/nodata1.jpg'
import { useNavigate } from 'react-router-dom';

const NoDataPage = () => {
  const navigate = useNavigate();
  return (
    <div className=" h-full ">
      <div className='mt-[40px] mb-[40px] md:mt-[20px] md:mb-[20px] p-[20px] flex items-center justify-center'>
      <img 
        src={Nodata} 
        alt="No Data" 
        className="max-w-[235px] md:max-w-[335px] rounded-[20px]"
      />
      </div>
      <h1 className=" font-[700] text-[30px] leading-[40px] sm:text-[30px] sm:leading-[30px] md:text-[50px] md:leading-[50px] lg:text-[60px] lg:leading-[60px] xl:text-[80px] xl:leading-[80px] text-center text-white mb-[15px]">
        No Data Available
      </h1>
      <p className="font-[600] text-[20px] leading-[25px] md:text-[30px] md:leading-[35px] text-center text-white mb-2">
        Sorry, there is nothing to display at the moment.
      </p>
      <div className='flex items-center justify-center my-[40px]'>
      <button
        onClick={() => navigate(-1)} 
        className="bg-[#EB3465] px-[30px] py-[15px] rounded-[60px] text-[15px] text-white"
      >
        Back To Pervious Page
      </button>
      </div>
    </div>
  );
};

export default NoDataPage;

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
      <h1 className=" font-[700] text-[25px] leading-[25px] sm:text-[22px] sm:leading-[40px] md:text-[30px] md:leading-[30px] text-center text-white mb-[15px]">
        No Data Available
      </h1>
      <p className="font-[600] text-[20px] leading-[25px] md:text-[20px] md:leading-[25px] text-center text-white mb-2">
        Sorry, there is nothing to display at the moment.
      </p>
      <div className='flex items-center justify-center my-[40px]'>
        <button
          onClick={() => navigate(-1)}
          className="bg-[#ff0062] hover:bg-[#4400c3]  px-[30px] py-[15px] rounded-[60px] text-[15px] text-white"
        >
          Back To Pervious Page
        </button>
      </div>
    </div>
  );
};

export default NoDataPage;

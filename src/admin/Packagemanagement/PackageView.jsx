import React, { useEffect, useState } from "react";
import Listing from "../../Api/Listing";
import toast from "react-hot-toast";
import ViewImage from "../../asstes/event.png";
import { IoStar } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../compontents/LoadingSpinner";
import { IoIosArrowBack } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function PackageView() {
  const { Id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [item, setLisitng] = useState("");
  const fetchData = async () => {
    setLoading(true);
    const main = new Listing();
    try {
      const response = await main.packageGetId({ Id });
      if (response && response.data) {
        setLisitng(response?.data?.data);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Id) {
      fetchData();
    }
  }, [Id]);
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div class="w-full  bg-[#1B1B1B] p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
            <div class="flex items-center justify-between mb-[20px]">

              <h3 class="text-[30px] font-semibold text-white mb-[5px]">
                <button type="button" onClick={() => (navigate(-1))} className="ml-4 mr-4 mt-5 mb-5 bg-[#EB3465] hover:bg-[#fb3a6e] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center ${loading && 'opacity-50 cursor-pointer"><IoIosArrowBack size={24} /></button>
                Package View
              </h3>

              <button
                className={`min-w-[110px] capitalize border font-[manrope] font-[600] text-[16px] text-center px-[15px] py-[6px] rounded-[60px] ${item?.package_status === "pending"
                  ? "border-[#B8A955] bg-[#B8A9551A] text-[#B8A955]"
                  : item?.package_status === "active"
                    ? "border-[#4CAF50] bg-[#4CAF501A] text-[#4CAF50]"
                    : item?.package_status === "inactive"
                      ? "border-[#EB3465] bg-[#EB34651A] text-[#EB3465]"
                      : ""
                  }`}
              >
                {item?.package_status}
              </button>
            </div>
            <div class="flex flex-wrap lg-flex-nowrap  gap-[20px]">
              <div class="w-[100%] md:w-[40%] lg:w-[40%]">
                <div>
                  <img
                    class="w-full object-cover max-h-[400px] rounded-[10px]"
                    src={item?.package_image ? item?.package_image : ViewImage}
                    alt="Sunset in the mountains"
                  />
                </div>
              </div>

              <div class="w-[100%] md:w-[55%] lg:w-[55%] pl-[0px] md:pl-[10px] lg:pl-[80px] xl:pl-[100px]">
                <div className="w-full mb-[20px] inline-flex flex-wrap justify-start gap-[10px]">
                  <span className="min-w-[110px] inline-flex  capitalize border font-[manrope] text-white font-[600] text-[16px] flex items-center px-[15px] py-[6px] rounded-[60px]">
                    Package Name: {item.package_name}
                  </span>
                  <button
                    className={`min-w-[110px] capitalize border font-[manrope] font-[600] text-[16px] text-center px-[15px] py-[6px] rounded-[60px] ${item?.package_status === "pending"
                      ? "border-[#B8A955] bg-[#B8A9551A] text-[#B8A955]"
                      : item?.package_status === "active"
                        ? "border-[#4CAF50] bg-[#4CAF501A] text-[#4CAF50]"
                        : item?.package_status === "inactive"
                          ? "border-[#EB3465] bg-[#EB34651A] text-[#EB3465]"
                          : ""
                      }`}
                  >
                    {item?.package_status}
                  </button>
                </div>
                <div className="w-full mb-[20px] inline-flex flex-wrap justify-start gap-[10px]">
                  <span className="min-w-[110px] inline-flex  capitalize border font-[manrope] text-white font-[600] text-[16px] flex items-center px-[15px] py-[6px] rounded-[60px]">
                    Package Subtitle: {item.package_subtitle}
                  </span>

                </div>
                <div className="w-full mb-[20px] inline-flex flex-wrap justify-start gap-[10px]">
                  <span className=" inline-flex  capitalize  font-[manrope] text-white font-[600] text-[16px] flex items-center px-[15px] py-[6px] rounded-[60px]">
                    {item.package_description}
                  </span>

                </div>
                <div className="w-full flex flex-wrap justify-start flex-row  items-center gap-[10px]">

                  <span className="inline-block bg-gray-200 rounded-full px-3 py-[9px] text-sm font-semibold text-gray-700">
                    Person: {item.package_people}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-[9px] text-sm font-semibold text-gray-700">
                    Total Price: ${item.package_price_max}-
                    {item?.package_price_min}
                  </span>
                </div>
              </div>
            </div>

            <h3 className="text-[20px] md:text-[25px] lg:text-[30px] font-semibold text-white mb-3 mt-[20px] lg:mt-[40px]">
              Services Provider Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
              {item?.package_services?.map((venue, index) => (
                <div
                  className="bg-[#1B1B1B] shadow-lg rounded-lg overflow-hidden flex flex-col border border-[#9999]"
                  key={index}
                >
                  <div className="relative">
                    <img
                      src={venue?.services_provider_image ? venue?.services_provider_image : ViewImage
                      }
                      alt={venue.name}
                      className="h-64 w-full object-cover rounded-t-lg"
                    />
                  </div>
                  <div className=" px-[10px] md:px-[20px] py-[20px]">
                    {/* Provider Name */}
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-white">
                        {venue.services_provider_name}
                      </h2>
                      <p className="text-white text-sm">
                        {venue.services_provider_phone}
                      </p>
                    </div>


                    {/* Rating and Price */}
                    <div className="flex items-center  justify-between mb-[15px] mt-[15px]">
                      <div className="flex items-center gap-2 h-9 text-white bg-[#000] rounded-full px-4 py-1 text-xs">
                        <IoStar size={12} className="text-[#ffff00] " />
                        {venue.services_provider_rating}
                      </div>

                      <div className="flex items-center gap-2 h-9 text-white bg-[#000] rounded-full px-4 py-1 text-xs leading-tight">
                        {venue.services_provider_categries}
                      </div>

                    </div>

                    {/* Package Categories */}
                    <p className="text-[#fff] text-[16px] mt-2 whitespace-normal overflow-hidden">
                      {venue.package_categories?.map((category, index) => (
                        <span
                          key={index}
                          className="bg-black text-white px-4 py-1 rounded-full  mr-2 mb-2 inline-block"
                        >
                          {category}
                        </span>
                      ))}
                    </p>

                    <p className="text-[#fff] text-[16px] flex gap-3 mt-2 whitespace-normal overflow-hidden">
                      <span className="text-[#4CAF50]"><FaMapMarkerAlt size={24} /></span>{" "}
                      {venue.package_address
                        ? venue.package_address
                        : venue?.vicinity}
                    </p>
                    {/* Description */}
                    <p className="text-[#fff] text-[14px] mt-2 whitespace-normal overflow-hidden ">
                      {venue.package_descrption}
                    </p>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

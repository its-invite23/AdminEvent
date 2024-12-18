import React, { useEffect, useState } from "react";
import Header from "../compontents/Header";
import Listing from "../../Api/Listing";
import LoadingSpinner from "../compontents/LoadingSpinner";
import moment from "moment";
import NoDataPage from "../compontents/NoDataPage"
import { Link } from "react-router-dom";
import { FaDollarSign, FaEuroSign, FaPoundSign } from "react-icons/fa";
import { TbCurrencyDirham } from "react-icons/tb";
import { IoMdSearch } from "react-icons/io";
import toast from "react-hot-toast";

export default function PaymentList() {
  const currencySymbol = {
    USD: <FaDollarSign size={18} className="inline" />,
    EUR: <FaEuroSign size={18} className="inline" />,
    AED: <TbCurrencyDirham size={18} className="inline" />,
    GBP: <FaPoundSign size={18} className="inline" />,
  };
  const [listing, setLisitng] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [hasMore, setHasMore] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [Id, setId] = useState("")

  const EnquiryList = async (pg, signal) => {
    try {
      if (pg === 1) {
        setLoading(true);
      }
      setLoadingButton(true);
      const main = new Listing();
      const response = await main.PaymentGet(page, limit, Id, { signal });
      if (response?.data?.data) {
        setLisitng((prevData) => {
          if (page === 1) {
            return response.data.data.payment;
          } else {
            return [...prevData, ...response.data.data.payment];
          }
        });
        setHasMore(response.data.data.nextPage !== null);
        setLoadingButton(false);
        setLoading(false);

      }
    } catch (error) {
      console.error("Error fetching package data:", error);
    } finally {
      setLoading(false);
      setLoadingButton(false);

    }
  };


  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    EnquiryList(page, signal);
    return () => controller.abort();
  }, [page, limit]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const handleChange = (e) => {
    setId(e.target.value);
  };

  
  useEffect(() => {
    if (Id && Id.length >= 3) {
      handleSubmit(); 
    } else if (!Id || Id?.length === 0) {
      EnquiryList(page); 
    }
  }, [Id]);


  const handleSubmit = async (e) => {
    try {
      await EnquiryList(page); // Call fetch function for the first page
    } catch (error) {
      console.error("Error during search:", error?.response?.data?.message || error.message);
      toast.error(error?.response?.data?.message || "Failed to fetch data.");
    }
  };

  return (
    <div className='w-full max-w-[100%]'>
      <Header title={"All Payment"} />
      <div className="w-full  bg-[#1B1B1B] p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
        <div className="flex flex-wrap justify-between items-center">
          <h2 className="font-manrope font-[600] text-white text-[18px] md:text-[24px] mb-[15px]">
            All Payment
          </h2>
          <div className="relative w-full max-w-[370px]">
            <IoMdSearch
              onClick={handleSubmit}
              size={24}
              className="absolute top-[10px] right-[10px] text-white cursor-pointer"
            />
            <input
              type="text"
              onChange={handleChange}
              name="Id"
              value={Id}
              className="w-full bg-[#1B1B1B] border border-[#37474F] p-[10px] pl-[20px] pr-[20px] rounded-[50px] text-white text-[15px] hover:outline-none focus:outline-none"
              placeholder="Search by client or package name"
            />
          </div>
        </div>
        <div className="overflow-auto">
          {loading ? (
            <LoadingSpinner />
          ) : (
            listing?.length < 0 ? (
              <NoDataPage />
            ) : (
              <table className="w-full table-auto whitespace-nowrap">
                <thead className="mb-[15px]">
                  <tr>

                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px]">S. No.</th>
                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px]">Transaction Date</th>
                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px]">Payment Id & Method</th>
                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px]">Package Name</th>
                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px]">Client Name</th>
                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px]">Amount</th>
                  </tr>
                </thead>

                {listing?.map((item, index) => (
                  <tr>
                    <td className="font-manrope font-[600] text-white text-[16px]  px-[10px] py-[16px]  border-b border-[#ffffff1a] text-left  ">{index + 1}</td>
                    <td className=" font-manrope font-[600] text-white text-[16px]  px-[10px] py-[16px]  border-b border-[#ffffff1a] text-left  ">
                      {moment(item?.created_at).format('MMMM Do, YYYY')}
                    </td>

                    <td className="capitalize font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a]">
                      {/* Username */}
                      <div className="mb-1 ">
                        {item?.payment_id || "N/A"}
                      </div>
                      <span
                        className="capitalize min-w-[110px] m-auto font-[manrope] text-white font-[600] text-[12px] lg:text-[14px] xl:text-[16px] text-left px-[15px] py-[6px] rounded-[60px]"
                      >
                        {item?.payment_type}
                      </span>
                    </td>

                    <td className="capitalize font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a]">
                      {/* Username */}
                        <Link
                          to={`/access-admin/booking/${item?.booking_id?._id}`}
                          className="text-white hover:text-pink-500"
                        >
                          {item?.booking_id?.package_name}
                        </Link>
                    </td>


                    <td className="font-manrope font-[600] text-white text-[16px]  px-[10px] py-[16px]  border-b border-[#ffffff1a] text-left capitalize  ">{item?.userId?.username}</td>

                      <td className="capitalize font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a]">
                      {/* Username */}
                      <div className="mb-1">
                      <span className="">
                        {currencySymbol[item?.currency]}
                      </span>
                      {item?.amount}
                      </div>
                      <span
                        className={`capitalize min-w-[110px] m-auto font-[manrope] font-[600] text-[12px] lg:text-[14px] xl:text-[16px] text-left ${item?.payment_status === "pending"
                          ? "  text-[#B8A955]"
                          : item?.payment_status === "success"
                            ? " text-[#4CAF50]"
                            : item?.payment_status === "failed"
                              ? " text-[#EB3465]"
                              : ""
                          }`}
                      >
                        {item?.payment_status}
                      </span>
                    </td>
                  </tr>
                ))}

              </table>
            ))

          }

        </div>
      </div>
      <div className="mt-[10px] mb-[10px] lg:mt-[10px] lg:mb-[20px] flex justify-center items-center">
        {
          listing?.length > 0 && !loading && hasMore && (
            <div className="mt-[10px] mb-[10px] lg:mt-[10px] lg:mb-[20px] flex justify-center items-center">
              <button
                onClick={loadMore}
                className="px-[20px] py-[15px] lg:px-[20px] lg:py-[15px] bg-[#B8A955] text-white font-manrope font-[700] text-[15px] rounded-md hover:bg-[#938539] transition duration-300">
                {loadingButton ? "Loading..." : "Load More"}

              </button>
            </div>
          )
        }
      </div>
    </div>
  )
}

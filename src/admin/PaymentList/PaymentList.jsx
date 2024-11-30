import React, { useEffect, useState } from "react";
import Header from "../compontents/Header";
import Listing from "../../Api/Listing";
import LoadingSpinner from "../compontents/LoadingSpinner";
import moment from "moment";
import NoDataPage from "../compontents/NoDataPage"
import { Link } from "react-router-dom";
import { FaDollarSign, FaEuroSign, FaPoundSign } from "react-icons/fa";
import { TbCurrencyDirham } from "react-icons/tb";
export default function PaymentList() {
  const currencySymbol = {
    USD: <FaDollarSign size={18} className="inline" />,
    EUR: <FaEuroSign size={18} className="inline" />,
    AED: <TbCurrencyDirham size={18} className="inline" />,
    GBP: <FaPoundSign size={18} className="inline" />,
  };
  const [data, setdata] = useState("")
  const [listing, setLisitng] = useState([]);
  console.log("listing", listing)
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [hasMore, setHasMore] = useState(true);
  const EnquiryList = async (signal) => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.PaymentGet(page, limit, { signal });
      if (response?.data?.data) {
        setLisitng((prevData) => {
          if (page === 1) {
            return response.data.data.payment;
          } else {
            return [...prevData, ...response.data.data.payment];
          }
        });
        setHasMore(response.data.data.nextPage !== null);
      }
    } catch (error) {
      console.error("Error fetching package data:", error);
    } finally {
      setLoading(false);
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


  return (
    <div className='w-full max-w-[100%]'>
      <Header title={"All Payment"} type={"payment"} data={data} setData={setdata} />
      <div className="w-full  bg-[#1B1B1B] p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
        <h2 className="font-manrope font-[600] text-white text-[18px] md:text-[24px] mb-[15px]">All Payments</h2>
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
                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Transaction Date</th>
                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">Payment Id</th>
                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">Booking ID</th>
                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Client Name</th>
                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Amount</th>
                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Payment Method</th>
                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Status</th>
                  </tr>
                </thead>
                {data ? (
                  <tr>
                    <td className="font-manrope font-[600] text-white text-[16px]  px-[10px] py-[16px]  border-b border-[#ffffff1a] text-left  ">{1}</td>
                    <td className=" font-manrope font-[600] text-white text-[16px]  px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                      {moment(data?.created_at).format('MMMM Do, YYYY')}
                    </td>
                    <td className="font-manrope font-[600] text-white text-[16px]  px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">{data?._id || "N/A"}</td>
                    <td className="font-manrope font-[600] text-white text-[16px]  px-[10px] py-[16px] hover:text-[#EB3465]  border-b border-[#ffffff1a] text-center  ">
                      <Link to={`/access-admin/booking/${data?.booking_id}`} >
                        {data?.booking_id}
                      </Link>
                    </td>
                    <td className="font-manrope font-[600] text-white text-[16px]  px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">{data?.userId?.username}</td>
                    <td className="font-manrope font-[600] text-white text-[16px]  px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                      <span className="">
                        {currencySymbol[data?.currency]}
                      </span>
                      {data?.amount}</td>
                    <td className="font-manrope font-[600] text-white text-[16px]  px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">{data?.payment_type} </td>
                    <td className=" font-manrope font-[600] text-white text-[16px]  px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                      <button
                        className={`min-w-[110px] capitalize  m-auto border font-[manrope] font-[600] text-[16px] text-center px-[15px] py-[6px] rounded-[60px] ${data?.payment_status
                          === 'pending'
                          ? 'border-[#B8A955] bg-[#B8A9551A] text-[#B8A955]'
                          : data?.payment_status
                            === 'success'
                            ? 'border-[#4CAF50] bg-[#4CAF501A] text-[#4CAF50]'
                            : data?.payment_status
                              === 'failed'
                              ? 'border-[#EB3465] bg-[#EB34651A] text-[#EB3465]'
                              : ''
                          }`}
                      >
                        {data?.payment_status}
                      </button>
                    </td>


                  </tr>
                ) : (<>
                  {listing?.map((item, index) => (
                    <tr>
                      <td className="font-manrope font-[600] text-white text-[16px]  px-[10px] py-[16px]  border-b border-[#ffffff1a] text-left  ">{index + 1}</td>
                      <td className=" font-manrope font-[600] text-white text-[16px]  px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                        {moment(item?.created_at).format('MMMM Do, YYYY')}
                      </td>
                      <td className="font-manrope font-[600] text-white text-[16px]  px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">{item?._id || "N/A"}</td>
                      <td className="font-manrope font-[600] text-white text-[16px]  px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                        <Link to={`/access-admin/booking/${item?.booking_id}`} className="text-white">
                          {item?.booking_id}
                        </Link></td>
                      <td className="font-manrope font-[600] text-white text-[16px]  px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">{item?.userId?.username}</td>
                      <td className="font-manrope font-[600] text-white text-[16px]  px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                        <span className="">
                          {currencySymbol[item?.currency]}
                        </span>
                        {item?.amount}</td>
                      <td className="font-manrope font-[600] text-white text-[16px]  px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">{item?.payment_type} </td>
                      <td className=" font-manrope font-[600] text-white text-[16px]  px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                        <button
                          className={`min-w-[110px] capitalize  m-auto border font-[manrope] font-[600] text-[16px] text-center px-[15px] py-[6px] rounded-[60px] ${item?.payment_status
                            === 'pending'
                            ? 'border-[#B8A955] bg-[#B8A9551A] text-[#B8A955]'
                            : item?.payment_status
                              === 'success'
                              ? 'border-[#4CAF50] bg-[#4CAF501A] text-[#4CAF50]'
                              : item?.payment_status
                                === 'failed'
                                ? 'border-[#EB3465] bg-[#EB34651A] text-[#EB3465]'
                                : ''
                            }`}
                        >
                          {item?.payment_status}
                        </button>
                      </td>

                    </tr>
                  ))}
                </>
                )}
              </table>
            ))

          }

        </div>
      </div>
      {
        hasMore && (
          <div className="mt-[40px] mb-[50px] lg:mt-[60px] lg:mb-[100px] flex justify-center items-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-[40px] py-[15px] lg:px-[50px] lg:py-[18px] bg-[#B8A955] text-white font-manrope font-[700] text-[18px] rounded-[3px] hover:bg-[#938539] transition duration-300">
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )
      }
    </div>
  )
}

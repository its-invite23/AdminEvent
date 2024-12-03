import React, { useEffect, useState } from "react";
import Header from "../compontents/Header";
import Listing from "../../Api/Listing";
import LoadingSpinner from "../compontents/LoadingSpinner";
import NoDataPage from "../compontents/NoDataPage";
import { Link } from "react-router-dom";
import { FaDollarSign, FaEuroSign, FaPoundSign } from "react-icons/fa";
import { TbCurrencyDirham } from "react-icons/tb";

export default function BookingList() {
  const [data, setdata] = useState("")
  const [listing, setLisitng] = useState(data || []);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [hasMore, setHasMore] = useState(true);
  const currencySymbol = {
    USD: <FaDollarSign size={18} className="inline" />,
    EUR: <FaEuroSign size={18} className="inline" />,
    AED: <TbCurrencyDirham size={18} className="inline" />,
    GBP: <FaPoundSign size={18} className="inline" />,
  };
  const bookignGet = async (pg, signal) => {
    try {
      if (pg == 1) {
        setLoading(true);
      }
      setLoadingButton(true);
      const main = new Listing();
      const response = await main.BookingGet(page, limit, { signal });
      if (response?.data?.data?.bookingdata) {
        setLisitng((prevData) => {
          if (page === 1) {
            return response.data.data.bookingdata;
          } else {
            return [...prevData, ...response.data.data.bookingdata];
          }
        });
        setHasMore(response.data.data.nextPage !== null);
        setLoadingButton(false);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching package data:", error);
    } finally {
      setLoadingButton(false);
      setLoading(false);
    }
  };
  console.log("data", data)
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    bookignGet(page, signal);
    return () => controller.abort();
  }, [page, limit]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="w-full max-w-[100%]">
      <Header title={"All Booking"} type={"booking"} data={data} setData={setdata} />
      <div className="w-full  bg-[#1B1B1B] p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
        <h2 className="font-manrope font-[600] text-white text-[18px] md:text-[24px] mb-[15px]">
          All Bookings
        </h2>
        <div className="overflow-auto">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <table className="w-full table-auto whitespace-nowrap">
              <thead className="mb-[15px]">
                <tr>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">
                    S. No.
                  </th>

                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px] ">
                    Event Type
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] ">
                    Client Name
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] ">
                    No.of Attendees
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] ">
                    Total Price
                  </th>
                  <th className="max-w-[200px] whitespace-nowrap border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase  p-[10px] text-center">
                    Location
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] ">
                    Booking Status
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] ">
                    Actions
                  </th>
                </tr>
              </thead>
              {data

                ? (
                  <>
                    {data?.length > 0 ? (
                      <NoDataPage />
                    ) : (
                      <tr>
                        <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a]  text-center ">
                          {1}
                        </td>

                        <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                          {data?.package_name}
                        </td>
                        <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                          {data?.userId?.username}
                        </td>
                        <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                          {data?.attendees}
                        </td>
                        <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                          {data?.totalPrice && (
                            <span className="flex items-center">
                              <span className="mr-1 flex items-center">{currencySymbol[data?.CurrencyCode]}</span>
                              <span>{data?.totalPrice}</span>
                            </span>
                          )}


                        </td>
                        <td className="    whitespace-normal font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                          <span className="address">

                            {data?.location}
                          </span>
                        </td>
                        <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                          <button
                            className={`min-w-[110px] capitalize  m-auto border font-[manrope] font-[600] text-[16px] text-center px-[15px] py-[6px] rounded-[60px] ${data?.status === "pending"
                              ? "border-[#B8A955] bg-[#B8A9551A] text-[#B8A955]"
                              : data?.status === "approve"
                                ? "border-[#4CAF50] bg-[#4CAF501A] text-[#4CAF50]"
                                : data?.status === "reject"
                                  ? "border-[#EB3465] bg-[#EB34651A] text-[#EB3465]"
                                  : ""
                              }`}
                          >
                            {data?.status}
                          </button>
                        </td>

                        <td className=" font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                          {/* <button className='text-center'>
  <BsThreeDots size={24} />
</button> */}
                          <div className="p-4">
                            <Link to={`/access-admin/booking/${data?._id}`} className="">
                              <button className=" border capitalize  m-auto  font-[manrope] font-[600] text-[16px] text-center px-[15px] py-[6px] rounded-[60px]">
                                View
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ) : (
                  <>
                    {
                      listing?.length < 0 ? (
                        <NoDataPage />
                      ) : (
                        listing &&
                        listing?.map((item, index) => (
                          <tr>
                            <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a]   ">
                              {index + 1}
                            </td>

                            <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                              {item?.package_name}
                            </td>
                            <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                              {item?.userId?.username}
                            </td>
                            <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                              {item?.attendees}
                            </td>
                            <td className=" font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px] border-b border-[#ffffff1a] text-center ">
                              {item?.totalPrice && (
                                <span className="">
                                  {currencySymbol[item?.CurrencyCode]}
                                </span>
                              )}
                              {item?.totalPrice}

                            </td>
                            <td className="    whitespace-normal font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                              <span className="address">

                                {item?.location}
                              </span>
                            </td>
                            <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                              <button
                                className={`min-w-[110px] capitalize  m-auto border font-[manrope] font-[600] text-[16px] text-center px-[15px] py-[6px] rounded-[60px] ${item?.status === "pending"
                                  ? "border-[#B8A955] bg-[#B8A9551A] text-[#B8A955]"
                                  : item?.status === "approved"
                                    ? "border-[#4CAF50] bg-[#4CAF501A] text-[#4CAF50]"
                                    : item?.status === "rejected"
                                      ? "border-[#EB3465] bg-[#EB34651A] text-[#EB3465]"
                                      : ""
                                  }`}
                              >
                                {item?.status}
                              </button>
                            </td>

                            <td className=" font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                              {/* <button className='text-center'>
                            <BsThreeDots size={24} />
                          </button> */}
                              <div className="p-4">
                                <Link to={`/access-admin/booking/${item?._id}`} className="">
                                  <button className=" border capitalize  m-auto  font-[manrope] font-[600] text-[16px] text-center px-[15px] py-[6px] rounded-[60px]">
                                    View
                                  </button>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                  </>
                )}

            </table>
          )}
        </div>
      </div>
      {
        listing?.length > 0 && !loading && hasMore && (
          <div className="mt-[40px] mb-[50px] lg:mt-[60px] lg:mb-[100px] flex justify-center items-center">
            <button
              onClick={loadMore}
              className="px-[40px] py-[15px] lg:px-[50px] lg:py-[18px] bg-[#B8A955] text-white font-manrope font-[700] text-[18px] rounded-[3px] hover:bg-[#938539] transition duration-300">
              {loadingButton ? "Loading..." : "Load More"}

            </button>
          </div>
        )
      }
    </div>
  );
}

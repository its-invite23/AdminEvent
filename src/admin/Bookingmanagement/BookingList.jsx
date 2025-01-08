import React, { useEffect, useState } from "react";
import Header from "../compontents/Header";
import Listing from "../../Api/Listing";
import LoadingSpinner from "../compontents/LoadingSpinner";
import NoDataPage from "../compontents/NoDataPage";
import { Link } from "react-router-dom";
import { FaDollarSign, FaEuroSign, FaPoundSign } from "react-icons/fa";
import { TbCurrencyDirham } from "react-icons/tb";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import toast from 'react-hot-toast';
import moment from "moment";
import Valuedata from "../compontents/Valuedata";
export default function BookingList() {
  const [listing, setLisitng] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [Id, setId] = useState("")
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [hasMore, setHasMore] = useState(true);

  const currencySymbol = {
    USD: <FaDollarSign size={18} className="inline" />,
    EUR: <FaEuroSign size={18} className="inline" />,
    AED: <TbCurrencyDirham size={18} className="inline" />,
    GBP: <FaPoundSign size={18} className="inline" />,
  };

  const bookignGet = async (pg = 1, signal) => {
    try {
      setLoading(pg === 1); // Show loading spinner for the first page
      setLoadingButton(true);

      const main = new Listing();
      const response = await main.BookingGet(pg, limit, Id || "", signal);

      if (response?.data?.data?.bookingdata) {
        setLisitng((prevData) => {
          if (pg === 1) {
            return response.data.data.bookingdata; // Replace data for new search
          } else {
            return [...prevData, ...response.data.data.bookingdata]; // Append data for pagination
          }
        });
        setHasMore(response.data.data.nextPage !== null);
      } else {
        console.warn("Unexpected response format:", response);
        toast.error("Unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error?.response?.data?.message || error.message);
      toast.error(error?.response?.data?.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
      setLoadingButton(false);
    }
  };

  const handleChange = (e) => {
    setId(e.target.value);
  };

  useEffect(() => {
    if (Id && Id.length >= 3) {
      handleSubmit();
    } else if (!Id || Id?.length === 0) {
      bookignGet(page);
    }
  }, [Id]);

  const handleSubmit = async (e) => {
    setPage(1);
    try {
      await bookignGet(1);
    } catch (error) {
      console.error("Error during search:", error?.response?.data?.message || error.message);
      toast.error(error?.response?.data?.message || "Failed to fetch data.");
    }
  };

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

  const truncateText = (text,) => {
    if (text.length <= 15) {
      return text;
    }
    return text.slice(0, 15) + '...';
  };

  return (
    <div className="w-full max-w-[100%]">
      <Header title={"All Booking"} />
      <div className="w-full  bg-[#1B1B1B] p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
        <div className="flex flex-wrap justify-between items-center">
          <h2 className="font-manrope font-[600] text-white text-[18px] md:text-[24px] mb-[15px]">
            All Bookings
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
            <table className="w-full table-auto whitespace-nowrap">
              <thead className="mb-[15px]">
                <tr>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left  p-[10px] mb-[10px]">
                    S. No.
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left  p-[10px] mb-[10px]">
                   Date
                  </th>

                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left  p-[10px] mb-[10px] ">
                    Event Type
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left  p-[10px] ">
                    Name & Price
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left  p-[10px] ">
                    No.of Attendees
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left  p-[10px] ">
                    Loaction
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left  p-[10px] ">
                    Action
                  </th>

                </tr>
              </thead>
              {
                <>
                  {
                    listing?.length < 0 ? (
                      <NoDataPage />
                    ) : (
                      listing &&
                      listing?.map((item, index) => (
                        <tr>
                          <td className="font-manrope font-[600] text-white text-[16px] text-left  px-[10px] py-[16px]  border-b border-[#ffffff1a]   ">
                            {index + 1}
                          </td>

                          <td className="font-manrope font-[600] text-white text-[16px] text-left  px-[10px] py-[16px]  border-b border-[#ffffff1a]   ">
                            {moment(item?.created_at).format('MMMM Do, YYYY')}                          </td>


                          <td className="capitalize font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-left  px-[10px] py-[16px] border-b border-[#ffffff1a]">
                            {/* Username */}
                            <div className="mb-2 ">
                              <Link
                                to={`/access-admin/booking/${item?._id}`}
                                className="text-white hover:text-pink-500"
                              >
                                {
                                  truncateText(
                                    item?.package_name?.replaceAll("_", " ")
                                  )
                                }
                              </Link>
                            </div>
                            <span
                              className={`capitalize  font-[manrope] font-[600] text-[12px] lg:text-[14px] xl:text-[16px] text-left   mt-2 ${item?.status === "pending"
                                ? "  text-[#B8A955]"
                                : item?.status === "approved"
                                  ? "  text-[#4CAF50]"
                                  : item?.status === "rejected"
                                    ? "  text-[#EB3465]"
                                    : ""
                                }`}
                            >
                              {item?.status}
                            </span>
                          </td>

                          <td className="capitalize font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a]">
                            {/* Username */}
                            <div className="text-left">{item?.userId?.username}</div>
                            <span
                              className="capitalize font-manrope font-[600] text-[12px] lg:text-[14px] xl:text-[16px] text-left  py-[6px] rounded-[60px] mt-2"
                            >
                              {item?.totalPrice && (
                                <span className="text-left">
<Valuedata amount={item?.totalPrice?.toFixed(2)} currency={item?.CurrencyCode} />
                                </span>
                              )}
                            </span>
                          </td>

                          <td className="font-manrope font-[600] text-white text-[16px] text-left  px-[10px] py-[16px]  border-b border-[#ffffff1a] text-left   ">
                            {item?.attendees}
                          </td>
                          <td className="whitespace-normal font-manrope font-[600] text-white text-[16px] text-left  px-[10px] py-[16px]  border-b border-[#ffffff1a] text-left   ">
                            <span className="address">

                              {item?.location}
                            </span>
                          </td>

                          <td className=" font-manrope font-[600] text-white text-[16px] text-left  px-[10px] py-[16px]  border-b border-[#ffffff1a] text-left   ">
                            <div className="p-4">
                              <Link to={`/access-admin/booking/${item?._id}`} className="">
                                <MdOutlineRemoveRedEye size={24} />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                </>
              }

            </table>
          )}
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
  );
}

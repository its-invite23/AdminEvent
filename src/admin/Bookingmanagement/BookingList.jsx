import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Header from "../compontents/Header";
import Listing from "../../Api/Listing";
import LoadingSpinner from "../compontents/LoadingSpinner";
import NoDataPage from "../compontents/NoDataPage";
import BookingView from "./BookingView";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function BookingList() {
  const [listing, setLisitng] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [hasMore, setHasMore] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const bookignGet = async (signal) => {
    try {
      setLoading(true);
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
      }
    } catch (error) {
      console.error("Error fetching package data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleClose= ()=>{
    setIsOpen(false);
  }

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    bookignGet(page, signal);
    return () => controller.abort();
  }, [page, limit]);
  return (
    <div className="w-full max-w-[100%]">
      <Header title={"All Booking"} />
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
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px]">
                    S. No.
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px] text-center">
                    Booking Id
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px] text-center">
                    Event Type
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] text-center">
                    Client Name
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] text-center">
                    No.of Attendees
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] text-center">
                    Total Price
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] text-center">
                    Location
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] text-center">
                    Booking Status
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              {listing?.length < 0 ? (
                <NoDataPage />
              ) : (
                listing &&
                listing?.map((item, index) => (
                  <tr>
                    <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a]   ">
                      {index + 1}
                    </td>
                    <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                      {item?._id}
                    </td>
                    <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                      {item?.package_name}
                    </td>
                    <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                      {item?.userId?.username}
                    </td>
                    <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                      {item?.attendees}
                    </td>
                    <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                      {item?.totalPrice}
                    </td>
                    <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                      {item?.location}
                    </td>
                    <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                      <button
                        className={`min-w-[110px] capitalize  m-auto border font-[manrope] font-[600] text-[16px] text-center px-[15px] py-[6px] rounded-[60px] ${
                          item?.status === "pending"
                            ? "border-[#B8A955] bg-[#B8A9551A] text-[#B8A955]"
                            : item?.status === "approve"
                            ? "border-[#4CAF50] bg-[#4CAF501A] text-[#4CAF50]"
                            : item?.status === "reject"
                            ? "border-[#EB3465] bg-[#EB34651A] text-[#EB3465]"
                            : ""
                        }`}
                      >
                        {item?.status}
                      </button>
                    </td>

                    <td className=" font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">
                      {/* <button className='text-center'>
                        <BsThreeDots size={24} />
                      </button> */}
                      <div className="p-4">
                        <Link to={`/access-admin/booking/${item?._id}`} className="">
                          <BsThreeDotsVertical size={24} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

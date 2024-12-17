import React, { useEffect, useState } from "react";
import Header from "../compontents/Header";
import Listing from "../../Api/Listing";
import LoadingSpinner from "../compontents/LoadingSpinner";
import moment from "moment";
import NoDataPage from "../compontents/NoDataPage"
import EnquiryReplyMessage from "./EnquiryReplyMessage";
import ViewMessage from "../compontents/ViewMessage";

export default function Enquiry() {
  const [listing, setLisitng] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [hasMore, setHasMore] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  const EnquiryList = async (pg, signal) => {
    try {
      if (pg == 1) {
        setLoading(true);
      }
      setLoadingButton(true);
      const main = new Listing();
      const response = await main.enquiryGet(page, limit, { signal });
      if (response?.data?.data?.Enquiryget) {
        setLisitng((prevData) => {
          if (page === 1) {
            return response.data.data.Enquiryget;
          } else {
            return [...prevData, ...response.data.data.Enquiryget];
          }
        });
        setHasMore(response.data.data.nextPage !== null);
        setLoading(false);
        setLoadingButton(false);
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



  return (
    <div className="w-full max-w-[100%]">
      <Header title={"All Inquiries"} />
      <div className="w-full  bg-[#1B1B1B] p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-[20px]">
            <h2 className="font-manrope font-[600] text-white text-[18px] md:text-[24px] mb-[0]">
              Recent Inquiries
            </h2>
          </div>
        </div>
        <div className="overflow-auto">
          {loading ? (
            <LoadingSpinner />
          ) : (
            listing?.length === 0 ? (
              <NoDataPage />
            ) : (
              <table className="w-full table-auto whitespace-nowrap">
                <thead className="mb-[15px]">
                  <tr>
                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px]">S.No.</th>
                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left   p-[10px]">Date</th>
                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px]">Name & Phone Number</th>
                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left   p-[10px]">Email</th>
                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left   p-[10px]">No. of attendees</th>
                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left   p-[10px]">Event Name & Type</th>
                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left   p-[10px]">Enquiry Status</th>
                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left   p-[10px]">Message</th>

                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left   p-[10px]">Action</th>
                    <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left   p-[10px]">Reply Message</th>
                  </tr>
                </thead>
                {listing && listing?.map((item, index) => (
                  <tr key={index}>
                    <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a]">{index + 1}</td>
                    <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-left   ">{moment(item?.created_at).format('DD-MMM-YYYY')}</td>
                    <td className="capitalize font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-left   px-[10px] py-[16px] border-b border-[#ffffff1a]">
                      {/* Username */}
                      <div className="mb-2 ">
                        {item?.name}
                      </div>
                      {item?.phone_code && (`+${item?.phone_code}`)
                      } {item?.phone_number}
                    </td>
                    <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-left   ">{item?.email}</td>
                    <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-left    ">{item?.attendees}</td>
                    <td className="capitalize font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-left   px-[10px] py-[16px] border-b border-[#ffffff1a]">
                      {/* Username */}
                      <div className="mb-2 ">
                        {item?.eventname}
                      </div>
                      {item?.event_type}
                    </td>
                    <td className={`capitalize	 font-manrope font-[600] text-[16px] text-left px-[10px] py-[16px] border-b text-left   border-[#ffffff1a] ${item?.enquire_status === 'pending' ? 'text-yellow-500' :
                      item?.enquire_status === 'active' ? 'text-green-500' :
                        item?.enquire_status === 'inactive' ? 'text-red-500' :
                          'text-white'
                      }`}>
                      {item?.enquire_status === "pending" && "Pending"}
                      {item?.enquire_status === "active" && "Accepted"}
                      {item?.enquire_status === "inactive" && "Rejected"}

                    </td>

                    <td className="font-manrope whitespace-pre-wrap    font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a]">
                      <ViewMessage text={item.message} />
                    </td>
                    <td className=" text-left   font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a]  ">
                      <div className="flex items-center justify-center w-full gap-[10px]">
                        {/* success */}
                        <div className="flex items-center justify-center rounded-[60px] w-[30px] h-[30px] bg-[#ffffff1a]">
                          <EnquiryReplyMessage EnquiryList={EnquiryList} item={item} enquire_status={"active"} />
                          {/* <FaCheck className="text-[#4CAF50] text-[15px]" /> */}
                        </div>
                        {/* Cancel */}
                        <div className="flex items-center justify-center rounded-[60px] w-[30px] h-[30px] bg-[#ffffff1a]">
                          <EnquiryReplyMessage EnquiryList={EnquiryList} item={item} enquire_status={"inactive"} />
                        </div>
                      </div>
                    </td>
                    <td className="font-manrope whitespace-pre-wrap    font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a]">
                      <ViewMessage text={item.reply_message} />
                    </td>
                  </tr>
                ))}
              </table>
            )

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


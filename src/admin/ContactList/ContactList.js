import React, { useEffect, useState } from "react";
import Header from "../compontents/Header";
import Listing from "../../Api/Listing";
import LoadingSpinner from "../compontents/LoadingSpinner";
import ReplyMessage from "../compontents/ReplyMessage.jsx";

import NoDataPage from "../compontents/NoDataPage";
import ViewMessage from "../compontents/ViewMessage.jsx";

export default function ContactList() {
  const [listing, setLisitng] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [hasMore, setHasMore] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  const ContactUsGet = async (pg, signal) => {
    try {
      if (pg == 1) {
        setLoading(true);
      }
      setLoadingButton(true);
      const main = new Listing();
      const response = await main.contactGet(page, limit, { signal });
      if (response?.data?.data?.Contactget) {
        setLisitng((prevData) => {
          if (page === 1) {
            return response.data.data.Contactget;
          } else {
            return [...prevData, ...response.data.data.Contactget];
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
    ContactUsGet(page, signal);
    return () => controller.abort();
  }, [page, limit]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };



  return (
    <div className="w-full max-w-[100%]">
      <Header title={"Contact Us"} />
      <div className="w-full  bg-[#1B1B1B] p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-[20px]">
            <h2 className="font-manrope font-[600] text-white text-[18px] md:text-[24px] mb-[0]">
              Contact Us Message
            </h2>
          </div>
        </div>
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
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px]">
                    Name
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">
                    Email
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">
                    Phone Number
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">
                    Message
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">
                    Message Status
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">
                    Actions
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">
                    Comment
                  </th>
                </tr>
              </thead>
              <tbody>
                {listing?.packagegetdata?.length < 0 ? (
                  <NoDataPage />
                ) : (
                  listing &&
                  listing?.map((item, index) => (
                    <tr key={index}>
                      <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-left">
                        {index + 1}
                      </td>
                      <td className="capitalize font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] ">
                        {item?.name}
                      </td>
                      <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                        {item?.email}
                      </td>
                      <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                        {item?.phone_code && (`+${item?.phone_code}`)
                        } {item?.phone_number}
                      </td>
                      <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                        <ViewMessage text={item?.message} />
                      </td>

                      <td className={`capitalize	 font-manrope font-[600] text-[16px] text-left px-[10px] py-[16px] border-b text-center border-[#ffffff1a] ${item?.contact_status === 'pending' ? 'text-yellow-500' :
                        item?.contact_status === 'read' ? 'text-green-500' :
                          item?.contact_status === 'unread' ? 'text-red-500' :
                            'text-white'
                        }`}>
                        {item?.contact_status}
                      </td>
                      <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                        <ReplyMessage item={item} ContactUsGet={ContactUsGet} />
                      </td>
                      <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                        {item?.reply_message &&
                          <ViewMessage text={item?.reply_message} step={1} />
                        }

                      </td>
                    </tr>
                  ))
                )}
                { }
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="mt-[40px] mb-[50px] lg:mt-[60px] lg:mb-[100px] flex justify-center items-center">
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
    </div>
  );
}

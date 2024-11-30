import React, { useEffect, useState } from "react";
import Header from "../compontents/Header";
import Filter from "./Filter";
import Listing from "../../Api/Listing";
import toast from "react-hot-toast";
import Delete from "../compontents/Delete";
import LoadingSpinner from "../compontents/LoadingSpinner";
import NoDataPage from "../compontents/NoDataPage";
import moment from "moment";

export default function UserList() {
  const [listing, setLisitng] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [hasMore, setHasMore] = useState(true);
  const users = async (signal) => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.profile(page, limit, { signal });
      if (response?.data?.data?.users) {
        setLisitng((prevData) => {
          if (page === 1) {
            return response.data.data.users;
          } else {
            return [...prevData, ...response.data.data.users];
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
    users(page, signal);
    return () => controller.abort();
  }, [page, limit]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };


  const handleActiveStatues = (Id, status) => {
    setLoading(true);
    const main = new Listing();
    const response = main.userupdatedstatus({ _id: Id, user_status: status });
    response
      .then((res) => {
        if (res && res?.data?.status) {
          toast.success(res.data.message);
          users(page);

        } else {
          toast.error(res.data?.message || "Something went wrong.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error?.response?.data?.message);
        toast.error(error?.response?.data?.message || "An error occurred.");
        setLoading(false);
      });
  };
  return (
    <div className="w-full max-w-[100%]">
      <Header title={"All Users"} />
      <div className="w-full  bg-[#1B1B1B] p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
        <Filter setLisitng={setLisitng} />
        {loading ? (
          <LoadingSpinner />
        ) : (

          <div className="overflow-auto">
            {listing?.length === 0 ? (
              <NoDataPage />
            ) : (
              <table className="w-full table-auto whitespace-nowrap">
                <thead className="mb-[15px]">
                  <tr>
                    <th className="border-b border-[#ffffff59] font-manrope  text-[12px] lg:text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px]">
                      S.No.
                    </th>
                    <th className="border-b border-[#ffffff59] font-manrope  text-[12px] lg:text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px] text-center ">
                      Name
                    </th>
                    <th className="border-b border-[#ffffff59] font-manrope  text-[12px] lg:text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">
                      Email
                    </th>
                    <th className="border-b border-[#ffffff59] font-manrope  text-[12px] lg:text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">
                      DOB
                    </th>
                    <th className="border-b border-[#ffffff59] font-manrope  text-[12px] lg:text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">
                      Country
                    </th>
                    <th className="border-b border-[#ffffff59] font-manrope  text-[12px] lg:text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">
                      city
                    </th>
                    <th className=" w-[380px] min-w-[380px]  border-b border-[#ffffff59] font-manrope text-[12px] lg:text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">
                      Address
                    </th>
                    <th className="border-b border-[#ffffff59] font-manrope  text-[12px] lg:text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">
                      Contact
                    </th>
                    <th className="border-b border-[#ffffff59] font-manrope  text-[12px] lg:text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">
                      Enquiry Count
                    </th>
                    <th className="border-b border-[#ffffff59] font-manrope  text-[12px] lg:text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">
                      Status
                    </th>
                    {/* <th className="border-b border-[#ffffff59] font-manrope  text-[12px] lg:text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">
                      Action
                    </th> */}

                  </tr>
                </thead>
                {
                  listing &&
                  listing?.map((item, index) => (
                    <tr key={index}>
                      <td className="font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a]">
                        {index + 1}
                      </td>

                      <td className="font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-center px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                        {item?.username}
                      </td>
                      <td className="font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-center px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                        {item?.email}
                      </td>
                      <td className="font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-center px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                        {
                          item?.DOB ? (
                            moment(item?.DOB).format('DD MMM YYYY')
                          ) : ("N/A")
                        }
                      </td>
                      <td className="font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-center px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                        {item?.country
                        }
                      </td>
                      <td className="font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-center px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                        {item?.city}
                      </td>
                      <td className="font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-center px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                        <div className="felx  justify-center  whitespace-normal break-words">
                          {item?.address}
                        </div>
                      </td>
                      <td className="font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-center px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                        {item?.phone_code
                        } {item?.phone_number}
                      </td>
                      <td className="font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-center px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                        {item?.enquiry_count}
                      </td>

                      <td className="font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-center px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                        <button
                          onClick={() => handleActiveStatues(item?._id, item?.user_status)} // Updated to use arrow function
                          className={`capitalize min-w-[110px] m-auto border font-[manrope] font-[600] text-[12px] lg:text-[14px] xl:text-[16px] text-center px-[15px] py-[6px] rounded-[60px] 
                                           ${item?.user_status === 'active'
                              ? 'border-[#4CAF50] bg-[#4CAF501A] text-[#4CAF50]'
                              : 'border-[#FF0000] bg-[#FF00001A] text-[#FF0000]'}`}
                        >
                          {item?.user_status}
                        </button>
                      </td>

                      {/* <td className="font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-center px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                        <Delete Id={item?._id} step={2} users={users} className="flex justify-center" />
                      </td> */}
                    </tr>
                  ))
                }
              </table>
            )}


          </div>
        )}
      </div>
      <div className="mt-[40px] mb-[50px] lg:mt-[60px] lg:mb-[100px] flex justify-center items-center">
        {
          hasMore && (
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-[40px] py-[15px] lg:px-[50px] lg:py-[18px] bg-[#B8A955] text-white font-manrope font-[700] text-[18px] rounded-[3px] hover:bg-[#938539] transition duration-300">
              {loading ? "Loading..." : "Load More"}
            </button>
          )
        }
      </div>
    </div>
  );
}

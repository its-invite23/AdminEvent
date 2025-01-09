import React, { useEffect, useState } from "react";
import Header from "../compontents/Header";
import Listing from "../../Api/Listing";
import toast from "react-hot-toast";
import LoadingSpinner from "../compontents/LoadingSpinner";
import NoDataPage from "../compontents/NoDataPage";
import moment from "moment";
import { IoMdSearch } from "react-icons/io";

export default function UserList() {
  const [listing, setLisitng] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [hasMore, setHasMore] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [Id, setId] = useState("")

  const users = async (pg = 1, signal) => {
    try {
      setLoading(pg === 1); // Show loading spinner for the first page
      setLoadingButton(true);

      const main = new Listing();
      const response = await main.profile(pg, limit, Id || "", signal);

      if (response?.data?.data?.userData) {
        setLisitng((prevData) => {
          if (pg === 1) {
            return response.data.data.userData; // Replace data for new search
          } else {
            return [...prevData, ...response.data.data.userData]; // Append data for pagination
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
  useEffect(() => {
    if (Id && Id.length >= 3) {
      handleSubmit();
    } else if (!Id || Id?.length === 0) {
      users(page);
    }
  }, [Id]);

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


  const handleChanges = (e) => {
    setId(e.target.value);
  };
  const handleSubmit = async (e) => {
    setPage(1);
    try {
      await users(1);
    } catch (error) {
      console.error("Error during search:", error?.response?.data?.message || error.message);
      toast.error(error?.response?.data?.message || "Failed to fetch data.");
    }
  };
  return (
    <div className="w-full max-w-[100%]">
      <Header title={"All Users"} />
      <div className="w-full  bg-[#1B1B1B] p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
        <div className="flex flex-wrap justify-between items-center">
          <h2 className="font-manrope font-[600] text-white text-[18px] md:text-[24px] mb-[15px]">
            All Users
          </h2>
          <div className="relative w-full max-w-[370px]">
            <IoMdSearch
              onClick={handleSubmit}
              size={24}
              className="absolute top-[10px] right-[10px] text-white cursor-pointer"
            />
            <input
              type="text"
              onChange={handleChanges}
              name="Id"
              value={Id}
              className="w-full bg-[#1B1B1B] border border-[#37474F] p-[10px] pl-[20px] pr-[20px] rounded-[50px] text-white text-[15px] hover:outline-none focus:outline-none"
              placeholder="Search By Name"
            />
          </div>
        </div>

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
                    <th className="border-b border-[#ffffff59] font-manrope  text-[12px] lg:text-[14px] text-[#ffffff59] uppercase text-left  p-[10px] mb-[10px]">
                      S.No.
                    </th>
                    <th className="border-b border-[#ffffff59] font-manrope  text-[12px] lg:text-[14px] text-[#ffffff59] uppercase text-left  p-[10px] mb-[10px]  ">
                      Name
                    </th>
                    <th className="border-b border-[#ffffff59] font-manrope  text-[12px] lg:text-[14px] text-[#ffffff59] uppercase text-left  p-[10px]">
                      Email & Contact
                    </th>
                    <th className="border-b border-[#ffffff59] font-manrope  text-[12px] lg:text-[14px] text-[#ffffff59] uppercase text-left  p-[10px]">
                      Country
                    </th>
                    <th className=" w-[380px] min-w-[380px]  border-b border-[#ffffff59] font-manrope text-[12px] lg:text-[14px] text-[#ffffff59] uppercase text-left  p-[10px]">
                      Address
                    </th>
                    <th className="border-b border-[#ffffff59] font-manrope  text-[12px] lg:text-[14px] text-[#ffffff59] uppercase text-left  p-[10px]">
                      DOB
                    </th>
                    <th className="border-b border-[#ffffff59] font-manrope  text-[12px] lg:text-[14px] text-[#ffffff59] uppercase text-left  p-[10px]">
                      Booking Count
                    </th>
                    <th className="border-b border-[#ffffff59] font-manrope  text-[12px] lg:text-[14px] text-[#ffffff59] uppercase text-left  p-[10px]">
                      Status
                    </th>
                  </tr>
                </thead>
                {
                  listing &&
                  listing?.map((item, index) => (
                    <tr key={index}>
                      <td className="font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-left  px-[10px] py-[16px] border-b border-[#ffffff1a]">
                        {index + 1}
                      </td>

                      <td className="capitalize font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-left  px-[10px] py-[16px] border-b border-[#ffffff1a]">
                        {/* Username */}
                        <div>{item?.username}</div>
                        <span
                          className={`capitalize min-w-[110px] m-auto font-[manrope] font-[600] text-[12px] lg:text-[14px] xl:text-[16px] text-left  mt-2  
      ${item?.user_status === 'active' ? 'text-[#4CAF50]' : 'text-[#FF0000]'}`}
                        >
                          {item?.user_status}
                        </span>
                      </td>

                      <td className="capitalize font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-left  px-[10px] py-[16px] border-b border-[#ffffff1a]">
                        {/* Username */}
                        <div>{item?.email}</div>
                        <span
                          className={`capitalize min-w-[110px] m-auto font-[manrope] font-[600] text-[12px] lg:text-[14px] xl:text-[16px] text-left  px-[15px] py-[6px] rounded-[60px] mt-2 `}
                        >       {item?.phone_code
                          } {item?.phone_number}

                        </span>
                      </td>
                      <td className="font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-left  px-[10px] py-[16px] border-b border-[#ffffff1a] ">
                        {item?.country
                        }
                      </td>
                      <td className="font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-left  px-[10px] py-[16px] border-b border-[#ffffff1a] ">
                        <div className="felx  justify-center  whitespace-normal break-words">
                          {item?.address}
                        </div>
                      </td>
                      <td className="font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-left  px-[10px] py-[16px] border-b border-[#ffffff1a] ">
                        {
                          item?.DOB ? (
                            moment(item?.DOB).format('DD MMM YYYY')
                          ) : ("N/A")
                        }
                      </td>
                      <td className="font-manrope font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-left  px-[10px] py-[16px] border-b border-[#ffffff1a] ">
                        {item?.enquiry_count}
                      </td>

                      <td className="font-manrope text-left font-[600] text-white text-[12px] lg:text-[14px] xl:text-[16px] text-left  px-[10px] py-[16px] border-b border-[#ffffff1a] ">
                        <button
                          onClick={() => handleActiveStatues(item?._id, item?.user_status)} // Updated to use arrow function
                          className={`capitalize min-w-[110px] m-auto border font-[manrope] font-[600] text-[12px] lg:text-[14px] xl:text-[16px] text-center  px-[15px] py-[6px] rounded-[60px] 
                                           ${item?.user_status === 'active'
                              ? 'border-[#4CAF50] bg-[#4CAF501A] text-[#4CAF50]'
                              : 'border-[#FF0000] bg-[#FF00001A] text-[#FF0000]'}`}
                        >
                          {item?.user_status}
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </table>
            )}


          </div>
        )}
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

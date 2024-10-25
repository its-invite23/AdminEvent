import React, { useEffect, useState } from "react";
import Header from "../compontents/Header";
import Listing from "../../Api/Listing";
import Delete from "../compontents/Delete";
import LoadingSpinner from "../compontents/LoadingSpinner";
import NoDataPage from "../compontents/NoDataPage";
import moment from "moment";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { IoAddSharp } from "react-icons/io5";

export default function ContactList() {
  const [listing, setLisitng] = useState("");
  const [Loading, setLoading] = useState(false);

  const PackageGet = () => {
    setLoading(true);
    const main = new Listing();
    main
      .contactGet()
      .then((r) => {
        setLoading(false);
        setLisitng(r?.data?.data);
      })
      .catch((err) => {
        setLoading(false);
        setLisitng([]);
        console.log("error", err);
      });
  };

  useEffect(() => {
    PackageGet();
  }, []);


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
          {Loading ? (
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
                    Message
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">
                    Message Status
                  </th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {listing?.length < 0 ? (
                  <NoDataPage />
                ) : (
                  listing &&
                  listing?.map((item, index) => (
                    <tr key={index}>
                      <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-left">
                        {index + 1}
                      </td>
                      <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                        {item?.name}
                      </td>
                      <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                        {item?.email}
                      </td>
                      <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                        {item?.message}
                      </td>
                      <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                      {item?.contact_status}
                      </td>
                      <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                      {item?.reply_message ? `${item?.reply_message}`: 
                      "Not replied yet"
                      }
                      </td>
                    </tr>
                  ))
                )}
                {}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

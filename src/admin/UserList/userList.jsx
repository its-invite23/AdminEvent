import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import Header from "../compontents/Header";
import Filter from "./Filter";
import Listing from "../../Api/Listing";

export default function UserList() {
  const [listing, setLisitng] = useState("");
  const [Loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const users = () => {
    setLoading(true);
    const main = new Listing();
    main
      .profile(page, limit)
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
    users(page);
  }, []);
  return (
    <div className="w-full max-w-[100%]">
      <Header title={"All Users"} />
      <div className="w-full  bg-[#1B1B1B] p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
        <Filter />
        <div className="overflow-auto">
          <table className="w-full table-auto whitespace-nowrap">
            <thead className="mb-[15px]">
              <tr>
                <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px]">
                  S.No.
                </th>
                <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px] text-center ">
                  Username
                </th>
                <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">
                  Email
                </th>
                <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">
                  city
                </th>
                <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">
                  Address
                </th>
                <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">
                  Contact
                </th>
                <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">
                  Action
                </th>
              </tr>
            </thead>

            {listing &&
              listing?.users &&
              listing?.users?.map((item, index) => (
                <tr key={index}>
                  <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a]">
                    {index + 1}
                  </td>

                  <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                    {item?.username}
                  </td>
                  <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                    {item?.email}
                  </td>
                  <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                    {item?.city}
                  </td>
                  <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                    {item?.address}
                  </td>
                  <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                    {item?.phone_number}
                  </td>
                  <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                    {item?.user_status=="active"?
                    <button className="min-w-[120px] m-auto flex gap-2 items-center justify-between border border-[#ffffff33] text-[#4CAF50] px-[15px] py-[6px] rounded-[60px]">
                      Active
                      <FaAngleDown size={10} className="text-[#4CAF50]" />
                    </button>
                    :
                    <button className="min-w-[120px] m-auto flex items-center justify-between border border-[#ffffff33] text-[#D95858] px-[15px] py-[6px] rounded-[60px]">
                      Deactive
                      <FaAngleDown size={10} className="text-[#D95858]" />
                    </button>
                    }
                  </td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
}

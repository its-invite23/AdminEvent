import React, { useEffect, useState } from "react";
import Header from "../compontents/Header";
import Listing from "../../Api/Listing";
import LoadingSpinner from "../compontents/LoadingSpinner";
import { Link } from "react-router-dom";
import moment from "moment";
import NoDataPage from "../compontents/NoDataPage"
import EnquiryReplyMessage from "./EnquiryReplyMessage";

export default function Enquiry() {
  const [listing, setLisitng] = useState("");
  console.log("listing", listing)
  const [Loading, setLoading] = useState(false);

  const EnquiryList = () => {
    setLoading(true);
    const main = new Listing();
    main
      .enquiryGet()
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
    EnquiryList();
  }, []);


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
          {Loading ? (
            <LoadingSpinner />
          ) : (
            listing?.length === 0 ? (
              <NoDataPage/>
            ) : (
              <table className="w-full table-auto whitespace-nowrap">
              <thead className="mb-[15px]">
                <tr>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px]">S.No.</th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px]">Name</th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Email</th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Date</th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Number of attendees</th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Event  type</th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Enquiry Status</th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Action</th>
                </tr>
              </thead>
              {listing && listing?.map((item, index) => (
                <tr key={index}>
                  <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a]">{index + 1}</td>

                  <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a]">{item?.name}</td>
                  <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center ">{item?.email}</td>
                  <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center ">{moment(item?.created_at).format('DD-MMM-YYYY')}</td>
                  <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a] text-center  ">{item?.attendees}</td>
                  <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a]  text-center">{item?.eventname}</td>
                  <td className={`capitalize	 font-manrope font-[600] text-[16px] text-left px-[10px] py-[16px] border-b text-center border-[#ffffff1a] ${item?.enquire_status === 'pending' ? 'text-yellow-500' :
                    item?.enquire_status === 'active' ? 'text-green-500' :
                      item?.enquire_status === 'inactive' ? 'text-red-500' :
                        'text-white'
                    }`}>
                    {item?.enquire_status === "pending" && "Pending"}
                    {item?.enquire_status === "active" && "Accepted"}
                    {item?.enquire_status === "inactive" && "Rejected"}

                  </td>
                  <td className=" text-center font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a]  ">
                    {item?.reply_message ? (
                      item?.reply_message
                    ) : (
                      <div className="flex items-center justify-center w-full gap-[10px]">
                        <Link to={""} className="flex items-center justify-center rounded-[60px] w-[30px] h-[30px] bg-[#ffffff1a]">

                          <EnquiryReplyMessage item={item} enquire_status={"active"} />
                          {/* <FaCheck className="text-[#4CAF50] text-[15px]" /> */}

                        </Link>

                        <Link to={""} className="flex items-center justify-center rounded-[60px] w-[30px] h-[30px] bg-[#ffffff1a]">
                          <EnquiryReplyMessage item={item} enquire_status={"inactive"} />

                        </Link>
                      </div>
                    )}

                  </td>
                </tr>
              ))}
            </table>
            ) 
            
          )}
        </div>
      </div>
    </div>
  );
}

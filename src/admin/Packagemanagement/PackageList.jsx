import React, { useEffect, useState } from 'react';
import Header from '../compontents/Header';
import Listing from '../../Api/Listing';
import Delete from "../compontents/Delete";
import LoadingSpinner from "../compontents/LoadingSpinner";
import NoDataPage from "../compontents/NoDataPage"
import moment from 'moment';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
export default function PackageList() {
  const [listing, setLisitng] = useState("");
  const [Loading, setLoading] = useState(false);

  const PackageGet = () => {
    setLoading(true);
    const main = new Listing();
    main
      .packageGet()
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

  const handleActiveStatues = (Id, status) => {
    setLoading(true);
    const main = new Listing();
    const response = main.packageStatus({ Id, status });

    response
      .then((res) => {
        if (res && res?.data?.status) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data?.message || "Something went wrong.");
        }
        setLoading(false);
        PackageGet();
      })
      .catch((error) => {
        console.log("error", error?.response?.data?.message);
        toast.error(error?.response?.data?.message || "An error occurred.");
        setLoading(false);
      });
  };

  return (
    <div className='w-full max-w-[100%]'>
      <Header title={"All Packages"} />
      <div className="w-full bg-[#1B1B1B] p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
        {/* <AddPackage /> */}
        <div className="overflow-auto">
          {Loading ? (
            <LoadingSpinner />
          ) : (
            <table className="w-full table-auto whitespace-nowrap">
              <thead className="mb-[15px]">
                <tr>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px]">S. No.</th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">Package Id</th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">Package Name</th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">Event Type</th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">Attendees</th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">Budget Range</th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">Status</th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">Created At</th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">Availability</th>
                  <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px] mb-[10px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listing?.packagegetdata?.length < 0 ? (
                  <NoDataPage />
                ) : (
                  listing &&
                  listing?.packagegetdata &&
                  listing?.packagegetdata.map((item, index) => (
                    <tr key={index}>
                      <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-left">{index + 1}</td>
                      <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">{item?._id}</td>
                      <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">{item?.package_name}</td>
                      <td className="capitalize font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                        <ul>
                          {item?.package_categories?.map((category, index) => (
                            <li key={index}>{category},</li>
                          ))}
                        </ul>
                      </td>
                      <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">{item?.package_people}</td>
                      <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">${item?.package_price_min}- ${item?.package_price_max}</td>
                      <td className="capitalize font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">
                        <button
                          onClick={() => handleActiveStatues(item?._id, item?.package_status)} // Updated to use arrow function
                          className={`capitalize min-w-[110px] m-auto border font-[manrope] font-[600] text-[16px] text-center px-[15px] py-[6px] rounded-[60px] 
                                                       ${item?.package_status === 'active'
                              ? 'border-[#4CAF50] bg-[#4CAF501A] text-[#4CAF50]'
                              : 'border-[#FF0000] bg-[#FF00001A] text-[#FF0000]'}`}
                        >
                          {item?.package_status}
                        </button>
                      </td>
                      <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center">{moment(item?.created_at).format('MMMM Do, YYYY')}</td>
                      <td
                        className={`font-manrope font-[600] capitalize text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a] text-center 
                                                   ${item?.package_availability === 'outOfStock' ? 'text-[#FF0000]' : 'text-[#4CAF50]'}`}>
                        {item?.package_availability}
                      </td>
                      <td className="flex justify-between items-center font-manrope font-[600]  text-white text-[16px] text-left px-[10px] py-[16px] border-b border-[#ffffff1a]">
                        <Link to={`/access-admin/access-package-edit/${item?._id}`}>
                          <button className='flex items-center gap-[10px] px-[20px] py-[8px] border border-[#ffffff1a] rounded-[80px] font-[manrope] font-[600] text-white text-[18px]'>
                            <MdEdit />
                          </button>
                        </Link>
                        <Delete Id={item?._id} step={1} PackageGet={PackageGet} />
                      </td>

                    </tr>
                  ))
                )}
                {
                }
              </tbody>
            </table>
          )}

        </div>
      </div>
    </div>
  );
}

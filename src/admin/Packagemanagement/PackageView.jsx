import React, { useEffect, useState } from 'react'
import Listing from '../../Api/Listing';
import toast from 'react-hot-toast';
import ViewImage from "../../asstes/event.jpg"
import { IoStar } from "react-icons/io5";
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../compontents/LoadingSpinner';

export default function PackageView() {
    const { Id } = useParams();
    const [loading, setLoading] = useState(false);
    const [item, setLisitng] = useState("")
    console.log("Lisitng", item)
    const fetchData = async () => {
        setLoading(true);
        const main = new Listing();
        try {
            const response = await main.packageGetId({ Id });
            console.log("response", response);
            if (response && response.data) {
                setLisitng(response?.data?.data)
                setLoading(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
            setLoading(false);
        }
    };


    useEffect(() => {
        if (Id) {
            fetchData();
        }
    }, [Id]);

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className="mb-4 w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[30px] font-semibold text-white">
                                Package View
                            </h3>
                        </div>
                        <img
                            className="w-full object-cover h-48 md:h-64"
                            src={ViewImage}
                            alt="Sunset in the mountains"
                        />
                        <div className="px-6 py-4">
                            <div className="flex flex-row  items-center mr-2">
                                <button
                                    className={`min-w-[110px] mr-2 capitalize m-auto border font-[manrope] font-[600] text-[16px] text-center px-[15px] py-[6px] rounded-[60px] ${item?.package_status === "pending"
                                        ? "border-[#B8A955] bg-[#B8A9551A] text-[#B8A955]"
                                        : item?.package_status === "active"
                                            ? "border-[#4CAF50] bg-[#4CAF501A] text-[#4CAF50]"
                                            : item?.package_status === "inactive"
                                                ? "border-[#EB3465] bg-[#EB34651A] text-[#EB3465]"
                                                : ""
                                        }`}
                                >
                                    {item?.package_status
                                    }
                                </button>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-3">
                                    Person: {item.package_people
                                    }
                                </span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                                    Total Price: ${item.package_price_max}-{item?.package_price_min}
                                </span>
                            </div>
                        </div>
                        <h3 className="text-[30px] font-semibold text-white mb-3 mt-3">Services Provider Details</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                            {item?.package_services?.map((venue, index) => (
                                <div
                                    className="bg-[#1B1B1B] shadow-lg rounded-lg overflow-hidden flex flex-col border border-white border-2"
                                    key={index}
                                >
                                    <div className="relative">
                                        <img
                                            src={ViewImage}
                                            alt={venue.name}
                                            className="h-64 w-full object-cover rounded-t-lg"
                                        />
                                    </div>
                                    <div className="p-4 space-y-4">
                                        {/* Provider Name */}
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-xl font-semibold text-white">{venue.services_provider_name}</h2>
                                            <p className="text-white text-sm">{venue.services_provider_phone}</p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            {/* Email */}
                                            <p className="text-white text-sm">{venue.services_provider_email}</p>

                                            {/* Categories */}
                                            <div className="flex items-center gap-2 h-9 text-white bg-[#000] rounded-full px-4 py-1 text-xs leading-tight">
                                                {venue.services_provider_categries}
                                            </div>
                                        </div>

                                        {/* Rating and Price */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 h-9 text-white bg-[#000] rounded-full px-4 py-1 text-xs">
                                                <IoStar size={12} className='text-[#ffff00] ' />
                                                {venue.services_provider_rating}
                                            </div>
                                            <p className="text-white text-xs">${venue.services_provider_price}/person</p>
                                        </div>

                                        {/* Package Categories */}
                                        <p className="text-[#ffffffc2] text-[14px] mt-2 whitespace-normal overflow-hidden ">{venue.package_categories?.join(",")}</p>

                                        {/* Description */}
                                        <p className="text-[#ffffffc2] text-[14px] mt-2 whitespace-normal overflow-hidden ">{venue.package_descrption}</p>

                                        {/* Address */}
                                        <p className="text-[#ffffffc2] text-[14px] mt-2 whitespace-normal overflow-hidden ">{venue.package_address}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}


        </>
    )
}

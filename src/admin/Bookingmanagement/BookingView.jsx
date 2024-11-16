import React, { useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import ViewImage from "../../asstes/event.jpg"

export default function BookingView({ item }) {
    console.log("item",item)
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="p-4">
            <button
                onClick={() => setIsOpen(true)}
                className=""
            >
                <BsThreeDotsVertical size={24} />

            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9]">
                    <div className="relative bg-[#1B1B1B] rounded-lg p-[15px] lg:p-[20px] w-[96%] max-w-[700px] max-h-[90vh] overflow-y-auto overflow-x-auto">
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[30px] font-semibold text-white">Booking View</h3>
                                <IoCloseSharp
                                    size={30}
                                    className="cursor-pointer text-white"
                                    onClick={() => setIsOpen(false)}
                                />
                            </div>
                            <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg lg:max-w-md">
                                <img
                                    className="w-full object-cover h-48 md:h-64"
                                    src={ViewImage}
                                    alt="Sunset in the mountains"
                                />
                                <div className="px-6 py-4">
                                    <div className="flex flex-row  items-center">
                                        <button
                                            className={`min-w-[110px] capitalize m-auto border font-[manrope] font-[600] text-[16px] text-center px-[15px] py-[6px] rounded-[60px] ${item?.status === "pending"
                                                ? "border-[#B8A955] bg-[#B8A9551A] text-[#B8A955]"
                                                : item?.status === "confirmed"
                                                    ? "border-[#4CAF50] bg-[#4CAF501A] text-[#4CAF50]"
                                                    : item?.status === "canceled"
                                                        ? "border-[#EB3465] bg-[#EB34651A] text-[#EB3465]"
                                                        : ""
                                                }`}
                                        >
                                            {item?.status}
                                        </button>
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-3">
                                            Person: {item.attendees}
                                        </span>
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                                            Total Price: ${item.totalPrice}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        {/* Left Section: Select Option */}
                                        <div className="flex items-center">
                                            <select className="border rounded px-3 py-2 text-sm font-medium text-gray-700">
                                                <option value="">Select an option</option>
                                                <option value="Approve">Approve</option>
                                                <option value="Reject">Reject</option>
                                            </select>
                                        </div>
                                        {/* Right Section: Payment Generator Button */}
                                        <div>
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                Payment Generator
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                                {item?.package.map((venue, index) => (
                                    <div
                                        className="bg-[#1B1B1B] shadow-md rounded-lg m-2 flex flex-col overflow-hidden"
                                        key={index}
                                    >
                                        <div className="relative">
                                            <div className="mk">
                                                <img
                                                    src={ViewImage}
                                                    alt={venue.name}
                                                    className="h-48 w-full object-cover rounded-t-lg mb-4"
                                                />
                                            </div>
                                        </div>
                                        <div className="p-[10px]">
                                            <h2 className="text-[18px] mb-3 font-semibold text-white">{venue.name}</h2>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-[10px] h-[38px] text-white bg-[#000] rounded-[60px] px-[15px] py-[2px] text-[14px] leading-[15px]">
                                                    {venue.package_categories?.join(",")}
                                                </div>
                                                <div className="flex flex-col items-end justify-between">
                                                    <p className="text-white block">${venue.price}/person</p>
                                                </div>
                                            </div>
                                            <p className="text-[#ffffffc2] text-[14px] mt-2 whitespace-normal overflow-hidden">
                                                {venue.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import Listing from '../../Api/Listing';
import toast from 'react-hot-toast';
import { IoCloseSharp } from "react-icons/io5";

export default function PackageView({ Id }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [Lisitng, setLisitng] = useState("")
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
        <div className="p-4">
            <button
                onClick={() => setIsOpen(true)}
                className=""
            >
                <BsThreeDotsVertical size={24} />

            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9]">
                    <div className="relative bg-[#1B1B1B] rounded-lg p-[15px] lg:p-[20px] w-[96%] max-w-[500px]">
                        <div className=" mb-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[30px] font-semibold text-white">Package View</h3>
                                <IoCloseSharp
                                    size={30}
                                    className="cursor-pointer text-white"
                                    onClick={() => setIsOpen(false)}
                                />
                            </div>
                            <div class="max-w-sm mx-auto rounded overflow-hidden shadow-lg lg:max-w-md">
                                <img
                                    class="w-full object-cover h-48 md:h-64"
                                    src="https://th.bing.com/th/id/OIP.zgiDOfpjSb5jqL9bSPKK8QHaD8?rs=1&pid=ImgDetMain"
                                    alt="Sunset in the mountains"
                                />
                                <div class="px-6 py-4">
                                    <div class="font-bold text-xl mb-2 text-center md:text-left">{Lisitng.package_name} Package</div>
                                    <p class="text-gray-700 text-base text-justify">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                    </p>
                                </div>
                                <div class="px-6 pt-4 pb-2">
                                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                        {Lisitng.package_people}
                                    </span>
                                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                        ${Lisitng.package_price_min} - ${Lisitng.package_price_max}
                                    </span>
                                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                        #winter
                                    </span>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold mt-4 mb-2">Services</h3>
                            {Lisitng.package_services?.map((service, index) => (
                                <div
                                    key={index}
                                    className="p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Service {index + 1}</h3>
                                    <p className='mb-3 font-normal  '>
                                        <strong>Provider Name:</strong> {service.services_provider_name}
                                    </p>
                                    <p className='mb-3 font-normal '>
                                        <strong>Email:</strong> {service.services_provider_email}
                                    </p>
                                    <p>
                                        <strong>Phone:</strong> {service.services_provider_phone}
                                    </p>
                                    <p className='mb-3 font-normal '>
                                        <strong>Address:</strong> {service.package_address}
                                    </p>
                                    <p className='mb-3 font-normal '>
                                        <strong>Description:</strong> {service.package_descrption}
                                    </p>
                                    <p className='mb-3 font-normal '>
                                        <strong>Categories:</strong> {service.package_categories.join(", ")}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

import React, { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Listing from '../../Api/Listing';
import toast from 'react-hot-toast';

export default function Delete({ step, Id, PackageGet, users }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    const handlePackageDelete = () => {
        setLoading(true);
        const main = new Listing();
        const response = main.packageDelete({ Id });
        response
            .then((res) => {
                if (res && res?.data?.status) {
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data?.message || "Something went wrong.");
                }
                setLoading(false);
                PackageGet();
                toggleModal();
            })
            .catch((error) => {
                console.log("error", error);
                toast.error(error?.response?.data?.message);
                setLoading(false);
            });
    };

    const handleUserDelete = () => {
        setLoading(true);
        const main = new Listing();
        const response = main.userDelete({ Id });
        response
            .then((res) => {
                if (res && res?.data?.status) {
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data?.message || "Something went wrong.");
                }
                setLoading(false);
                users();
                toggleModal();
            })
            .catch((error) => {
                console.log("error", error);
                toast.error(error?.response?.data?.message);
                setLoading(false);
            });
    };
    const handleClick = (e) => {
        e.preventDefault();
        if (step === 1) {
            handlePackageDelete(e);
        } else if (step === 2) {
            handleUserDelete(e)
        } else {
            console.warn('Invalid step');
        }
    };

    return (
        <div className="flex flex-col">
                <button
                    onClick={toggleModal}
                    className=' gap-[10px] m-auto font-[manrope] font-[600] text-white text-[18px]'
                >
                    <MdDelete size={24} className='text-red-600 hover:text-red-700' />
                </button>
            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-[#1B1B1B] rounded-lg p-6 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                        <div className='flex justify-between'>
                            <h3 className="text-lg font-semibold mb-4 text-white">Delete Confirmation</h3>
                            <IoCloseSharp size={24} className='cursor-pointer text-white' onClick={toggleModal} />
                        </div>

                        {/* Responsive Paragraph */}
                        <p className="text-white mb-4 text-sm sm:text-base md:text-lg">
                            Are you sure you want to delete this package? This action cannot be undone.
                        </p>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={toggleModal}
                                className="text-white mr-2 px-4 py-2 border border-gray-300 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleClick}
                                className="bg-[#EB3465] hover:bg-[#fb3a6e] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center"
                            >
                                {loading ? "Loading.." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

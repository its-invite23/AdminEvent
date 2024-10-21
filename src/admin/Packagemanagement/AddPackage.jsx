import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoCloseSharp } from "react-icons/io5";

export default function AddPackage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col">
      <div className='flex items-center justify-between mb-[20px]'>
        <h2 className="font-manrope font-[600] text-white text-[18px] md:text-[24px] mb-[0]">All Packages</h2>
        <button
          onClick={toggleModal}
          className='flex items-center gap-[10px] px-[20px] py-[8px] border border-[#ffffff1a] rounded-[80px] font-[manrope] font-[600] text-white text-[18px]'
        >
          <FaPlus /> Add Package
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#1B1B1B] rounded-lg p-6 w-11/12 md:w-1/3">
            <div className='flex  flex-wrap justify-between'>
              <h3 className="text-lg font-semibold mb-4 text-white">Add New Package</h3>
              <IoCloseSharp size={24} className='cursor-pointer text-white' onClick={toggleModal} />
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Package Name</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-[#1B1B1B] text-white" placeholder="Enter package name" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Package Minium  Price</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-[#1B1B1B] text-white" placeholder="Enter package name" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Package Maximum  Price</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-[#1B1B1B] text-white" placeholder="Enter package name" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Price</label>
                <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-[#1B1B1B] text-white" placeholder="Enter price" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Package Categries</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-[#1B1B1B] text-white" placeholder="Enter price" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Package Image</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-[#1B1B1B] text-white" placeholder="Enter price" required />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={toggleModal} className="text-white mr-2 px-4 py-2 border border-gray-300 rounded-md">Cancel</button>
                <button type="submit" className="bg-[#EB3465] hover:bg-[#fb3a6e] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center">Add Package</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

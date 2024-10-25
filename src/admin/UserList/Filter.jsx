import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoCloseSharp } from "react-icons/io5";
import { IoFilterSharp } from "react-icons/io5";
import Listing from '../../Api/Listing';

export default function Filter({setLisitng}) {
  const [isOpen, setIsOpen] = useState(false); 

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };


  const [formData, setFormData] = useState({
     username : "",
     user_status: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const main = new Listing();
    const response = main.userfilter(formData );
    response.then((res) => {
      console.log("res",res)
        if (res && res?.data && res?.data?.status) {
          toast.success(res.data.message);
          setLisitng(res?.data?.users)
          setLoading(false);
          toggleModal();
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error",error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
        // console.log("error", error);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col">
      <div className='flex items-center justify-between mb-[20px]'>
        <h2 className="font-manrope font-[600] text-white text-[18px] md:text-[24px] mb-[0]">All Users</h2>
        <button className='flex items-center gap-[10px] px-[20px] py-[8px] border border-[#ffffff1a] rounded-[8px] font-[manrope] font-[600] text-white text-[18px]' onClick={toggleModal}>
          <IoFilterSharp /> Filter
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#1B1B1B] rounded-lg p-6 w-11/12 md:w-1/3">
            <div className='flex flex-wrap justify-between'>
              <h3 className="text-lg font-semibold mb-4 text-white">Filter</h3>
              <IoCloseSharp size={24} className='cursor-pointer text-white' onClick={toggleModal} />
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Name</label>
                <input type="text"
                   name="username"
                   value={formData.username}
                   onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-[#1B1B1B] text-white" placeholder="Enter user name" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Status</label>
                <select 
                name="user_status"
                value={formData.user_status}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-[#1B1B1B]" required>
                  <option value="" disabled selected>Select status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="banned">Banned</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={toggleModal} className="text-white mr-2 px-4 py-2 border border-gray-300 rounded-md">Cancel</button>
                <button type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#EB3465] hover:bg-[#fb3a6e] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center">{loading ? "Loading.." :"Submit"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

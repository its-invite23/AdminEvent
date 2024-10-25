import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Listing from '../../Api/Listing';
import { IoCloseSharp } from "react-icons/io5";
import { IoFilterSharp } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";

export default function ReplyMessage({item}) {

    const [isOpen, setIsOpen] = useState(false); 

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };
  
  
    const [formData, setFormData] = useState({
       _id:item?._id,
       reply_message: "",
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
      const response = main.contactreply(formData );
      response.then((res) => {
        console.log("res",res)
          if (res && res?.data && res?.data?.status) {
            toast.success(res.data.message);
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
          setLoading(false);
        });
    };
  
  return (
    <div className="flex flex-col">
      <button className='gap-[10px] m-auto font-[manrope] font-[600] text-white text-[18px] hover:text-[#EB3465] ' onClick={toggleModal}>
        <FaRegMessage /> 
      </button>

    {/* Modal */}
    {isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9]">
        <div className="relative bg-[#1B1B1B] rounded-lg p-[15px] lg:p-[20px] w-[96%] max-w-[500px]">
          <div className='flex flex-wrap justify-between'>
            <h3 className="text-[30px] font-semibold mb-4 ">Message</h3>
            <IoCloseSharp size={30} className='cursor-pointer text-white  absolute top-[32px] right-[15px]' onClick={toggleModal} />
          </div>
          <form>
            <div className="mb-4">
              <label className="block w-full text-left font-manrope font-[400] text-white text-[18px] mb-[10px]">Reply Message</label>
              <textarea type="text" 
              rows={5}
              cols={5}
                name="reply_message"
                value={formData.reply_message}
                onChange={handleChange}
              className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none" placeholder="Enter Reply Message" required />
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
  )
}

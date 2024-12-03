import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";



export default function ViewMessage({ text, step }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex flex-col">
            <button className='gap-[10px] m-auto font-[manrope] font-[600] text-[18px] hover:text-[#fff000] ' onClick={toggleModal}>
                <AiOutlineMessage size={24} />
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9]">
                    <div className="relative bg-[#1B1B1B] rounded-lg p-[15px] lg:p-[20px] w-[96%] max-w-[500px]">
                        <div className='flex flex-wrap justify-between'>
                            <h3 className="text-[18px] font-semibold mb-4 ">{step === 1 ? "Comment" :"Message"}</h3>
                            <IoCloseSharp size={30} className='cursor-pointer text-white  absolute top-[32px] right-[15px]' onClick={toggleModal} />
                        </div>
                        <p className='text-[22px] text-left text-white '>
                        {step === 1 ? "Comment" :"Message"}:        {text}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

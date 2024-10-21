import React, { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

export default function ProfileIcon() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const closeModal = (e) => {
        if (e.target === e.currentTarget) {  
            setIsOpen(false);
        }
    };

    return (
        <div className="flex flex-col">
            <div className='flex items-center justify-between mb-[20px] mt-[10px] relative'>
                <button 
                    onClick={toggleModal} 
                    aria-label="Toggle Profile Menu"
                    className='flex items-center gap-[10px] px-[20px] py-[8px] border border-[#ffffff1a] rounded-[80px] font-[manrope] font-[600] text-white text-[18px]'
                >
                    <CgProfile size={32} className='bg-[#FFFFFF14] text-white' />
                </button>

                {/* Modal positioned below the button */}
                {isOpen && (
                    <div 
                        className="absolute top-full mt-2 left-0 bg-[#1B1B1B] rounded-lg p-6 w-auto z-10"
                        onClick={closeModal}
                        aria-modal="true" 
                        role="dialog"
                    >
                        <ul className='flex flex-col items-start gap-[20px] font-manrope font-[600] text-[15px] md:text-[18px] lg:text-[20px] text-white'>
                            <li>
                                <Link to={"/profile"}>Profile</Link>
                            </li>
                            <li>
                                <button to={"/"}>Logout</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

import { Link, useLocation } from "react-router-dom";
import logo from "../../asstes/logo.png"; // Ensure the path is correct
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { IoCloseSharp, IoLogOutSharp } from "react-icons/io5";

function SideBar({ isOpen, setIsOpen, toggleSidebar }) {
    const location = useLocation(); 
    const isActive = (path) => location.pathname === path;

    const handleLinkClick = () => {
        if (isOpen) {
            setIsOpen(false); 
        }
    };
    return (
        <div>
            <div
                className={`${isOpen ? "h-[800px] z-[1] w-![320px] bg-[#1B1B1B]" :"h-full  w-[100%]"} max-w-[286px] bg-[#1B1B1B] rounded-[20px] px-[15px] py-[20px] fixed z-[9] top-[15px] ${isOpen ? "left-[0px]" : "left-[-100%]"
                    } xl:left-[15px] transition-all duration-300`}
            >
                <div className="flex justify-between items-start mb-[40px]">
                    <div className=" ">
                        <img src={logo} alt="Logo" className="w-auto" />
                    </div>

                    <button onClick={toggleSidebar} className="text-white">
                        {isOpen && <IoCloseSharp size={32} />}
                    </button>
                </div>

                <div className="h-screen">
                    <ul>
                        <li className="flex mb-[5px]">
                            <Link
                                to="/access-admin"

                                className={`flex items-center w-full text-base p-[10px] rounded-[10px] ${isActive("/access-admin") ? "bg-[#363636] text-pink-500" : "text-white"} hover:bg-[#363636]`}
                            >
                                <i
                                    onClick={handleLinkClick} // Toggle sidebar on click
                                    className={`pr-[10px] ${isActive("/access-admin") ? "text-pink-500" : "text-white"}`}>
                                    <MdDashboard />
                                </i>
                                Dashboard
                            </Link>
                        </li>

                        <li className="flex mb-[5px]">
                            <Link
                                to="/access-admin/user"
                                className={`flex items-center w-full text-base p-[10px] rounded-[10px] ${isActive("/access-admin/user") ? "bg-[#363636] text-pink-500" : "text-white"} hover:bg-[#363636]`}
                            >
                                <i
                                    onClick={toggleSidebar}
                                    className={`pr-[10px] ${isActive("/access-admin/user") ? "text-pink-500" : "text-white"}`}>
                                    <FaUser />
                                </i>
                                User Management
                            </Link>
                        </li>

                        <li className="flex mb-[5px]">
                            <Link
                                to="/access-admin/booking"
                                className={`flex items-center w-full text-base p-[10px] rounded-[10px] ${isActive("/access-admin/booking") ? "bg-[#363636] text-pink-500" : "text-white"} hover:bg-[#363636]`}
                            >
                                <i
                                    onClick={toggleSidebar}
                                    className={`pr-[10px] ${isActive("/access-admin/booking") ? "text-pink-500" : "text-white"}`} >
                                    <FaListAlt />
                                </i>
                                Booking Management
                            </Link>
                        </li>

                        <li className="flex mb-[5px]">
                            <Link
                                to="/access-admin/payment"
                                className={`flex items-center w-full text-base p-[10px] rounded-[10px] ${isActive("/access-admin/payment") ? "bg-[#363636] text-pink-500" : "text-white"} hover:bg-[#363636]`}
                            >
                                <i
                                    onClick={toggleSidebar}
                                    className={`pr-[10px] ${isActive("/access-admin/payment") ? "text-pink-500" : "text-white"}`}>
                                    <MdPayment />
                                </i>
                                Payment Management
                            </Link>
                        </li>

                        <li className="flex mb-[5px]">
                            <Link
                                to="/access-admin/package"
                                className={`flex items-center w-full text-base p-[10px] rounded-[10px] ${isActive("/access-admin/package") ? "bg-[#363636] text-pink-500" : "text-white"} hover:bg-[#363636]`}
                            >
                                <i
                                    onClick={toggleSidebar}
                                    className={`pr-[10px] ${isActive("/access-admin/package") ? "text-pink-500" : "text-white"}`}>
                                    <FaRegEnvelope />
                                </i>
                                Package Management
                            </Link>
                        </li>
                    </ul>
                    <div className="absolute bottom-[40px] left-[35px]">
                        <Link to="/" className="flex items-center text-[15px] text-white" onClick={toggleSidebar}>
                            <i
                                onClick={toggleSidebar}
                                className="text-[#EB3465] pr-[8px]">
                                <IoLogOutSharp size={20} />
                            </i>
                            Log out
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;

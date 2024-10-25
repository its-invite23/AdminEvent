import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../asstes/logo.png"; // Ensure the path is correct
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { IoCloseSharp, IoLogOutSharp } from "react-icons/io5";
import { MdEvent } from "react-icons/md";
import { MdContacts } from "react-icons/md";

function SideBar({ isOpen, setIsOpen, toggleSidebar }) {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const handleLinkClick = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    };
    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/');
    };
    return (
            <div
                className={`${isOpen ? "  w-![340px]  left-0 " : "h-full  w-[100%] -left-[500px]"} h-full border-r border-r-[#cccccc2e] xl:border-none border-r-[#ccc] max-w-[286px] bg-[#1B1B1B] rounded-[0px] lg:rounded-[0] xl:rounded-[20px] px-[15px] py-[20px] fixed z-100 top-[0px] lg:top-[0] xl:top-[15px] ${isOpen ? "left-[0px]" : "left-[-100%]"
                    } z-[9] xl:left-[15px] transition-all duration-300`}
            >
                <div className="flex justify-between items-start mb-[40px]">
                    <div className=" ">
                        <img src={logo} alt="Logo" className="w-auto" />
                    </div>

                    <button onClick={toggleSidebar} className="text-white">
                        {isOpen && <IoCloseSharp size={32} />}
                    </button>
                </div>

                <div className="h-full">
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

                        <li className="flex mb-[5px]">
                            <Link
                                to="/access-admin/package"
                                className={`flex items-center w-full text-base p-[10px] rounded-[10px] ${isActive("/access-admin/package") ? "bg-[#363636] text-pink-500" : "text-white"} hover:bg-[#363636]`}
                            >
                                <i
                                    onClick={toggleSidebar}
                                    className={`pr-[10px] ${isActive("/access-admin/package") ? "text-pink-500" : "text-white"}`}>
                                    <MdEvent />
                                </i>
                                Event Enquiry
                            </Link>
                        </li>

                        <li className="flex mb-[5px]">
                            <Link
                                to="/access-admin/contact"
                                className={`flex items-center w-full text-base p-[10px] rounded-[10px] ${isActive("/access-admin/contact") ? "bg-[#363636] text-pink-500" : "text-white"} hover:bg-[#363636]`}
                            >
                                <i
                                    onClick={toggleSidebar}
                                    className={`pr-[10px] ${isActive("/access-admin/contact") ? "text-pink-500" : "text-white"}`}>
                                    <MdContacts />
                                </i>
                                Contact Enquiry
                            </Link>
                        </li>
                    </ul>
                    <div className="absolute bottom-[40px] left-[35px]">
                        <Link to="/" className="flex items-center text-[18px] text-white" onClick={handleLogout}>
                            <i onClick={toggleSidebar} className="text-[#EB3465] pr-[8px]">
                                <IoLogOutSharp size={25} />
                            </i>
                            Log out
                        </Link>
                    </div>
                </div>
            </div>
    );
}

export default SideBar;

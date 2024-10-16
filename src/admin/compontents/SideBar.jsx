import { Link } from "react-router-dom";
import logo from "../../asstes/logo.png";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
function SideBar() {
    return (
        <div className="h-full w-[100%] max-w-[286px] bg-[#1B1B1B] rounded-[20px] px-[15px] py-[20px] fixed z-[9] top-[15px] left-[-500px] xl:left-[15px] ">
            <div className="mb-[40px]">
                <img src={logo} alt="" />
            </div>
            <div className="h-full">
                <ul>
                    <li className="flex mb-[5px]">
                       <Link to="/"  className="flex items-center w-full text-white text-base p-[10px] rounded-[10px] hover:bg-[#363636]" ><i className="pr-[10px]"><MdDashboard  /></i> Dashboard</Link>
                    </li>

                    <li className=" mb-[5px]">
                       <Link to="/" className="flex items-center w-full text-white text-base p-[10px] rounded-[10px] hover:bg-[#363636]" ><i className="pr-[10px]"><FaUser /></i> User Management</Link>
                    </li>

                    <li className=" mb-[5px]">
                       <Link to="/" className="flex items-center w-full text-white text-base p-[10px] rounded-[10px] hover:bg-[#363636]" ><i className="pr-[10px]"><FaListAlt /></i> Booking Management</Link>
                    </li>

                    <li className=" mb-[5px]">
                       <Link to="/" className="flex items-center w-full text-white text-base p-[10px] rounded-[10px] hover:bg-[#363636]" ><i className="pr-[10px]"><MdPayment /></i> Payment Management</Link>
                    </li>

                    <li className=" mb-[5px]">
                       <Link to="/" className="flex items-center w-full text-white text-base p-[10px] rounded-[10px] hover:bg-[#363636]" ><i className="pr-[10px]"><FaRegEnvelope /></i> Package Management</Link>
                    </li>


                </ul>
                <div className="absolute bottom-[40px] left-[35px]">
                    <Link to="/" className="flex items-center text-[15px] text-white">
                        <i className="text-white text-[20px] text-[#EB3465] pr-[8px]"><IoLogOutSharp className="text-[#EB3465]" /></i>
                        Log out
                    </Link>
                </div>
            </div>
        </div>  
    );
}

export default SideBar;
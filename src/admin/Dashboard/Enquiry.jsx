import { LuIndent } from "react-icons/lu";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

function Enquiry() {
    return (
        <div className="w-full  bg-[#1B1B1B] p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
            <h2 className="font-manrope font-[600] text-white text-[18px] md:text-[24px] mb-[15px]">Recent  Inquiries</h2>
            <div className="overflow-auto">
            <table className="w-full table-auto whitespace-nowrap">
                <thead className="mb-[15px]">
                    <tr>
                        <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px]">Name</th>
                        <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Email</th>
                        <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Date</th>
                        <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Number of attendees</th>
                        <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Event  type</th>
                        <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Action</th>
                    </tr>
                </thead>
                <tr>
                    <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a]">John Doe</td>
                    <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a]  ">John@example.com</td>
                    <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a]  ">5 Oct 2024</td>
                    <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a]  ">10</td>
                    <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a]  ">Casual party</td>
                    <td className=" font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a]  ">
                        <div className="flex items-center justify-center w-full gap-[10px]">
                            <Link to={"/"} className="flex items-center justify-center rounded-[60px] w-[30px] h-[30px] bg-[#ffffff1a]"><FaCheck className="text-[#4CAF50] text-[15px]" /></Link>

                            <Link to={"/"} className="flex items-center justify-center rounded-[60px] w-[30px] h-[30px] bg-[#ffffff1a]">
                                <IoClose className="text-[#D95858] text-[20px]" />
                            </Link>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[16px]  border-b border-[#ffffff1a]  ">John Doe</td>
                    <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a]  ">John@example.com</td>
                    <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a]  ">5 Oct 2024</td>
                    <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a]  ">10</td>
                    <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a]  ">Casual party</td>
                    <td className=" font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[16px]  border-b border-[#ffffff1a]  ">
                        <div className="flex items-center justify-center w-full gap-[10px]">
                            <Link to={"/"} className="flex items-center justify-center rounded-[60px] w-[30px] h-[30px] bg-[#ffffff1a]"><FaCheck className="text-[#4CAF50] text-[15px]" /></Link>

                            <Link to={"/"} className="flex items-center justify-center rounded-[60px] w-[30px] h-[30px] bg-[#ffffff1a]">
                                <IoClose className="text-[#D95858] text-[20px]" />
                            </Link>
                        </div>
                    </td>
                </tr>
            </table>
            </div>

        </div>
    );
}

export default Enquiry;


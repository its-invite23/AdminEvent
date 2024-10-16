import React from 'react'

export default function userList() {
  return (
    <div className="w-full  bg-[#1B1B1B] p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
      <h2 className="font-manrope font-[600] text-white text-[18px] md:text-[24px] mb-[15px]">All Users</h2>
      <div className="overflow-auto">
        <table className="w-full table-auto whitespace-nowrap">
          <thead className="mb-[15px]">
            <tr>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px]">S.No.</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-left p-[10px] mb-[10px]">Username</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Email</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">city</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Address</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Contact</th>
              <th className="border-b border-[#ffffff59] font-manrope text-[14px] text-[#ffffff59] uppercase text-center p-[10px]">Action</th>
            </tr>
          </thead>
          <tr>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[5px]  ">1</td>

            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[5px]  ">John Doe</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">John@example.com</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">Jaipur</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">Bani Park</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">+1234567890</td>
            <td className=" font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">
              Active
            </td>
          </tr>

          <tr>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[5px]  ">1</td>

            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[5px]  ">John Doe</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">John@example.com</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">Jaipur</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">Bani Park</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">+1234567890</td>
            <td className=" font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">
              Active
            </td>
          </tr>

          <tr>
            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[5px]  ">1</td>

            <td className="font-manrope font-[600] text-white text-[16px] text-left px-[10px] py-[5px]  ">John Doe</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">John@example.com</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">Jaipur</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">Bani Park</td>
            <td className="font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">+1234567890</td>
            <td className=" font-manrope font-[600] text-white text-[16px] text-center px-[10px] py-[5px]  ">
              Active
            </td>
          </tr>

        </table>
      </div>

    </div>
  )
}

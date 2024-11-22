import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCloseSharp, IoStar } from "react-icons/io5";
import ViewImage from "../../asstes/event.jpg";
import Listing from "../../Api/Listing";
import toast from "react-hot-toast";

export default function BookingView({ item, bookignGet }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(item.totalPrice);

  const handleChange = (e) => {
    const inputPrice = e.target.value;
    const numericPrice = parseFloat(inputPrice) || 0;
    setPrice(numericPrice);
  };

  const handleActiveStatues = (Id, status) => {
    console.log("Id:", Id, "Status:", status);
    if (!Id || !status) {
      toast.error("Invalid ID or status. Please check your input.");
      return;
    }
    setLoading(true);
    const main = new Listing();
    const response = main.BookingStatus({ _id: Id, status: status });
    response
      .then((res) => {
        if (res && res?.data?.status) {
          toast.success(res.data.message);
          bookignGet();
        } else {
          toast.error(res.data?.message || "Something went wrong.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error?.response?.data?.message);
        toast.error(error?.response?.data?.message || "An error occurred.");
        setLoading(false);
      });
  };

  const handlePriceChange = (Id) => {
    if (!Id) {
      toast.error("Invalid ID or status. Please check your input.");
      return;
    }
    setLoading(true);
    const main = new Listing();
    const response = main.BookingPriceUpdate({ _id: Id, price });
    response
      .then((res) => {
        if (res && res?.data?.status) {
          toast.success(res.data.message);
          bookignGet();
        } else {
          toast.error(res.data?.message || "Something went wrong.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error?.response?.data?.message);
        toast.error(error?.response?.data?.message || "An error occurred.");
        setLoading(false);
      });
  };

  const handlepayment = (Id) => {
    console.log("Id:", Id);
    if (!Id) {
      toast.error("Invalid ID or status. Please check your input.");
      return;
    }
    setLoading(true);
    const main = new Listing();
    const response = main.BookingPayment({ _id: Id, payment_genrator_link: true });
    response
      .then((res) => {
        if (res && res?.data?.status) {
          toast.success(res.data.message);
          bookignGet();
        } else {
          toast.error(res.data?.message || "Something went wrong.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error?.response?.data?.message);
        toast.error(error?.response?.data?.message || "An error occurred.");
        setLoading(false);
      });
  };

  const getPhotoUrls = (photos) => {
    if (photos && photos.length > 0) {
      // Check if photos is an array of URLs or an array of objects with getUrl method
      return photos.map((photo) => {
        if (photo.getUrl) {
          return photo.getUrl({ maxWidth: 400 });
        }
        return photo.url || photo.photo_reference; // Fallback if not using getUrl
      });
    }
    return []; // Return empty array if no photos are available
  };

  return (
    <div className="p-4">
      <button onClick={() => setIsOpen(true)} className="">
        <BsThreeDotsVertical size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9]">
          <div className="relative bg-[#1B1B1B] rounded-lg p-[15px] lg:p-[20px] w-[96%] max-w-[700px] max-h-[90vh] overflow-y-auto overflow-x-auto">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[30px] font-semibold text-white">Booking View</h3>
                <IoCloseSharp
                  size={30}
                  className="cursor-pointer text-white"
                  onClick={() => setIsOpen(false)}
                />
              </div>
              <div className=" mx-auto rounded overflow-hidden shadow-lg rounded-md ">
                <img
                  className="w-full object-cover h-48 md:h-64"
                  src={ViewImage}
                  alt="Sunset in the mountains"
                />
                <div className="px-6 py-4">
                  <div className="flex flex-row  items-center gap-4">
                    <button
                      className={`min-w-[110px] capitalize m-auto border font-[manrope] font-[600] text-[16px] text-center px-[15px] py-[6px] rounded-[60px] ${item?.status === "pending"
                        ? "border-[#B8A955] bg-[#B8A9551A] text-[#B8A955]"
                        : item?.status === "approve"
                          ? "border-[#4CAF50] bg-[#4CAF501A] text-[#4CAF50]"
                          : item?.status === "reject"
                            ? "border-[#EB3465] bg-[#EB34651A] text-[#EB3465]"
                            : ""
                        }`}
                    >
                      {item?.status}
                    </button>
                    <span className="min-w-[110px]  capitalize border font-[manrope] font-[600] text-[16px] flex items-center px-[15px] py-[6px] rounded-[60px]">
                      Person: {item.attendees}
                    </span>
                    <span className=" capitalize border font-[manrope] font-[600] text-[16px]  px-[15px] py-[6px] rounded-[60px] flex items-center">
                      Total Price:
                      <input
                        type="number"
                        value={price}
                        onChange={handleChange}
                        className="cursor-pointer ml-2 w-[4vw] bg-gray-500 pl-1 py-1 text-sm font-semibold text-white text-center rounded"
                      />
                    </span>
                    {item?.totalPrice !== price &&
                      <div className="flex items-center justify-between py-4">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => { handlePriceChange(item?._id); }}
                        >
                          Update Price
                        </button>
                      </div>
                    }
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <div className="flex items-center">
                      <select
                        onChange={(e) =>
                          handleActiveStatues(item?._id, e.target.value)
                        }
                        value={item?.package_status}
                        className="border rounded px-3 py-2 text-sm font-medium text-gray-700"
                      >
                        <option value="">Select an option</option>
                        <option value="approve">Approve</option>
                        <option value="reject">Reject</option>
                      </select>
                    </div>
                    {/* Right Section: Payment Generator Button */}
                    <div>
                      {item?.status === "approve" && item?.payment_genrator_link !== true && (
                        <button
                          onClick={() => handlepayment(item?._id)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Payment Generator
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-[30px] font-semibold text-white mb-3 mt-3">
                Services Provider Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {item?.package?.map((venue, index) => (
                  <div
                    className="bg-[#1B1B1B] shadow-lg rounded-lg overflow-hidden flex flex-col border border-white border-2"
                    key={index}
                  >
                    <div className="relative">
                      {getPhotoUrls(venue.photos)?.map((url, imgIndex) => (
                        <img key={imgIndex} src={url} alt={venue.name} className="h-[400px] w-full object-cover" />
                      ))}
                    </div>
                    <div className="p-4 space-y-4">
                      {/* Provider Name */}
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-white">
                          {venue.services_provider_name || venue?.name}
                        </h2>
                        <p className="text-white text-sm">
                          {venue.services_provider_phone}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Email */}
                        <p className="text-white text-sm">
                          {venue.services_provider_email}
                        </p>

                        {/* Categories */}
                        <div className="flex items-center gap-2 h-9 text-white bg-[#000] rounded-full px-4 py-1 text-xs leading-tight">
                          {venue.services_provider_categries}
                        </div>
                      </div>

                      {/* Rating and Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 h-9 text-white bg-[#000] rounded-full px-4 py-1 text-xs">
                          <IoStar size={12} className="text-[#ffff00]" />
                          {venue.services_provider_rating || venue?.rating}
                        </div>
                        <p className="text-white text-xs">
                          ${venue.services_provider_price}/person
                        </p>
                      </div>

                      {/* Package Categories */}
                      <p className="text-[#ffffffc2] text-[14px] mt-2 whitespace-normal overflow-hidden ">
                        {venue.package_categories?.join(",")}
                      </p>

                      {/* Description */}
                      <p className="text-[#ffffffc2] text-[14px] mt-2 whitespace-normal overflow-hidden ">
                        {venue.package_descrption}
                      </p>

                      {/* Address */}
                      <p className="text-[#ffffffc2] text-[14px] mt-2 whitespace-normal overflow-hidden ">
                        {venue.package_address}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

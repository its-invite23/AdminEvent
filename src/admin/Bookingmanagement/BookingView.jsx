import React, { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import ViewImage from "../../asstes/event.jpg";
import Listing from "../../Api/Listing";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../compontents/LoadingSpinner";
import Header from "../compontents/Header";
import { IoIosArrowBack } from "react-icons/io";
import { FaDollarSign, FaEuroSign, FaPoundSign } from "react-icons/fa";
import { TbCurrencyDirham } from "react-icons/tb";
export default function BookingView() {
  const currencySymbol = {
    USD: <FaDollarSign size={18} className="inline" />,
    EUR: <FaEuroSign size={18} className="inline" />,
    AED: <TbCurrencyDirham size={18} className="inline" />,
    GBP: <FaPoundSign size={18} className="inline" />,
  };
  const [currency, setCurrency] = useState("USD"); // Default currency
  const [price, setPrice] = useState(""); // Price input

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value.toUpperCase()); // Convert to uppercase for consistency
  };

  const handleChange = (e) => {
    setPrice(e.target.value);
  };
  const { Id } = useParams();
  const navigate = useNavigate();
  const priceText = {
    1: "Budget-friendly places",
    2: "Mid-range places with good value",
    3: "Higher-end places",
    4: "Luxury and premium options",
  };
  const [item, setItem] = useState("");
  const fetchData = async () => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.BookingGetID(Id);
      setItem(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (Id) {
      fetchData(Id);
    }
  }, [Id]);

  const [loading, setLoading] = useState(false);

  const apikey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


  const handleActiveStatues = (Id, status) => {
    if (!Id || !status) {
      toast.error("Invalid ID or status. Please check your input.");
      return;
    }
    setLoading(true);
    const main = new Listing();
    const response = main.BookingStatus({ _id: Id, status: status });
    response
      .then((res) => {
        fetchData(res?.data?.data?._id);
        if (res && res?.data) {
          toast.success(res.data.message);
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
    if (!price) {
      toast.error("Please Enter Price");
      return;
    }
    setLoading(true);
    const main = new Listing();
    const response = main.BookingPriceUpdate({ _id: Id, price, currency });
    response
      .then((res) => {
        fetchData(res?.data?.data?._id);
        if (res && res?.data?.status) {
          toast.success(res.data.message);
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
    if (!Id) {
      toast.error("Invalid ID or status. Please check your input.");
      return;
    }
    setLoading(true);
    const main = new Listing();
    const response = main.BookingPayment({
      _id: Id,
      payment_genrator_link: true,
    });
    response
      .then((res) => {
        fetchData(res?.data?.data?._id);
        if (res && res?.data?.status) {
          toast.success(res.data.message);
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
    if (Array.isArray(photos) && photos.length > 0) {
      return photos
        .map((photo) => {
          if (photo?.photo_reference) {
            return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apikey}`;
          }
          return null; // Skip invalid entries
        })
        .filter(Boolean); // Filter out null or undefined
    }
    return []; // Return an empty array if photos is invalid or empty
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full max-w-[100%]">
          <Header title={"Booking View"} />
          <div className="w-full  bg-[#1B1B1B] p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-[20px]">
                <h3 className="text-[30px] font-semibold text-white mb-[5px]">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="ml-4 mr-4 mt-5 mb-5 bg-[#EB3465] hover:bg-[#fb3a6e] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center  cursor-pointer"
                  >
                    <IoIosArrowBack size={24} />
                  </button>
                  Booking View
                </h3>
                <button
                  className={`min-w-[110px] capitalize border font-[manrope] font-[600] text-[16px] text-center px-[15px] py-[6px] rounded-[60px] ${item?.status === "pending"
                    ? "border-[#B8A955] bg-[#B8A9551A] text-[#B8A955]"
                    : item?.status === "approved"
                      ? "border-[#4CAF50] bg-[#4CAF501A] text-[#4CAF50]"
                      : item?.status === "rejected"
                        ? "border-[#EB3465] bg-[#EB34651A] text-[#EB3465]"
                        : ""
                    }`}
                >
                  {item?.status}
                </button>
              </div>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <div className="mb-4 w-full">
                  <div className="flex flex-wrap lg-flex-nowrap gap-[20px]">
                    <div className="w-[100%] md:w-[40%] lg:w-[40%]">
                      <div>
                        <img
                          className="w-full object-cover max-h-[400px] rounded-[10px]"
                          src={ViewImage}
                          alt="Sunset in the mountains"
                        />
                      </div>
                    </div>

                    <div className="w-[100%] md:w-[55%] lg:w-[55%] pl-[0px] md:pl-[10px] lg:pl-[80px] xl:pl-[100px]">
                      <div className="w-full mb-[20px] inline-flex flex-wrap justify-start gap-[10px]">
                        <span className="min-w-[110px] inline-flex  capitalize border font-[manrope] text-white font-[600] text-[16px] flex items-center px-[15px] py-[6px] rounded-[60px]">
                          Package Name: {item.package_name}
                        </span>
                        <button
                          className={`min-w-[110px] capitalize border font-[manrope] font-[600] text-[16px] text-center px-[15px] py-[6px] rounded-[60px] ${item?.status === "pending"
                            ? "border-[#B8A955] bg-[#B8A9551A] text-[#B8A955]"
                            : item?.status === "approved"
                              ? "border-[#4CAF50] bg-[#4CAF501A] text-[#4CAF50]"
                              : item?.status === "rejected"
                                ? "border-[#EB3465] bg-[#EB34651A] text-[#EB3465]"
                                : ""
                            }`}
                        >
                          {item?.status}
                        </button>
                      </div>

                      <div className="w-full mb-[10px] text-white font-semibold">
                        Date:{" "}
                        <span className=" text-[17px] ">
                          {item?.bookingDate}
                          {/* {moment(item?.bookingDate).format("MMMM Do, YYYY")} */}
                        </span>
                      </div>
                      <div className="w-full mb-[10px] text-white font-semibold">
                        Location:{" "}
                        <span className="text-white text-[17px]  ">
                          {item?.location}
                        </span>
                      </div>

                      <div className="w-full mb-[10px]">
                        <div className="flex flex-wrap flex-row  items-center gap-4">
                          <div className="flex items-center">
                            <select
                              onChange={(e) =>
                                handleActiveStatues(item?._id, e.target.value)
                              }
                              value={item?.package_status}
                              className="bg-[#000] min-w-[110px]  capitalize border font-[manrope] text-white font-[600] text-[16px] flex items-center px-[15px] py-[8px] rounded-[60px]  focus:outline-none"
                            >
                              <option value="">Select an option</option>
                              <option value="approved">Approve</option>
                              <option value="rejected">Reject</option>
                            </select>
                          </div>
                          <span className="min-w-[110px]  capitalize border font-[manrope] text-white font-[600] text-[16px] flex items-center px-[15px] py-[8px] rounded-[60px]">
                            Number of Attendees: {item.attendees}
                          </span>
                        </div>
                        <div className="flex flex-wrap flex-row mt-5   items-center gap-4">
                          {!item?.CurrencyCode && <div className="flex items-center">

                            <select
                              value={currency}
                              onChange={handleCurrencyChange}
                              className="bg-[#000] min-w-[110px]  capitalize border font-[manrope] text-white font-[600] text-[16px] flex items-center px-[15px] py-[8px] rounded-[60px]  focus:outline-none"
                            >
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="AED">AED</option>
                              <option value="GBP">GBP</option>
                            </select>
                          </div>
                          }

                          <span className="capitalize border font-[manrope] font-[600] text-[16px] text-white px-[15px] py-[6px] rounded-[60px] flex items-center">
                            Total Price:
                            {item?.totalPrice ? (
                              <span> {currencySymbol[item?.CurrencyCode]} {item?.totalPrice}</span>
                            ) : (
                              <>

                                <input
                                  type="number"
                                  value={price}
                                  onChange={handleChange}
                                  className="cursor-pointer  text-white ml-2 w-[60%] bg-transparent outline-none pl-1 py-1 text-sm font-semibold text-white text-left rounded"
                                />
                              </>
                            )}
                          </span>
                          {!item?.totalPrice && (
                            <div className="flex items-center justify-center py-4">
                              <button
                                className="bg-[#ff0062] hover:bg-[#4400c3]  text-white py-2 px-4 rounded"
                                onClick={() => {
                                  handlePriceChange(item?._id);
                                }}
                              >
                                Update Price
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="w-full mb-[10px]">
                        <div className="flex flex-wrap items-center justify-start py-4 gap-[5px] md:gap-[10px]">
                          {/* Right Section: Payment Generator Button */}
                          <div>
                            {item?.payment_genrator_link === false ? (
                              item?.status === "approved" &&
                              item?.totalPrice !== 0 && (
                                <button
                                  onClick={() => handlepayment(item?._id)}
                                  className="bg-[#ff0062] hover:bg-[#4400c3] text-white font-bold text-[12px] md:text-[14px] py-[13px] px-[10px] md:px-[10px] rounded"
                                >
                                  Payment Generator
                                </button>
                              )
                            ) : (
                              <p className="text-green-700 font-bold text-[17px]">
                                Payment already generated. User data has been
                                managed.
                              </p>
                            )}

                            { }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-[20px] md:text-[25px] lg:text-[30px] font-semibold text-white mb-3 mt-[20px] lg:mt-[40px]">
                    Services Provider Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                    {item?.package?.map((venue, index) => (
                      <div
                        className="bg-[#1B1B1B] shadow-lg rounded-lg overflow-hidden flex flex-col  border border-[#9999]"
                        key={index}
                      >
                        <div className="relative">
                          {getPhotoUrls(venue.placeDetails?.photos[0])?.length >
                            0 ? (
                            getPhotoUrls(venue.placeDetails?.photos[0]).map(
                              (url, imgIndex) => (
                                <img
                                  key={imgIndex || ViewImage}
                                  src={url}
                                  alt={venue.name || "Venue Photo"}
                                  className="h-[250px] w-full object-cover"
                                />
                              )
                            )
                          ) : (
                            <img
                              src={ViewImage} // Replace with your default image path
                              alt="Default Placeholder"
                              className="h-[250px] w-full object-cover"
                            />
                          )}
                        </div>

                        <div className=" px-[10px] md:px-[20px] py-[20px]">
                          <div className="flex justify-between items-center mb-[20px]">
                            <h2 className="text-xl font-semibold text-white">
                              {venue.services_provider_name || venue?.name}
                            </h2>
                            {venue.services_provider_phone && (
                              <p className="flex items-center gap-2 h-9 text-white bg-[#000] rounded-full px-4 py-1 text-xs">
                                {venue.services_provider_phone}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center justify-start md:justify-between mb-[15px]">
                            {venue.services_provider_email && (
                              <p className="w-[100%] md:w-[40%] text-white text-sm">
                                {venue.services_provider_email}
                              </p>
                            )}
                            {venue.services_provider_categries && (
                              <p className="flex items-center gap-2 md:mt-0 mt-3 h-9 text-white bg-[#000] rounded-full px-4 py-1 text-xs break-words whitespace-normal text-white text-[13px] capitalize">
                                {venue.services_provider_categries}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center justify-between">
                            {venue.placeDetails?.international_phone_number && (
                              <div className="w-full  flex flex-wrap items-center gap-[10px] text-white text-[15px] mb-[15px]">
                                <p className="font-bold">
                                  International Phone:
                                </p>
                                <p className="text-[#0fc036] text-[13px] font-[700]">
                                  {
                                    venue.placeDetails
                                      ?.international_phone_number
                                  }
                                </p>
                              </div>
                            )}
                            {venue.placeDetails?.formatted_phone_number && (
                              <div className="w-full  flex flex-wrap items-center gap-[10px] text-white text-[14px] mb-[15px]">
                                <p className="font-bold">
                                  Formatted Phone Number:
                                </p>
                                <p className="text-[#0fc036] text-[13px] font-[700]">
                                  {venue.placeDetails?.formatted_phone_number}
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center justify-between gap-[10px] mb-[15px]">
                            {venue?.price_level && (
                              <p className="text-white text-[15px]">
                                {venue?.price_level
                                  ? priceText[venue?.price_level]
                                  : "N/A"}
                              </p>
                            )}
                            {venue?.services_provider_price && (
                              <p className="text-white text-[15px]">
                                {currencySymbol[item?.CurrencyCode]}
                                {venue?.services_provider_price &&
                                  `${venue.services_provider_price}/person`}
                              </p>
                            )}

                            <div className="flex items-center gap-2 h-9 text-white bg-[#000] rounded-full px-4 py-1 text-xs">
                              <IoStar size={11} className="text-[#ffff00]" />
                              {venue.services_provider_rating || venue?.rating}
                            </div>
                          </div>

                          <p className="text-[#fff] text-[16px] mt-2 whitespace-normal overflow-hidden">
                            {venue.package_categories?.map(
                              (category, index) => (
                                <span
                                  key={index}
                                  className="bg-black text-white px-4 py-1 rounded-full  mr-2 mb-2 inline-block"
                                >
                                  {category}
                                </span>
                              )
                            )}
                          </p>

                          {venue?.types && (
                            <p className="text-[#fff] text-[16px] mt-2 whitespace-normal overflow-hidden">
                              {venue?.types
                                ?.filter((category) => category !== "point_of_interest") // Exclude point_of_interest
                                .map((category, index) => (
                                  <span
                                    key={index}
                                    className="bg-black text-white px-4 py-1 rounded-full mr-2 mb-2 inline-block"
                                  >
                                    {category}
                                  </span>
                                ))}
                            </p>
                          )}


                          <p className="text-[#fff] text-[16px] mt-2 whitespace-normal overflow-hidden">
                            <span className="text-[#4CAF50]"> Address: </span>{" "}
                            {venue.package_address
                              ? venue.package_address
                              : venue?.vicinity}
                          </p>
                          <p className="text-[#fff] text-[16px] mt-2 whitespace-normal overflow-hidden">
                            {venue?.package_descrption}{" "}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

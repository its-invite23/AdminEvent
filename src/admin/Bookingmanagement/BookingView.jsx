import React, { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import ViewImage from "../../asstes/event.jpg";
import Listing from "../../Api/Listing";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../compontents/LoadingSpinner";
import moment from "moment";
import Header from "../compontents/Header";

export default function BookingView({ bookignGet }) {
  const { Id } = useParams();
  const priceText = {
    1: "Budget-friendly places",
    2: "Mid-range places with good value",
    3: "Higher-end places",
    4: "Luxury and premium options",
  };
  const [item, setItem] = useState("");
  console.log("item", item);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const main = new Listing();
        const response = await main.BookingGetID(Id);
        console.log("Response:", response);
        setItem(response?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (Id) {
      fetchData(Id);
    }
  }, [Id]);

  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(item.totalPrice);
  const [selectedPackage, setSelectedPackage] = useState();
  console.log("item", item);
  console.log("selectedPackage", selectedPackage);
  const apikey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const handleChange = (e) => {
    const inputPrice = e.target.value;
    const numericPrice = parseFloat(inputPrice) || 0;
    setPrice(numericPrice);
  };

  const packageContact = (place_id) => {
    if (!place_id) {
      console.error("No place_id found in the package.");
      return;
    }

    setLoading(true);
    const main = new Listing(); // Assuming Listing is defined and imported

    main
      .PackageContactGet(place_id) // Pass place_id to the API
      .then((response) => {
        console.log("response", response);
        setLoading(false);
        setSelectedPackage(response?.data?.data);
      })
      .catch((err) => {
        setLoading(false);
        setSelectedPackage([]);
        console.error("Error fetching package contact:", err);
      });
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
        console.log("res", res)
        if (res && res?.data) {
          toast.success(res.data.message);
          packageContact(res?.data?.data?._id);
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
    const response = main.BookingPriceUpdate({ _id: Id, price });
    response
      .then((res) => {
        console.log("res", res)
        if (res && res?.data?.status) {
          console.log("res?.data?.data?._id", res?.data?.data?._id)
          packageContact(res?.data?.data?._id);
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
    console.log("Id:", Id);
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
        if (res && res?.data?.status) {
          toast.success(res.data.message);
          packageContact(Id);
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
      <div className="w-full max-w-[100%]">
        <Header title={"All package"} />
        <div className="w-full  bg-[#1B1B1B] p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-[20px]">
              <h3 className="text-[30px] font-semibold text-white mb-[5px]">
                Booking View
              </h3>
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
                            : item?.status === "approve"
                              ? "border-[#4CAF50] bg-[#4CAF501A] text-[#4CAF50]"
                              : item?.status === "reject"
                                ? "border-[#EB3465] bg-[#EB34651A] text-[#EB3465]"
                                : ""
                          }`}
                      >
                        {item?.status}
                      </button>
                    </div>

                    <div className="w-full mb-[10px]">
                      <strong className="text-[15px] text-[#fff]">
                        Location:{" "}
                      </strong>
                      <span className="text-white inline-flex">
                        {item?.location}
                      </span>
                    </div>



                    <div className="w-full mb-[10px]">
                     
                      <div className="flex flex-wrap flex-row  items-center gap-4">
                      <strong className="text-[15px] text-[#fff]">
                        Date:{" "}
                      </strong>
                      <span className="text-white">
                        {moment(item?.bookingDate).format("MMMM Do, YYYY")}
                      </span>
                        <span className="min-w-[110px]  capitalize border font-[manrope] text-white font-[600] text-[16px] flex items-center px-[15px] py-[8px] rounded-[60px]">
                          Person: {item.attendees}
                        </span>
                      </div>
                      <div className="flex flex-wrap flex-row  items-center gap-4">
                        <span className="w-full max-w-[280px]  capitalize border font-[manrope] font-[600] text-[16px] text-white px-[15px] py-[6px] rounded-[60px] flex items-center">
                          Total Price:
                          <input
                            type="number"
                            value={price}
                            onChange={handleChange}
                            className="cursor-pointer  text-white ml-2 w-[4vw] bg-transparent outline-none pl-1 py-1 text-sm font-semibold text-white text-left rounded"
                          />
                        </span>
                        {item?.totalPrice !== price && (
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
                        <div className="flex items-center">
                          <select
                            onChange={(e) =>
                              handleActiveStatues(item?._id, e.target.value)
                            }
                            value={item?.package_status}
                            className="bg-[#000] border-none px-[15px] py-[13px] text-[15px] md:text-[14px] text-[#fff] rounded-[4px]   focus:outline-none"
                          >
                            <option value="">Select an option</option>
                            <option value="approve">Approve</option>
                            <option value="reject">Reject</option>
                          </select>
                        </div>
                        {/* Right Section: Payment Generator Button */}
                        <div>
                          {/* {item?.status === "approve" &&
                      item?.payment_genrator_link !== true && ( */}
                          <button
                            onClick={() => handlepayment(item?._id)}
                            className="bg-[#ff0062] hover:bg-[#4400c3] text-white font-bold text-[12px] md:text-[14px] py-[13px] px-[10px] md:px-[10px] rounded"
                          >
                            Payment Generator
                          </button>
                          {/* )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-[20px] md:text-[25px] lg:text-[30px] font-semibold text-white mb-3 mt-[20px] lg:mt-[40px]">
                  Services Provider Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                  {item?.package?.map((venue, index) => (
                    <div
                      className="bg-[#1B1B1B] shadow-lg rounded-lg overflow-hidden flex flex-col border border-white border-1 border-[#333]"
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
                          <p className="text-white text-sm mb-[10px]">
                            {venue.services_provider_phone}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-between mb-[15px]">
                          <p className="text-white text-sm">
                            {venue.services_provider_email}
                          </p>
                          <div className="w-full  break-words whitespace-normal">
                            <p className="break-words whitespace-normal text-white text-[13px] capitalize">
                              <strong>Categroy:</strong> {" "}
                              {venue.services_provider_categries
                                ? venue.services_provider_categries
                                : venue?.types?.join(", ")}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-between">
                          <div className="w-full  flex flex-wrap items-center gap-[10px] text-white text-[15px] mb-[15px]">
                            <p className=""><strong>International Phone:</strong></p>
                            <p className="text-[#0fc036] text-[13px] font-[700]">
                              {venue.placeDetails?.international_phone_number}
                            </p>
                          </div>

                          <div className="w-full  flex flex-wrap items-center gap-[10px] text-white text-[15px] mb-[15px]">
                            <p className=""><strong>Formatted Phone Number:</strong></p>
                            <p className="text-[#0fc036] text-[13px] font-[700]">
                              {venue.placeDetails?.formatted_phone_number}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-start gap-[10px]">
                          <div className="flex items-center gap-2 h-9 text-white bg-[#000] rounded-full px-4 py-1 text-xs">
                            <IoStar size={11} className="text-[#ffff00]" />
                            {venue.services_provider_rating || venue?.rating}
                          </div>
                          <p className="text-white text-[15px]">
                            {venue?.price_level
                              ? priceText[venue?.price_level]
                              : `${venue.services_provider_price}/person`}
                          </p>
                        </div>

                        <p className="text-[#fff] text-[16px] mt-2 whitespace-normal overflow-hidden">
                          {venue.package_categories?.join(",")}
                        </p>
                        <p className="text-[#fff] text-[16px] mt-2 whitespace-normal overflow-hidden">
                          {venue.package_descrption}
                        </p>
                        <p className="text-[#fff] text-[16px] mt-2 whitespace-normal overflow-hidden">
                          {venue.package_address
                            ? venue.package_address
                            : venue?.vicinity}
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
    </>
  );
}

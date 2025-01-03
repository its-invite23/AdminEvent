import React, { useEffect, useState } from "react";
import Listing from "../../Api/Listing";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../compontents/LoadingSpinner";
import Header from "../compontents/Header";
import { IoIosArrowBack } from "react-icons/io";
import VenuePhotos from "../compontents/VenuePhotos";
import moment from "moment";
import Valuedata from "../compontents/Valuedata";
import Location from "../compontents/Location";
import PaymentButton from "./PaymentButton";
import SearchPlaces from "./Searchplaces";
export default function BookingView() {

  const [loading, setLoading] = useState(false);
  const [attend, setAttend] = useState("")
  const [currencyprice, setCurrencyPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [price, setPrice] = useState("");
  const [item, setItem] = useState("");
  const [payment, setpayment] = useState("")
  const [loadingbutton, setLoadingButton] = useState(false)
  const { Id } = useParams();
  const currencies = ["USD", "AED", "GBP", "EUR"];
  const navigate = useNavigate();
  const [formdata, setformdata] = useState([])
  console.log("formdata", formdata)
  const fetchData = async () => {
    try {
      const main = new Listing();
      const response = await main.BookingGetID(Id);
      console.log("response", response)
      setformdata(response?.data?.data?.formData && (JSON.parse(response?.data?.data?.formData)))
      setItem(response?.data?.data);
      setPrice(response?.data?.data?.totalPrice)
      setAttend(response?.data?.data?.attendees)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (Id) {
      fetchData(Id);
    }
  }, [Id]);

  const handleActiveStatues = (Id, status) => {
    if (!Id || !status) {
      toast.error("Invalid ID or status. Please check your input.");
      return;
    }
    if (item?.package?.length === 0) {
      toast.error("Please Add Package");
      return;
    }
    if (!price) {
      toast.error("Please Enter Price");
      return;
    }
    setLoadingButton(true)
    const main = new Listing();
    const response = main.BookingStatus({ _id: Id, status: status, attendees: attend, });
    response
      .then((res) => {
        fetchData(res?.data?.data?._id);
        if (res && res?.data) {
          toast.success(res.data.message);
          setResults([]);
        } else {
          toast.error(res.data?.message || "Something went wrong.");
        }
        setLoadingButton(false)

      })
      .catch((error) => {
        console.log("error", error?.response?.data?.message);
        toast.error(error?.response?.data?.message || "An error occurred.");
        setLoadingButton(false);
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
      _id: Id, payment_genrator_link: true, currency: item?.CurrencyCode, totalPrice: totalprice * item?.attendees, AdminCurrencyCode: currency, payment_genrator_date: new Date()
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

  const fechtpaymentdata = async () => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.paymentgetid(Id);
      setpayment(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (Id) {
      fechtpaymentdata(Id);
    }
  }, [Id]);

  let totalprice = null
  const totalPriceLevel = item?.package?.reduce((total, venue) => {
    if (venue?.price_level) {
      totalprice = total + (venue?.price_level ? parseFloat(venue.price_level) : 0);
    } else {
      totalprice = total + (venue?.services_provider_price
        ? parseFloat(venue.services_provider_price
        ) : 0);
    }
    return totalprice;
  }, 0);

  const [inputs, setInputs] = useState(
    item?.package?.map(venue => ({
      id: venue.place_id,
      price: venue.services_provider_price * currencyprice || venue.price_level * currencyprice || ""
    })) || []
  );


  const handleInputChange = (venue, value) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === venue.place_id ? { ...input, price: value } : input
      )
    );
  };

  const handleBlur = (venue, value) => {
    setTimeout(() => {
      if (value === "" || parseFloat(value) < 2) {
        handlePriceChange(venue, null); // Pass `null` to indicate removal
      } else {
        handlePriceChange(venue, parseFloat(value));
      }
    }, 2000); // 2000 milliseconds = 2 seconds
  };

  const handlePriceChange = (venue, updatedPrice) => {
    const updatedInput = inputs?.find(input => input.id === venue.place_id);
    if (!updatedInput) return;
    const price = updatedPrice || updatedInput.price;
    const updatedTotalPriceLevel = item?.package?.reduce((total, currentVenue) => {
      const venuePrice =
        currentVenue.place_id === venue.place_id
          ? parseFloat(price || 0)
          : currentVenue.price_level
            ? parseFloat(currentVenue.price_level)
            : parseFloat(currentVenue.services_provider_price || 0);

      return total + (venuePrice || 0);
    }, 0);

    const main = new Listing();
    main.BookingPriceUpdate({
      _id: Id,
      place_id: venue.place_id,
      price: price,
      totalPrice: updatedTotalPriceLevel * item?.attendees,
      currency: currency,
      attendens: attend
    })
      .then((res) => {
        if (res && res?.data?.status) {
          fetchData(res?.data?.data?._id);
          toast.success(res.data.message);
          setInputs(prevInputs =>
            prevInputs.map(input =>
              input.id === venue.place_id ? { ...input, price: res.data.price } : input
            )
          );
        } else {
          toast.error(res.data?.message || "Something went wrong.");
        }
      })
      .catch((error) => {
        console.log("error", error?.response?.data?.message);
        toast.error(error?.response?.data?.message || "An error occurred.");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (item?.package) {
      setInputs(
        item.package.map(venue => ({
          id: venue.place_id,
          price: venue.services_provider_price || venue.price_level || ""
        }))
      );
    }
  }, [item]);

  const fectcurrency = async () => {
    try {
      const main = new Listing();
      const response = await main.CurrencyChange(currency); // API call with selected currency
      setCurrencyPrice(response?.data?.data); // Update state with the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (currency) {
      fectcurrency();
    }
  }, [currency]); //

  const totalPriceData = totalprice * item?.attendees * currencyprice;


  const [results, setResults] = useState([]);

  const truncateText = (text,) => {
    if (text.length <= 25) {
      return text;
    }
    return text.slice(0, 25) + '...';
  };


  const RecapDetail = ({ label, value }) => (
    <div className="rounded-lg">
      <p className="text-[#EB3465] text-[13px] md:text-[16px] lg:text-[18px]">
        {label}
      </p>
      <p className="text-white text-[13px] md:text-[16px] lg:text-[18px] break-words">
        {value}
      </p>
    </div>
  );

  const priceText = {
    1: "Budget-friendly place",
    2: "Mid-range place with good value",
    3: "Higher-end place",
    4: "Luxury and premium option",
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
                <h3 className="text-[25px] font-semibold text-white mb-[5px]">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="ml-4 mr-4 mt-5 mb-5 bg-[#EB3465] hover:bg-[#fb3a6e] font-manrope font-[700] text-[14px] px-[15px] py-[8px] text-white rounded-[5px] text-center  cursor-pointer">
                    <IoIosArrowBack size={20} />
                  </button> Back

                </h3>
                <div className="ps-6">
                  <label className="text-gray-300 mb-2 block">Choose Currency</label>
                  <select
                    defaultValue={currency}
                    className="bg-gray-700 border border border-gray-700 p-3 rounded-xl text-white w-full"
                    onChange={(e) => (setCurrency(e.target.value))} >
                    {currencies.map((currency, idx) => (
                      <option key={idx} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>

              </div>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <div className="mb-4 w-full">
                  <div className="flex flex-wrap lg-flex-nowrap gap-[20px]">


                    <div className="w-[100%]  ">
                      <div className="w-full mb-[20px] inline-flex flex-wrap justify-start gap-[10px]">
                        <h2 className="w-full text-2xl font-bold text-white">
                          {item?.package_name?.replaceAll("_", " ")}
                        </h2>
                      </div>
                      <div className="w-full mb-[10px] text-white font-semibold">
                        Booking Date:{" "}
                        <span className=" text-[17px] ">
                          {moment(item?.bookingDate, "DD-MM-YYYY").format("DD MMMM YYYY")}
                        </span>
                      </div>
                      <div className="w-full mb-[10px] text-white font-semibold">
                        Location:{" "}
                        <span className="text-white text-[17px]  ">
                          {item?.location}
                        </span>
                      </div>
                      <div className="w-full mb-[10px] text-white font-semibold">
                        Booking Status:
                        <button className={`px-3 py-1 ms-2 rounded-[30px] capitalize  ${item?.status === "pending"
                          ? "border-[#B8A955] bg-[#B8A9551A] text-[#B8A955]"
                          : item?.status === "approved"
                            ? "border-[#4CAF50] bg-[#4CAF501A] text-[#4CAF50]"
                            : item?.status === "rejected"
                              ? "border-[#EB3465] bg-[#EB34651A] text-[#EB3465]"
                              : ""
                          }`}>
                          {item?.status}
                        </button>
                      </div>
                      <p className="w-full mb-[10px] text-gray-200 border-t border-gray-800 mt-4 pt-4 text-[17px] font-bold">
                        User Info :
                      </p>
                      <div className="w-full mb-[10px] text-white font-semibold">
                        Name:{" "}
                        <span className="text-white capitalize text-[17px]  ">
                          {item?.userId?.username}
                        </span>
                      </div>

                      <div className="w-full mb-[10px] text-white font-semibold">
                        Email:{" "}
                        <span className="text-white text-[17px]  ">
                          {item?.userId?.email}
                        </span>
                      </div>

                      <div className="w-full mb-[10px] text-white font-semibold">
                        Phone Number:{" "}
                        <span className="text-white text-[17px]  gap-2">
                          {item?.userId?.phone_code}
                          {item?.userId?.phone_number}
                        </span>
                      </div>

                      <div className="w-full mb-[10px] text-white font-semibold">
                        User Selected Currency:{" "}
                        <span className="text-white text-[17px]  gap-2">
                          {item?.CurrencyCode}
                        </span>
                      </div>
                      <div>
                      </div>
                    </div>


                  </div>
                  {formdata?.length !== 0 && (
                    <div className=" p-1 mt-4 mb-4 ">
                      <h2 className="font-manrope font-[600] text-white text-[18px] md:text-[24px] mb-[15px]">User Filled Form Data</h2>

                      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-[10px] md:gap-[15px] lg:gap-[20px]">
                        <RecapDetail
                          label="📅 Date & Time:"
                          value={
                            formdata?.day && formdata?.month && formdata?.year
                              ? `${formdata.day}-${formdata.month}-${formdata.year},  ${formdata?.time}`
                              : "N/A"
                          }
                        />
                        <RecapDetail
                          label="🗺️ Location:"
                          value={formdata?.area || "N/A"}
                        />
                        <RecapDetail
                          label="🥳 Event Type:"
                          value={formdata?.event_type?.replaceAll("_", " ") || "N/A"}
                        />
                        <RecapDetail
                          label="👥 Number of Attendees:"
                          value={formdata?.people || "N/A"}
                        />
                        <RecapDetail
                          label="🍔 Food:"
                          value={
                            formdata?.food_eat?.join(", ") ||
                            "N/A"
                          }
                        />
                        <RecapDetail
                          label=" Place:"
                          value={
                            formdata?.place ||
                            "N/A"
                          }
                        />
                        <RecapDetail
                          label="💵 Budget:"
                          value={priceText[formdata?.budget] || "N/A"}
                        />
                        <RecapDetail
                          label="🎳 Activity:"
                          value={formdata?.activity?.join(", ") || "N/A"}
                        />
                        <RecapDetail
                          label="👤 Fist Name:"
                          value={formdata?.firstname || "N/A"}
                        />
                        <RecapDetail
                          label="👤 Last Name:"
                          value={formdata?.lastname || "N/A"}
                        />
                        <RecapDetail
                          label="📞 Phone:"
                          value={
                            formdata?.phone_code && formdata?.number
                              ? `${formdata.phone_code} ${formdata.number}`
                              : "N/A"
                          }
                        />

                        <RecapDetail
                          label="✉️ Email:"
                          value={formdata?.email || "N/A"}
                        />

                        <RecapDetail
                          label="🏠 Private Place:"
                          value={formdata?.Privatize_place || "N/A"}
                        />
                        <RecapDetail
                          label="🎯 Private Activity:"
                          value={formdata?.Privatize_activity || "N/A"}
                        />
                        <RecapDetail
                          label="⌛ Description:"
                          value={formdata?.details || "N/A"}
                        />
                      </div>

                      <div className="gap-[10px] md:gap-[15px] lg:gap-[20px] mt-[10px]">
              <RecapDetail
                label="⌛Event description:"
                value={formdata?.summary || "N/A"}
              />
            </div>
                    </div>
                  )}

                  {item?.status === "pending" && (
                    <SearchPlaces results={results} setResults={setResults} Id={Id} fetchData={fetchData} item={item} />
                  )}
                  {item?.package?.length !== 0 && (

                    <div className="flex flex-wrap justify-between items-center">
                      <h2 className="font-manrope font-[600] text-white text-[18px] md:text-[24px] mb-[15px]">
                        Existing Services Providers
                      </h2>
                    </div>
                  )}
                  <div className="mt-2 mb-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                    {item?.package?.map((venue, index) => (
                      <div
                        className="bg-[#1B1B1B] shadow-lg rounded-xl overflow-hidden flex flex-col border border-gray-700"
                        key={index} >
                        <VenuePhotos venue={venue} Id={Id} fetchData={fetchData} item={item} />
                        <div className="p-6">
                          <h2 className="text-xl font-semibold capitalize text-white">
                            {venue.services_provider_name || venue?.name}
                          </h2>
                          {venue?.services_provider_price && (
                            <p className="text-white font-bold my-2 text-[20px]">
                              <Valuedata currency={currency} amount={venue.services_provider_price * currencyprice} />Per Person
                            </p>
                          )}

                          {venue?.price_level && (
                            <p className="text-white font-bold my-2 text-[20px]">
                              <Valuedata currency={currency} amount={venue.price_level * currencyprice} /> Per Person

                            </p>
                          )}

                          {venue.services_provider_name && (
                            <ul>
                              <li className="text-white flex"><strong className="pe-2">Phone:</strong> {venue?.services_provider_phone && (<Link to={`tel:${venue.services_provider_phone}`} className="flex items-center text-white hover:text-[#4CAF50]" >  {venue.services_provider_phone} </Link>)}</li>
                              <li className="text-white flex"><strong className="pe-2">Email:</strong> {venue?.services_provider_email && (<Link to={`mailto:${venue.services_provider_email}`} className="flex items-center text-white hover:text-[#4CAF50]" >  {venue.services_provider_email} </Link>)}</li>
                              <Location venue={venue} />
                            </ul>
                          )}

                          {venue.name && (
                            <ul>
                              <li className="text-white flex"><strong className="pe-2">Phone:</strong> {venue?.placeDetails?.international_phone_number && (<Link to={`tel:${venue?.placeDetails?.international_phone_number}`} className="flex items-center text-white hover:text-[#4CAF50]" >  {venue?.placeDetails?.international_phone_number} </Link>)}</li>
                              <li className="text-white flex"><strong className="pe-2">Phone:</strong> {venue.placeDetails?.formatted_phone_number && (<Link to={`tel:${venue.placeDetails.formatted_phone_number}`} className="flex items-center text-white hover:text-[#4CAF50]" >  {venue.placeDetails.formatted_phone_number} </Link>)}</li>
                              <Location venue={venue} />
                            </ul>
                          )}
                          <p className="truncate-two-lines text-[#fff] text-[16px] mt-2 whitespace-normal overflow-hidden">
                            {venue?.package_descrption}{" "}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-full pt-8 pb-2">
                    <div className="flex max-w-[600px]">
                      <div className="w-full">
                        <label className="text-gray-300 mb-2 block">Choose No. of attendees</label>
                        <input type="number" value={attend} onChange={(e) => (setAttend(e.target.value))} className="bg-gray-700 border border border-gray-700 p-3 rounded-xl text-white w-full" />
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    {item?.package?.map((venue, index) => (<div key={index}
                      className="border border-gray-700 p-4  rounded-xl flex-wrap  mb-3">
                      <div className="flex justify-between">
                        <div className="flex flex-col">
                          {/* <h2 className="text-white text-2xl capitalize">
                            {venue.services_provider_name || venue?.name}
                          </h2> */}
                          <h2 className="text-white text-2xl capitalize">
                            {truncateText(venue.services_provider_name || venue?.name, 20)}
                          </h2>

                          <div className="flex flex-col">
                            {venue?.services_provider_price && (
                              <div className="flex flex-col items-start">
                                <p className="text-white font-bold my-2 text-[20px] mr-4">
                                  <Valuedata currency={currency} amount={venue.services_provider_price * currencyprice} />/ per person
                                </p>
                                <div className="flex flex-wrap">
                                  {venue.package_categories?.map((category, index) => (
                                    <span
                                      key={index}
                                      className="bg-black capitalize text-white px-4 py-1 rounded-full mr-2 mt-2"
                                    >
                                      {category}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div className="flex flex-col items-start">
                              {venue.price_level && (
                                <p className="text-white font-bold my-2 text-[20px] mr-4">
                                  <Valuedata currency={currency} amount={isNaN(venue.price_level) ? 0 : venue?.price_level?.toFixed(2) * currencyprice} /> Per Person
                                </p>
                              )}

                              <div className="flex flex-wrap">
                                {venue?.types
                                  ?.filter((category) => category !== "point_of_interest") // Exclude point_of_interest
                                  .map((category, index) => (
                                    <span
                                      key={index}
                                      className="bg-black capitalize text-white px-4 py-1 rounded-full mr-2 mt-2"
                                    >
                                      {category?.replaceAll("_", " ")}
                                    </span>
                                  ))}
                              </div>
                            </div>
                          </div>

                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center flex">
                            <p className="text-white whitespace-nowrap pe-3">Price (
                              {/* <Valuedata currency={currency} /> */}
                              {currency}
                              ) (Per Person) </p>
                            <input
                              type="number"
                              className="px-3 py-2 bg-gray-700 border border-gray-700 rounded-xl text-white w-full me-3"
                              placeholder="Enter Price Per Person"
                              value={inputs?.find(input => input.id === venue.place_id)?.price}
                              onChange={(e) => handleInputChange(venue, e.target.value)}
                              onBlur={(e) => handleBlur(venue, e.target.value)}
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                    ))}
                  </div>

                  <ul className="bg-[#0006] p-6 rounded-xl">
                    {item?.package?.map((venue, index) => {
                      const price = venue?.price_level ? parseFloat(venue?.price_level) : parseFloat(venue?.services_provider_price);
                      const validPrice = isNaN(price) ? 0 : price?.toFixed(2);
                      const totalPrice = (validPrice * currencyprice)?.toFixed(2);
                      const validTotalPrice = isNaN(totalPrice) ? 0 : totalPrice;

                      return (
                        <li key={index} className="text-white mt-2">
                          <strong className="capitalize">{venue.services_provider_name || venue?.name}</strong>:{" "}
                          <Valuedata amount={validTotalPrice} currency={currency} /> x {item?.attendees}
                        </li>
                      );
                    })}



                    <li className="text-white mt-2">
                      <strong>Total Price:</strong>{" "}
                      <Valuedata amount={totalPriceData} currency={currency} />
                    </li>
                  </ul>

                  {loadingbutton ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      {item?.status === "pending" && (

                        <div className="w-full mb-[10px] mt-[30px]">
                          <div className="flex flex-wrap flex-row items-center">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleActiveStatues(item?._id, "approved")}
                                className="min-w-[110px] border-[#4CAF50] bg-[#4CAF501A] text-[#4CAF50] capitalize border font-[manrope] font-[600] text-[16px] text-center px-[15px] py-[6px] rounded-[60px]"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleActiveStatues(item?._id, "rejected")}
                                className="min-w-[110px] border-[#EB3465] bg-[#EB34651A] text-[#EB3465] capitalize border font-[manrope] font-[600] text-[16px] text-center px-[15px] py-[6px] rounded-[60px]"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <div className="w-full">
                    <div className="flex flex-wrap items-center justify-start py-4 gap-[5px] md:gap-[10px]">
                      <div>
                        <>
                          {payment?.payment_status === "success" ? (
                            <p className="text-green-600 font-bold text-[16px] md:text-[18px] py-[13px] px-[10px] md:px-[10px] rounded">
                              Payment Successful!
                            </p>

                          ) : (
                            item?.status === "approved" &&
                            (item?.payment_genrator_link === false ? (

                              <div className="flex flex-wrap items-center space-x-4">
                                <div className="ps-6">
                                  <select
                                    defaultValue={currency}
                                    className="bg-gray-700 border border border-gray-700 p-3 rounded-xl text-white w-full"
                                    onChange={(e) => setCurrency(e.target.value)}
                                  >
                                    {currencies.map((currency, idx) => (
                                      <option key={idx} value={currency}>
                                        {currency}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <button
                                  onClick={() => handlepayment(item?._id)}
                                  className="bg-[#ff0062] hover:bg-[#4400c3] text-white font-bold text-[12px] md:text-[14px] py-[13px] px-[10px] md:px-[10px] rounded"
                                >
                                  Generate Payment Link
                                </button>
                              </div>

                            ) : (
                              <>
                                <p className=" text-green-600 font-bold text-[16px] md:text-[18px] py-[13px] px-[10px] md:px-[10px] rounded">
                                  Payment Link Generated Successfully!
                                </p></>
                            ))
                          )}
                          <PaymentButton item={item} handlepayment={handlepayment} payment={payment} />
                        </>
                      </div>
                    </div>
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
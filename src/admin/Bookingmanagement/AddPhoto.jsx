import React, { useState } from "react";
import ViewImage from "../../asstes/event.png";
import { IoStar } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import Listing from "../../Api/Listing";
import toast from "react-hot-toast";
import LoadingSpinner from "../compontents/LoadingSpinner";

const AddPhoto = ({ venue, Id, fetchData }) => {
  const apikey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
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
  const photos = venue?.photos?.length > 0 ? venue.photos : ViewImage;
  const photoUrls = getPhotoUrls(photos);
  const [loading, setLoading] = useState(false);
  const handleAddClick = () => {
    setLoading(true);
    const main = new Listing();
    const response = main.Bookingupdate(
      {
        Id: Id,
        newPackageData: venue
      }
    )
    response
      .then((res) => {
        if (res && res?.data?.status) {
          toast.success(res.data.message);
          fetchData();
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(res.data?.message || "Something went wrong.");
        }

      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error?.response?.data?.message);
        toast.error(error?.response?.data?.message || "An error occurred.");
      });

  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="relative">
          {photoUrls.length > 0 && (
            <>
              <div className="relative">
                <img
                  src={photoUrls[0] ? photoUrls[0] : ViewImage || ViewImage}
                  alt={venue.name || "Venue Photo"}
                  className="h-[250px] w-full object-cover"
                />
                <div onClick={handleAddClick} className="absolute top-2 right-2 bg-gray-600	 hover:bg-gray-500	 rounded-full px-4 py-1 text-xs flex items-center h-9 text-white">
                  <MdAdd size={24} />
                </div>
                {venue.rating && (
                  <div className="absolute capitalize top-2 left-2 bg-[#000] rounded-full px-4 py-1 text-xs flex items-center h-9 text-white">
                    <IoStar size={11} className="text-[#ffff00] mr-2" />
                    {venue?.rating}
                  </div>
                )}
                <div className="absolute bottom-1 left-1 text-white text-[13px] flex flex-wrap">
                  {venue?.types
                    ?.filter((category) => category !== "point_of_interest") // Exclude point_of_interest
                    .map((category, index) => (
                      <span
                        key={index}
                        className="bg-black capitalize text-white px-3 py-1 rounded-full mr-1 mb-1 inline-block"
                      >
                        {category?.replace("_", " ")}
                      </span>
                    ))}
                </div>
              </div>
            </>

          )}
        </div>
      )}
    </>

  );
};

export default AddPhoto;

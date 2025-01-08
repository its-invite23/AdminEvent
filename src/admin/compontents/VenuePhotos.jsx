import React from "react";
import ViewImage from "../../asstes/event.png";
import { IoStar } from "react-icons/io5";
// Ensure correct path to default image
import DeleteVenue from "../Bookingmanagement/DeleteVenue";

const VenuePhotos = ({ venue, Id, fetchData, item }) => {
  const apikey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const getPhotoUrls = (photos) => {
    if (Array.isArray(photos) && photos.length > 0) {
      return photos
        .map((photo) => {
          if (photo?.photo_reference) {
            return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apikey}`;
          }
          return null;
        })
        .filter(Boolean);
    }
    return [];
  };

  const photos = venue?.placeDetails?.photos ? venue?.placeDetails?.photos : venue?.photos;
  const photoUrls = getPhotoUrls(photos);


  return (
    <div className="relative">
      {item?.package_data === "google" ? (
        <>
          <div className="relative">
            <img
              src={photoUrls[0] ? photoUrls[0] : ViewImage}
              alt={venue.name || "Venue Photo"}
              className="h-[250px] w-full object-cover"
            />
            {item?.package_data === "google" && (
              <DeleteVenue Id={Id} venue={venue} fetchData={fetchData} item={item?.payment_genrator_link} />
            )}
            {/* <div className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 rounded-full px-4 py-1 text-xs flex items-center h-9 text-white">
              <MdDelete size={24} />
            </div> */}
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
                    {category?.replaceAll("_", " ")}
                  </span>
                ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="relative">
            <img
              src={venue?.services_provider_image || ViewImage}
              alt="Default Placeholder"
              className="h-[250px] w-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-[#000] rounded-full px-4 py-1 text-xs flex items-center h-9 text-white">
              <IoStar size={11} className="text-[#ffff00] mr-2" />
              {venue.services_provider_rating}
            </div>
            {venue.services_provider_categries && (
              <div className="absolute capitalize top-2 left-2 bg-[#000] rounded-full px-4 py-1 text-xs flex items-center h-9 text-white">
                {venue.services_provider_categries}
              </div>
            )}
            <div className="absolute bottom-1 left-1 text-white text-[13px] flex flex-wrap">
              {venue.package_categories?.map((category, index) => (
                <span
                  key={index}
                  className="bg-black capitalize text-white px-2 py-1 rounded-full mr-2 mb-2 inline-block"
                >
                  {category?.replaceAll("_", " ")}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VenuePhotos;

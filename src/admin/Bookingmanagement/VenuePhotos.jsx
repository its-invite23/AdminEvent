import React from "react";
import ViewImage from "../../asstes/event.png";
 // Ensure correct path to default image

const VenuePhotos = ({ venue }) => {
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

  const photos = venue?.placeDetails?.photos || [];
  const photoUrls = getPhotoUrls(photos);


  return (
    <div className="relative">
      {photoUrls.length > 0 ? (
        <img
          src={photoUrls[0]}
          alt={venue.name || "Venue Photo"}
          className="h-[250px] w-full object-cover"
        />
      ) : (
        <img
          src={venue?.services_provider_image || ViewImage} // Ensure correct path to default image
          alt="Default Placeholder"
          className="h-[250px] w-full object-cover"
        />
      )}
    </div>
  );
};

export default VenuePhotos;

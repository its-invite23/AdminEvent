import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const Loaction = ({ venue }) => {
  const location = venue.package_address ? venue.package_address : venue?.vicinity;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

  return (
    <li className="text-white flex"><strong className="pe-2">    Loation:</strong> 
    <a 
        href={googleMapsUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center text-white hover:text-[#4CAF50] "
      >
        {location}
      </a>
     </li>
  );
};

export default Loaction;

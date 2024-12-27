import React from "react";

const Location = ({ venue }) => {
    const location = venue.package_address ? venue.package_address : venue?.formatted_address ? venue?.formatted_address : venue?.vicinity;
    const googleMapsUrl = ``;

    return (
        <li className="text-white flex"><strong className="pe-2">    Location:</strong>
            <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white hover:text-[#4CAF50] truncate-two-lines"
            >
                {location}
            </a>

        </li>
    );
};

export default Location;

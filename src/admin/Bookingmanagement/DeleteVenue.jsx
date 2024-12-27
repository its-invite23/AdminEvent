import React from 'react'
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md'
import Listing from '../../Api/Listing';

export default function DeleteVenue({ Id, venue, fetchData, item }) {
    const place_id = venue?.place_id
    const handleDeleteClick = () => {
        const main = new Listing();
        const response = main.BookingDelete(Id, place_id)
        response
            .then((res) => {
                if (res && res?.data?.status) {
                    toast.success(res.data.message);
                    fetchData();
                } else {
                    toast.error(res.data?.message || "Something went wrong.");
                }
            })
            .catch((error) => {
                console.log("error", error?.response?.data?.message);
                toast.error(error?.response?.data?.message || "An error occurred.");
            });

    };
    return (

        <div onClick={item === true ? null : handleDeleteClick} className={`absolute top-2 right-2 rounded-full px-4 py-1 text-xs flex items-center h-9 text-white ${item ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 cursor-pointer'}`} > <MdDelete size={24} /> </div>
    )
}

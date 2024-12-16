import React from 'react'
import VenuePhotos from './VenuePhotos'
import Valuedata from './Valuedata'
import Location from './Location'
import { Link } from 'react-router-dom'

export default function Card({item ,currency ,currencyprice}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                    {item?.package?.map((venue, index) => (
                      <div
                        className="bg-[#1B1B1B] shadow-lg rounded-xl overflow-hidden flex flex-col border border-gray-700"
                        key={index} >
                        <VenuePhotos venue={venue} />
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
                              <li className="text-white flex"><strong className="pe-2">Phone:</strong> {venue.placeDetails.formatted_phone_number && (<Link to={`tel:${venue.placeDetails.formatted_phone_number}`} className="flex items-center text-white hover:text-[#4CAF50]" >  {venue.placeDetails.formatted_phone_number} </Link>)}</li>
                              <Location venue={venue} />
                            </ul>
                          )}
                          <p className="truncate-two-lines text-[#fff] text-[16px] mt-2 whitespace-normal overflow-hidden">
                            {venue?.package_descrption || venue?.placeDetails?.editorial_summary?.overview}{" "}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
  )
}

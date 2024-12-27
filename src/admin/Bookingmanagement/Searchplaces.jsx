import React, {  useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import Listing from '../../Api/Listing';
import AddPhoto from './AddPhoto';
import toast from 'react-hot-toast';
import LoadingSpinner from '../compontents/LoadingSpinner';
const Searchplaces = ({ results, setResults, Id, fetchData, item }) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.searchPlaces({ query });
      if (response.data.status === true) {
        setResults(response?.data?.data);
        setLoading(false);
      } else {
        toast.error(response?.data?.message);
        setLoading(false);
      }
    } catch (err) {
      setResults([]);
      setLoading(false);
    }
  };

  const filteredResults = results?.filter(
    (venue) => !item?.package?.some((pkg) => pkg?.place_id === venue?.place_id)
  );

//   useEffect(() => {
//     // Trigger search if query length is 1 or 3 or more
//     if ((query && query.length >= 3) || query?.length === 1) {
//       handleSearch();
//     }
//   }, [query]);

  return (
    <>
      {item?.package_data === "google" && (
        <>
          <div className="flex flex-wrap justify-between items-center">
            <h2 className="font-manrope font-[600] text-white text-[18px] md:text-[24px] mb-[15px] mt-[10px]">
              {filteredResults?.length !== 0 ? (
                "Choose Services Providers"
              ) : ("Please Find Another Services Provider")}
            </h2>
            <div className={`relative w-full max-w-[370px]`}>
              <IoSearch
                onClick={handleSearch}
                size={24}
                className="absolute top-[50%] translate-y-[-50%] right-[10px] text-white cursor-pointer"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                name="query"
                className="w-full bg-[#1B1B1B] border border-[#37474F] p-[10px] pl-[20px] pr-[40px] rounded-[50px] text-white text-[15px] hover:outline-none focus:outline-none"
                placeholder="Search By Name"
              />
            </div>
          </div>
        </>
      )}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {filteredResults && (
            <div className="grid grid-cols-1 mt-5 mb-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {filteredResults?.map((venue, index) => (
                <div
                  className="bg-[#1B1B1B] shadow-lg rounded-xl overflow-hidden flex flex-col border border-gray-700"
                  key={index} >
                  <AddPhoto venue={venue} Id={Id} fetchData={fetchData} setResults={setResults} setQuery={setQuery} item={item} />
                  <div className="p-6">
                    <h2 className="text-xl font-semibold capitalize text-white">
                      {venue.services_provider_name || venue?.name}
                    </h2>
                    <h2 className='text-white'>
                      {venue?.place_id}
                    </h2>
                    {venue.name && (
                      <ul>
                        <li className="text-white flex"><strong className="pe-2">Location:</strong>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue?.formatted_address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-white hover:text-[#4CAF50] truncate-two-lines"
                          >
                            {venue?.formatted_address}
                          </a>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Searchplaces;

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Listing from '../../Api/Listing';
import Header from '../compontents/Header';
import LoadingSpinner from '../compontents/LoadingSpinner';
import { IoIosArrowBack } from "react-icons/io";
import PackageImage from './PackageImage';
import ServicepackageImage from './ServicepackageImage';
export default function AddPackage() {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(""); // State to store the selected option

  console.log("selectedOption", selectedOption)

  const [formData, setFormData] = useState({
    package_name: "",
    package_people: "",
    package_price_min: "",
    package_price_max: "",
    package_image: "",
    package_description: "",
    package_subtitle: "",
    package_services: [],
    Id: Id,
    image_filed: "",
  });

  console.log("formData", formData)
  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value); // Update the selected option

    // Update services_provider_categries for all services
    setFormData((prevState) => ({
      ...prevState,
      package_services: prevState.package_services.map(service => ({
        ...service,
        services_provider_categries: value,
      })),
    }));
  };
  const removePackage = (index) => {
    setFormData((prevState) => {
      const updatedServices = [...prevState.package_services];
      updatedServices.splice(index, 1);

      return {
        ...prevState,
        package_services: updatedServices,
      };
    });
  };
  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedServices = [...prevState.package_services];
      updatedServices[index] = {
        ...updatedServices[index],
        [name]: value,
      };

      return {
        ...prevState,
        package_services: updatedServices,
      };
    });
  };

  const addNewPackage = () => {
    setFormData((prevState) => ({
      ...prevState,
      package_services: [
        ...prevState.package_services,
        {
          services_provider_email: "",
          package_categories: [],
          services_provider_phone: "",
          services_provider_name: "",
          package_address: "",
          services_image_filed: "",
          services_provider_categries: selectedOption || "",
          package_descrption: "",
          services_provider_price: "",
          services_provider_rating: '',
          services_provider_image: ""
        }
      ],
    }));
  };

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const main = new Listing();
    try {
      const response = await main.packageGetId({ Id });

      if (response && response.data) {
        const {
          package_name,
          package_people,
          package_services,
          package_price_min,
          package_price_max,
          package_image,
          package_subtitle,
          package_description,
        } = response.data.data;
        const serviceData = package_services && package_services.length > 0 ? package_services[0] : {};
        setFormData({
          package_name: package_name || "",
          package_people: package_people || "",
          package_description: package_description || "",
          package_price_min: package_price_min || "",
          package_subtitle: package_subtitle || "",
          package_services: package_services || [], // Directly store the array
          package_price_max: package_price_max || "",
          package_image: package_image || "",
          service_provider_email: serviceData.services_provider_email || "",
          service_provider_name: serviceData.services_provider_name || "",
          service_provider_phone: serviceData.services_provider_phone || "",
          package_categories: serviceData.package_categories || [],
          package_address: serviceData.package_address || "",
          service_provider_price: serviceData.services_provider_price || "",
          service_provider_rating: serviceData.services_provider_rating || '',
          service_provider_image: serviceData.services_provider_image || "",
          package_descrption: serviceData.package_descrption || "",
          image_filed: serviceData.services_image_filed || "",
          services_provider_categries :serviceData.services_provider_categries  || "",
        });
        setSelectedOption(serviceData.services_provider_categries  || "")
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };


  useEffect(() => {
    if (Id) {
      fetchData();
    }
  }, [Id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (e, index) => {
    const categories = e.target.value.split(',').map(category => category.trim());
    setFormData((prevState) => {
      const updatedServices = [...prevState.package_services];
      updatedServices[index] = {
        ...updatedServices[index],
        package_categories: categories,
      };

      return {
        ...prevState,
        package_services: updatedServices,
      };
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const main = new Listing();

    try {
      if (Id) {
        const res = await main.packageUpdate({ Id, ...formData });
        if (res && res.data && res.data.status) {
          toast.success(res.data.message);
          navigate("/access-admin/package");
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await main.packageAdd(formData);
        if (res && res.data && res.data.status) {
          toast.success(res.data.message);
          navigate("/access-admin/package");
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
      setFormData({
        package_name: "",
        package_people: "",
        package_price_min: "",
        package_price_max: "",
        services_provider_name: "",
        services_provider_email: "",
        package_categories: [],
        package_image: "",
        services_provider_phone: ""
      });
    }
  };

  return (
    <div className='w-full max-w-[100%]'>
      <Header title={Id ? "Edit Package" : "Add Package"} />
      <div className="w-full bg-[#1B1B1B] p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
        <button type="button" onClick={() => (navigate(-1))} className="mt-5 mb-5 bg-[#EB3465] hover:bg-[#fb3a6e] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center ${loading && 'opacity-50 cursor-pointer"><IoIosArrowBack size={24} /></button>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block w-full font-manrope font-[400] text-[14px] md:text-[16px] xl:text-[18px] text-white mb-[10px]">Package Name</label>
              <input
                type="text"
                onChange={handleChange}
                name="package_name"
                value={formData.package_name}
                className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                placeholder="Enter package name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block w-full font-manrope font-[400] text-[14px] md:text-[16px] xl:text-[18px] text-white mb-[10px]">Package Description</label>
              <input
                type="text"
                onChange={handleChange}
                name="package_description"
                value={formData.package_description}
                className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                placeholder="Enter description"
                required
              />
            </div>
            {/* Row for Minimum, Maximum Price and People */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block w-full font-manrope font-[400] text-[14px] md:text-[16px] xl:text-[18px] text-white mb-[10px]">Package People</label>
                <input
                  type="number"
                  onChange={handleChange}
                  name="package_people"
                  value={formData.package_people}
                  className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                  placeholder="Enter number of people"
                  required
                />
              </div>
              <PackageImage setFormData={setFormData} formData={formData} />
            </div>
            {formData.package_services?.map((packageData, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg text-white">Services Provider {index + 1}</h3>

                  <button
                    type="submit"
                    onClick={() => removePackage(index)}
                    className={`bg-[#EB3465] hover:bg-[#fb3a6e] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center ${loading && 'opacity-50 cursor-pointer'}`}
                  >
                    Remove Services
                  </button>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block w-full font-manrope font-[400] text-[14px] md:text-[16px] xl:text-[18px] text-white mb-[10px]">Service Provider Name</label>
                    <input
                      type="text"
                      onChange={(e) => handleServiceChange(e, index)}
                      name="services_provider_name"
                      value={packageData.services_provider_name}
                      className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                      placeholder="Enter Services Provider Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block w-full font-manrope font-[400] text-[14px] md:text-[16px] xl:text-[18px] text-white mb-[10px]">Email</label>
                    <input
                      type="email"
                      onChange={(e) => handleServiceChange(e, index)}
                      name="services_provider_email"
                      value={packageData.services_provider_email}
                      className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                      placeholder="Enter services provider email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block w-full font-manrope font-[400] text-[14px] md:text-[16px] xl:text-[18px] text-white mb-[10px]">Number</label>
                    <input
                      type="text"
                      name="services_provider_phone"
                      value={packageData.services_provider_phone}
                      className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                      placeholder="Enter services provider number"
                      onChange={(e) => {
                        if (
                          e.target.value.length <= 10 &&
                          /^[0-9]*$/.test(e.target.value)
                        ) {
                          handleServiceChange(e, index);
                        }
                      }}
                      pattern="\d{10}"
                      maxlength="10"
                      minlength="10"
                      required
                    />

                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block w-full font-manrope font-[400] text-[14px] md:text-[16px] xl:text-[18px] text-white mb-[10px]"> Prices (Estimated Budget) </label>
                    <input
                      type="text"
                      onChange={(e) => handleServiceChange(e, index)}
                      name="services_provider_price"
                      value={packageData.services_provider_price}
                      className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                      placeholder=" (Estimated Budget)"
                      required
                    />
                  </div>
                  <div>
                    <label className="block w-full font-manrope font-[400] text-[14px] md:text-[16px] xl:text-[18px] text-white mb-[10px]"> Rating</label>
                    <input
                      type="text"
                      onChange={(e) => handleServiceChange(e, index)}
                      name="services_provider_rating"
                      value={packageData.services_provider_rating}
                      className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                      placeholder="Enter Rating"
                      required
                    />
                  </div>
                </div>



                <div className="mb-4">
                  <label className="block w-full font-manrope font-[400] text-[14px] md:text-[16px] xl:text-[18px] text-white mb-[10px]">Services Provider Address</label>
                  <input
                    type="text"
                    name='package_address'
                    onChange={(e) => handleServiceChange(e, index)}
                    value={packageData.package_address}
                    className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                    placeholder="Enter package address"
                    required
                  />
                </div>
                <ServicepackageImage index={index} setFormData={setFormData} showimage={packageData} fetchData={fetchData} />
                <div className="mb-4">
                  <label className="block w-full font-manrope font-[400] text-[14px] md:text-[16px] xl:text-[18px] text-white mb-[10px]">Services  Description</label>
                  <input
                    type="text"
                    value={packageData.package_descrption
                    }
                    onChange={(e) => handleServiceChange(e, index)}
                    name='package_descrption'
                    className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                    placeholder="Enter description"
                    required
                  />
                </div>
                <div className="mb-4">
                  <div className="bg-[#1B1B1B] p-4 rounded-lg text-white w-full">
                    <label className="block w-full font-manrope font-[400] text-[14px] md:text-[16px] xl:text-[18px] text-white mb-[10px]">Services Provider Categories</label>
                    <div className="flex flex-row gap-4 w-full">
                      {/* Radio Button for Venue */}
                      <label className="flex items-center gap-2 text-[18px] w-full">
                        <input
                          type="radio"
                          name="services_provider_categries"
                          value="Venue"
                          checked={selectedOption === "Venue"}
                          onChange={handleOptionChange}
                          className="bg-[#1B1B1B] border-[#ffffff14] text-[22px] text-white hover:outline-none focus:outline-none"
                        />
                        <span className="w-full text-white text-[22px]">Venue</span>
                      </label>

                      {/* Radio Button for Categories */}
                      <label className="flex items-center gap-2 w-full">
                        <input
                          type="radio"
                          name="services_provider_categries"
                          value="Categories"
                          checked={selectedOption === "Categories"}
                          onChange={handleOptionChange}
                          className="bg-[#1B1B1B] text-[22px] border-[#ffffff14] text-white hover:outline-none focus:outline-none"
                        />
                        <span className="w-full text-white text-[22px]">Categories</span>
                      </label>

                      {/* Radio Button for Activity */}
                      <label className="flex items-center gap-2 w-full">
                        <input
                          type="radio"
                          name="services_provider_categries"
                          value="Activity"
                          checked={selectedOption === "Activity"}
                          onChange={handleOptionChange}
                          className="bg-[#1B1B1B] border-[#ffffff14] text-[22px] text-white hover:outline-none focus:outline-none"
                        />
                        <span className="w-full  text-[22px] text-white">Activity</span>
                      </label>

                      {/* Radio Button for Other */}
                      <label className="flex items-center gap-2 w-full">
                        <input
                          type="radio"
                          name="services_provider_categries"
                          value="Other"
                          checked={selectedOption === "Other"}
                          onChange={handleOptionChange}
                          className="bg-[#1B1B1B] text-[22px] border-[#ffffff14] text-white hover:outline-none focus:outline-none"
                        />
                        <span className="w-full text-[22px]  text-white">Other</span>
                      </label>
                    </div>

                    {/* Display the Selected Option */}
                    <p className="mt-4 text-[18px] ">
                      Selected Option: <span className="font-bold">{selectedOption || "None"}</span>
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block w-full font-manrope font-[400] text-[14px] md:text-[16px] xl:text-[18px] text-white mb-[10px]">Services  Categories (comma-separated)</label>
                  <input
                    type="text"
                    onChange={(e) => handleCategoryChange(e, index)}
                    name="package_categories"
                    value={packageData.package_categories.join(', ')}
                    className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                    placeholder="Enter Services categories"
                    required
                  />
                </div>

              </div>
            ))}
            <div className="flex justify-end mb-5">
              <button type="button" onClick={addNewPackage} className="mt-5 mb-5 bg-[#EB3465] hover:bg-[#fb3a6e] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center ${loading && 'opacity-50 cursor-pointer">Add New Services</button>
            </div>
            <div className="flex justify-center mb-5">
              <button
                type="submit"
                disabled={loading}
                className={`bg-[#EB3465] hover:bg-[#fb3a6e] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center ${loading && 'opacity-50 cursor-not-allowed'}`}
              >
                {loading ? "Loading..." : Id ? "Update Package" : "Add Package"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

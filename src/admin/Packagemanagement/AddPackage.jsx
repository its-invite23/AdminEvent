import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Listing from '../../Api/Listing';
import Header from '../compontents/Header';

export default function AddPackage() {
  const { Id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    package_name: "",
    package_people: "",
    package_price_min: "",
    package_price_max: "",
    services_provider_name: "",
    services_provider_email: "",
    package_categories: [],
    package_image: "",
    Id: Id,
    services_provider_phone: ""
  });

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const main = new Listing();
    try {
      const response = await main.packageGetId({ Id });
      if (response && response.data) {
        const { package_name, package_people, package_price_min, package_price_max, services_provider_name, services_provider_email, package_categories, package_image, services_provider_phone } = response.data.data;
        setFormData({
          package_name: package_name || "",
          package_people: package_people || "",
          package_price_min: package_price_min || "",
          package_price_max: package_price_max || "",
          services_provider_name: services_provider_name || "",
          services_provider_email: services_provider_email || "",
          package_categories: package_categories || [], // Ensure this is an array
          package_image: package_image || "",
          services_provider_phone: services_provider_phone || ""
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
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

  const handleCategoryChange = (e) => {
    const categories = e.target.value.split(',').map(category => category.trim());
    setFormData({
      ...formData,
      package_categories: categories,
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
      // Reset form data after submission if necessary
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

          {/* Row for Services Provider Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block w-full font-manrope font-[400] text-[14px] md:text-[16px] xl:text-[18px] text-white mb-[10px]">Service Provider Name</label>
              <input
                type="text"
                onChange={handleChange}
                name="services_provider_name"
                value={formData.services_provider_name}
                className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                placeholder="Enter Services Provider Name"
                required
              />
            </div>
            <div>
              <label className="block w-full font-manrope font-[400] text-[14px] md:text-[16px] xl:text-[18px] text-white mb-[10px]">Email</label>
              <input
                type="email"
                onChange={handleChange}
                name="services_provider_email"
                value={formData.services_provider_email}
                className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                placeholder="Enter services provider email"
                required
              />
            </div>
            <div>
              <label className="block w-full font-manrope font-[400] text-[14px] md:text-[16px] xl:text-[18px] text-white mb-[10px]">Number</label>
              <input
                type="tel"
                onChange={handleChange}
                name="services_provider_phone"
                value={formData.services_provider_phone}
                className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                placeholder="Enter services provider number"
                required
              />
            </div>
          </div>

          {/* Row for Minimum, Maximum Price and People */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block w-full font-manrope font-[400] text-white text-[14px] md:text-[16px] xl:text-[18px] mb-[10px]">Package Minimum Price</label>
              <input
                type="number"
                onChange={handleChange}
                name="package_price_min"
                value={formData.package_price_min}
                className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                placeholder="Enter minimum price"
                required
              />
            </div>
            <div>
              <label className="block w-full font-manrope font-[400] text-[14px] md:text-[16px] xl:text-[18px] text-white mb-[10px]">Package Maximum Price</label>
              <input
                type="number"
                onChange={handleChange}
                name="package_price_max"
                value={formData.package_price_max}
                className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                placeholder="Enter maximum price"
                required
              />
            </div>
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
          </div>

          {/* Package Categories */}
          <div className="mb-4">
            <label className="block w-full font-manrope font-[400] text-[14px] md:text-[16px] xl:text-[18px] text-white mb-[10px]">Package Categories (comma-separated)</label>
            <input
              type="text"
              onChange={handleCategoryChange}
              value={formData.package_categories.join(', ')}
              className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
              placeholder="Enter package categories"
              required
            />
            <div className="mt-2 text-white">
              <strong>Current Categories:</strong> {formData.package_categories.join(', ') || 'None'}
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block w-full font-manrope font-[400] text-[14px] md:text-[16px] xl:text-[18px] text-white mb-[10px]">Package Image</label>
            <input
              type="file"
              onChange={(e) => setFormData({ ...formData, package_image: e.target.files[0] })}
              className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-[#EB3465] hover:bg-[#fb3a6e] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center ${loading && 'opacity-50 cursor-not-allowed'}`}
          >
            {loading ? "Loading..." : Id ? "Update Package" : "Add Package"}
          </button>
        </form>
      </div>
    </div>
  );
}

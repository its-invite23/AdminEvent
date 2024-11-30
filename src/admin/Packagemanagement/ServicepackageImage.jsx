import React, { useState } from "react";
import Listing from "../../Api/Listing";
import toast from "react-hot-toast";

export default function ServicepackageImage({ index, setFormData, showimage }) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    // Prepare FormData
    const formData = new FormData();
    formData.append("file", file);

    const main = new Listing();
    try {
      const res = await main.ImageUpload(formData); // Upload image
      if (res?.data?.status) {
        toast.success(res.data.message);
        const fileUrl = res?.data?.fileUrl;
        const fileId = res?.data?.file_data?.fileId
        console.log("fileId", fileId)
        setFormData((prev) => {
          const updatedServices = [...prev.package_services];
          updatedServices[index].services_provider_image = fileUrl;
          updatedServices[index].services_image_filed = fileId;
          return { ...prev, package_services: updatedServices };
        });
        setImagePreview(fileUrl); // Show preview
      } else {
        toast.error(res.data.message || "Image upload failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-white mb-2">Service Image</label>
      <input
        type="file"
        onChange={handleFileChange}
        disabled={loading}
        className={`bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none ${loading && "cursor-not-allowed"
          }`}
      />
      {loading && <p className="mt-2 text-blue-400 text-sm">Uploading...</p>}
      {imagePreview ? (
        <div className="mt-2">
          <img
            src={imagePreview}
            alt="Uploaded Service"
            className="w-[400px] h-[300px] rounded-lg border border-gray-300"

          />
        </div>
      ) : (
        <div className="mt-2">
          <img
            src={showimage}
            alt="Uploaded Service"
            className="w-[400px] h-[300px] rounded-lg border border-gray-300"
          />
        </div>
      )}
    </div>
  );
}

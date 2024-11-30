import React, { useState } from 'react';
import Listing from '../../Api/Listing';
import toast from 'react-hot-toast';

export default function PackageImage({ setFormData , handleSubmit}) {
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
      const res = await main.ImageUpload(formData);
      console.log("res",res)
      if (res?.data?.status) {
        toast.success(res.data.message);
        const fileUrl = res?.data?.fileUrl;

        setFormData((prev) => ({
          ...prev,
          package_image: fileUrl,
          image_filed:res?.data?.file_data?.fileId
        }));
        // Set the image preview
        setImagePreview(fileUrl);
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
      <label className="block w-full font-manrope font-[400] text-[14px] md:text-[16px] xl:text-[18px] text-white mb-[10px]">
        Package Image
      </label>
      <input
        type="file"
        onChange={handleFileChange}
        disabled={loading}
        className={`bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none ${loading && "cursor-not-allowed"
          }`}
      />
      {loading && <p className="mt-2 text-blue-400 text-sm">Uploading...</p>}

      {imagePreview && (
        <div className="mt-4">
          <p className="text-white text-sm mb-2">Uploaded Image:</p>
          <img
            src={imagePreview}
            alt="Uploaded Package"
            className="w-[400px] h-[300px] rounded-lg border border-gray-300"
          />
        </div>
      )}
    </div>
  );
}

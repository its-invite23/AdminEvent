import React, { useEffect, useState } from 'react';
import Listing from '../../Api/Listing';
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';

export default function PackageImage({ setFormData, formData }) {
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
      if (res?.data?.status) {
        toast.success(res.data.message);
        const fileId = res?.data?.file_data?.fileId
        const fileUrl = res?.data?.fileUrl;
        setFormData((prev) => ({
          ...prev,
          package_image: fileUrl,
          image_filed: fileId
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
  const handleDelete = async () => { setLoading(true); const main = new Listing(); try { const res = await main.ImageDelete({ fileName: formData?.package_image, fileId: formData?.fileId }); if (res?.data?.status) { toast.success(res.data.message); setFormData({ ...formData, package_image: null, fileId: null }); } else { toast.error(res.data.message || "Image deletion failed"); } } catch (error) { toast.error(error?.response?.data?.message || "An error occurred"); } finally { setLoading(false); } };


  useEffect(() => {
    if (imagePreview && imagePreview?.length === 0) {
      handleDelete();
    }
  }, [imagePreview]);
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

      {imagePreview ? (
        <div className="mt-4">
          <img
            src={imagePreview}
            alt="Uploaded Package"
            className="w-[400px] h-[300px] rounded-lg border border-gray-300"
          />
        </div>
      ) : (


        <>
          {
            formData?.package_image &&

            <div className="mt-4 relative"> <img src={formData?.package_image} alt="Uploaded Package" className="w-[400px] h-[300px] rounded-lg border border-gray-300" /> <button onClick={handleDelete} disabled={loading} className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 rounded-tr-lg rounded-bl-lg hover:bg-red-700" > <MdDelete size={24} /> </button> </div>
          }
        </>
      )}
    </div>
  );
}

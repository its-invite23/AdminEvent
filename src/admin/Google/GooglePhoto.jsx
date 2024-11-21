
  
  const GooglePhoto = ({photos}) => {
    if (!photos || photos.length === 0) {
      return <p>No photos available</p>;
    }
  
    const photoReference = photos[0]?.photo_reference;
    const photoAttribution = photos[0]?.html_attributions?.[0] || "";
  
    if (!photoReference) {
      return <p>No photo reference available</p>;
    }
  
  
    return (
      <div className="photo-container">
        <img
          src={photoAttribution}
          alt="Google Place"
          className="w-full h-auto rounded-lg"
        />
        <div
          dangerouslySetInnerHTML={{
            __html: photoAttribution,
          }}
          className="text-sm text-gray-600 mt-2"
        />
      </div>
    );
  };
  
  export default GooglePhoto;

import React from "react";

const ImageGallery = ({ carDetail }) => {
  return (
    <div>
      <img
        src={carDetail?.images[0].imageURL}
        className="w-full h-[500px] object-cover rounded-xl"
      />
    </div>
  );
};

export default ImageGallery;

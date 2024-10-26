import React from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { BsSpeedometer2 } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import { FaGasPump } from "react-icons/fa";

const DetailHeader = ({ carDetail }) => {
  return (
    <div>
      <h2 className="font-bold text-3xl ">{carDetail?.listingTitle}</h2>
      <p className="text-sm">{carDetail?.tagline}</p>
      <div className="flex gap-2 mt-3">
        <div className="flex gap-2 items-center bg-blue-50 rounded-full p-1 px-3 ">
          <MdOutlineCalendarMonth className="h-6 w-7 text-primary" />
          <h2 className="text-primary text-sm">{carDetail?.year}</h2>
        </div>
        <div className="flex gap-2 items-center bg-blue-50 rounded-full p-1 px-3 ">
          <BsSpeedometer2 className="h-6 w-7 text-primary" />
          <h2 className="text-primary text-sm">{carDetail?.mileage}</h2>
        </div>
        <div className="flex gap-2 items-center bg-blue-50 rounded-full p-1 px-3 ">
          <GiGearStickPattern className="h-6 w-7 text-primary" />
          <h2 className="text-primary text-sm">{carDetail?.transmission}</h2>
        </div>
        <div className="flex gap-2 items-center bg-blue-50 rounded-full p-1 px-3 ">
          <FaGasPump className="h-6 w-7 text-primary" />
          <h2 className="text-primary text-sm">{carDetail?.fuelType}</h2>
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;

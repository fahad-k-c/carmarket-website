import { Separator } from "@radix-ui/react-select";
import React from "react";
import { LuFuel } from "react-icons/lu";
import { IoSpeedometerOutline } from "react-icons/io5";
import { GiGearStickPattern } from "react-icons/gi";
import { IoMdOpen } from "react-icons/io";
import { Link } from "react-router-dom";

const CarItem = ({ car }) => {
  return (
    <Link to={`/listing-details/${car?.id}`}>
      <div className="rounded-xl bg-white border hover:shadow-md cursor-pointer">
        <h2 className="absolute m-2 bg-green-500 px-2 rounded-full text-sm pb-1">
          New
        </h2>
        <img
          className="rounded-t-xl h-[180px] object-cover"
          src={car?.images[0]?.imageURL}
          alt="car image"
          width={300}
          height={250}
        />
        <div className="p-4">
          <h2 className="font-bold text-black text-lg">{car?.listingTitle}</h2>
          <Separator />
          <div className="flex-col justify-center items-center">
            <div className="grid grid-cols-3 mt-5">
              <div className="flex flex-col items-center mb-2">
                <LuFuel className="text-lg mb-2" />
                <h2>{car?.mileage} Miles</h2>
              </div>
              <div className="flex flex-col items-center mb-5">
                <IoSpeedometerOutline className="text-lg mb-2" />
                <h2>{car?.fuelType}</h2>
              </div>
              <div className="flex flex-col items-center">
                <GiGearStickPattern className="text-lg mb-2" />
                <h2>{car?.transmission}</h2>
              </div>
            </div>
            <div className="flex items-center justify-center ">
              <h2 className="font-bold text-xl">${car?.sellingPrice}</h2>
              <h2
                className="text-white text-sm p-2 flex items-center ml-3 bg-primary border rounded-xl
                "
              >
                View Details
                <IoMdOpen className="pl-1"/>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarItem;

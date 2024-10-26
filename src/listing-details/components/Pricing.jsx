import { Button } from "@/components/ui/button";
import React from "react";
import { MdOutlineLocalOffer } from "react-icons/md";

const Pricing = ({ carDetail }) => {
  return (
    <div className="p-10 rounded-xl border border-gray-300 shadow-lg">
      <h2 className="text-xl">Our Price</h2>
      <h2 className="font-bold text-4xl ">$ {carDetail?.sellingPrice}</h2>
      <Button className="rounded-md text-white mt-5 w-full ">
        Make an Offer Price
        <MdOutlineLocalOffer className="text-white ml-2 text-lg" />
      </Button>
    </div>
  );
};

export default Pricing;

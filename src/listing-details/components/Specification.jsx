import React from "react";
import IconField from "@/components/ui/add-listing/components/IconField";
import CarSpecification from "@/shared/CarSpecification";
import { FaCar } from "react-icons/fa";

const Specification = ({ carDetail }) => {
  return (
    <div className="p-8 rounded-xl border border-gray-300 shadow-xl mt-7">
      <h2 className="font-medium text-2xl mb-7">Specification </h2>
      {CarSpecification.map((item, index) => (
        <div className="mt-3 flex items-center justify-between">
          <h2 className="flex gap-2">
            <div className="p-2 bg-blue-100 rounded-full mb-2" >
              <FaCar className="text-lg bg-blue-100 text-primary " />
            </div>
            {item.label}
          </h2>
          <h2> {carDetail && carDetail[item.name]}</h2>
        </div>
      ))}
      {/* {carDetail?.length > 0 &&
        carDetail?.map((carItem, index) => (
          <div>
            <IconField icon={CarSpecification[index].icon} />
          </div>
        ))} */}
    </div>
  );
};

export default Specification;

import React from "react";
import { MdOutlineCheckBox } from "react-icons/md";

const Features = ({ features }) => {
  console.log([features]);
  return (
    <div>
      <div className="p-5 bg-white rounded-xl shadow-lg border  border-gray-300 my-7">
        <h2 className="font-medium text-2xl">Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3">
          {features &&
            Object.entries(features).map(([feature, value]) => (
              <div
                key={feature}
                className="flex gap-1 items-center justify-center"
              >
                <MdOutlineCheckBox className="text-lg bg-blue-100 text-primary" />
                <p>
                  {feature} - {value && true}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Features;

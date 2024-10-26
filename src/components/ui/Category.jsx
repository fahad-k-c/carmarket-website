import React from "react";
import { Categ } from "../../shared/data";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <div className="mt-40">
      <h2 className="font-bold text-3xl text-center mb-6">Browse By Type</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-col-6 lg:grid-cols-9 gap-6 px-20">
        {Categ.map((cat, index) => (
          <Link to={"search/" + cat.name}>
            <div className="border hover:shadow-md cursor-pointer rounded-xl p-3 items-center flex flex-col">
              <img src={cat.icon} width={35} height={35} />
              <h2 className="mt-2">{cat.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;

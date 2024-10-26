import Header from "@/components/ui/Header";
import Search from "@/components/ui/Search";
import { CarImages, CarListing } from "../../../configs/schema";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../configs/index";
import { eq } from "drizzle-orm";
import { formatResult } from "@/shared/Service";
import CarItem from "@/components/ui/CarItem";

const SearchByCategory = () => {
  const { category } = useParams();
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    getCarList();
  }, []);

  const getCarList = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.category, category));

    const resp = formatResult(result);
    setCarList(resp);
  };

  return (
    <div>
      <Header />
      <div className="p-10 bg-black flex justify-center">
        <Search />
      </div>
      <div className="p-10 md:p-20">
        <h2 className="fonnt-bold text-4xl ">{category}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7">
          {carList.length > 0
            ? carList.map((item, index) => (
                <div key={index}>
                  <CarItem car={item} />
                </div>
              ))
            : [1, 2, 3, 4, 5, 6].map((item, index) => (
                <div className="h-[300px] rounded-xl bg-slate-200 animate-pulse"></div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default SearchByCategory;

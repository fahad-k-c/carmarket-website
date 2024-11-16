import { CarImages, CarListing } from "../../configs/schema";
import { db } from "../../configs/index";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { eq } from "drizzle-orm";
import { formatResult } from "@/shared/Service";
import Header from "@/components/ui/Header";
import Search from "@/components/ui/Search";
import CarItem from "@/components/ui/CarItem";

const SearchByOptions = () => {
  const [searchParams] = useSearchParams();
  const condition = searchParams.get("cars");
  const make = searchParams.get("make");
  const price = searchParams.get("price");
  const [carList,setCarList]=useState([]);

  useEffect(() => {
    getCarList();
  }, []);

  console.log(condition, make, price);

  const getCarList = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(condition != undefined && eq(CarListing.condition, condition))
      .where(make != undefined && eq(CarListing.make, make));
    const resp = formatResult(result);
    console.log(resp);
    setCarList(resp);
  };

  return (
    <div>
      <Header />
      <div className="p-10 bg-black flex justify-center">
        <Search />
      </div>
      <div className="p-10 md:p-20">
        <h2 className="fonnt-bold text-4xl ">Car List</h2>
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

export default SearchByOptions;

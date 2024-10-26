import React, { useEffect, useState } from "react";
import { carList } from "../../shared/FakeData";
import CarItem from "./CarItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { db } from "../../../configs/index";
import { CarListing, CarImages } from "../../../configs/schema";
import { eq, desc } from "drizzle-orm";
import { formatResult } from "../../shared/Service";

const MostSearchedCar = () => {
  const [carLists, setCarLists] = useState([]);
  console.log(carList);
  useEffect(() => {
    getPopularCarList();
  }, []);

  const getPopularCarList = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .orderBy(desc(CarListing.id))
      .limit(10);
    const resp = formatResult(result);
    console.log(resp);
    setCarLists(resp);
  };

  return (
    <div className="mx-24">
      <h2 className="font-bold text-3xl text-center my-16">
        Most Searched Car
      </h2>
      <Carousel>
        <CarouselContent>
          {carLists.map((car, index) => (
            <CarouselItem className="basis-1/4">
              <CarItem car={car} key={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default MostSearchedCar;

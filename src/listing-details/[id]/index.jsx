import Header from "@/components/ui/Header";
import React, { useEffect, useState } from "react";
import DetailHeader from "../components/DetailHeader";
import { useParams } from "react-router-dom";
import { db } from "../../../configs/index";
import { CarImages, CarListing } from "../../../configs/schema";
import { formatResult } from "@/shared/Service";
import { eq } from "drizzle-orm";
import ImageGallery from "../components/ImageGallery";
import Description from "../components/Description";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Specification from "../components/Specification";
import OwnersDetail from "../components/OwnersDetail";
import Footer from "@/components/ui/Footer";
import FinancialCalculator from "../components/FinancialCalculator";
import MostSearchedCar from "@/components/ui/MostSearchedCar";

const ListingDetails = () => {
  const { id } = useParams();
  const [carDetail, setCarDetail] = useState();
  console.log(id);
  useEffect(() => {
    getCarDetails();
  }, []);

  const getCarDetails = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.id, id));
    const resp = formatResult(result);
    setCarDetail(resp[0]);
  };

  return (
    <div>
      <Header />
      <div className="p-10 md:p-20 ">
        <DetailHeader carDetail={carDetail} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 ">
          <div className="md:col-span-2">
            <ImageGallery carDetail={carDetail} />
            <Description carDetail={carDetail} />
            <Features features={carDetail?.features} />
            <FinancialCalculator carDetail={carDetail} />
          </div>
          <div>
            <Pricing carDetail={carDetail} />
            <Specification carDetail={carDetail} />
            <OwnersDetail carDetail={carDetail} />
          </div>
        </div>
        <MostSearchedCar />
      </div>
      <Footer />
    </div>
  );
};

export default ListingDetails;

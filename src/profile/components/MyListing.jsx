import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { CarImages, CarListing } from "../../../configs/schema";
import { desc, eq } from "drizzle-orm";
import { useUser } from "@clerk/clerk-react";
import { db } from "../../../configs/index";
import { formatResult } from "../../shared/Service";
import CarItem from "../../components/ui/CarItem";
import { FaTrashAlt } from "react-icons/fa";

const MyListing = () => {
  const { user } = useUser();
  const [carList, setCarList] = useState([]);
  useEffect(() => {
    user && getUserCarListing();
  }, [user]);

  const getUserCarListing = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(CarListing.id));
    const resp = formatResult(result);
    setCarList(resp);
    console.log(resp);
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">My Listing</h2>
        <Link to={"/add-listing"}>
          <Button className="text-white">+ Add New Listing</Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5">
        {carList.map((item, index) => (
          <div key={index}>
            <CarItem car={item} />
            <div className="p-2 bg-gray-300 flex justify-between gap-2 rounded-lg">
              <Link
                to={"/add-listing?mode=edit&id=" + item.id}
                className="w-full"
              >
                <Button className="w-full bg-white" variant="outline">
                  Edit
                </Button>
              </Link>
              <Button
                variant="destructive"
                className="bg-red-500 text-white px-4 py-2 rounded shadow hover:shadow-lg transition-shadow hover:text-black hover:border-gray-400"
              >
                <FaTrashAlt />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListing;

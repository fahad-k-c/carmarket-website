import React, { useEffect, useState } from "react";
import Header from "../Header";
import carDetails from "../../../shared/carDetails.json";
import InputField from "./components/InputField";
import DropdownField from "./components/DropdownField";
import TextAreaField from "./components/TextAreaField";
import { Separator } from "@radix-ui/react-select";
import features from "../../../shared/features.json";
import { Button } from "../button";
import { Checkbox } from "@/components/ui/checkbox";
import { CarImages, CarListing } from "../../../../configs/schema";
import { db } from "../../../../configs/index";
import UploadImages from "./components/UploadImages";
import { LuLoader2 } from "react-icons/lu";
import { Toaster } from "../../../components/ui/sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";
import { eq } from "drizzle-orm";
import { formatResult } from "../../../shared/Service";
// import Button from "../button";

const AddListing = () => {
  const [formData, setFormData] = useState();
  const [featuresData, setFeaturesData] = useState();
  const [searchParams] = useSearchParams();
  const [triggerUploadImages, setTriggerUploadImages] = useState();
  const [carInfo, setCarInfo] = useState();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const mode = searchParams.get("mode");
  const recordId = searchParams.get("id");

  useEffect(() => {
    console.log(user?.fullName);

    if (mode == "edit") {
      getListingDetail();
    }
  }, []);

  const getListingDetail = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.id, recordId));

    const resp = formatResult(result);
    setCarInfo(resp[0]);
    setFormData(resp)[0];
    setFeaturesData(resp[0].features);
    console.log(resp);
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleFeatureChange = (name, value) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(featuresData);
  };

  const onSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    console.log(formData);
    if (mode == "edit") {
      const result = await db
        .update(CarListing)
        .set({
          ...formData,
          features: featuresData,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          postedOn: moment().format("DD/MM/YYYY"),
        })
        .where(eq(CarListing.id, recordId))
        .returning({ id: CarListing.id });
      console.log(result);
      navigate("/profile");
      setLoader(false);
    } else {
    }
    try {
      const result = await db
        .insert(CarListing)
        .values({
          ...formData,
          features: featuresData,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName || "anonymous",
          userImageUrl: user?.imageUrl,
          postedOn: moment().format("DD/MM/YYYY"),
        })
        .returning({ id: CarListing.id });
      if (result) {
        console.log("Data Saved");
        setTriggerUploadImages(result[0]?.id);
        setLoader(false);
      }
    } catch (e) {
      console.log("Error ", e);
    }
  };

  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Listing</h2>
        <form action="" className="border rounded-xl mt-10">
          <div className="p-10">
            <h2 className="font-medium text-xl mb-6">Car Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
              {carDetails.carDetails.map((item, index) => (
                <div key={index}>
                  <label className="text-sm ">
                    {item.label} {item.required && <span>*</span>}
                  </label>
                  {item.fieldType == "text" || item.fieldType == "number" ? (
                    <InputField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType == "dropdown" ? (
                    <DropdownField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType == "textarea" ? (
                    <TextAreaField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6" />
          <div className="p-10">
            <h2 className="font-medium text-xl my-6">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {features.features.map((feature, index) => (
                <div key={index} className="flex gap-2 item-center">
                  <Checkbox
                    onCheckedChange={(value) => {
                      handleFeatureChange(feature.name, value);
                    }}
                    checked={featuresData?.[feature.name]}
                  />
                  <h2>{feature.label}</h2>
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6" />
          <div className="p-10">
            <UploadImages
              triggerUploadImages={triggerUploadImages}
              setLoader={(v) => {
                setLoader(v);
                navigate("/profile");
              }}
            />
          </div>
          <div className="mt-10 flex justify-end p-10">
            <Button
              disabled={loader}
              type="submit"
              onClick={(e) => onSubmit(e)}
            >
              {!loader ? (
                "submit"
              ) : (
                <LuLoader2 className="animate-spin text-lg" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;

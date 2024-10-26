import { storage } from "../../../../../configs/firebaseConfig";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { Button } from "../../button";
import { ref } from "firebase/storage";
import { CarImages, CarListing } from "../../../../../configs/schema";
import { db } from "../../../../../configs/index";

const UploadImages = ({ triggerUploadImages, setLoader }) => {
  const [selectedFileList, setSelectedFileList] = useState([]);

  useEffect(() => {
    if (triggerUploadImages) {
      uploadImageToServer();
    }
  }, [triggerUploadImages]);

  const onFileSelected = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      //   const objectURL = URL.createObjectURL(file);
      setSelectedFileList((prev) => [...prev, file]);
    }
  };

  const onImageRemove = (image, index) => {
    const result = selectedFileList.filter((item) => item != image);
    setSelectedFileList(result);
  };

  const uploadImageToServer = async () => {
    setLoader(true); // Start loader once
    try {
      const uploadPromises = selectedFileList.map(async (file) => {
        const fileName = Date.now() + ".jpeg"; // Unique filename
        const storageRef = ref(storage, "car-marketplace/" + fileName);
        const metaData = {
          contentType: "image/jpeg",
        };

        // Upload the file
        const snapshot = await uploadBytes(storageRef, file, metaData);
        console.log("File uploaded");

        let downloadUrl;

        // Get the download URL
        try {
          downloadUrl = await getDownloadURL(storageRef);
          console.log(downloadUrl);
        } catch (error) {
          console.log("Error getting download URL:", error);
          downloadUrl =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROYjj94a1EKPObxDQCbqSdwmIbkhQt5Np5lQ&s";
        }

        if (!downloadUrl) {
          throw new Error("Download URL is null or undefined");
        }

        // Insert into the database
        await db.insert(CarImages).values({
          imageURL: downloadUrl,
          carListingId: triggerUploadImages,
        });

        console.log("Image URL saved to the database");
      });

      // Wait for all uploads to complete
      await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Error uploading file or saving to the database: ", error);
    } finally {
      setLoader(false); // Ensure loader is turned off
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl mb-5">Upload Car Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {selectedFileList.map((image, index) => (
          <div key={index}>
            <IoMdCloseCircle
              className="absolute m-2 text-white text-lg"
              onClick={() => onImageRemove(image, index)}
            />
            <img
              src={URL.createObjectURL(image)}
              className="w-full h-[130px] object-cover rounded-xl"
            />
          </div>
        ))}
        <label htmlFor="upload-images">
          <div>
            <h2 className="text-large rounded-xl border-dotted border-primary bg-blue-100 p-10 text-center text-primary">
              +
            </h2>
          </div>
        </label>
        <input
          type="file"
          multiple={true}
          id="upload-images"
          className="opacity-0"
          onChange={onFileSelected}
        />
      </div>
    </div>
  );
};

export default UploadImages;

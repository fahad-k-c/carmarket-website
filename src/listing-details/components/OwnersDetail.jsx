import React from "react";
import { Button } from "@/components/ui/button";
import { createSendBirdUser } from "@/shared/Service";
import { useUser } from "@clerk/clerk-react";

const OwnersDetail = ({ carDetail }) => {
  const { user } = useUser();
  carDetail && console.log(carDetail);

  const onMessageOwnerButtonClick = async () => {
    try {
      const userId = user?.primaryEmailAddress.emailAddress.split(".")[0];
      console.log(userId);

      await createSendBirdUser(userId, userId, user?.imageUrl).then((resp) => {
        console.log(resp);
      });
    } catch (err) {
      console.log("error occured", err);
    }
    try {
      const ownerUserId = carDetail?.createdBy.split("@")[0];
      console.log(
        ownerUserId,
        carDetail?.userName,
        carDetail?.images[0].imageURL
      );

      await createSendBirdUser(
        ownerUserId,
        carDetail?.userName,
        carDetail?.imageURL
      ).then((resp) => {
        console.log(resp);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-10 border border-gray-300 rounded-xl shadow-lg mt-7">
      <h2 className="font-medium text-2xl my-3">Owner Details</h2>
      <img
        src={carDetail?.userImageUrl}
        className=" rounded-full border border-gray-400"
        width="80px"
      />
      <h2 className="mt-2 font-bold text-xl">{carDetail?.userName}</h2>
      <h2 className=" text-gray-500 text-l">{carDetail?.createdBy}</h2>
      <Button
        className="mt-2 text-white w-full"
        onClick={onMessageOwnerButtonClick}
      >
        Message Owners
      </Button>
    </div>
  );
};

export default OwnersDetail;

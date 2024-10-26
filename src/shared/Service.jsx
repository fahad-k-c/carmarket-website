import axios from "axios";

export const formatResult = (resp) => {
  let result = [];
  let finalResult = [];
  resp.forEach((item) => {
    const listingId = item.carListing?.id;
    if (!result[listingId]) {
      result[listingId] = {
        car: item.carListing,
        images: [],
      };
    }
    if (item.carImages) {
      result[listingId].images.push(item.carImages);
    }
  });
  result.forEach((item) => {
    finalResult.push({
      ...item.car,
      images: item.images,
    });
  });
  return finalResult;
};

export const createSendBirdUser = (userId, nickName, profileUrl) => {
  const sendbirdApplicationId = "0BDA6C62-02CB-4EF2-AF82-0F5FF89A0233";

  return axios.post(
    `https://api-${sendbirdApplicationId}.sendbird.com/v3/users`,
    {
      user_id: userId,
      nickname: nickName,
      profile_url: profileUrl,
      issue_access_token: false,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": "2eb4b794645e3efc18d601457bb77a967f1710ef",
      },
    }
  );
};

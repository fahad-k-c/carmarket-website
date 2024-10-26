import React, { useEffect, useState } from "react";
import { App as SendbirdApp, SendBirdProvider } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";
import { useUser } from "@clerk/clerk-react";

const Inbox = () => {
  const { user } = useUser();
  const [userId, setUserId] = useState();
  useEffect(() => {
    if (user) {
      const id = user?.primaryEmailAddress.emailAddress.split("@")[0];
      setUserId(id);
    }
  }, []);

  return (
    <div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <SendBirdProvider
          appId={"0BDA6C62-02CB-4EF2-AF82-0F5FF89A0233"}
          userId={userId}
          nickname={user?.fullName}
          profileUrl={user?.imageUrl}
          allowProfileEdit={true}
        ></SendBirdProvider>
      </div>
    </div>
  );
};

export default Inbox;

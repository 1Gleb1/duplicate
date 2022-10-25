import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/clientApp";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import FriendList from "../components/user/FriendList";
import IsRegister from "../components/user/IsRegister";
import Wishlist from "../components/user/Wishlist";
import Profile from "../components/user/Profile";

const User = () => {
  const [isUser, setIsUser] = useState(false);

  const auth = getAuth();
  const uid = auth.currentUser ? auth.currentUser.uid : "guest";

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsUser(true);
      saveUser(user);
    } else {
      setIsUser(false);
    }
  });

  //Save User
  const saveUser = async (user) => {
    const itemUser = {
      uid: user.uid,
      displayName: user.displayName || user.email,
      email: user.email,
      name: "guest",
      img: "photo",
    };
    await setDoc(doc(firestore, "user", user.uid), itemUser);
  };

  return (
    <div className="max-w-[1000px] mx-auto min-h-screen bg-[#0f2c41] px-8">
      {!isUser && (
        <div className="pt-40">
          <IsRegister />
        </div>
      )}
      {isUser && (
        <div className="flex flex-col justify-center">
          <div className="flex justify-between pt-8 px-4">
            <div className="w-[300px]">
              <Profile />
            </div>
            <div className="">
              <div className="w-full max-w-[500px] h-[600px] bg-[#0E1921] border-2 rounded-lg border-[#747474]">
                <div className="h-full overflow-auto">
                  <FriendList />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mx-auto mt-8  w-full max-w-[900px] bg-[#0E1921] bg-opacity-50 border-2 rounded-lg border-[#747474] pl-1 pt-1">
              <div className="">
                <Wishlist uid={uid} />
                {/* <div className="border-2 border-red-800"></div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;

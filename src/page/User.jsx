import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/clientApp";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import FriendList from "../components/user/FriendList";
import IsRegister from "../components/user/IsRegister";
import Wishlist from "../components/user/Wishlist";

const User = () => {
  const auth = getAuth();
  const [isUser, setIsUser] = useState(false);
  const uid = auth.currentUser ? auth.currentUser.uid : "";
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
    };
    await setDoc(doc(firestore, "user", user.uid), itemUser);
  };

  useEffect(() => {}, []);

  return (
    <div className="w-[1000px] mx-auto min-h-screen bg-[#0f2c41] px-8">
      <IsRegister />

      <div className="flex flex-col justify-center">
        <div className="flex justify-between pt-8 px-4">
          <div className=" border-2">
            <div className="px-6 py-2 bg-[#0e1921] w-64 text-center">
              Профиль
            </div>
            <div className="text-3xl text-center">имя</div>
            <div className="flex justify-center">
              <div className="  w-56 h-56 bg-red-300"></div>
            </div>
            <div className="text-center text-xl p-2">редактировать</div>
          </div>
          <div className="border-2">
            {isUser && (
              <div className=" w-[500px]">
                <div>
                  <FriendList />
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="mx-auto mt-8 h-56 w-[900px] bg-[#3a5162]">
            <div>
              <div className="flex gap-2 px-8 py-2">
                <span>playlist</span>
                <span>playlist</span>
                <span>playlist</span>
                <span>playlist</span>
                <span>playlist</span>
              </div>
              <div className="flex gap-8 px-8">
                <div className="h-36 w-24 bg-white"></div>
                <div className="h-36 w-24 bg-white"></div>
                <div className="h-36 w-24 bg-white"></div>
                <div className="h-36 w-24 bg-white"></div>
                <div className="h-36 w-24 bg-white"></div>
                <div className="h-36 w-24 bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

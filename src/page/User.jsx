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
      displayName: user.displayName,
      email: user.email,
    };
    await setDoc(doc(firestore, "user", user.uid), itemUser);
  };

  useEffect(() => {}, []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-8">
      <IsRegister />

      {isUser && (
        <div className="flex flex-col lg:flex-row justify-between max-w-7xl w-full">
          <div>
            <h2 className="text-center text-xl font-bold bg-slate-700 text-white rounded-lg py-2 mb-2">
              FrienList
            </h2>
            <FriendList />
          </div>
          <Wishlist uid={uid} />  
        </div>
      )}
    </div>
  );
};

export default User;

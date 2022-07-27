import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// import Navigation from './Navigation'

const Header = () => {
  const [isUser, setIsUser] = useState(false);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  });
  const handleLogOut = () => {
    signOut(auth);
  };
  useEffect(() => {}, [isUser]);
  return (
    <div className="w-full text-white bg-gray-800">
      <div className="flex justify-between max-w-2xl w-full m-auto">
        <Link to={"/"}>Logo</Link>
        <div>
          <Link to={"/user"}>
            <a className="hover:underline">
              User({auth.currentUser && auth.currentUser.email})
            </a>
          </Link>
          {auth.currentUser != null && (
            <button onClick={handleLogOut}>Logout</button>
          )}
        </div>
        {/* <Navigation /> */}
      </div>
    </div>
  );
};

export default Header;

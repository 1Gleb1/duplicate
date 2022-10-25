import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Search from "../main/Search";
// import Navigation from './Navigation'

const Header = () => {
  const [isUser, setIsUser] = useState(false);
  const [listSer, setListSer] = useState({});
  const [movieItems, setMovieItems] = useState([]);
  const [itemContent, setItemContent] = useState([]);
  const [typeContent, setTypeContent] = useState("");
  const [tvPopularList, setTvPopularList] = useState([]);

  const handleTypeAndItems = (movie) => {
    if (movie) {
      setItemContent(movieItems);
      setTypeContent("movie");
    } else {
      setItemContent(tvPopularList);
      setTypeContent("tv");
    }
  };

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
    <div className="">
      {/* <div className="h-12 bg-black"></div> */}

      <div className="bg-black flex flex-col">
        <div className="flex justify-between items-center bg-[#0e1921] h-[40px] p-1 px-8 max-w-[1000px] w-full mx-auto ">
          <div className="w-48 hidden md:block"></div>
          <div className="w-48 text-center ">
            <Link to={"/"}>
              <div className="text-sm md:text-2xl text-white ">
                Movies-Together
              </div>
            </Link>
          </div>

          <div className="w-[12vw] text-right text-white text-sm  px-2">
            <Link to={"/user"}>
              <a className="hover:underline">
                User({auth.currentUser && auth.currentUser.displayName})
                {/* {console.log(auth.currentUser)} */}
              </a>
            </Link>
            {auth.currentUser != null && (
              <button
                onClick={handleLogOut}
                // className="bg-purple-700 hover:bg-purple-800 transition px-1 py-2 rounded-lg"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    // <div className="w-full text-white bg-gray-800">
    //   <div className="flex justify-between max-w-2xl w-full m-auto">
    //     <Link to={"/"}>Logo</Link>
    // <div>
    //   <Link to={"/user"}>
    //     <a className="hover:underline">
    //       User({auth.currentUser && auth.currentUser.email})
    //     </a>
    //   </Link>
    //   {auth.currentUser != null && (
    //     <button onClick={handleLogOut}>Logout</button>
    //   )}
    // </div>
    //     {/* <Navigation /> */}
    //   </div>
    // </div>
  );
};

export default Header;

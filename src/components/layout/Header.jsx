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
      <div className="h-64 bg-black"></div>

      <div className="bg-black flex flex-col">
        <div className="flex justify-between items-center bg-[#0e1921] h-[40px] p-1 px-8 w-[1000px] mx-auto">
          <div className="w-48"></div>
          <div className="w-48 text-center ">
            <Link to={"/"}>
              <div className="text-2xl text-white ">Movies-Together</div>
            </Link>
          </div>

          <div className="w-48 text-right">
            <Link to={"/user"}>
              <a className="hover:underline text-white">
                User({auth.currentUser && auth.currentUser.email})
              </a>
            </Link>
            {auth.currentUser != null && (
              <button onClick={handleLogOut} className="text-white">
                Logout
              </button>
            )}
          </div>
        </div>
        {/* <div className="flex justify-between items-center bg-[#0e1921] h-[38px] w-[1000px] mx-auto">
          <div className="flex gap-1">
            <div className="bg-[#3a5162] h-9 w-56 text-center text-white">
              <Link to={"/"}>
                <a>
                  <button onClick={() => handleTypeAndItems(movieItems)}>
                    <div className="px-3 py-2 text-base rounded-full hover:scale-[1.05]">
                      MOVIE
                    </div>
                  </button>
                </a>
              </Link>
            </div>
            <div className="bg-[#3a5162] h-9 w-56 text-center text-white">
              <Link to={"/"}>
                <a>
                  <button onClick={() => handleTypeAndItems(!movieItems)}>
                    <div className="px-3 py-2 text-base rounded-full hover:scale-[1.05]">
                      SERIES
                    </div>
                  </button>
                </a>
              </Link>
            </div>
          </div>
          <div className=" pr-2">
            <Search setListSer={setListSer} setMovieItems={setMovieItems} />
          </div>
        </div> */}
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

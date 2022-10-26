import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

const MenuType = ({
  movieItems,
  handleTypeAndItems,
  setListSearch,
  setMovieItems,
}) => {
  return (
    <div className="flex justify-between items-center bg-[#0e1921] h-[38px] w-[100vw] max-w-[1000px] mx-auto">
      <div className="flex gap-1">
        <Link to={"/"}>
          <button onClick={() => handleTypeAndItems(movieItems)}>
            <div className="bg-[#3a5162] hover:bg-opacity-80 transition h-9 w-[30vw] lg:w-[350px] max-w-56 text-center text-white">
              <a>
                <div className="px-3 py-2 text-base rounded-full hover:scale-[1.05]">
                  MOVIE
                </div>
              </a>
            </div>
          </button>
        </Link>
        <Link to={"/"}>
          <button onClick={() => handleTypeAndItems(!movieItems)}>
            <div className="bg-[#3a5162] hover:bg-opacity-80 transition h-9 w-[30vw] lg:w-[350px] max-w-56 text-center text-white">
              <a>
                <div className="px-3 py-2 text-base rounded-full hover:scale-[1.05]">
                  SERIES
                </div>
              </a>
            </div>
          </button>
        </Link>
      </div>
      <div className=" pr-2">
        <Search setListSearch={setListSearch} setMovieItems={setMovieItems} />
      </div>
    </div>
  );
};

export default MenuType;

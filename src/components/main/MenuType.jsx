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
    <div className="flex justify-between items-center bg-[#0e1921] h-[38px] w-[90vw] max-w-[1000px] mx-auto">
      <div className="flex gap-1">
        <div className="bg-[#3a5162] h-9 w-[20vw] max-w-56 text-center text-white">
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
        <div className="bg-[#3a5162] h-9 w-[20vw] max-w-56 text-center text-white">
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
        <Search setListSearch={setListSearch} setMovieItems={setMovieItems} />
      </div>
    </div>
  );
};

export default MenuType;

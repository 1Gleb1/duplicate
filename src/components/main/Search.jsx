import React, { useState } from "react";
import tmdbApi from "../../api/tmdbApi";
import { AiOutlineSearch } from "react-icons/ai";
import "./../../style/search.css";

const Search = ({ setListSearch }) => {
  const [keyword, setKeyword] = useState("");

  const getMediaBySearch = async () => {
    const tvAndMovie = [];
    try {
      const responseMovie = await tmdbApi.getMoviesListBySearch(keyword);
      const responseTv = await tmdbApi.getTvBySearch(keyword);
      responseMovie.results.push(responseTv.results[0]);
      tvAndMovie.push(responseMovie.results);
      setListSearch(responseMovie, responseTv);
    } catch {
      console.log("error");
    }
  };

  const enterEvent = (e, keyword) => {
    e.preventDefault();
    if (keyword.langth == 0) {
      return;
    } else {
      getMediaBySearch();
    }
  };

  return (
    <div className="relative w-52 h-8">
      <div className="absolute w-56 h-[34px] top-0 -left-0 z-0  "></div>
      <div className="form-control absolute top-1 left-0 z-50">
        <form className="input-group" onSubmit={(e) => enterEvent(e, keyword)}>
          {/* <input
            type="text"
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="bg-[#728899] pl-4 placeholder-black h-8 text-black"
          />
          <div className="bg-[#0e1921]">
            <button className="btn btn-xs h-4">
              <AiOutlineSearch className="text-sm" />
            </button>
          </div> */}
          <label class="search">
            <div className=" p-4  flex justify-center items-center h-4">
              {" "}
              {/* bg-gray-700 */}
              <AiOutlineSearch />
            </div>
            <input
              class="search__form"
              type="text"
              placeholder="Search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default Search;

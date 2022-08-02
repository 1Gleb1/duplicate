import React, { useState, useEffect } from "react";
import tmdbApi from "../../api/tmdbApi";
import { AiOutlineSearch } from "react-icons/ai";

const Search = ({ setListSer }) => {
  const [keyword, setKeyword] = useState("");

  const getMediaBySearch = async () => {
    const tvAndMovie = [];
    try {
      const responseMovie = await tmdbApi.getMoviesListBySearch(keyword);
      const responseTv = await tmdbApi.getTvBySearch(keyword);
      responseMovie.results.push(responseTv.results[0]);
      tvAndMovie.push(responseMovie.results);
      setListSer(responseMovie, responseTv);
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
    <div className="">
      <div className="form-control">
        <form className="input-group" onSubmit={(e) => enterEvent(e, keyword)}>
          <input
            type="text"
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="input input-border h-9"
          />
          <button className="btn btn-sm h-9">
            {/* //btn btn-square */}
            <AiOutlineSearch className="text-xl" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;

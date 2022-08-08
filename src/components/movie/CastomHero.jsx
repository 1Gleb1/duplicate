import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import FavoriteList from "../FavoriteList";

const CastomHero = ({
  auth,
  uid,
  image,
  imgW500,
  movieTitle,
  genres,
  movieDuration,
  overview,
  movieID,
  movieName,
  originTitle,
  handleAdd,
}) => {
  const [isUser, setIsUser] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  });
  return (
    <div>
      <div className="w-[1200px] px-36 py-6">
        <span className="flex items-center gap-8 font-black text-sm sm:text-4xl py-4 ">
          {movieTitle ? movieTitle : movieName}
        </span>
        <div className="flex gap-6 items-center">
          <div className="flex flex-col items-start">
            <div className="flex gap-8">
              <div className={`w-[250px] rounded-2xl overflow-hidden `}>
                <img src={imgW500} alt={movieTitle} />
              </div>
              <div className=" flex flex-col text-white leading-none">
                <div className="flex py-2 gap-2 text-xl">
                  Genres:
                  {genres &&
                    genres.map((genre, index) => (
                      <div key={index} className="text-xl">
                        | {genre.name}
                      </div>
                    ))}
                </div>
                <div className="text-xl font-bold">
                  Duration: {movieDuration} min
                </div>
                <span className="text-sm sm:text-2xl max-w-3xl">
                  {overview}
                </span>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              {isUser ? (
                <div className="flex flex-col items-start pt-2 gap-7 mt-4">
                  <FavoriteList handleAdd={handleAdd} uid={uid} />

                  <Link
                    to={`/room/${(+new Date()).toString(
                      16
                    )}/movie_${movieID}_${movieTitle}`}
                  >
                    <a className="bg-[#3a5162] px-4 py-3 rounded-lg">
                      Create room
                    </a>
                  </Link>
                </div>
              ) : (
                <div>
                  <Link to="/user">
                    <div className="p-2 text-lg italic hover:underline">
                      Sign in for add film in wishlist
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CastomHero;

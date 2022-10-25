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
  handleAddCallback,
  typeContent,
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
      <div className="max-w-[1200px] w-full lg:px-36 py-6">
        <span className="flex items-center gap-8 font-black text-md md:text-4xl py-4 ">
          {movieTitle ? movieTitle : movieName}
        </span>
        <div className="flex gap-6 items-center">
          <div className="flex flex-col items-start">
            <div className="flex gap-8">
              <div className="flex flex-col gap-2">
                <div className={` `}>
                  <div className="w-[100px] sm:w-[150px] lg:w-[200px] rounded-2xl overflow-hidden ">
                    <img src={imgW500} alt={movieTitle} />
                  </div>
                  <div className="flex gap-4 items-center">
                    {isUser ? (
                      <div className="flex flex-col items-start pt-2 gap-7 mt-4">
                        <FavoriteList
                          handleAdd={handleAdd}
                          handleAddCallback={handleAddCallback}
                          uid={uid}
                        />

                        <Link
                          to={`/room/${(+new Date()).toString(
                            16
                          )}_${typeContent}_${movieID}_${movieTitle}`}
                        >
                          <a className="bg-[#3a5162] px-1 py-1 sm:px-4 sm:py-3 text-md sm:text-lg rounded-lg">
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
              <div className=" flex flex-col text-white text-sm sm:text-md md:text-xl leading-none">
                <div className="flex py-2 gap-2 ">
                  Genres:
                  {genres &&
                    genres.map((genre, index) => (
                      <div key={index} className="">
                        | {genre.name}
                      </div>
                    ))}
                </div>
                {movieTitle && (
                  <div className=" font-bold">
                    Duration: {movieDuration} min
                  </div>
                )}
                <span className=" max-w-3xl">{overview}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CastomHero;

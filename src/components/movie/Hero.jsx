import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FavoriteList from "../FavoriteList";

const Hero = ({
  auth,
  uid,
  image,
  imgW500,
  movieTitle,
  genres,
  movieDuration,
  overview,
  movieID,
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
    <div className="relative w-full">
      <img src={image} className="w-full" />
      <div
        className="
                    absolute top-0 right-0 bottom-0 left-0 
                    bg-gradient-to-t from-gray-900 to-transparent"
      >
        <div className="absolute -bottom-14 left-10 sm:bottom-24 sm:left-20">
          <div className="flex gap-6 items-center">
            <div className={`w-full max-w-[100px] sm:max-w-[200px]`}>
              <img src={imgW500} alt={movieTitle} />
            </div>
            <div className=" flex flex-col flex-wrap text-white leading-none">
              <span className="flex items-center gap-8 font-black text-sm sm:text-4xl ">
                {movieTitle}
              </span>
              <div className="flex py-2 gap-2">
                {genres &&
                  genres.map((genre, index) => (
                    <div
                      key={index}
                      className="btn btn-outline btn-accent btn-xs rounded-full"
                    >
                      {genre.name}
                    </div>
                  ))}
              </div>
              <div className="badge badge-outline badge-ghost badge-lg">
                Duration: {movieDuration} min
              </div>

              <span className="text-sm sm:text-2xl max-w-3xl">{overview}</span>
              <div className="flex gap-4 items-center">
                {isUser ? (
                  <div className="flex  items-center gap-2 mt-4">
                    <FavoriteList handleAdd={handleAdd} uid={uid} />

                    <Link
                      to={`/room/${(+new Date()).toString(
                        16
                      )}/movie_${movieID}_${movieTitle}`}
                    >
                      <a className="btn btn-primary btn-xl">Create room</a>
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
    </div>
  );
};

export default Hero;

import { motion } from "framer-motion";
import React from "react";
import apiConfig from "../api/apiConfig";

const Poster = ({ movie, index }) => {
  const title = {
    hidden: { opacity: 0 },
    view: { opacity: 1, y: 0 },
  };
  const appear = {
    hidden: { opacity: 0, scale: 0 },
    view: { opacity: 0, scale: 0 },
  };

  const imgW500 = apiConfig.w500Image(movie.poster_path);
  return (
    <motion.div
      className={`text-white overflow-hidden relative rounded-lg ${
        movie.vote_average === 0 && "opacity-60"
      }`}
      whileHover={{ scale: 1.1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.3,
      }}
    >
      <motion.div
        variants={appear}
        initial={"view"}
        animate={{ opacity: 1, scale: 1 }}
        exit={"hidden"}
        transition={{
          ease: "easeInOut",
          duration: index < 15 ? (2 + index) / 10 : 1.6,
        }}
      >
        {" "}
        {/* relative */}
        <div className="relative">
          <div className="absolute top-1 right-1">
            <div>
              <p
                className={`w-10 h-10 flex justify-center items-center text-white font-medium ${
                  movie.vote_average < 5 ? "bg-red-600" : "bg-emerald-600"
                } rounded-full text-shdow bg-gray-600`}
              >
                {movie.vote_average !== 10
                  ? movie.vote_average.toFixed(1)
                  : movie.vote_average}
              </p>
            </div>
          </div>
          <div className="absolute bg-gray-700 bg-opacity-60 py-2 left-0 right-0 bottom-0">
            <h5 className="font-bold text-[16px] text-center py-2 ">
              {movie.original_title ? movie.title : movie.name}
            </h5>
          </div>
          <motion.span
            transition={{
              ease: "easeInOut",
              duration: 0.2,
            }}
            animate="hidden"
            whileHover="view"
            variants={title}
            className="absolute bg-zinc-900 bg-opacity-70 -bottom-10 left-0 right-0 top-0 text-center p-2"
          >
            <span>
              <p className={`text-sm leading-[1.05] pt-6 `}>
                {movie.overview.length <= 260
                  ? movie.overview
                  : `${movie.overview.substring(0, 100)}...`}
              </p>
              {movie.vote_average === 0 && (
                <div className="text-xl uppercase text-rose-900 bg-error mt-2 py-2 font-bold rounded-lg">
                  coming soon
                </div>
              )}
            </span>
          </motion.span>
          <img src={imgW500} className="object-cover w-36" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Poster;

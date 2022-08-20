import React from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Poster from "../Poster";

const ListContent = ({ itemContent, typeContent }) => {
  return (
    <div className="flex flex-wrap gap-8 justify-center my-2">
      {itemContent.map((movie, index) => (
        <Link
          key={index}
          to={
            movie.vote_average > 0
              ? `/movie/${typeContent}_${movie.id}_${
                  movie.title ? movie.title : movie.name
                }`
              : "/"
          }
        >
          {movie.poster_path && (
            <AnimatePresence exitBeforeEnter={true}>
              <Poster movie={movie} index={index} key={movie.title} />
            </AnimatePresence>
          )}
        </Link>
      ))}
    </div>
  );
};

export default ListContent;

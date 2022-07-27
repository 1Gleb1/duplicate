import React from "react";

const Player = ({
  originalLanguage,
  movieURL,
  title,
  typeContent,
  originalName,
}) => {
  let id;
  if (typeContent === "tv") {
    if (title === "Adventure Time") {
      id = `name=время+приключений`;
    } else {
      if (originalLanguage === "ru") {
        id = `name=${originalName}`;
      } else {
        id = `name_eng=${title}`;
      }
    }
  } else {
    id = `imdb_id=${movieURL}`;
  }
  console.log(id);
  return (
    <div className="mt-20 flex justify-center bg-gray-700  w-full h-[250px] sm:h-[520px]">
      <div className="relative w-full max-w-[340px] sm:max-w-[720px]">
        <iframe
          src={`https://74.svetacdn.in/DRQQUUcW0qvr?${id}`} //imdb_id=${movie.imdb_id}
          className="absolute w-[340px] sm:w-[720px] h-[250px] sm:h-[520px]"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Player;

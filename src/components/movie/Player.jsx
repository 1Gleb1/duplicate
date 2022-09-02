import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import tmdbApi from "../../api/tmdbApi";
// import "../../../player/playerjs";s

const Player = ({
  originalLanguage,
  movieURL,
  title,
  typeContent,
  originalName,
  mediaID,
  genres,
}) => {
  let id;
  const [ruTitle, setRuTitle] = useState();
  const [isAnimation, setIsAnimation] = useState(false);

  const isAnimationGenre = () => {
    genres &&
      genres.forEach((genre) => {
        if (genre.name == "Animation") {
          setIsAnimation(true);
        }
      });
  };
  const contentCheck = () => {
    //
    if (originalLanguage == "ru") {
      id = `name=${originalName}`;
    } else {
      if (isAnimation) {
        id = `name=${ruTitle}`;
      } else {
        id = `name_eng=${title}`;
      }
    }
  };
  if (typeContent === "tv") {
    contentCheck();
  } else {
    id = `imdb_id=${movieURL}`;
  }

  useEffect(async () => {
    isAnimationGenre();
    const result = await tmdbApi.getTvTitleByID(mediaID);
    setRuTitle(result.name);
  }, [isAnimationGenre]);

  // let player = new Playerjs({ id: "player", file: "//site.com/video.mp4" });

  return (
    <div className="my-8 flex justify-start  w ">
      <div className="relative w-[1000px] h-[450px] sm:max-h-[520px]">
        <iframe
          id="player"
          src={`https://74.svetacdn.in/DRQQUUcW0qvr?${id}`} //imdb_id=${movie.imdb_id} ?load=1?autoplay=1
          // src={`//site.com/player/player.html?file=https://74.svetacdn.in/DRQQUUcW0qvr?${id}`} //imdb_id=${movie.imdb_id} ?load=1?autoplay=1
          className="absolute top-0 left-12 w-full h-full sm:max-w-[580px] max-h-[250px] sm:max-h-[450px] "
          frameBorder="0"
          allowFullScreen
        />
      </div>
      {/* <button onClick={() => changeTime()}>Time</button>
      <button onClick={() => changeVolume()}>Volume</button>
      <button onClick={() => changePlay()}>Play</button>
      <button onClick={() => changePause()}>Stop</button>
      <button onClick={() => changePause()}>Stop</button> */}
    </div>
  );
};

export default Player;

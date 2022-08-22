import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import tmdbApi from "../../api/tmdbApi";

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

  // CONTROl
  ///////////////////////////////////////
  // const changeTime = () => {
  //   document
  //     .getElementById("player")
  //     .contentWindow.postMessage({ api: "seek", set: 600 }, "*");
  // };
  // const changeVolume = () => {
  //   document
  //     .getElementById("player")
  //     .contentWindow.postMessage({ api: "volume", set: 0.5 }, "*");
  // };
  // const changePlay = () => {
  //   document
  //     .getElementById("player")
  //     .contentWindow.postMessage({ api: "play" }, "*");
  // };
  // const changePause = () => {
  //   document
  //     .getElementById("player")
  //     .contentWindow.postMessage({ api: "pause" }, "*");
  // };
  ///////////////////////////////////////

  return (
    <div className="my-12 flex justify-start  w-full h-[250px] sm:h-[520px]">
      <div className="relative w-full max-w-[340px] sm:max-w-[720px] pl-12">
        <iframe
          id="player"
          src={`https://74.svetacdn.in/DRQQUUcW0qvr?${id}`} //imdb_id=${movie.imdb_id} ?load=1?autoplay=1
          className="absolute w-[340px] sm:w-[720px] h-[250px] sm:h-[520px]"
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

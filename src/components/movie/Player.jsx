import React from "react";
import { useState } from "react";

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
  console.log(movieURL);

  const changeTime = () => {
    document
      .getElementById("player")
      .contentWindow.postMessage({ api: "seek", set: 600 }, "*");
  };
  const changeVolume = () => {
    document
      .getElementById("player")
      .contentWindow.postMessage({ api: "volume", set: 0.5 }, "*");
  };
  const changePlay = () => {
    document
      .getElementById("player")
      .contentWindow.postMessage({ api: "play" }, "*");
  };
  const changePause = () => {
    document
      .getElementById("player")
      .contentWindow.postMessage({ api: "pause" }, "*");
  };

  return (
    <div className="my-12 flex justify-center  w-full h-[250px] sm:h-[520px]">
      <div className="relative w-full max-w-[340px] sm:max-w-[720px]">
        <iframe
          id="player"
          src={`https://74.svetacdn.in/DRQQUUcW0qvr?${id}`} //imdb_id=${movie.imdb_id}
          className="absolute w-[340px] sm:w-[720px] h-[250px] sm:h-[520px]"
          frameBorder="0"
          allowFullScreen
        />
      </div>
      <button onClick={() => changeTime()}>Time</button>
      <button onClick={() => changeVolume()}>Volume</button>
      <button onClick={() => changePlay()}>Play</button>
      <button onClick={() => changePause()}>Stop</button>
      <button onClick={() => changePause()}>Stop</button>
    </div>
  );
};

export default Player;

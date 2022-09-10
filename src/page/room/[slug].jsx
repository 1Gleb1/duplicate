import { getAuth } from "firebase/auth";
import { onValue, ref, set, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import Player from "../../components/movie/Player";
import Room from "../../components/movie/Room";
import Chat from "../../components/user/Chat";
import { database } from "../../firebase/clientApp";

const Together = () => {
  const [mediaContent, setMediaContent] = useState({});
  const [handleTime, setHandleTime] = useState({});
  const params = useParams();
  const chank = params.slug.split("_");
  const roomID = chank[0];
  const contentType = chank[1];
  const contentId = chank[2];
  console.log(chank);
  const [timeUser, setTimeUser] = useState(0);

  const auth = getAuth();
  const uid = auth.currentUser.uid ? auth.currentUser.uid : `guest`;

  // CONTROl
  ///////////////////////////////////////

  const changeTime = () => {
    document
      .getElementById("player")
      .contentWindow.postMessage({ api: "seek", set: handleTime }, "*");
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

  // получение времени
  let time = 0;
  window.addEventListener("message", function (event) {
    time = Math.round(event.data.time);
    setTime(time);
  });
  // setTimeout(() => {
  //   setTimeUser(time);
  //   setTime(time);
  //   const timeServerRef = ref(database, "rooms/" + roomID);
  //   onValue(timeServerRef, (snapshot) => {
  //     const data = snapshot.val();
  //     setHandleTime(data.time);
  //   });
  // }, 1000);
  // console.log(time);
  const setTime = async (time) => {
    console.log(time);
    await set(ref(database, `rooms/` + roomID + `/${uid}`), {
      time,
    });
    // update(ref(database), { time: 15 });
  };
  ///////////////////////////////////////

  useEffect(() => {
    const getContent = async () => {
      if (contentType == "movie") {
        try {
          const response = await tmdbApi.getMovie(contentId);
          setMediaContent(response);
        } catch {
          console.log("error");
        }
      } else {
        try {
          const response = await tmdbApi.getTv(contentId);
          setMediaContent(response);
        } catch {
          console.log("error");
        }
      }
    };
    getContent();
    setTime(time);
  }, []);

  return (
    <div className="min-h-screen w-[1000px] mx-auto bg-gray-700">
      <div className="pl-12 pt-4">
        <h1 className="text-3xl font-bold">
          {mediaContent.name ? mediaContent.name : mediaContent.title}
        </h1>
      </div>
      <div className="flex">
        <div className="flex">
          <div className=" bg-gray-700  w-[600px] h-[500px] pl-12">
            <Player
              originalLanguage={mediaContent.original_language}
              movieURL={mediaContent.imdb_id}
              title={mediaContent.name}
              originalName={mediaContent.originalName}
              typeContent={contentType}
            />
          </div>
          <div className="flex bg-gray-800 w-[300px] h-[450px] mt-8 ml-12"></div>
        </div>
        {/* <div className="h-screen w-[600px] bg-gray-600"></div> */}
      </div>
      <div>
        <button onClick={() => changeTime()}>Time</button>
        <button onClick={() => changeVolume()}>Volume</button>
        <button onClick={() => changePlay()}>Play</button>
        <button onClick={() => changePause()}>Stop</button>
        <button onClick={() => setTime(time)}>SetTime</button>
        {/* <button onClick={() => logTime()}>Time Plaer</button> */}
      </div>
      {/* <div>
        <Room movie={movie} />
      </div> */}
      {/* <div className="relative lg:w-[800px] max-h-[200px] lg:max-h-[600px] grow-0">
        <iframe
          title={movie.title}
          src={`https://74.svetacdn.in/DRQQUUcW0qvr?imdb_id=${movie.imdb_id}`}
          className="absolute w-full h-full"
          frameBorder="0"
          allowFullScreen
        />

        <div className="pt-[600px] w-full bg-green-800">
          <span>Playlist</span>
          <div>Movie</div>
        </div>
      </div>
      <div className="bg-secondary w-[300px] justify-center">
        <div className="m-auto bg-primary py-4 my-4 w-48 text-center rounded-xl">
          <span>Users</span>
        </div>
        <div className="h-[400px]">
          <div className="flex justify-between px-14 grow bg-gray-600">
            <div className="flex">
              <span className="avatar">
                <div class="w-16 rounded-full">
                  <img src="https://api.lorem.space/image/face?hash=92048" />
                </div>
              </span>
              <div>name</div>
            </div>
            <div className="flex items-center">
              <div>time</div>
            </div>
          </div>
        </div>
        <div>
          <span>Chat</span>
        </div>
      </div> */}
    </div>
  );
};

export default Together;

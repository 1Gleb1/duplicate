import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import Chat from "../../components/user/Chat";

const Together = () => {
  const [movie, setMovie] = useState({});
  const params = useParams();
  const chank = params.slug.split("_");
  const imdbId = chank[0];

  // PLAYER

  //
  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await tmdbApi.getMovie(imdbId);
        setMovie(response);
      } catch {
        console.log("error");
      }
    };
    getMovie();
  }, []);

  return (
    <div className=" min-h-screen flex flex-col sm:flex-row bg-green-700">
      <div className="relative w-full lg:w-[800px] max-h-[200px] lg:max-h-[600px] grow-0">
        {/* <iframe
          src={`../../playerJs/player.js?file=https://74.svetacdn.in/DRQQUUcW0qvr?imdb_id=${movie.imdb_id}`}
          type="text/html"
          className="w-full h-full"
          frameborder="0"
          allowfullscreen
        /> */}

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
      <div className="bg-secondary grow justify-center">
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
      </div>
    </div>
  );
};

export default Together;

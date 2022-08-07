import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import Player from "../../components/movie/Player";
import Room from "../../components/movie/Room";
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
  console.log(movie);
  return (
    <div className="min-h-screen w-full bg-gray-900">
      <div className="flex">
        <div className="flex flex-col">
          <div className="w-[1200px] h-[600px] bg-gray-700 p-4">
            {console.log(movie.imdb_id)}
            <Player
              originalLanguage={movie.original_language}
              movieURL={movie.imdb_id}
              title={movie.name}
              originalName={movie.originalName}
              typeContent={"movie"}
            />
          </div>
          <div className="flex grow bg-gray-800 w-[1200px] h-[350px]"></div>
        </div>
        <div className="h-screen w-[600px] bg-gray-600"></div>
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

import React, { useEffect, useState } from "react";
import { GrSend } from "react-icons/gr";
import { useParams, Link } from "react-router-dom";
import apiConfig from "../api/apiConfig";
import tmdbApi from "../api/tmdbApi";
import Poster from "../components/Poster";
import { firestore } from "../firebase/clientApp";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Player from "../components/movie/Player";
import Hero from "../components/movie/Hero";
import CastomHero from "../components/movie/CastomHero";

const Movie = () => {
  const [collectionMovie, setCollectionMovie] = useState([]);
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState();
  const image = apiConfig.originalImage(movie.backdrop_path);
  const imgW500 = apiConfig.w500Image(movie.poster_path);
  const params = useParams();
  const chank = params.slug.split("_");
  const typeContent = chank[0];
  const imdbId = chank[1];

  const auth = getAuth();

  const uid = auth.currentUser ? auth.currentUser.uid : "";

  const handleAdd = async (titlePlayList) => {
    if (titlePlayList.length) {
      const newItem = { ...movie };
      // const docRef = doc(firestore, `favorite/${uid}`);
      const docFullRef = collection(
        firestore,
        "favorite",
        uid,
        "nameList",
        titlePlayList,
        "playList"
      );
      // await setDoc(docRef, authItem);
      await addDoc(docFullRef, newItem);
    } else {
      console.log("ПУСТО");
    }
  };

  useEffect(() => {
    const getMovie = async () => {
      try {
        let response;
        if (typeContent == "tv") {
          response = await tmdbApi.getTv(imdbId);
        } else {
          response = await tmdbApi.getMovie(imdbId);
        }
        setMovie(response);
        setGenres(response.genres);
        if (movie.backdrop_path !== null) {
          const idCollection = await response.belongs_to_collection.id;
          const resColl = await tmdbApi.getCollection(idCollection);
          setCollectionMovie(resColl.parts);
        }
      } catch {
        console.log("error");
      }
    };
    window.scrollTo(0, 0);
    getMovie();
    return () => {};
  }, [imdbId]);

  console.log(movie);
  return (
    <div className="w-[1200px] mx-auto bg-gray-700 min-h-sreen flex flex-col justify-center items-center">
      {/* <Hero
        auth={auth}
        uid={uid}
        image={image}
        imgW500={imgW500}
        movieTitle={movie.title}
        genres={genres}
        movieDuration={movie.runtime}
        overview={movie.overview}
        movieID={movie.id}
        originalTitle={movie.original_title}
        handleAdd={handleAdd}
      /> */}
      <CastomHero
        auth={auth}
        uid={uid}
        image={image}
        imgW500={imgW500}
        movieTitle={movie.title}
        genres={genres}
        movieDuration={movie.runtime}
        overview={movie.overview}
        movieID={movie.id}
        originalTitle={movie.original_title}
        handleAdd={handleAdd}
      />
      <Player
        movieURL={movie.imdb_id}
        title={movie.name}
        typeContent={typeContent}
        // title={movie.original_name}

        originalLanguage={movie.original_language}
        originalName={movie.original_name}
      />

      <div className=" w-[800px] flex flex-col items-start gap-1 flex-wrap pt-8 mb-8">
        <span className="text-xl"> Collection:</span>
        {collectionMovie &&
          collectionMovie.map((movie, index) => (
            <Link
              key={index}
              to={
                movie.vote_average > 0
                  ? `/movie/movie_${movie.id}_${movie.title}`
                  : ""
              }
            >
              <div className="hover:underline">{movie.original_title}</div>
              {/* {<Poster movie={movie} />} */}
            </Link>
          ))}
      </div>
      <div className="h-16 w-[1200px] bg-blue-900" />
      <div className=" w-[800px] flex flex-col flex-wrap pt-8 mb-8">
        <span className="text-xl"> Related:</span>
        <div className="flex gap-6">
          {collectionMovie &&
            collectionMovie.map((movie, index) => (
              <Link
                key={index}
                to={
                  movie.vote_average > 0
                    ? `/movie/movie_${movie.id}_${movie.title}`
                    : ""
                }
              >
                {<Poster movie={movie} />}
              </Link>
            ))}
        </div>
      </div>
      <div className="h-16 w-[1200px] bg-blue-900" />
      <div className="w-[800px] my-12">
        <div className="flex flex-col gap-6">
          <span className="text-4xl">Comments:</span>
          <div>
            <form action="" className="flex">
              <input type="text" className="py-2 w-full bg-gray-500" />
              <button className="p-4 bg-blue-900 rounded-r-lg">
                <GrSend className="text-slate-300 text-lg " color="white" />
              </button>
            </form>
          </div>
          <div>
            comments...
            <div className="bg-gray-900 p-3 flex">
              <div class="avatar placeholder">
                <div class="bg-neutral-focus text-neutral-content rounded-full w-16 h-16 ">
                  <span class="text-lg">K</span>
                </div>
              </div>
              <div className="flex flex-col ml-6">
                <div>Kilerr</div>
                <div className="">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Quis, fugit repellendus magni necessitatibus quibusdam a
                  repellat ad eum, molestias optio fugiat cupiditate unde!
                  Delectus doloribus necessitatibus obcaecati repudiandae illo
                  quasi!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;

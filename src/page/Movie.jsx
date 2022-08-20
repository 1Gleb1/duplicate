import React, { useEffect, useState } from "react";
import { GrSend } from "react-icons/gr";
import { useParams, Link } from "react-router-dom";
import apiConfig from "../api/apiConfig";
import tmdbApi from "../api/tmdbApi";
import Poster from "../components/Poster";
import { firestore } from "../firebase/clientApp";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Player from "../components/movie/Player";
import Hero from "../components/movie/Hero";
import CastomHero from "../components/movie/CastomHero";
import Comments from "../components/movie/Comments";
import LikeDis from "../components/movie/LikeDis";

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
      const newItem = { ...movie, titlePlayList };
      const docRef = doc(firestore, `favorite/${uid}`);
      const docFullRef = collection(firestore, "favorite", uid, titlePlayList);
      const docNamePlaylist = collection(
        firestore,
        "favorite",
        uid,
        "nameList"
      );
      await addDoc(docFullRef, newItem);
      await addDoc(docNamePlaylist, { titlePlayList });
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
    <div className="w-[1000px] mx-auto bg-[#0f2c41] min-h-sreen flex flex-col justify-center items-center">
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
        movieName={movie.name}
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
      <LikeDis imdbID={imdbId} />

      <div>
        {collectionMovie.length && (
          <div className=" w-[1000px] ">
            <div className="pl-12 w-[900px] flex flex-col items-start gap-1 flex-wrap pt-8 mb-8">
              <span className="text-3xl mb-4"> Collection:</span>
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
                    <div className="hover:underline">
                      {movie.original_title}
                    </div>
                    {/* {<Poster movie={movie} />} */}
                  </Link>
                ))}
            </div>
            <div className="h-20 w-[1000px] bg-[#1c405a]" />
            <div className="pl-12 w-[900px] flex flex-col flex-wrap pt-8 mb-8">
              <span className="text-3xl mb-4"> Related:</span>
              <div className="flex gap-6 mb-4 w-[800px]">
                {collectionMovie &&
                  collectionMovie.map((movie, index) => (
                    <Link
                      className="w-36"
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
            <div className="h-20 w-[1000px] bg-[#1c405a]" />
          </div>
        )}
      </div>

      <div className="w-[900px] my-12">
        <div className="flex flex-col gap-6">
          <span className="text-3xl">Comments:</span>
          <Comments imdbID={movie.imdb_id} />
        </div>
      </div>
    </div>
  );
};

export default Movie;

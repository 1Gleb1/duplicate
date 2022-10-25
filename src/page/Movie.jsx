import React, { useEffect, useState } from "react";
import { GrSend } from "react-icons/gr";
import { useParams, Link } from "react-router-dom";
import apiConfig from "../api/apiConfig";
import tmdbApi from "../api/tmdbApi";
import Poster from "../components/Poster";
import { firestore } from "../firebase/clientApp";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Player from "../components/movie/Player";
import Hero from "../components/movie/Hero";
import CastomHero from "../components/movie/CastomHero";
import Comments from "../components/movie/Comments";
import LikeDis from "../components/movie/LikeDis";
import { useCallback } from "react";

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
  const uid = auth.currentUser && auth.currentUser.uid;

  const handleAdd = async (titlePlayList) => {
    // Получение плейлистов
    let onceArrayPlaylist;
    const docPlaylist = doc(firestore, "favorite", uid);
    const docPlaylistSnap = await getDoc(docPlaylist);
    if (docPlaylistSnap.exists()) {
      const playlistObject = docPlaylistSnap.data();
      onceArrayPlaylist = [playlistObject];
    } else {
      console.log("No such document!");
      onceArrayPlaylist = "";
    }

    // Отправка плейлистов
    if (titlePlayList.length) {
      let text = JSON.stringify(movie);
      let textTitle = JSON.stringify(titlePlayList);
      if (onceArrayPlaylist.length > 0) {
        onceArrayPlaylist.forEach((onePlaylist) => {
          let isPlaylist = false;
          const keysPlaylist = [];
          const heroObject = onePlaylist.playlist;
          heroObject.forEach((objectWithPlaylist) => {
            keysPlaylist.push(...Object.keys(objectWithPlaylist));
          });
          keysPlaylist.forEach((key) => {
            if (titlePlayList == key) {
              isPlaylist = key;
            }
          });
          if (isPlaylist) {
            console.log("Кеш + обновить плейлист");
            const selectTitleString = JSON.stringify(isPlaylist);
            let allText = [];
            let newItem = [];
            for (let i = 0; i < onceArrayPlaylist[0].playlist.length; i++) {
              const serchTitle = JSON.stringify(
                ...Object.keys(onceArrayPlaylist[0].playlist[i])
              );
              if (selectTitleString == serchTitle) {
                const selectPlaylist = JSON.stringify(
                  onceArrayPlaylist[0].playlist[i]
                );
                const cashOpenPlaylist = selectPlaylist.substring(
                  0,
                  selectPlaylist.length - 2
                );
                const updatePlaylist = `${cashOpenPlaylist},${text}]}`;
                allText.push(updatePlaylist);
              } else {
                const selectPlaylist = JSON.stringify(
                  onceArrayPlaylist[0].playlist[i]
                );
                allText.push(selectPlaylist);
              }
            }
            allText.forEach((playlistForParce) => {
              newItem.push(JSON.parse(playlistForParce));
            });
            const newObject = {
              playlist: newItem,
            };
            const docRef = doc(firestore, `favorite/${uid}`);
            try {
              setDoc(docRef, newObject);
            } catch (e) {
              console.log(e);
            }
          } else {
            console.log("Иначе новый плейлист, кешируя имеющиеся");
            const cashPlaylist = JSON.stringify(onceArrayPlaylist);
            const cashOpenPlaylist = cashPlaylist.substring(
              0,
              cashPlaylist.length - 3
            );
            const newItem = `${cashOpenPlaylist},{${textTitle}: [${text}]} ]}]`;
            let parseNewItem = JSON.parse(newItem);
            console.log(parseNewItem);
            const docRef = doc(firestore, `favorite/${uid}`);
            try {
              setDoc(docRef, parseNewItem[0]);
            } catch (e) {
              console.log(e);
            }
          }
        });
      } else {
        const newItem = `{  "playlist": [{${textTitle}: [${text}]}] } `;
        let parseNewItem = JSON.parse(newItem);
        const docRef = doc(firestore, `favorite/${uid}`);
        await setDoc(docRef, parseNewItem);
      }
    } else {
      console.log("ПУСТО");
    }
  };

  const handleAddCallback = useCallback(async (titlePlayList) => {
    await handleAdd(titlePlayList);
  });

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

  // console.log(movie);
  return (
    <div className="max-w-[1000px] mx-auto bg-[#0f2c41] min-h-sreen flex flex-col justify-center items-center">
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
        handleAddCallback={handleAddCallback}
        typeContent={typeContent}
      />
      <div className="h-[600px]">
        <Player
          movieURL={movie.imdb_id}
          title={movie.name}
          typeContent={typeContent}
          // title={movie.original_name}
          originalLanguage={movie.original_language}
          originalName={movie.original_name}
          mediaID={movie.id}
          genres={genres}
        />
      </div>
      {/* <LikeDis imdbID={imdbId} /> */}

      <div>
        {collectionMovie.length ? (
          <div className="w-[1000px] ">
            <div className="pl-12 w-[900px] flex flex-col items-start gap-1 flex-wrap mb-8">
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
            {/* <div className="h-20 w-[1000px] bg-[#1c405a]" /> */}
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className="max-w-[900px] w-full my-12">
        <div className="flex flex-col gap-6">
          <span className="text-3xl">Comments:</span>
          <Comments id={movie.id} />
        </div>
      </div>
    </div>
  );
};

export default Movie;

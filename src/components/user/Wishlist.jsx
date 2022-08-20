import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase/clientApp";
import Poster from "../Poster";

const Wishlist = ({ uid }) => {
  const [favoriteList, setFavoriteList] = useState([]);
  const [playlistName, setPlaylistName] = useState([]);

  const handleDelete = async (title, id) => {
    const itemRef = doc(firestore, `favorite/${uid}/${title}/${id}`);
    await deleteDoc(itemRef);

    // const collectionFilm = collection(firestore, `favorite/${uid}/${title}`);
    // const unsub = onSnapshot(collectionFilm, async (snapshot) => {
    //   let array = [];
    //   snapshot.forEach((doc) => {
    //     array.push(doc);
    //   });
    //   if (array.length > 1) {
    //     const collectionRef = collection(firestore, `favorite/${uid}/${title}`);
    //     await deleteDoc(collectionRef);
    //   }
    // });
    // return () => {
    //   unsub();
    // };
  };

  const getNamesPlaylists = async () => {
    let arrayTitle = [];
    const nameDocRef = await getDocs(
      collection(firestore, "favorite", uid, "nameList")
    );
    nameDocRef.forEach((doc) => {
      arrayTitle.push(doc.data().titlePlayList);
    });
    setPlaylistName(arrayTitle);
    getWhishList();
  };

  const getWhishList = async () => {
    let arryaMovie = [];
    playlistName.forEach(async (title) => {
      const movieDocRef = await getDocs(
        collection(firestore, "favorite", uid, title)
      );
      movieDocRef.forEach((doc) => {
        arryaMovie.push([doc.data(), doc.id]);
      });
      setFavoriteList([...arryaMovie]);
    });
  };

  useEffect(() => {
    getNamesPlaylists();
    getWhishList();
  }, []);

  return (
    <div>
      <div className="max-w-xl flex flex-wrap gap-5">
        {favoriteList &&
          favoriteList.map((movie, index) => (
            <div key={index}>
              <div>
                <Link to={`/movie/${movie[0].id}_${movie[0].original_title}`}>
                  {movie[0].poster_path && <Poster movie={movie[0]} />}
                </Link>
                <button
                  onClick={() => handleDelete(movie[0].titlePlayList, movie[1])}
                  className="w-full text-lg font-medium rounded-lg mt-2 py-3 px-4 bg-gradient-to-b from-rose-700 to-pink-900 hover:from-rose-800 hover:to-red-900 transition"
                >
                  Delete ({movie[0].titlePlayList})
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Wishlist;

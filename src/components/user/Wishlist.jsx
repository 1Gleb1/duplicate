import {
  collection,
  deleteDoc,
  doc,
  getDoc,
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

  // const handleDelete = async (index) => {
  //   const itemRef = doc(firestore, "favorite", favoriteList[index].id);
  //   await deleteDoc(itemRef);
  // };

  const getNamesPlaylists = async () => {
    const queryPlaylist = doc(firestore, "favorite", uid);
    const docPlaylist = await getDoc(queryPlaylist);
    console.log(docPlaylist);
    const unsubscribePlaylist = onSnapshot(queryPlaylist, (querySnapshot) => {
      let arrName = [];
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id);
      //   arrName.push(doc.id);
      // });
      console.log(querySnapshot);
      setPlaylistName(arrName);
    });
  };

  let unsub;
  const getWhishList = () => {
    const docRef = collection(firestore, "favorite", uid, "second");
    unsub = onSnapshot(docRef, (snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc);
      });
    });
  };
  useEffect(() => {
    getNamesPlaylists();
    // getWhishList();
    // return () => {
    //   unsub();
    // };
    // getFavoriteList();
  }, []);

  return (
    <div>
      <div className="max-w-xl flex flex-wrap gap-5">
        {/* {favoriteList.map((movie, index) => (
          <div key={index}>
            <div>
              <Link
                to={`/movie/${movie.data().id}_${movie.data().original_title}`}
              >
                {movie.data().poster_path && <Poster movie={movie.data()} />}
              </Link>
              <button
                // onClick={() => handleDelete(index)}
                className="w-full text-lg font-medium rounded-lg mt-2 py-3 px-4 bg-gradient-to-b from-rose-700 to-pink-900 hover:from-rose-800 hover:to-red-900 transition"
              >
                Delete ({movie.data().titlePlayList})
              </button>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Wishlist;

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

  const getFavoriteList = async () => {
    // const docRef = doc(firestore, "favorite", uid, "plalist", "Create");
    // const docSnap = await getDoc(docRef);
    // const docSnap = await getDocs(docRef);
    // console.log(docSnap);
    // docSnap.forEach((doc) => {
    //   console.log(doc.data());
    // });
    // let docSnap = await getDoc(docRef);
    // console.log(docSnap.data());
    // const queryPlaylist = collection(firestore, "favorite");
    // const docPlaylist = await getDocs(queryPlaylist);
    // console.log(docPlaylist.exists());
    // const unsubscribePlaylist = onSnapshot(queryPlaylist, (querySnapshot) => {
    //   let arrName = [];
    //   querySnapshot.forEach((doc) => {
    // console.log(doc.id);
    // arrName.push(doc.id);
    //   });
    //   console.log(arrName);
    //   setPlaylistName(arrName);
    // });
    // playlistName.forEach(async (name) => {
    //   console.log(name);
    //   const docMovieRef = doc(firestore, "favorite", uid, "playlist", name);
    //   const docMovieList = await getDoc(docMovieRef);
    //   console.log(docMovieList.data());
    // const unsubscribeMovies = onSnapshot(queryMovieList, (querySnapshot) => {
    // let arrName = [];
    // querySnapshot.forEach((doc) => {
    //   arrName.push(doc.id);
    // });
    //   console.log(querySnapshot);
    // });
    // });
    // console.log(playlistName);
  };

  const getWhishList = async () => {
    const q = query(collection(firestore, "favorite"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    // const unsub = onSnapshot(
    //   collection(firestore, "firebase", uid, "new"),
    //   (doc) => {
    //     console.log(doc);
    //     doc.forEach((d) => {
    //       console.log(d);
    //     });
    //   }
    // );
    // return () => {
    //   unsub();
    // };
    //   const docRef = doc(firestore, uid);
    //   const docSnap = await getDoc(docRef);

    //   if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
  };

  // const handleDelete = async (index) => {
  //   const itemRef = doc(firestore, "favorite", favoriteList[index].id);
  //   await deleteDoc(itemRef);
  // };

  useEffect(() => {
    getWhishList();

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

import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  collection,
  getDoc,
  doc,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { firestore } from "../firebase/clientApp";
import { getAuth } from "firebase/auth";
import { useCallback } from "react";

const FavoriteList = ({ handleAdd, handleAddCallback }) => {
  const [title, setTitle] = useState("");
  const [arrayPlaylistName, setArrayPlaylistName] = useState([]);

  const auth = getAuth();
  const uid = auth.currentUser && auth.currentUser.uid;

  const getNamesPlaylists = (playlist) => {
    const keys = [];
    if (playlist) {
      playlist.forEach((name) => {
        const object = Object.keys(name);
        const value = object[0];
        keys.push(value);
      });
      setArrayPlaylistName(keys);
    }
  };

  const unsubArray = useCallback(() => {
    onSnapshot(doc(firestore, "favorite", uid), (doc) => {
      const arrayPlaylist = doc.data();
      getNamesPlaylists(arrayPlaylist ? arrayPlaylist.playlist : []);
    });
  });
  // const unsubArray = () => {
  //   onSnapshot(doc(firestore, "favorite", uid), (doc) => {
  //     const arrayPlaylist = doc.data();
  //     getNamesPlaylists(arrayPlaylist ? arrayPlaylist.playlist : []);
  //     console.log(arrayPlaylist);
  //   });
  // };

  useEffect(() => {
    return unsubArray();
  }, []);

  return (
    <div>
      <div className="dropdown">
        <label
          tabindex="0"
          className="bg-[#3a5162] px-2 py-1 sm:px-4 sm:py-3 text-md sm:text-lg rounded-lg"
        >
          {/* <AiOutlinePlusCircle className="text-4xl" /> */}
          Add Playlist
        </label>
        <ul
          tabindex="0"
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-60 max-h-52 "
        >
          <div className="overflow-auto">
            {arrayPlaylistName.length > 0 &&
              arrayPlaylistName.map((title, index) => (
                <li key={index}>
                  <p onClick={() => handleAddCallback(title)}>{title}</p>
                </li>
              ))}
          </div>
          <div className="flex justify-around items-center">
            <input
              type="text"
              placeholder="New playlist"
              className="input w-40 mt-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className="w-8 h-8 bg-secondary rounded-full flex-grow-0 "
              onClick={() => {
                handleAddCallback(title);
                setTitle("");
              }}
            >
              +
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default FavoriteList;

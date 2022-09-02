import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase/clientApp";

const FavoriteList = ({ handleAdd, uid }) => {
  const [title, setTitle] = useState("");
  const [playlistName, setPlaylistName] = useState([]);

  const getNamesPlaylists = async () => {
    let arrayTitle = [];
    const nameDocRef = await getDocs(
      collection(firestore, "favorite", uid, "nameList")
    );
    nameDocRef.forEach((doc) => {
      arrayTitle.push(doc.data().titlePlayList);
    });
    setPlaylistName(arrayTitle);
  };

  // console.log(playlistName);

  useEffect(() => {
    getNamesPlaylists();
  }, []);

  return (
    <div>
      <div className="dropdown">
        <label tabindex="0" className="bg-[#3a5162] px-4 py-3 rounded-lg">
          {/* <AiOutlinePlusCircle className="text-4xl" /> */}
          Add Playlist
        </label>
        <ul
          tabindex="0"
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-60 max-h-52 "
        >
          <div className="overflow-auto">
            {playlistName.map((title, index) => (
              <li key={index}>
                <p onClick={() => handleAdd(title)}>{title}</p>
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
                handleAdd(title);
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

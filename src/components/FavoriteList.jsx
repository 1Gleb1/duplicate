import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../firebase/clientApp";

const FavoriteList = ({ handleAdd, uid }) => {
  const [title, setTitle] = useState("");

  const [playList, setPlayList] = useState([]);

  const [filterArray, setFilterArray] = useState([]);

  const favoriteCollection = collection(firestore, "favorite");
  const favoriteListQuery = query(favoriteCollection, where("uid", "==", uid));
  let unsub;

  const getFavoriteList = async () => {
    unsub = onSnapshot(favoriteListQuery, (snapshot) => {
      const result = [];
      snapshot.forEach((doc) => result.push(doc.data().titlePlayList));
      setPlayList(result);
    });
    let arr1 = new Set(playList);
    let arr2 = [];
    arr1.forEach((item) => arr2.push(item));
    setFilterArray(arr2);
  };
  useEffect(() => {
    getFavoriteList();
    return () => {
      unsub();
    };
  }, [playList]);

  return (
    <div>
      <div className="dropdown">
        <label tabindex="0" className="bg-gray-800 px-4 py-3 rounded-lg">
          {/* <AiOutlinePlusCircle className="text-4xl" /> */}
          Add Playlist
        </label>
        <ul
          tabindex="0"
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-60 max-h-52 "
        >
          <div className="overflow-auto">
            {filterArray.map((title, index) => (
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

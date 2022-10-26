import { deleteDoc, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";

import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { firestore } from "../../firebase/clientApp";
import Tabs from "../Tabs";

const Wishlist = ({ uid }) => {
  const [arrayWishlist, setArrayWishlist] = useState([]);
  const [arrayPlaylistName, setArrayPlaylistName] = useState([]);
  const [arrayPlaylistContent, setArrayPlaylistContent] = useState([]);

  const getNamesPlaylists = (array) => {
    const keys = [];
    if (array.length) {
      array.forEach((element) => {
        const object = Object.keys(element);
        const value = object[0];
        keys.push(value);
      });
    }
    setArrayPlaylistName(keys);
  };

  const getContentPlaylists = (array) => {
    const values = [];
    if (array.length) {
      array.forEach((element) => {
        const obj = Object.values(element);
        const value = obj[0];
        values.push(value);
      });
      setArrayPlaylistContent(values);
    }
  };

  const deletePlaylist = async (index) => {
    const newArray = arrayWishlist ? arrayWishlist : [];
    newArray.splice(index, 1);
    // setArrayWishlist(newArray);
    // server
    if (newArray.length) {
      const newItemSting = JSON.stringify(newArray);
      const newItem = `{  "playlist": ${newItemSting} } `;
      const parseNewItem = JSON.parse(newItem);
      console.log(parseNewItem);
      const docRef = doc(firestore, `favorite/${uid}`);
      await setDoc(docRef, parseNewItem);
    } else {
      await deleteDoc(doc(firestore, "favorite", uid));
    }
  };

  const deleteMovieFromPlaylist = async (indexPlaylist, indexMovie) => {
    // deletePlaylist(indexPlaylist);
    const newArray = arrayWishlist ? arrayWishlist : [];
    const key = Object.keys(newArray[indexPlaylist])[0];
    // const array = Object.values(newArray[indexPlaylist]);
    // array[0].splice(indexMovie, 1);
    // newArray[indexPlaylist].splice(indexMovie);

    // console.log(newArray[indexPlaylist][key].splice(indexMovie, 1));
    if (newArray.length) {
      // const keyString = JSON.stringify(key);
      // const arrayString = JSON.stringify(array[0]);
      // const playlistStirng = JSON.stringify(...newArray);
      // const newItem = `{  "playlist": [${playlistStirng},{${keyString} : ${arrayString}}    ]}`;
      // const parseNewItem = JSON.parse(newItem);
      newArray[indexPlaylist][key].splice(indexMovie, 1);
      console.log(newArray);
      const docRef = doc(firestore, `favorite/${uid}`);
      await setDoc(docRef, { playlist: newArray });
    }
  };

  // const unsubArray = onSnapshot(doc(firestore, "favorite", uid), (doc) => {
  //   if (doc.data()) {
  //     const arrayPlaylist = doc.data();
  //     getNamesPlaylists(arrayPlaylist?.playlist);
  //   } else {
  //     console.log(doc.data());
  //   }
  // });
  const unsubArray = useCallback(() => {
    onSnapshot(doc(firestore, "favorite", uid), (doc) => {
      const arrayPlaylist = doc.data();
      getNamesPlaylists(arrayPlaylist ? arrayPlaylist.playlist : []);
    });
  });

  useEffect(() => {
    const getWhishList = async () => {
      const nameDocRef = await getDoc(doc(firestore, "favorite", uid));
      const data = nameDocRef.data();
      const dataPlaylist = data?.playlist;
      // console.log(dataPlaylist);
      getNamesPlaylists(dataPlaylist ? dataPlaylist : []);
      getContentPlaylists(dataPlaylist ? dataPlaylist : []);
      setArrayWishlist(dataPlaylist);
    };
    getWhishList();
    return unsubArray;
  }, [arrayWishlist]);

  return (
    <div>
      <div className="max-w-xl flex flex-wrap gap-5 ">
        {/* <div className="relative w-[900px] h-[250px] "> */}
        <div className="relative h-64 w-[300px] lg:w-[1000px]">
          <div className="flex flex-row">
            {arrayWishlist ? (
              <Tabs
                arrayTabs={arrayPlaylistName}
                arrayContent={arrayPlaylistContent}
                //
                deletePlaylist={deletePlaylist}
                deleteMovieFromPlaylist={deleteMovieFromPlaylist}
              />
            ) : (
              <div className="absolute top-0 left-0 right-0  bottom-0  bg-gray-800 w-[69vw] lg:w-[890px]">
                <span className="flex justify-center items-center h-full ">
                  У вас еще нет плейлистов
                </span>
              </div>
            )}
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Wishlist;

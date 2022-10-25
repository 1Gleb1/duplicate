import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { firestore } from "../../firebase/clientApp";
import Chat from "./Chat";

const UserList = ({
  // user,
  arrayContent,
  currentID,
  setCurrentID,
  anotherUser,
  setAnotherUser,
  arrayTab,
}) => {
  const [friendsList, setFriendsList] = useState([]);
  const auth = getAuth();
  const authUser = auth.currentUser;
  const user = authUser;
  const currentUserUid = authUser.uid;

  const handleFriendList = async () => {
    const chatsDocRef = collection(firestore, `friends/${user.email}/list`);
    const unsub = onSnapshot(chatsDocRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((doc) => {
        arr.push(doc.data().user);
      });
      setFriendsList(arr);
    });
    return () => {
      unsub();
    };
  };

  const getCurrentId = (friendUid, friendUser) => {
    let str;
    if (currentUserUid >= friendUid) {
      str = currentUserUid + friendUid;
    }
    if (currentUserUid < friendUid) {
      str = friendUid + currentUserUid;
    }
    setCurrentID(str);
    setAnotherUser(friendUser);
  };

  const handleFriendUser = async (friendUser) => {
    let coincidence = false;

    friendsList.forEach((user) => {
      if (user.uid == friendUser.uid) {
        coincidence = true;
      }
    });
    if (!coincidence) {
      const personItem = {
        user: {
          email: user.email,
          displayName: user.displayName ? user.displayName : user.email,
          uid: user.uid,
        },
      };
      const friendItem = {
        user: {
          email: friendUser.email,
          displayName: friendUser.displayName
            ? friendUser.displayName
            : friendUser.email,
          uid: friendUser.uid,
        },
      };
      await addDoc(
        collection(firestore, "friends", friendUser.email, "list"),
        personItem
      );
      await addDoc(
        collection(firestore, "friends", user.email, "list"),
        friendItem
      );
    } else {
      console.log("в списке");
    }
  };

  const deleteFriend = async (friendDel) => {
    const docRef = collection(firestore, "friends", user.email, "list");
    const docRefTwo = collection(firestore, "friends", friendDel.email, "list");
    const unsub = onSnapshot(docRef, (snapshot) => {
      snapshot.forEach(async (usersi) => {
        if (usersi.data().user.email == friendDel.email) {
          await deleteDoc(
            doc(firestore, "friends", user.email, "list", usersi.id)
          );
        }
      });
    });

    const unsubTwo = onSnapshot(docRefTwo, (snapshot) => {
      snapshot.forEach(async (usersi) => {
        if (usersi.data().user.email == friendDel.email) {
          console.log(usersi.id);
          await deleteDoc(
            doc(firestore, "friends", friendDel.email, "list", usersi.id)
          );
        }
      });
    });
    // setFriendsList([]);
    return () => {
      unsub();
      unsubTwo();
    };
  };

  useEffect(() => {
    handleFriendList();
  }, []);

  return (
    <div>
      {!anotherUser && (
        <div className="flex flex-col gap-2 px-1">
          <div>
            {/* <div className="flex flex-col gap-2">
              {arrayContent.map((user) => (
                <div key={user.uid}>{user.uid}</div>
              ))}
            </div> */}
          </div>
          {arrayContent.map((user, index) => (
            <div
              key={user.uid}
              className="relative shrink-0 h-24 bg-gray-700 hover:bg-indigo-900 border-2 border-gray-600 rounded-lg transition overflow-hidden"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-3 px-4 py-1">
                  <div className="w-12 h-12 relative">
                    <div
                      className={`absolute top-4 w-12 h-12 bg-gray-800 rounded-full `}
                    >
                      <div className="w-12 h-12 flex justify-center items-center">
                        <span className="text-purple-700 uppercase text-xl font-semibold">
                          <img
                            src={require("../../img/kat.jpg")}
                            alt="avatar"
                            className="rounded-full w-12 h-12"
                          />
                          {/* {user.displayName
                            ? user.displayName[0]
                            : user.email[0]} */}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-2 my-3">
                    <button
                      onClick={() => getCurrentId(user.uid, user)}
                      className="hover:underline"
                    >
                      {user.displayName ? user.displayName : user.email}
                    </button>
                    <button
                      //   onClick={() => getCurrentId(user.uid, user)}
                      className="hover:underline"
                    >
                      Message
                    </button>
                  </div>
                </div>
                {arrayTab == "All User" && (
                  <button
                    onClick={() => handleFriendUser(user)}
                    className="px-3 py-2 mx-4 rounded-lg bg-green-600  hover:bg-green-700 cursor-pointer"
                  >
                    Add
                  </button>
                )}
                {arrayTab == "Friends" && (
                  <button
                    onClick={() => deleteFriend(user)}
                    className="px-3 py-2 mx-4 rounded-lg bg-red-600  hover:bg-red-700 cursor-pointer"
                  >
                    Dell
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {anotherUser && (
        <div className="">
          <div className="relative h-[560px]">
            <Chat
              anotherUser={anotherUser}
              setAnotherUser={setAnotherUser}
              currentID={currentID}
              setCurrentID={setCurrentID}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;

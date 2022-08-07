import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase/clientApp";
import Chat from "./Chat";

const FriendList = () => {
  const [currentID, setCurrentID] = useState("");
  const [anotherUser, setAnotherUser] = useState();
  const [allUserArray, setAllUserArray] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [arrayUsers, setArrayUsers] = useState([...allUserArray]);
  const [people, setPeople] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;
  const currentUserUid = user.uid;

  const getArrayUser = async () => {
    const docRef = collection(firestore, "user");
    let docSnap = await getDocs(docRef);
    const temp = [];
    docSnap.forEach((doc) => {
      temp.push(doc.data());
    });
    setAllUserArray(temp);
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

  const handleFriendUser = async (friendUser) => {
    let coincidence = false;
    friendsList.forEach((user) => {
      if (user.email == friendUser.email) {
        console.log("уже в друзьях");
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
    setFriendsList([]);
    return () => {
      unsub();
      unsubTwo();
    };
  };

  const handleArray = (arr) => {
    if (arr.length < allUserArray.length) {
      setPeople("friend");
    } else {
      setPeople("all");
    }
    setArrayUsers(arr);
  };

  useEffect(() => {
    getArrayUser();
    handleFriendList();
  }, [anotherUser, arrayUsers, people]);

  return (
    <div>
      <div className="flex gap-1">
        <button
          onClick={() => handleArray(allUserArray)}
          className={`grow text-center text-xl font-bold text-white rounded-lg border-2 border-sky-800 hover:bg-sky-900 ${
            people == "all" ? "bg-sky-900" : "bg-slate-700"
          } py-2 mb-2`}
        >
          <span>All User</span>
        </button>
        <button
          onClick={() => handleArray(friendsList)}
          className={`grow text-center text-xl font-bold bg-slate-700 text-white rounded-lg border-2 border-sky-800 hover:bg-sky-900 ${
            people == "friend" ? "bg-sky-900" : "bg-slate-700"
          } py-2 mb-2`}
        >
          <span>FrienList</span>
        </button>
      </div>
      <div className=" w-[600px] h-[600px] overflow-auto bg-gray-500  p-2 rounded-lg flex flex-col  gap-1 ">
        {arrayUsers.map((user, index) => (
          <div
            key={index}
            className=" relative shrink-0 h-24 bg-gray-700 hover:bg-indigo-900 border-2 border-gray-600 rounded-lg overflow-hidden transition"
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-3 px-4 py-1">
                <div className="w-12 h-12 relative">
                  <div
                    className={`absolute top-4 w-12 h-12 bg-gray-800 rounded-full `}
                  >
                    <div className="w-12 h-12 flex justify-center items-center">
                      <span className="text-purple-700 uppercase text-xl font-semibold">
                        {user.displayName ? user.displayName[0] : user.email[0]}
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
                    onClick={() => getCurrentId(user.uid, user)}
                    className="hover:underline"
                  >
                    Message
                  </button>
                </div>
              </div>
              <button
                onClick={() =>
                  people == "all" ? handleFriendUser(user) : deleteFriend(user)
                }
                className={`flex justify-center items-center w-12 h-12  transition ${
                  people == "all"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-red-600 hover:bg-red-700"
                }  rounded-lg mr-2`}
              >
                <span>{people == "all" ? "Add" : "Del"}</span>
              </button>
            </div>
          </div>
        ))}

        {anotherUser && (
          <Chat
            anotherUser={anotherUser}
            setAnotherUser={setAnotherUser}
            currentID={currentID}
            setCurrentID={setCurrentID}
          />
        )}
      </div>
    </div>
  );
};

export default FriendList;

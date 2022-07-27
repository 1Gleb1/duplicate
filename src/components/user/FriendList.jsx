import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
  getDoc,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase/clientApp";
import Chat from "./Chat";

const FriendList = () => {
  const [currentID, setCurrentID] = useState("");
  const [anotherUser, setAnotherUser] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [userArray, setUserArray] = useState([]);
  const [messages, setMessages] = useState([]);

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
    setUserArray(temp);
  };

  const getCurrentId = (friendUid, friendUser) => {
    setMessages([]);
    let str;
    if (currentUserUid >= friendUid) {
      str = currentUserUid + friendUid;
    }
    if (currentUserUid < friendUid) {
      str = friendUid + currentUserUid;
    }
    setCurrentID(str);
    // getChats(friendUser);
    setAnotherUser(friendUser);
  };

  useEffect(() => {
    getArrayUser();
    const getChats = () => {
      if (currentID) {
        const chatsDocRef = collection(
          firestore,
          `chats/${currentID}/messages`
        );
        console.log(currentID);
        const chatsQuery = query(chatsDocRef, orderBy("createOn", "asc"));
        const unsub = onSnapshot(chatsQuery, (snapshot) => {
          let msg = [];
          snapshot.forEach((doc) => {
            msg.push(doc.data());
          });
          setMessages(msg);
        });
      }
    };
    getChats();
  }, [anotherUser]);

  return (
    <div className=" w-[600px] bg-blue-700 rounded-lg ">
      {!anotherUser &&
        userArray.map((user, index) => (
          <div key={index} className="flex relative  overflow-hidden p-4">
            <div className="w-12 h-12 " />
            <div className=" absolute top-4 left-2 w-12 h-12 bg-white rounded-full " />
            <div className="flex flex-col">
              <button
                onClick={() => getCurrentId(user.uid, user)}
                className="hover:underline"
              >
                {user.displayName}
              </button>
              <div>Message</div>
            </div>
          </div>
        ))}

      {anotherUser && (
        <Chat
          anotherUser={anotherUser}
          setAnotherUser={setAnotherUser}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          messages={messages}
          setMessages={setMessages}
          currentID={currentID}
          setCurrentID={setCurrentID}
        />
      )}
    </div>
  );
};

export default FriendList;

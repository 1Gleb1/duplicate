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
import Tabs from "../Tabs";
import Chat from "./Chat";

const FriendList = () => {
  const [currentID, setCurrentID] = useState("");
  const [anotherUser, setAnotherUser] = useState();
  const [allUserArray, setAllUserArray] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [arrayUsers, setArrayUsers] = useState([]);
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

  // const getCurrentId = (friendUid, friendUser) => {
  //   let str;
  //   if (currentUserUid >= friendUid) {
  //     str = currentUserUid + friendUid;
  //   }
  //   if (currentUserUid < friendUid) {
  //     str = friendUid + currentUserUid;
  //   }
  //   setCurrentID(str);
  //   setAnotherUser(friendUser);
  // };

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

  // const handleFriendUser = async (friendUser) => {
  //   let coincidence = false;
  //   friendsList.forEach((user) => {
  //     if (user.email == friendUser.email) {
  //       console.log("уже в друзьях");
  //       coincidence = true;
  //     }
  //   });
  //   if (!coincidence) {
  //     const personItem = {
  //       user: {
  //         email: user.email,
  //         displayName: user.displayName ? user.displayName : user.email,
  //         uid: user.uid,
  //       },
  //     };
  //     const friendItem = {
  //       user: {
  //         email: friendUser.email,
  //         displayName: friendUser.displayName
  //           ? friendUser.displayName
  //           : friendUser.email,
  //         uid: friendUser.uid,
  //       },
  //     };
  //     await addDoc(
  //       collection(firestore, "friends", friendUser.email, "list"),
  //       personItem
  //     );
  //     await addDoc(
  //       collection(firestore, "friends", user.email, "list"),
  //       friendItem
  //     );
  //   } else {
  //     console.log("в списке");
  //   }
  // };
  // const deleteFriend = async (friendDel) => {
  //   const docRef = collection(firestore, "friends", user.email, "list");
  //   const docRefTwo = collection(firestore, "friends", friendDel.email, "list");
  //   const unsub = onSnapshot(docRef, (snapshot) => {
  //     snapshot.forEach(async (usersi) => {
  //       if (usersi.data().user.email == friendDel.email) {
  //         await deleteDoc(
  //           doc(firestore, "friends", user.email, "list", usersi.id)
  //         );
  //       }
  //     });
  //   });

  //   const unsubTwo = onSnapshot(docRefTwo, (snapshot) => {
  //     snapshot.forEach(async (usersi) => {
  //       if (usersi.data().user.email == friendDel.email) {
  //         console.log(usersi.id);
  //         await deleteDoc(
  //           doc(firestore, "friends", friendDel.email, "list", usersi.id)
  //         );
  //       }
  //     });
  //   });
  //   setFriendsList([]);
  //   return () => {
  //     unsub();
  //     unsubTwo();
  //   };
  // };

  // const handleArray = (arr) => {
  //   if (arr.length < allUserArray.length) {
  //     setPeople("friend");
  //   } else {
  //     setPeople("all");
  //   }
  //   setArrayUsers(arr);
  // };

  useEffect(() => {
    getArrayUser();
    handleFriendList();
  }, [anotherUser, arrayUsers, people]);

  return (
    <div>
      <div className="flex gap-1">
        <div className=" w-[800px] pt-1 pl-1">
          <Tabs
            arrayTabs={["All User", "Friends"]}
            arrayContent={[allUserArray, friendsList]}
            //
            currentID={currentID}
            setCurrentID={setCurrentID}
            anotherUser={anotherUser}
            setAnotherUser={setAnotherUser}
          />
        </div>
      </div>
    </div>
  );
};

export default FriendList;

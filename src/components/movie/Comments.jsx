import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { GrSend } from "react-icons/gr";
import { firestore } from "../../firebase/clientApp";

const Comments = ({ id }) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser ? auth : "";
  const userUid = user.uid;
  // console.log(id);

  const sendComment = async (e, msg) => {
    e.preventDefault();

    if (msg.length == 0) {
      return;
    } else {
      await addDoc(collection(firestore, `comment/${id}/comments`), {
        createOn: serverTimestamp(),
        uid: userUid ? userUid : "guest",
        comment: msg,
        name: user.displayName ? user.displayName : "guest",
      });
    }
    setNewComment("");
  };

  const getComments = () => {
    const chatsDocRef = collection(firestore, `comment/${id}/comments`);
    const chatsQuery = query(chatsDocRef, orderBy("createOn", "desc")); // orderBy("createOn", "asc")

    const unsub = onSnapshot(chatsQuery, (snapshot) => {
      let commentsArray = [];
      snapshot.forEach((comment) => {
        commentsArray.push(comment.data());
      });
      setComments(commentsArray);
      return unsub();
    });

    // console.log(comments);
    // return () => {
    //   unsub();
    // };
  };

  useEffect(() => {
    getComments();
  }, [comments]);

  return (
    <div>
      <div className="pb-12">
        <form className="flex">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="py-2 w-full bg-[#728899] px-3 text-black rounded-l-lg"
          />
          <button
            className="p-4 bg-[#1c405a] rounded-r-lg"
            onClick={(e) => sendComment(e, newComment)}
          >
            <GrSend className="text-slate-300 text-lg " color="white" />
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-4">
        {comments.map((doc, index) => (
          <div key={index} className="bg-[#1b374c] p-3 flex rounded-md">
            <div className="avatar placeholder ">
              <div className="bg-[#0d2232] text-neutral-content border-2 rounded-full max-w-12 h-12 ">
                <span className="text-lg">{doc.name[0]}</span>
              </div>
            </div>
            <div className="flex flex-col ml-6">
              <div className="text-[#76a8ce] text-xl">{doc.name}</div>
              <div className="">{doc.comment}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;

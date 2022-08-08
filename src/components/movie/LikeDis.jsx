import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { firestore } from "../../firebase/clientApp";

const LikeDis = (imdbID) => {
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);

  const chanheLikeDis = async (e, msg) => {
    e.preventDefault();

    await addDoc(collection(firestore, `likeDis/${imdbID}/arr`), {
      like,
      dislike,
    });
  };

  return (
    <div>
      <div className="flex gap-2 w-[500px] justify-end">
        <div className="flex items-center">
          <button>
            <AiFillLike />
          </button>
          <span className="text-lg">{like}</span>
        </div>
        <div className="flex items-center">
          <button>
            <AiFillDislike />
          </button>
          <span className="text-lg">{dislike}</span>
        </div>
      </div>
    </div>
  );
};

export default LikeDis;
